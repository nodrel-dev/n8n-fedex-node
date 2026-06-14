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
});
