import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	IN8nHttpFullResponse,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { toFedexAddress } from '../../cores/toFedexAddress';
import { toFedexContact } from '../../cores/toFedexContact';
import { extractLabel } from '../../cores/extractLabel';
import {
	accountNumberField,
	addressFields,
	contactFields,
	packageFields,
	packagingTypeField,
	pickupTypeField,
	serviceTypeField,
} from '../../fields';
import { LABEL_IMAGE_OPTIONS, LABEL_STOCK_OPTIONS } from '../../constants';
import { readAddressInput, readContactInput, readPackageLineItem, readString, requireAccountNumber } from '../shared';

const show = { resource: ['shipment'], operation: ['create'] };

export const createFields: INodeProperties[] = [
	accountNumberField(show),
	...addressFields('shipper', show),
	...contactFields('shipper', show),
	...addressFields('recipient', show, { residential: true }),
	...contactFields('recipient', show),
	serviceTypeField(show, true),
	packagingTypeField(show),
	pickupTypeField(show),
	...packageFields(show),
	{
		displayName: 'Label Format',
		name: 'labelImageType',
		type: 'options',
		options: LABEL_IMAGE_OPTIONS,
		default: 'PDF',
		displayOptions: { show },
		description: 'The image format of the returned label, delivered as a binary file attachment',
	},
	{
		displayName: 'Label Stock Type',
		name: 'labelStockType',
		type: 'options',
		options: LABEL_STOCK_OPTIONS,
		default: 'PAPER_4X6',
		displayOptions: { show },
	},
];

export async function createPreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body: IDataObject = {
		labelResponseOptions: 'LABEL',
		accountNumber: { value: requireAccountNumber(this) },
		requestedShipment: {
			shipper: {
				address: toFedexAddress(readAddressInput(this, 'shipper')),
				contact: toFedexContact(readContactInput(this, 'shipper')),
			},
			recipients: [
				{
					address: toFedexAddress(readAddressInput(this, 'recipient', { residential: true })),
					contact: toFedexContact(readContactInput(this, 'recipient')),
				},
			],
			serviceType: readString(this, 'serviceType'),
			packagingType: readString(this, 'packagingType', 'YOUR_PACKAGING'),
			pickupType: readString(this, 'pickupType', 'USE_SCHEDULED_PICKUP'),
			// v1 always bills the configured Shipping Account (FR-008a, spec clarification).
			shippingChargesPayment: { paymentType: 'SENDER' },
			labelSpecification: {
				imageType: readString(this, 'labelImageType', 'PDF'),
				labelStockType: readString(this, 'labelStockType', 'PAPER_4X6'),
				labelFormatType: 'COMMON2D',
			},
			requestedPackageLineItems: [readPackageLineItem(this)],
		},
	};

	return { ...requestOptions, body };
}

export async function createPostReceive(
	this: IExecuteSingleFunctions,
	_items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	try {
		const label = extractLabel(response.body, readString(this, 'labelImageType', 'PDF'));
		const binary = await this.helpers.prepareBinaryData(label.buffer, label.fileName, label.mimeType);

		return [
			{
				json: { trackingNumber: label.trackingNumber, ...label.json },
				binary: { label: binary },
			},
		];
	} catch (error) {
		throw new NodeOperationError(this.getNode(), error as Error);
	}
}
