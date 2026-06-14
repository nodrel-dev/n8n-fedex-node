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

export function addressFields(
	role: Role,
	show: Show,
	opts: { residential?: boolean } = {},
): INodeProperties[] {
	const fields: INodeProperties[] = [
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

	if (opts.residential) {
		fields.push({
			displayName: 'Recipient Is Residential',
			name: `${role}Residential`,
			type: 'boolean',
			default: false,
			displayOptions: { show },
			description:
				'Whether the recipient address is residential (affects service availability and rating)',
		});
	}

	return fields;
}

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
			displayName: `${cap(role)} Company Name`,
			name: `${role}CompanyName`,
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
		},
		{
			displayName: `${cap(role)} Email`,
			name: `${role}EmailAddress`,
			type: 'string',
			default: '',
			displayOptions: { show },
		},
	];
}

export function pickupTypeField(show: Show): INodeProperties {
	return {
		displayName: 'Pickup Type',
		name: 'pickupType',
		type: 'options',
		options: PICKUP_TYPE_OPTIONS,
		default: 'USE_SCHEDULED_PICKUP',
		displayOptions: { show },
	};
}

export function serviceTypeField(show: Show, required: boolean): INodeProperties {
	return {
		displayName: 'Service Type',
		name: 'serviceType',
		type: 'options',
		options: required
			? SERVICE_TYPE_OPTIONS
			: [{ name: 'All Available Services', value: '' }, ...SERVICE_TYPE_OPTIONS],
		default: '',
		required,
		displayOptions: { show },
		description: required
			? 'FedEx service to ship with'
			: 'Restrict the quote to one service, or leave as all',
	};
}

export function packagingTypeField(show: Show): INodeProperties {
	return {
		displayName: 'Packaging Type',
		name: 'packagingType',
		type: 'options',
		options: PACKAGING_TYPE_OPTIONS,
		default: 'YOUR_PACKAGING',
		displayOptions: { show },
	};
}

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
		},
		{
			displayName: 'Weight Unit',
			name: 'weightUnit',
			type: 'options',
			options: WEIGHT_UNIT_OPTIONS,
			default: 'LB',
			displayOptions: { show },
		},
		{
			displayName: 'Length',
			name: 'packageLength',
			type: 'number',
			default: 0,
			typeOptions: { minValue: 0 },
			displayOptions: { show },
			description:
				'Optional. Dimensions are sent only when length, width, and height are all greater than zero.',
		},
		{
			displayName: 'Width',
			name: 'packageWidth',
			type: 'number',
			default: 0,
			typeOptions: { minValue: 0 },
			displayOptions: { show },
		},
		{
			displayName: 'Height',
			name: 'packageHeight',
			type: 'number',
			default: 0,
			typeOptions: { minValue: 0 },
			displayOptions: { show },
		},
		{
			displayName: 'Dimension Unit',
			name: 'dimensionUnit',
			type: 'options',
			options: DIMENSION_UNIT_OPTIONS,
			default: 'IN',
			displayOptions: { show },
		},
	];
}
