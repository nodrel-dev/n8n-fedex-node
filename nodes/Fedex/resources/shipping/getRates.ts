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
	packageFields,
	pickupTypeField,
	serviceTypeField,
} from '../../fields';
import { readAddressInput, readPackageLineItem, readString, requireAccountNumber } from '../shared';

const show = { resource: ['shipping'], operation: ['getRates'] };

export const getRatesFields: INodeProperties[] = [
	accountNumberField(show),
	...addressFields('shipper', show),
	...addressFields('recipient', show, { residential: true }),
	pickupTypeField(show),
	serviceTypeField(show, false),
	...packageFields(show),
];

export async function getRatesPreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const serviceType = readString(this, 'serviceType');

	const body: IDataObject = {
		accountNumber: { value: requireAccountNumber(this) },
		rateRequestControlParameters: { returnTransitTimes: true },
		requestedShipment: {
			shipper: { address: toFedexAddress(readAddressInput(this, 'shipper')) },
			recipient: { address: toFedexAddress(readAddressInput(this, 'recipient', { residential: true })) },
			pickupType: readString(this, 'pickupType', 'USE_SCHEDULED_PICKUP'),
			rateRequestType: ['ACCOUNT', 'LIST'],
			requestedPackageLineItems: [readPackageLineItem(this)],
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
