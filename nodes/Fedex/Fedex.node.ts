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
		// 403s on the other. See ADR-0004.
		//
		// The declarative routing engine resolves which credential to use by reading a parameter
		// literally named `authentication` and matching each credential's
		// `displayOptions.show.authentication` (n8n-core routing-node `prepareCredentials`, which
		// only consults `authentication` when a node has 2+ credentials). Gating on `operation`
		// works for normal execution (the editor binds a credential) but NOT in AI-Agent tool mode,
		// where the tool executor falls into the multi-credential branch and throws
		// "Could not get parameter: authentication". So credentials are keyed on `authentication`,
		// and `authentication` is derived from `operation` via the hidden properties below — no
		// manual auth pick, and the value resolves on both the normal and tool paths.
		credentials: [
			{
				name: 'fedexTrackOAuth2Api',
				required: true,
				displayOptions: { show: { authentication: ['fedexTrackOAuth2Api'] } },
			},
			{
				name: 'fedexShippingOAuth2Api',
				required: true,
				displayOptions: { show: { authentication: ['fedexShippingOAuth2Api'] } },
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
			// Hidden auth discriminator the declarative routing engine reads to pick a credential.
			// Derived from `operation` (never shown), so each operation resolves its project's
			// credential automatically. The Workflow constructor materializes the matching default
			// into node.parameters before execution, so it resolves on the AI-Agent tool path too.
			// Values MUST equal the credential names matched in `credentials[].displayOptions`.
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'hidden',
				default: 'fedexTrackOAuth2Api',
				displayOptions: { show: { operation: ['track'] } },
			},
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'hidden',
				default: 'fedexShippingOAuth2Api',
				displayOptions: { show: { operation: ['getRates', 'create', 'validate'] } },
			},
		],
	};
}
