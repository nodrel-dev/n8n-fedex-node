// Typed FedEx request shapes produced by the pure cores (ADR-0003). These mirror
// the authoritative OpenAPI specs in fedex-docs/json-schemas and are intentionally
// free of any n8n coupling so the cores stay unit-testable in isolation.

export interface FedexAddress {
	streetLines: string[];
	city: string;
	stateOrProvinceCode?: string;
	postalCode: string;
	countryCode: string;
	residential?: boolean;
}

export interface FedexContact {
	personName?: string;
	companyName?: string;
	phoneNumber: string;
	emailAddress?: string;
}

export type WeightUnit = 'LB' | 'KG';
export type DimensionUnit = 'IN' | 'CM';

export interface FedexWeight {
	units: WeightUnit;
	value: number;
}

export interface FedexDimensions {
	length: number;
	width: number;
	height: number;
	units: DimensionUnit;
}

/** A plain JSON object — used for response pass-through without depending on n8n's IDataObject. */
export type JsonObject = Record<string, unknown>;
