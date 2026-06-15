import type { INodeProperties } from 'n8n-workflow';
import { getRatesFields, getRatesPreSend, getRatesPostReceive } from './getRates';
import { createFields, createPreSend, createPostReceive } from './create';
import { validateFields, validatePreSend } from './validate';

const showForShipping = { resource: ['shipping'] };

// Shipping maps 1:1 to the FedEx shipping project, which bundles the Rate, Ship, and Address
// Validation APIs behind a single client_id/secret (fedexShippingOAuth2Api). They share one
// entitlement set, so they live together under one resource — see ADR-0004.
export const shippingDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showForShipping },
		options: [
			{
				name: 'Get Rates',
				value: 'getRates',
				action: 'Get rates for a shipment',
				description: 'Quote negotiated and list rates for available services',
				routing: {
					request: { method: 'POST', url: '/rate/v1/rates/quotes' },
					send: { preSend: [getRatesPreSend] },
					output: { postReceive: [getRatesPostReceive] },
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a shipment and label',
				description: 'Buy a shipment and get a printable label plus tracking number',
				routing: {
					request: { method: 'POST', url: '/ship/v1/shipments' },
					send: { preSend: [createPreSend] },
					output: { postReceive: [createPostReceive] },
				},
			},
			{
				name: 'Validate',
				value: 'validate',
				action: 'Validate an address',
				description: 'Standardize an address and classify it residential vs commercial',
				routing: {
					request: { method: 'POST', url: '/address/v1/addresses/resolve' },
					send: { preSend: [validatePreSend] },
					output: {
						postReceive: [
							{ type: 'rootProperty', properties: { property: 'output.resolvedAddresses' } },
						],
					},
				},
			},
		],
		default: 'getRates',
	},
	...getRatesFields,
	...createFields,
	...validateFields,
];
