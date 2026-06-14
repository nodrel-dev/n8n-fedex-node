import { describe, it, expect } from 'vitest';
import { shapeRates } from './shapeRates';

// Mirrors the rate.json response shape: output.rateReplyDetails[].ratedShipmentDetails[]
// with ACCOUNT (negotiated) and LIST rateTypes carrying totalNetCharge + currency.
const response = {
	output: {
		rateReplyDetails: [
			{
				serviceType: 'FEDEX_GROUND',
				serviceName: 'FedEx Ground',
				ratedShipmentDetails: [
					{ rateType: 'PAYOR_ACCOUNT_PACKAGE', totalNetCharge: 12.34, shipmentRateDetail: { currency: 'USD' } },
					{ rateType: 'PAYOR_LIST_PACKAGE', totalNetCharge: 18.99, shipmentRateDetail: { currency: 'USD' } },
				],
			},
			{
				serviceType: 'FEDEX_2_DAY',
				serviceName: 'FedEx 2Day',
				ratedShipmentDetails: [
					{ rateType: 'RATED_ACCOUNT_SHIPMENT', totalNetCharge: 25.5, shipmentRateDetail: { currency: 'USD' } },
				],
			},
		],
	},
};

describe('shapeRates', () => {
	it('flattens to one row per service pairing negotiated vs list with currency', () => {
		expect(shapeRates(response)).toEqual([
			{
				serviceType: 'FEDEX_GROUND',
				serviceName: 'FedEx Ground',
				negotiatedRate: 12.34,
				listRate: 18.99,
				currency: 'USD',
			},
			{
				serviceType: 'FEDEX_2_DAY',
				serviceName: 'FedEx 2Day',
				negotiatedRate: 25.5,
				listRate: null,
				currency: 'USD',
			},
		]);
	});

	it('returns an empty array when FedEx surfaces no eligible services', () => {
		expect(shapeRates({ output: { rateReplyDetails: [] } })).toEqual([]);
		expect(shapeRates({})).toEqual([]);
		expect(shapeRates(undefined)).toEqual([]);
	});
});
