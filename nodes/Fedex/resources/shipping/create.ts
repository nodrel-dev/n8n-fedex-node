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
	createAdditionalFields,
	packageFields,
	serviceTypeField,
} from '../../fields';
import { LABEL_IMAGE_OPTIONS, LABEL_STOCK_OPTIONS } from '../../constants';
import {
	readAddressInput,
	readAdditional,
	readContactInput,
	readPackageLineItem,
	readString,
	requireAccountNumber,
} from '../shared';

const show = { resource: ['shipping'], operation: ['create'] };

export const createFields: INodeProperties[] = [
	// Honest friction (cognitive-load audit, "What NOT to touch" #2): Create buys a real
	// shipment and bills the configured account, and the node is usableAsTool, so an AI agent
	// can invoke it. Surface the cost up front rather than burying it in docs.
	{
		displayName:
			'Running this operation books a real FedEx shipment and bills the Shipping Account below. In Sandbox it is free; in Production it incurs charges.',
		name: 'createCostNotice',
		type: 'notice',
		default: '',
		displayOptions: { show },
	},
	accountNumberField(show),
	...addressFields('shipper', show),
	...contactFields('shipper', show),
	...addressFields('recipient', show),
	...contactFields('recipient', show),
	serviceTypeField(show, true),
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
	createAdditionalFields(show, LABEL_STOCK_OPTIONS),
];

export async function createPreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const extra = readAdditional(this);
	const packagingType = String(extra.packagingType ?? '').trim() || 'YOUR_PACKAGING';
	const pickupType = String(extra.pickupType ?? '').trim() || 'USE_SCHEDULED_PICKUP';
	const labelStockType = String(extra.labelStockType ?? '').trim() || 'PAPER_4X6';

	const body: IDataObject = {
		labelResponseOptions: 'LABEL',
		accountNumber: { value: requireAccountNumber(this) },
		requestedShipment: {
			shipper: {
				address: toFedexAddress(readAddressInput(this, 'shipper', extra)),
				contact: toFedexContact(readContactInput(this, 'shipper', extra)),
			},
			recipients: [
				{
					address: toFedexAddress(
						readAddressInput(this, 'recipient', extra, { residential: true }),
					),
					contact: toFedexContact(readContactInput(this, 'recipient', extra)),
				},
			],
			serviceType: readString(this, 'serviceType'),
			packagingType,
			pickupType,
			// v1 always bills the configured Shipping Account (FR-008a, spec clarification).
			shippingChargesPayment: { paymentType: 'SENDER' },
			labelSpecification: {
				imageType: readString(this, 'labelImageType', 'PDF'),
				labelStockType,
				labelFormatType: 'COMMON2D',
			},
			requestedPackageLineItems: [readPackageLineItem(this, extra)],
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
		const binary = await this.helpers.prepareBinaryData(
			label.buffer,
			label.fileName,
			label.mimeType,
		);

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
