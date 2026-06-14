import type { JsonObject } from './fedexTypes';

// Pull FedEx's base64 encodedLabel out of the deeply nested Ship response and prepare it
// for emission as n8n binary data (ADR-0002). Pure: decodes to a Buffer and strips the
// base64 blobs from the JSON pass-through; the thin postReceive adapter does the n8n call.

export interface LabelMime {
	mime: string;
	ext: string;
}

// encodedLabel imageType -> binary MIME type + file extension (confirmed in documentation.yaml).
export const LABEL_MIME: Record<string, LabelMime> = {
	PDF: { mime: 'application/pdf', ext: 'pdf' },
	PNG: { mime: 'image/png', ext: 'png' },
	ZPLII: { mime: 'application/octet-stream', ext: 'zpl' },
	EPL2: { mime: 'application/octet-stream', ext: 'epl' },
};

interface LabelDocument {
	encodedLabel?: string;
}

interface PieceResponse {
	trackingNumber?: string;
	packageDocuments?: LabelDocument[];
}

interface TransactionShipment {
	pieceResponses?: PieceResponse[];
}

interface ShipResponse {
	output?: { transactionShipments?: TransactionShipment[] };
}

export interface ExtractedLabel {
	buffer: Buffer;
	fileName: string;
	mimeType: string;
	trackingNumber: string;
	/** The Ship output with every base64 encodedLabel removed, for the JSON main output. */
	json: JsonObject;
}

/** Recursively drop `encodedLabel` keys so the JSON output never carries the base64 blob. */
function stripEncodedLabels(value: unknown): unknown {
	if (Array.isArray(value)) {
		return value.map(stripEncodedLabels);
	}
	if (value && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value as JsonObject)
				.filter(([key]) => key !== 'encodedLabel')
				.map(([key, nested]) => [key, stripEncodedLabels(nested)]),
		);
	}
	return value;
}

export function extractLabel(response: unknown, imageType: string): ExtractedLabel {
	const output = (response as ShipResponse | undefined)?.output;
	const piece = output?.transactionShipments?.[0]?.pieceResponses?.[0];
	const encodedLabel = piece?.packageDocuments?.find((doc) => doc.encodedLabel)?.encodedLabel;

	if (!encodedLabel) {
		throw new Error(
			'FedEx did not return an encoded label. Ensure Label Response Options is set to LABEL and the shipment request is valid.',
		);
	}

	const trackingNumber = piece?.trackingNumber ?? 'unknown';
	const mime = LABEL_MIME[imageType] ?? LABEL_MIME.PDF;

	return {
		buffer: Buffer.from(encodedLabel, 'base64'),
		fileName: `label-${trackingNumber}.${mime.ext}`,
		mimeType: mime.mime,
		trackingNumber,
		json: stripEncodedLabels(output) as JsonObject,
	};
}
