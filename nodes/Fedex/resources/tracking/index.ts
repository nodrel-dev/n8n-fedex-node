import type { INodeProperties } from 'n8n-workflow';
import { trackFields, trackPreSend } from './track';

const showForTracking = { resource: ['tracking'] };

// Tracking maps 1:1 to the FedEx Track API project, which is provisioned separately and carries
// its own client_id/secret (fedexTrackOAuth2Api). It shares no entitlement with the shipping
// project, so it is its own resource — see ADR-0004.
export const trackingDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showForTracking },
		options: [
			{
				name: 'Track',
				value: 'track',
				action: 'Track a shipment',
				description: 'Get the status and scan history for a tracking number',
				routing: {
					request: { method: 'POST', url: '/track/v1/trackingnumbers' },
					send: { preSend: [trackPreSend] },
					output: {
						postReceive: [
							{ type: 'rootProperty', properties: { property: 'output.completeTrackResults' } },
						],
					},
				},
			},
		],
		default: 'track',
	},
	...trackFields,
];
