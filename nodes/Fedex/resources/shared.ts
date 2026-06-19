import type { IDataObject, IExecuteSingleFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import type { AddressInput } from '../cores/toFedexAddress';
import type { ContactInput } from '../cores/toFedexContact';
import type { FedexDimensions, FedexWeight } from '../cores/fedexTypes';

// Thin, n8n-coupled readers: pull node parameters for the current item and hand plain
// inputs to the pure cores. Kept out of the cores so the cores stay context-free (ADR-0003).
//
// Optional parameters live inside the "Additional Fields" collection (see fields.ts). A
// collection only returns the entries the user actually added, so defaults are applied here
// in code — the field-level defaults inside a collection are not auto-materialized.

export function readString(ctx: IExecuteSingleFunctions, name: string, fallback = ''): string {
	return String(ctx.getNodeParameter(name, fallback) ?? '').trim();
}

export function readNumber(ctx: IExecuteSingleFunctions, name: string, fallback = 0): number {
	return Number(ctx.getNodeParameter(name, fallback) ?? 0);
}

export function readBoolean(ctx: IExecuteSingleFunctions, name: string, fallback = false): boolean {
	return Boolean(ctx.getNodeParameter(name, fallback));
}

/** The optional parameters the user added to the "Additional Fields" collection (empty object if none). */
export function readAdditional(ctx: IExecuteSingleFunctions): IDataObject {
	return (ctx.getNodeParameter('additionalFields', {}) as IDataObject) ?? {};
}

function pickString(extra: IDataObject, key: string, fallback = ''): string {
	const value = extra[key];
	return value === undefined || value === null ? fallback : String(value).trim();
}

function pickNumber(extra: IDataObject, key: string, fallback = 0): number {
	const value = extra[key];
	return value === undefined || value === null ? fallback : Number(value);
}

export function readAddressInput(
	ctx: IExecuteSingleFunctions,
	role: 'shipper' | 'recipient',
	extra: IDataObject,
	opts: { residential?: boolean } = {},
): AddressInput {
	return {
		streetLines: readString(ctx, `${role}StreetLines`),
		city: readString(ctx, `${role}City`),
		stateOrProvinceCode: readString(ctx, `${role}StateOrProvinceCode`),
		postalCode: readString(ctx, `${role}PostalCode`),
		countryCode: readString(ctx, `${role}CountryCode`, 'US'),
		...(opts.residential ? { residential: Boolean(extra[`${role}Residential`]) } : {}),
	};
}

export function readContactInput(
	ctx: IExecuteSingleFunctions,
	role: 'shipper' | 'recipient',
	extra: IDataObject,
): ContactInput {
	return {
		personName: readString(ctx, `${role}PersonName`),
		companyName: pickString(extra, `${role}CompanyName`),
		phoneNumber: readString(ctx, `${role}PhoneNumber`),
		emailAddress: pickString(extra, `${role}EmailAddress`),
	};
}

/** Build the requestedPackageLineItems[0] entry. Weight is required; dimensions ride along only when complete. */
export function readPackageLineItem(ctx: IExecuteSingleFunctions, extra: IDataObject): IDataObject {
	const weight: FedexWeight = {
		units: readString(ctx, 'weightUnit', 'LB') === 'KG' ? 'KG' : 'LB',
		value: readNumber(ctx, 'packageWeight'),
	};

	const length = pickNumber(extra, 'packageLength');
	const width = pickNumber(extra, 'packageWidth');
	const height = pickNumber(extra, 'packageHeight');
	const hasDimensions = length > 0 && width > 0 && height > 0;

	const dimensions: FedexDimensions = {
		length,
		width,
		height,
		units: pickString(extra, 'dimensionUnit', 'IN') === 'CM' ? 'CM' : 'IN',
	};

	return {
		weight: weight as unknown as IDataObject,
		...(hasDimensions ? { dimensions: dimensions as unknown as IDataObject } : {}),
	};
}

/** The Shipping Account number is mandatory for Rate and Ship; fail fast at the boundary (FR-010). */
export function requireAccountNumber(ctx: IExecuteSingleFunctions): string {
	const value = readString(ctx, 'shippingAccountNumber');
	if (!value) {
		throw new NodeOperationError(
			ctx.getNode(),
			'A Shipping Account Number is required for this operation.',
			{
				description:
					'Enter your FedEx account number in the Shipping Account Number field before running.',
			},
		);
	}
	return value;
}
