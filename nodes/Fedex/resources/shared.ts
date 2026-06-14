import type { IDataObject, IExecuteSingleFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import type { AddressInput } from '../cores/toFedexAddress';
import type { ContactInput } from '../cores/toFedexContact';
import type { FedexDimensions, FedexWeight } from '../cores/fedexTypes';

// Thin, n8n-coupled readers: pull node parameters for the current item and hand plain
// inputs to the pure cores. Kept out of the cores so the cores stay context-free (ADR-0003).

export function readString(ctx: IExecuteSingleFunctions, name: string, fallback = ''): string {
	return String(ctx.getNodeParameter(name, fallback) ?? '').trim();
}

export function readNumber(ctx: IExecuteSingleFunctions, name: string, fallback = 0): number {
	return Number(ctx.getNodeParameter(name, fallback) ?? 0);
}

export function readBoolean(ctx: IExecuteSingleFunctions, name: string, fallback = false): boolean {
	return Boolean(ctx.getNodeParameter(name, fallback));
}

export function readAddressInput(
	ctx: IExecuteSingleFunctions,
	role: 'shipper' | 'recipient',
	opts: { residential?: boolean } = {},
): AddressInput {
	return {
		streetLines: readString(ctx, `${role}StreetLines`),
		city: readString(ctx, `${role}City`),
		stateOrProvinceCode: readString(ctx, `${role}StateOrProvinceCode`),
		postalCode: readString(ctx, `${role}PostalCode`),
		countryCode: readString(ctx, `${role}CountryCode`, 'US'),
		...(opts.residential ? { residential: readBoolean(ctx, `${role}Residential`) } : {}),
	};
}

export function readContactInput(ctx: IExecuteSingleFunctions, role: 'shipper' | 'recipient'): ContactInput {
	return {
		personName: readString(ctx, `${role}PersonName`),
		companyName: readString(ctx, `${role}CompanyName`),
		phoneNumber: readString(ctx, `${role}PhoneNumber`),
		emailAddress: readString(ctx, `${role}EmailAddress`),
	};
}

/** Build the requestedPackageLineItems[0] entry. Weight is required; dimensions ride along only when complete. */
export function readPackageLineItem(ctx: IExecuteSingleFunctions): IDataObject {
	const weight: FedexWeight = {
		units: readString(ctx, 'weightUnit', 'LB') === 'KG' ? 'KG' : 'LB',
		value: readNumber(ctx, 'packageWeight'),
	};

	const length = readNumber(ctx, 'packageLength');
	const width = readNumber(ctx, 'packageWidth');
	const height = readNumber(ctx, 'packageHeight');
	const hasDimensions = length > 0 && width > 0 && height > 0;

	const dimensions: FedexDimensions = {
		length,
		width,
		height,
		units: readString(ctx, 'dimensionUnit', 'IN') === 'CM' ? 'CM' : 'IN',
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
		throw new NodeOperationError(ctx.getNode(), 'A Shipping Account Number is required for this operation.', {
			description: 'Enter your FedEx account number in the Shipping Account Number field before running.',
		});
	}
	return value;
}
