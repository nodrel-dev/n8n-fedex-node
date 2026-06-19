import type { INodeProperties } from 'n8n-workflow';
import {
	DIMENSION_UNIT_OPTIONS,
	PACKAGING_TYPE_OPTIONS,
	PICKUP_TYPE_OPTIONS,
	SERVICE_TYPE_OPTIONS,
	WEIGHT_UNIT_OPTIONS,
} from './constants';

// Presentational INodeProperties builders (ADR-0003: the field surface stays declarative).
// Roles namespace the shipper vs recipient parameters so both can live in one operation;
// the names are reused across Get Rates and Create so values carry over when switching.
//
// Field altitude (cognitive-load audit, docs/audits/cognitive-load-operation-ui-20260619-191805-1f35.md): only the fields a
// shipment genuinely needs sit flat at the top. Everything optional (company, email,
// residential flag, pickup/packaging/label-stock choices, parcel dimensions) is collapsed
// into a single "Additional Fields" collection so the panel reads as a short required core
// instead of a ~30-field wall. The collection's inner names match the old flat names, so the
// pure cores and the assembled FedEx request body are unchanged.

type Show = { resource: string[]; operation: string[] };
type Role = 'shipper' | 'recipient';

const label = (role: Role): string => (role === 'shipper' ? 'Shipper' : 'Recipient');
const cap = (role: Role): string => label(role);

export function accountNumberField(show: Show): INodeProperties {
	return {
		displayName: 'Shipping Account Number',
		name: 'shippingAccountNumber',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show },
		description:
			'Your FedEx account number — determines whose negotiated rates apply and who is billed',
	};
}

/** Required, flat address fields. The address is kept whole at the top level so it reads as one unit. */
export function addressFields(role: Role, show: Show): INodeProperties[] {
	return [
		{
			displayName: `${cap(role)} Street Lines`,
			name: `${role}StreetLines`,
			type: 'string',
			typeOptions: { rows: 2 },
			default: '',
			displayOptions: { show },
			description:
				'Street address. Put each additional line (suite, apt) on its own line; up to three are sent.',
		},
		{
			displayName: `${cap(role)} City`,
			name: `${role}City`,
			type: 'string',
			default: '',
			displayOptions: { show },
		},
		{
			displayName: `${cap(role)} State/Province Code`,
			name: `${role}StateOrProvinceCode`,
			type: 'string',
			default: '',
			placeholder: 'TN',
			displayOptions: { show },
		},
		{
			displayName: `${cap(role)} Postal Code`,
			name: `${role}PostalCode`,
			type: 'string',
			default: '',
			displayOptions: { show },
		},
		{
			displayName: `${cap(role)} Country Code`,
			name: `${role}CountryCode`,
			type: 'string',
			default: 'US',
			description: 'Two-letter ISO country code',
			displayOptions: { show },
		},
	];
}

/** Required, flat contact fields: the name and the FedEx-mandated phone. Company/email move to Additional Fields. */
export function contactFields(role: Role, show: Show): INodeProperties[] {
	return [
		{
			displayName: `${cap(role)} Contact Name`,
			name: `${role}PersonName`,
			type: 'string',
			default: '',
			displayOptions: { show },
		},
		{
			displayName: `${cap(role)} Phone Number`,
			name: `${role}PhoneNumber`,
			type: 'string',
			default: '',
			required: true,
			displayOptions: { show },
			description: 'FedEx requires a phone number for the shipment contact',
		},
	];
}

export function serviceTypeField(show: Show, required: boolean): INodeProperties {
	// Create requires a service and defaults to FedEx Ground (the most common domestic service)
	// so the dropdown opens on a real value instead of blank. Rate defaults to all services.
	if (required) {
		return {
			displayName: 'Service Type',
			name: 'serviceType',
			type: 'options',
			options: SERVICE_TYPE_OPTIONS,
			default: 'FEDEX_GROUND',
			required: true,
			displayOptions: { show },
			description: 'FedEx service to ship with',
		};
	}

	return {
		displayName: 'Service Type',
		name: 'serviceType',
		type: 'options',
		options: [{ name: 'All Available Services', value: '' }, ...SERVICE_TYPE_OPTIONS],
		default: '',
		displayOptions: { show },
		description: 'Restrict the quote to one service, or leave as all',
	};
}

/** Required, flat package fields: weight and its unit. Dimensions move to Additional Fields. */
export function packageFields(show: Show): INodeProperties[] {
	return [
		{
			displayName: 'Package Weight',
			name: 'packageWeight',
			type: 'number',
			default: 1,
			required: true,
			typeOptions: { minValue: 0 },
			displayOptions: { show },
			description: 'Weight of the package, in the selected weight unit',
		},
		{
			displayName: 'Weight Unit',
			name: 'weightUnit',
			type: 'options',
			options: WEIGHT_UNIT_OPTIONS,
			default: 'LB',
			displayOptions: { show },
		},
	];
}

// --- Additional Fields collection entries -------------------------------------------------
// These are rendered as options inside the single "Additional Fields" collection, so they
// carry no displayOptions of their own. Inner names match the legacy flat names; the readers
// pull them off the collection object and apply the same defaults the old flat fields had.
// Items are ordered alphabetically by displayName to satisfy the n8n collection lint rule.

const dimensionEntries: INodeProperties[] = [
	{
		displayName: 'Dimension Unit',
		name: 'dimensionUnit',
		type: 'options',
		options: DIMENSION_UNIT_OPTIONS,
		default: 'IN',
	},
	{
		displayName: 'Height',
		name: 'packageHeight',
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0 },
	},
	{
		displayName: 'Length',
		name: 'packageLength',
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0 },
		description:
			'Dimensions are sent only when length, width, and height are all greater than zero',
	},
	{
		displayName: 'Width',
		name: 'packageWidth',
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0 },
	},
];

function contactExtraEntries(role: Role): INodeProperties[] {
	return [
		{
			displayName: `${cap(role)} Company Name`,
			name: `${role}CompanyName`,
			type: 'string',
			default: '',
		},
		{
			displayName: `${cap(role)} Email`,
			name: `${role}EmailAddress`,
			type: 'string',
			default: '',
		},
	];
}

const residentialEntry: INodeProperties = {
	displayName: 'Recipient Is Residential',
	name: 'recipientResidential',
	type: 'boolean',
	default: false,
	description:
		'Whether the recipient address is residential (affects service availability and rating)',
};

const pickupTypeEntry: INodeProperties = {
	displayName: 'Pickup Type',
	name: 'pickupType',
	type: 'options',
	options: PICKUP_TYPE_OPTIONS,
	default: 'USE_SCHEDULED_PICKUP',
};

const packagingTypeEntry: INodeProperties = {
	displayName: 'Packaging Type',
	name: 'packagingType',
	type: 'options',
	options: PACKAGING_TYPE_OPTIONS,
	default: 'YOUR_PACKAGING',
};

const labelStockEntry: INodeProperties = {
	displayName: 'Label Stock Type',
	name: 'labelStockType',
	type: 'options',
	// LABEL_STOCK_OPTIONS imported lazily below to keep the constant list co-located with Create.
	options: [],
	default: 'PAPER_4X6',
};

/** Wrap a set of optional entries in the standard "Additional Fields" collection. */
function additionalFields(show: Show, options: INodeProperties[]): INodeProperties {
	return {
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show },
		options,
	};
}

/** Additional Fields for Get Rates: residential flag, pickup type, and parcel dimensions. */
export function getRatesAdditionalFields(show: Show): INodeProperties {
	return additionalFields(show, [...dimensionEntries, pickupTypeEntry, residentialEntry]);
}

/**
 * Additional Fields for Create: shipper/recipient company + email, residential flag, packaging,
 * pickup, parcel dimensions, and label stock. `labelStockOptions` is injected so the constant
 * list stays defined alongside the Create operation.
 */
export function createAdditionalFields(
	show: Show,
	labelStockOptions: INodeProperties['options'],
): INodeProperties {
	const entries: INodeProperties[] = [
		...dimensionEntries,
		{ ...labelStockEntry, options: labelStockOptions },
		packagingTypeEntry,
		pickupTypeEntry,
		...contactExtraEntries('recipient'),
		residentialEntry,
		...contactExtraEntries('shipper'),
	];
	return additionalFields(show, entries);
}
