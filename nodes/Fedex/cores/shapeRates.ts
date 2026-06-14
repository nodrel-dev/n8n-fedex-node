// Flatten FedEx's nested rateReplyDetails into one row per service, pairing the
// account's Negotiated Rate against the published List Rate (ADR-0003). Pure.

interface RatedShipmentDetail {
	rateType?: string;
	totalNetCharge?: number;
	shipmentRateDetail?: { currency?: string };
}

interface RateReplyDetail {
	serviceType?: string;
	serviceName?: string;
	ratedShipmentDetails?: RatedShipmentDetail[];
}

interface RateResponse {
	output?: { rateReplyDetails?: RateReplyDetail[] };
}

export interface ShapedRate {
	serviceType: string;
	serviceName: string;
	/** The account's discounted price (FedEx rateType containing ACCOUNT), or null. */
	negotiatedRate: number | null;
	/** FedEx's standard published price (rateType containing LIST), or null when not returned. */
	listRate: number | null;
	currency: string | null;
}

const isAccount = (detail: RatedShipmentDetail): boolean => /ACCOUNT/i.test(detail.rateType ?? '');
const isList = (detail: RatedShipmentDetail): boolean => /LIST/i.test(detail.rateType ?? '');

export function shapeRates(response: unknown): ShapedRate[] {
	const details = (response as RateResponse | undefined)?.output?.rateReplyDetails ?? [];

	return details.map((service) => {
		const rated = service.ratedShipmentDetails ?? [];
		const list = rated.find(isList);
		// Negotiated = the explicit ACCOUNT rate, else the first non-list detail (single-rate
		// responses), so a price is always surfaced even when FedEx returns only one rateType.
		const negotiated = rated.find(isAccount) ?? rated.find((detail) => detail !== list) ?? null;
		const currencySource = negotiated ?? list ?? null;

		return {
			serviceType: service.serviceType ?? '',
			serviceName: service.serviceName ?? '',
			negotiatedRate: negotiated?.totalNetCharge ?? null,
			listRate: list?.totalNetCharge ?? null,
			currency: currencySource?.shipmentRateDetail?.currency ?? null,
		};
	});
}
