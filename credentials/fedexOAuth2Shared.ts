import type { INodeProperties } from 'n8n-workflow';

/**
 * Shared OAuth2 (client_credentials) config for the FedEx credentials. FedEx provisions the
 * Track API in a different project from the shipping APIs (Rate / Ship / Address Validation),
 * and the two projects have disjoint entitlements — a token from one returns HTTP 403 on the
 * other's endpoints. So each credential type carries its own `test` against an endpoint it is
 * actually entitled to call (ADR-0004); everything else about the two is identical and lives here.
 *
 * Both extend n8n's built-in oAuth2Api so n8n performs the token exchange and caches/refreshes
 * the ~1h token natively. A single Environment dropdown drives the token URL (here) and the
 * node's base URL so a request can never split sandbox vs production (ADR-0001).
 */
export const FEDEX_OAUTH2_PROPERTIES: INodeProperties[] = [
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
			'Defaults to Sandbox for safe testing. Switch to Production to bill your live FedEx account.',
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

/**
 * Base URL for the credential `test` request, following the Environment field. n8n attaches the
 * OAuth2 bearer token to the test request, so this must point at a normal API host (not the token
 * endpoint, which FedEx rejects when a bearer is present).
 */
export const FEDEX_TEST_BASE_URL =
	'={{ $credentials.environment === "production" ? "https://apis.fedex.com" : "https://apis-sandbox.fedex.com" }}';

/**
 * A `notice` mapping FedEx's portal terms onto n8n's inherited OAuth2 field labels and flagging
 * that Track and Shipping draw their keys from different FedEx projects. The inherited oAuth2Api
 * `clientId` / `clientSecret` fields are NOT re-labelled directly: n8n's credential `extends`
 * combination is not a guaranteed name-keyed merge, so overriding them risks duplicate fields in
 * the NDV on some versions — a notice removes the term-translation tax with zero risk to the token
 * exchange. `project` names the FedEx project these keys come from; `otherCredential` names the
 * sibling credential that needs its own separate keys (ADR-0004).
 */
export function fedexCredentialNotice(project: string, otherCredential: string): INodeProperties {
	return {
		displayName:
			`Enter your FedEx <b>API Key</b> as Client ID and <b>Secret Key</b> as Client Secret (those are the FedEx portal's names for the same values). ` +
			`Use the keys from the FedEx project that has <b>${project}</b> — the ${otherCredential} credential needs its own separate keys.`,
		name: 'fedexKeyMappingNotice',
		type: 'notice',
		default: '',
	};
}
