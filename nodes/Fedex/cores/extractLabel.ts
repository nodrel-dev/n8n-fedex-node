import type { JsonObject } from './fedexTypes';

// Pull FedEx's base64 encodedLabel out of the deeply nested Ship response and prepare it
// for emission as n8n binary data (ADR-0002). Pure: decodes to a Buffer and strips the
// base64 blobs from the JSON pass-through; the thin postReceive adapter does the n8n call.

export interface LabelMime {
	mime: string;
	ext: string;
}

// encodedLabel imageType -> binary MIME type + file extension (confirmed in internal/documentation.yaml).
export const LABEL_MIME: Record<string, LabelMime> = {
	PDF: { mime: 'application/pdf', ext: 'pdf' },
	PNG: { mime: 'image/png', ext: 'png' },
	ZPLII: { mime: 'application/octet-stream', ext: 'zpl' },
	EPL2: { mime: 'application/octet-stream', ext: 'epl' },
};

// Upper bound on a decoded label. A real FedEx label is a few hundred KB at most; this is a
// defensive guard so a malformed/oversized base64 blob can't pressure memory unchecked.
export const MAX_LABEL_BYTES = 20 * 1024 * 1024;

/**
 * The tracking number comes from FedEx's response but is interpolated into a binary fileName,
 * so strip anything that isn't a safe filename character (defence-in-depth against path or
 * header tricks in whatever consumes the binary downstream).
 */
function safeFileNamePart(value: string): string {
	const cleaned = value.replace(/[^\w.-]/g, '_');
	return cleaned.length > 0 ? cleaned : 'unknown';
}

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

	const buffer = Buffer.from(encodedLabel, 'base64');
	if (buffer.length > MAX_LABEL_BYTES) {
		throw new Error(
			`FedEx returned an unexpectedly large label (${buffer.length} bytes, limit ${MAX_LABEL_BYTES}).`,
		);
	}

	return {
		buffer,
		fileName: `label-${safeFileNamePart(trackingNumber)}.${mime.ext}`,
		mimeType: mime.mime,
		trackingNumber,
		json: stripEncodedLabels(output) as JsonObject,
	};
}
