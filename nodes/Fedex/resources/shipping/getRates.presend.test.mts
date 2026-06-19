import { describe, it, expect } from 'vitest';
import { getRatesPreSend } from './getRates';

// Characterization test: locks the exact FedEx Rate request body the pre-send assembles
// from node parameters. The "Additional Fields" collection refactor must keep this byte
// identical. The mock resolves both the flat names (pre-refactor) and an `additionalFields`
// object (post-refactor) so the same fixture proves parity across the change.
const params: Record<string, unknown> = {
	shippingAccountNumber: '802960',
	shipperStreetLines: '123 Main St',
	shipperCity: 'Memphis',
	shipperStateOrProvinceCode: 'TN',
	shipperPostalCode: '38116',
	shipperCountryCode: 'US',
	recipientStreetLines: '456 Oak Ave',
	recipientCity: 'Beverly Hills',
	recipientStateOrProvinceCode: 'CA',
	recipientPostalCode: '90210',
	recipientCountryCode: 'US',
	recipientResidential: true,
	pickupType: 'USE_SCHEDULED_PICKUP',
	serviceType: '',
	weightUnit: 'LB',
	packageWeight: 10,
	packageLength: 0,
	packageWidth: 0,
	packageHeight: 0,
	dimensionUnit: 'IN',
	additionalFields: {
		recipientResidential: true,
		pickupType: 'USE_SCHEDULED_PICKUP',
		packageLength: 0,
		packageWidth: 0,
		packageHeight: 0,
		dimensionUnit: 'IN',
	},
};

const ctx = {
	getNodeParameter: (name: string, fallback?: unknown) =>
		name in params ? params[name] : fallback,
	getNode: () => ({ name: 'FedEx', type: 'fedex' }),
};

describe('getRatesPreSend', () => {
	it('assembles the Rate request body, omitting serviceType when all services are requested', async () => {
		const result = await getRatesPreSend.call(ctx as never, { url: '/x', headers: {} } as never);

		expect(result.body).toEqual({
			accountNumber: { value: '802960' },
			rateRequestControlParameters: { returnTransitTimes: true },
			requestedShipment: {
				shipper: {
					address: {
						streetLines: ['123 Main St'],
						city: 'Memphis',
						postalCode: '38116',
						countryCode: 'US',
						stateOrProvinceCode: 'TN',
					},
				},
				recipient: {
					address: {
						streetLines: ['456 Oak Ave'],
						city: 'Beverly Hills',
						postalCode: '90210',
						countryCode: 'US',
						stateOrProvinceCode: 'CA',
						residential: true,
					},
				},
				pickupType: 'USE_SCHEDULED_PICKUP',
				rateRequestType: ['ACCOUNT', 'LIST'],
				requestedPackageLineItems: [{ weight: { units: 'LB', value: 10 } }],
			},
		});
	});
});
