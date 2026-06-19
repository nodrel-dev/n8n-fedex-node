import { describe, it, expect } from 'vitest';
import { createPreSend } from './create';

// Characterization test: locks the exact FedEx Ship request body. The "Additional Fields"
// collection refactor and the Service Type default change must keep this byte identical.
// The mock resolves both flat names (pre-refactor) and an `additionalFields` object
// (post-refactor) so one fixture proves parity across the change.
const params: Record<string, unknown> = {
	shippingAccountNumber: '802960',
	shipperStreetLines: '123 Main St',
	shipperCity: 'Memphis',
	shipperStateOrProvinceCode: 'TN',
	shipperPostalCode: '38116',
	shipperCountryCode: 'US',
	shipperPersonName: 'John Sender',
	shipperCompanyName: 'Acme',
	shipperPhoneNumber: '9015551234',
	shipperEmailAddress: 'john@acme.com',
	recipientStreetLines: '456 Oak Ave',
	recipientCity: 'Beverly Hills',
	recipientStateOrProvinceCode: 'CA',
	recipientPostalCode: '90210',
	recipientCountryCode: 'US',
	recipientResidential: true,
	recipientPersonName: 'Jane Buyer',
	recipientCompanyName: '',
	recipientPhoneNumber: '3105559876',
	recipientEmailAddress: '',
	serviceType: 'FEDEX_GROUND',
	packagingType: 'YOUR_PACKAGING',
	pickupType: 'USE_SCHEDULED_PICKUP',
	weightUnit: 'LB',
	packageWeight: 5,
	packageLength: 12,
	packageWidth: 8,
	packageHeight: 6,
	dimensionUnit: 'IN',
	labelImageType: 'PDF',
	labelStockType: 'PAPER_4X6',
	additionalFields: {
		shipperCompanyName: 'Acme',
		shipperEmailAddress: 'john@acme.com',
		recipientCompanyName: '',
		recipientEmailAddress: '',
		recipientResidential: true,
		packagingType: 'YOUR_PACKAGING',
		pickupType: 'USE_SCHEDULED_PICKUP',
		packageLength: 12,
		packageWidth: 8,
		packageHeight: 6,
		dimensionUnit: 'IN',
		labelStockType: 'PAPER_4X6',
	},
};

const ctx = {
	getNodeParameter: (name: string, fallback?: unknown) =>
		name in params ? params[name] : fallback,
	getNode: () => ({ name: 'FedEx', type: 'fedex' }),
};

describe('createPreSend', () => {
	it('assembles the Ship request body with label spec, SENDER billing, and dimensions', async () => {
		const result = await createPreSend.call(ctx as never, { url: '/x', headers: {} } as never);

		expect(result.body).toEqual({
			labelResponseOptions: 'LABEL',
			accountNumber: { value: '802960' },
			requestedShipment: {
				shipper: {
					address: {
						streetLines: ['123 Main St'],
						city: 'Memphis',
						postalCode: '38116',
						countryCode: 'US',
						stateOrProvinceCode: 'TN',
					},
					contact: {
						phoneNumber: '9015551234',
						personName: 'John Sender',
						companyName: 'Acme',
						emailAddress: 'john@acme.com',
					},
				},
				recipients: [
					{
						address: {
							streetLines: ['456 Oak Ave'],
							city: 'Beverly Hills',
							postalCode: '90210',
							countryCode: 'US',
							stateOrProvinceCode: 'CA',
							residential: true,
						},
						contact: {
							phoneNumber: '3105559876',
							personName: 'Jane Buyer',
						},
					},
				],
				serviceType: 'FEDEX_GROUND',
				packagingType: 'YOUR_PACKAGING',
				pickupType: 'USE_SCHEDULED_PICKUP',
				shippingChargesPayment: { paymentType: 'SENDER' },
				labelSpecification: {
					imageType: 'PDF',
					labelStockType: 'PAPER_4X6',
					labelFormatType: 'COMMON2D',
				},
				requestedPackageLineItems: [
					{
						weight: { units: 'LB', value: 5 },
						dimensions: { length: 12, width: 8, height: 6, units: 'IN' },
					},
				],
			},
		});
	});
});
