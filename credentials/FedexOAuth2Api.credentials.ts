import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class FedexOAuth2Api implements ICredentialType {
	name = 'fedexOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'Fedex OAuth2 API';

	// Link to your community node's README
	documentationUrl = 'https://github.com/org/-fedex?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
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
			default: 'https://api.example.com/oauth/token',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: 'users:read users:write companies:read',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];
}
