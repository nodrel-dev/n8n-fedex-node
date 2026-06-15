import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { trackingDescription } from './resources/tracking';
import { shippingDescription } from './resources/shipping';

export class Fedex implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FedEx',
		name: 'fedex',
		icon: { light: 'file:fedex.svg', dark: 'file:fedex.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Track shipments, validate addresses, get rates, and create labels with your own FedEx account',
		defaults: {
			name: 'FedEx',
		},
		// Exposed as an AI agent tool. The Create operation buys a real shipment and bills the
		// configured account, so gate it behind human approval in agentic workflows; the
		// credential defaults to sandbox to keep an unattended agent off a live account.
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		// Each resource mirrors a FedEx dev-portal project and binds that project's credential:
		// Tracking → fedexTrackOAuth2Api, Shipping (Rate/Ship/Address Validation) →
		// fedexShippingOAuth2Api. The two projects have disjoint entitlements, so a token from one
		// 403s on the other. Keyed on operation (values are globally unique). See ADR-0004.
		credentials: [
			{
				name: 'fedexTrackOAuth2Api',
				required: true,
				displayOptions: { show: { operation: ['track'] } },
			},
			{
				name: 'fedexShippingOAuth2Api',
				required: true,
				displayOptions: { show: { operation: ['getRates', 'create', 'validate'] } },
			},
		],
		requestDefaults: {
			// Base URL follows the credential's Environment so token exchange and API calls
			// always target the same FedEx host (ADR-0001).
			baseURL:
				'={{ $credentials.environment === "production" ? "https://apis.fedex.com" : "https://apis-sandbox.fedex.com" }}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Shipping', value: 'shipping' },
					{ name: 'Tracking', value: 'tracking' },
				],
				default: 'tracking',
			},
			...trackingDescription,
			...shippingDescription,
		],
	};
}
