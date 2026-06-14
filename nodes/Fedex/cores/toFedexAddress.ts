import type { FedexAddress } from './fedexTypes';

const MAX_STREET_LINES = 3;
const DEFAULT_COUNTRY = 'US';

export interface AddressInput {
	streetLines?: string;
	city?: string;
	stateOrProvinceCode?: string;
	postalCode?: string;
	countryCode?: string;
	/** Only meaningful for a recipient; omitted entirely from the request when undefined. */
	residential?: boolean;
}

/**
 * Assemble the shared FedEx Address shape from flat node parameters. Owns the field
 * rules (multi-line street split, US country default, residential include/omit) so the
 * four request positions that need an address (Validate, Rate shipper/recipient, Ship
 * shipper/recipient) all derive it the same way. Pure — knows nothing about n8n.
 */
export function toFedexAddress(input: AddressInput): FedexAddress {
	const streetLines = (input.streetLines ?? '')
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.length > 0)
		.slice(0, MAX_STREET_LINES);

	const state = (input.stateOrProvinceCode ?? '').trim();
	const country = (input.countryCode ?? '').trim() || DEFAULT_COUNTRY;

	return {
		streetLines,
		city: (input.city ?? '').trim(),
		postalCode: (input.postalCode ?? '').trim(),
		countryCode: country,
		...(state ? { stateOrProvinceCode: state } : {}),
		...(input.residential !== undefined ? { residential: input.residential } : {}),
	};
}
