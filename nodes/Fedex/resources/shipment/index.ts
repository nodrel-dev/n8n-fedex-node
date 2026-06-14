import type { INodeProperties } from 'n8n-workflow';
import { trackFields, trackPreSend } from './track';
import { getRatesFields, getRatesPreSend, getRatesPostReceive } from './getRates';
import { createFields, createPreSend, createPostReceive } from './create';

const showForShipment = { resource: ['shipment'] };

export const shipmentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showForShipment },
		options: [
			{
				name: 'Track',
				value: 'track',
				action: 'Track a shipment',
				description: 'Get the status and scan history for a tracking number',
				routing: {
					request: { method: 'POST', url: '/track/v1/trackingnumbers' },
					send: { preSend: [trackPreSend] },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'output.completeTrackResults' } }] },
				},
			},
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
		],
		default: 'track',
	},
	...trackFields,
	...getRatesFields,
	...createFields,
];
