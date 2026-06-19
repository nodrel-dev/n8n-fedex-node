import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	IN8nHttpFullResponse,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { toFedexAddress } from '../../cores/toFedexAddress';
import { shapeRates } from '../../cores/shapeRates';
import {
	accountNumberField,
	addressFields,
	getRatesAdditionalFields,
	packageFields,
	serviceTypeField,
} from '../../fields';
import {
	readAddressInput,
	readAdditional,
	readPackageLineItem,
	readString,
	requireAccountNumber,
} from '../shared';

const show = { resource: ['shipping'], operation: ['getRates'] };

export const getRatesFields: INodeProperties[] = [
	accountNumberField(show),
	...addressFields('shipper', show),
	...addressFields('recipient', show),
	serviceTypeField(show, false),
	...packageFields(show),
	getRatesAdditionalFields(show),
];

export async function getRatesPreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const serviceType = readString(this, 'serviceType');
	const extra = readAdditional(this);
	const pickupType = String(extra.pickupType ?? '').trim() || 'USE_SCHEDULED_PICKUP';

	const body: IDataObject = {
		accountNumber: { value: requireAccountNumber(this) },
		rateRequestControlParameters: { returnTransitTimes: true },
		requestedShipment: {
			shipper: { address: toFedexAddress(readAddressInput(this, 'shipper', extra)) },
			recipient: {
				address: toFedexAddress(readAddressInput(this, 'recipient', extra, { residential: true })),
			},
			pickupType,
			rateRequestType: ['ACCOUNT', 'LIST'],
			requestedPackageLineItems: [readPackageLineItem(this, extra)],
			...(serviceType ? { serviceType } : {}),
		},
	};

	return { ...requestOptions, body };
}

export async function getRatesPostReceive(
	this: IExecuteSingleFunctions,
	_items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	return shapeRates(response.body).map((rate) => ({ json: rate as unknown as IDataObject }));
}
