import type { IDataObject, IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { readBoolean, readString } from '../shared';

const show = { resource: ['shipment'], operation: ['track'] };

export const trackFields: INodeProperties[] = [
	{
		displayName: 'Track Multiple Numbers',
		name: 'trackingMultiple',
		type: 'boolean',
		default: false,
		displayOptions: { show },
		description: 'Whether to track a list of numbers in one request instead of a single one',
	},
	{
		displayName: 'Tracking Number',
		name: 'trackingNumber',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { ...show, trackingMultiple: [false] } },
	},
	{
		displayName: 'Tracking Numbers',
		name: 'trackingNumbers',
		type: 'string',
		typeOptions: { rows: 3 },
		default: '',
		required: true,
		placeholder: 'One per line, or comma-separated',
		displayOptions: { show: { ...show, trackingMultiple: [true] } },
		description: 'Tracking numbers to resolve in a single FedEx call',
	},
	{
		displayName: 'Include Detailed Scans',
		name: 'includeDetailedScans',
		type: 'boolean',
		default: true,
		displayOptions: { show },
		description: 'Whether to return full scan history. Turn off for a lighter status-only response.',
	},
];

export async function trackPreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const numbers = readBoolean(this, 'trackingMultiple')
		? readString(this, 'trackingNumbers')
				.split(/[\n,]/)
				.map((value) => value.trim())
				.filter((value) => value.length > 0)
		: [readString(this, 'trackingNumber')].filter((value) => value.length > 0);

	if (numbers.length === 0) {
		throw new NodeOperationError(this.getNode(), 'Provide at least one tracking number.');
	}

	const body: IDataObject = {
		includeDetailedScans: readBoolean(this, 'includeDetailedScans', true),
		trackingInfo: numbers.map((trackingNumber) => ({ trackingNumberInfo: { trackingNumber } })),
	};

	return { ...requestOptions, body };
}
