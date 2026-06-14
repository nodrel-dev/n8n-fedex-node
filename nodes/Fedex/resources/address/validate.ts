import type { IDataObject, IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { toFedexAddress } from '../../cores/toFedexAddress';

const show = { resource: ['address'], operation: ['validate'] };

// Validate reuses the shared Address core but with its own field names (it has no
// shipper/recipient role). Names are kept local to avoid colliding with the shipment fields.
export const validateFields: INodeProperties[] = [
	{
		displayName: 'Street Lines',
		name: 'addressStreetLines',
		type: 'string',
		typeOptions: { rows: 2 },
		default: '',
		displayOptions: { show },
		description: 'Street address. Put each additional line on its own line; up to three are sent.',
	},
	{ displayName: 'City', name: 'addressCity', type: 'string', default: '', displayOptions: { show } },
	{
		displayName: 'State/Province Code',
		name: 'addressStateOrProvinceCode',
		type: 'string',
		default: '',
		placeholder: 'TN',
		displayOptions: { show },
	},
	{ displayName: 'Postal Code', name: 'addressPostalCode', type: 'string', default: '', displayOptions: { show } },
	{
		displayName: 'Country Code',
		name: 'addressCountryCode',
		type: 'string',
		default: 'US',
		description: 'Two-letter ISO country code',
		displayOptions: { show },
	},
];

export async function validatePreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const address = toFedexAddress({
		streetLines: String(this.getNodeParameter('addressStreetLines', '') ?? ''),
		city: String(this.getNodeParameter('addressCity', '') ?? ''),
		stateOrProvinceCode: String(this.getNodeParameter('addressStateOrProvinceCode', '') ?? ''),
		postalCode: String(this.getNodeParameter('addressPostalCode', '') ?? ''),
		countryCode: String(this.getNodeParameter('addressCountryCode', 'US') ?? 'US'),
	});

	const body: IDataObject = { addressesToValidate: [{ address }] };
	return { ...requestOptions, body };
}
