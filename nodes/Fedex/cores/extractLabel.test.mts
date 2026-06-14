import { describe, it, expect } from 'vitest';
import { extractLabel } from './extractLabel';

// Mirrors ship.json: output.transactionShipments[].pieceResponses[].packageDocuments[].encodedLabel
const encoded = Buffer.from('%PDF-1.4 fake label').toString('base64');
const response = {
	output: {
		transactionShipments: [
			{
				serviceType: 'FEDEX_GROUND',
				pieceResponses: [
					{
						trackingNumber: '794698526503',
						packageDocuments: [{ contentType: 'LABEL', docType: 'PDF', encodedLabel: encoded }],
					},
				],
			},
		],
	},
};

describe('extractLabel', () => {
	it('decodes the base64 label and names the file by tracking number + image type', () => {
		const label = extractLabel(response, 'PDF');

		expect(label.buffer.toString('utf8')).toBe('%PDF-1.4 fake label');
		expect(label.fileName).toBe('label-794698526503.pdf');
		expect(label.mimeType).toBe('application/pdf');
		expect(label.trackingNumber).toBe('794698526503');
	});

	it('maps thermal image types to octet-stream with the right extension', () => {
		expect(extractLabel(response, 'ZPLII').mimeType).toBe('application/octet-stream');
		expect(extractLabel(response, 'ZPLII').fileName).toBe('label-794698526503.zpl');
	});

	it('strips every encodedLabel from the JSON pass-through', () => {
		const json = JSON.stringify(extractLabel(response, 'PDF').json);
		expect(json).not.toContain('encodedLabel');
		expect(json).toContain('794698526503');
	});

	it('throws a clear error when no encoded label is present', () => {
		expect(() => extractLabel({ output: { transactionShipments: [] } }, 'PDF')).toThrow(/did not return an encoded label/i);
	});

	it('sanitizes unsafe characters in the tracking number used for the file name', () => {
		const dirty = {
			output: {
				transactionShipments: [
					{
						pieceResponses: [
							{ trackingNumber: '../../etc/passwd', packageDocuments: [{ encodedLabel: encoded }] },
						],
					},
				],
			},
		};

		const label = extractLabel(dirty, 'PDF');
		expect(label.fileName).toBe('label-.._.._etc_passwd.pdf');
		// The raw value still passes through on the JSON/trackingNumber field; only the file name is sanitized.
		expect(label.trackingNumber).toBe('../../etc/passwd');
	});

	it('rejects an oversized decoded label', () => {
		const huge = Buffer.alloc(21 * 1024 * 1024, 0x41).toString('base64');
		const big = {
			output: {
				transactionShipments: [
					{ pieceResponses: [{ trackingNumber: '1', packageDocuments: [{ encodedLabel: huge }] }] },
				],
			},
		};

		expect(() => extractLabel(big, 'PDF')).toThrow(/unexpectedly large label/i);
	});
});
