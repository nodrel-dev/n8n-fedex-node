import type { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

/**
 * FedEx OAuth2 (client_credentials) credential. Extends n8n's built-in oAuth2Api so n8n
 * performs the token exchange and caches/refreshes the ~1h token natively. A single
 * Environment dropdown drives both the token URL (here) and the node's base URL so a
 * request can never split sandbox vs production (ADR-0001). The base oAuth2Api supplies
 * the Client ID / Client Secret fields, which map to the FedEx API Key / Secret Key.
 */
export class FedexOAuth2Api implements ICredentialType {
	name = 'fedexOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'FedEx OAuth2 API';

	documentationUrl = 'https://github.com/nodrel-dev/n8n-fedex-node#credentials';

	icon: Icon = { light: 'file:fedex.svg', dark: 'file:fedex.dark.svg' };

	properties: INodeProperties[] = [
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{ name: 'Sandbox (Test)', value: 'sandbox' },
				{ name: 'Production (Live)', value: 'production' },
			],
			default: 'sandbox',
			description:
				'Which FedEx environment to target. Defaults to sandbox so a half-configured connection cannot hit a live account.',
		},
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'clientCredentials',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default:
				'={{ $self["environment"] === "production" ? "https://apis.fedex.com/oauth/token" : "https://apis-sandbox.fedex.com/oauth/token" }}',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			// Must be empty. FedEx's client_credentials flow derives scope from the client's
			// registration and rejects an explicit scope param ("No registered scope value for
			// this client has been requested", HTTP 400). Sending CXS here breaks token exchange.
			default: '',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];
}
