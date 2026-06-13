# FedEx APIs and Developer Portal

    

 [![ Sign Up or Log In](https://developer.fedex.com/api/content/dam/fedex-com/irc/leftnav/login-icon_white.svg) Sign Up or Log In](#)

---

[](https://www.fedex.com/en-ca/developer.html)

# 

API Authorization

[DOWNLOAD JSON SCHEMA](blob:https://developer.fedex.com/81953280-0594-4c55-a8dc-accdf363e866)

-   Introduction-   Authorization API Details-   How to get API Credentials-   How the Authorization API Works

-   Error Codes

### Introduction

The FedEx APIs support the OAuth 2.0 (bearer token) authentication method to authorize your application API requests with FedEx resources. This OAuth access token needs to be regenerated after every 60 minutes and provided with each API transaction to authenticate and authorize your access to the FedEx resources.

### Authorization API Details

This API allows you to authorize the API requests and it is required to authenticate the FedEx resources. The following section describes the prerequisites for the API:

While registering to FedEx Developer portal, FedEx provides a combination of Client ID (API Key) and Client Secret (Secret Key) to authenticate API requests for your project. Each project under your organization is associated with a combination of Client ID and Client Secret, called as API credentials.

_Note: Customers (Internal, Compatible, Proprietary Parent Child, and Integrators) can contact FedEx representative to obtain API and Secret Keys._

To provide an extra layer of security, the FedEx® customers (Internal, Compatible, Proprietary Parent Child, and Integrators) can send Child Key (Customer Secret) and Child Secret (Customer password) in addition to the API Key and Secret Key to create an OAuth token. This token is used in every API request for authentication.

You can recreate the forgotten Secret Key from the Projects page on the FedEx Developer Portal.

_Note: Creation of new keys will result into code change in your application._

Important information in this document:  

-   Client Key as API Key
-   Client Secret as Secret Key
-   Child Key as Customer Key
-   Child Secret as Customer Password

API credentials serve the following purposes:

-   They identify the project making a call to the APIs.
-   They authorize access to the APIs that are enabled under your project.

### How to get API Credentials

Credentials are created based on inputs in the FedEx Developer Portal:

-   **Client ID** – API Key (Client ID) gets created when a project is created on FedEx Developer portal. You can also view the API Key associated with the project on the **Project Overview** page.
-   **Client Secret** – You will see the Secret Key (Client Secret) on the confirmation page once a project is created on the FedEx Developer portal. If needed, the Secret Key can also be regenerated, on the **Project Overview** page.

_Note: FedEx® customers (Internal, Compatible, Proprietary Parent Child, and Integrators) need to send Child Key (Customer Secret) and Child Secret (Customer password) in addition with API Key and Secret Key for creating OAuth token. Refer Account Registration API for how to get Child Key and Child Secret._

### How the Authorization API Works

**API Authorization**

Once you have secured the API credentials on FedEx Developer portal, the OAuth endpoint is used to get an access token which is used as credentials with each API transaction.  
  
These are the required inputs associated with the OAuth request:

-   grant\_type – Type of customer. (Valid values: client\_credentials, csp\_credentials, client\_pc\_credentials)
-   client\_id – Refers to the Project API Key.
-   client\_secret – Refers to the Project API Secret Key.

For FedEx® Internal, Compatible, Proprietary Parent Child, and Integrator customers, need to send the below additional inputs:

-   child\_id – Customer Key returned through Credential Registration API request.
-   child\_secret – Customer password returned through Credential Registration API request

The result of this request should return below:

-   access\_token – The encrypted OAuth token that needs to be used in the API transaction.
-   token\_type – Type of token. In this case, it is _bearer authentication_.
-   expires\_in – Token expiration time in seconds. One hour is the standard Token expiration time.
-   Scope – Scope of authorization provided to the consumer.

**Examples**

Request:

_POST /oauth/token HTTP/1.1  
grant\_type= client\_credentials&client\_id=your client ID&client\_secret=Your secret_

Response:

_{ ″access\_token″: ″eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX……..″,  
″token\_type″: ″bearer″,  
″expires\_in″: 3600,  
″scope″: ″CXS″  
}_

Request For FedEx® Internal, Compatible, and Integrator customers:

_POST /oauth/token HTTP/1.1  
grant\_type= csp\_credentials&client\_id=Client ID&client\_secret= Client secret&child\_key=Child key&child\_secret=Child Secret_

Response:

_{ ″access\_token″: ″eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX……..″,  
″token\_type″: ″bearer″,  
″expires\_in″: 3600,  
″scope″: ″CXS″  
}_

Request For FedEx® Proprietary Parent Child customers:

_POST /oauth/token HTTP/1.1  
grant\_type= client\_pc\_credentials&client\_id=Client ID&client\_secret= Client secret&child\_key=Child key&child\_secret=Child Secret_

Response:

_{ ″access\_token″: ″eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX……..″,  
″token\_type″: ″bearer″,  
″expires\_in″: 3600,  
″scope″: ″CXS″  
}_

_Note: The access token expires in an hour, it can be regenerated by using a POST request to the oauth/token endpoint._

[Documentation Powered by ReDoc](https://github.com/Redocly/redoc)

# API Authorization (1.0)

## [](#operation/API Authorization)API Authorization

Use this endpoint to request the OAuth token (bearer token) to authorize your application to access FedEx resources. You can pass this bearer token in your subsequent individual FedEx API endpoint requests.  
_Note: FedEx APIs do not support Cross-Origin Resource Sharing (CORS) mechanism._

  

EXPAND ALLCOLLAPSE ALL

##### header Parameters

content-type

required

string

Example: application/x-www-form-urlencoded

This is used to indicate the media type of the resource. The media type is a string sent along with the file indicating format of the file.  
Example: application/x-www-form-urlencoded

##### Request Body schema: application/x-www-form-urlencoded

grant\_type

required

string

Specify Type of customer requesting the Oauth token.  
Valid Values: client\_credentials, csp\_credentials, client\_pc\_credentials  
Note:  
client\_credentials - should be used for customers, Integrators, and brand new Compatible Provider customers who are yet to unboard child accounts.  
csp\_credentials - should be used for Integrators, and Compatible Provider customers with existing child accounts.  
client\_pc\_credentials – should be used for Proprietary Parent Child customers.

client\_id

required

string

Specify the Client ID also known as API Key received during FedEx Developer portal registration.  
Example: XXXX-XXX-XXXX-XXX

client\_secret

required

string

Specify the Client secret also known as Secret Key received during FedEx Developer portal registration.  
Example: XXXX-XXX-XXXX-XXX

child\_Key

string

Specify the Client ID also known as Customer Key. This element is used as a login credential for an Integrator customer, Compatible customer or a Proprietary Parent Child customer to access the application on behalf of their customer.  
Example: XXXX-XXX-XXXX-XXX  
Note: This element should be used by Integrator, Compatible and Proprietary Parent Child customers.

child\_secret

string

Specify the Client secret also known as Customer Secret. This element is used as a login credential for an Integrator customer, Compatible customer or a Proprietary Parent Child customer to access the application on behalf of their customer.  
Example: XXXX-XXX-XXXX-XXX  
Note: This element should be used by Integrator, Compatible and Proprietary Parent Child customers.

### Responses

**200**

Success

**401**

Unauthorized

**500**

Failure

**503**

Service Unavailable

post /oauth/token

Sandbox Server

https://apis-sandbox.fedex.com/oauth/token

Production Server

https://apis.fedex.com/oauth/token

### Request samples - API Authorization

-   Payload
-   C#
-   JAVA
-   JAVASCRIPT
-   PHP
-   PYTHON
-   RUST
-   SWIFT

Content type

application/x-www-form-urlencoded

Example

B2B-Proprietary

Copy

grant\_type\=client\_credentials&client\_id\=Your\_client\_ID&client\_secret\=Your\_secret

### Response samples - API Authorization

-   200
-   401
-   500
-   503

Content type

application/json

Copy

Expand all Collapse all

{

-   "access\_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX……",
    
-   "token\_type": "bearer",
    
-   "expires\_in": 3600,
    
-   "scope": "CXS"
    

}

## Error Codes

-   NOT.AUTHORIZED.ERROR
    
    The given client credentials were not valid. Please modify your request and try again.
    
-   INTERNAL.SERVER.ERROR
    
    We encountered an unexpected error and are working to resolve the issue. We apologize for any inconvenience. Please check back at a later time.
    

     

CLOSE ![](https://developer.fedex.com/api/content/dam/fedex-com/irc/tryout/close.svg)

-   Request
-   Response

Payload:

Header Parameters

[EDIT HEADER](#)

---

[RESET](#) [SAVE](#)

Query Parameters

Path Parameters

Body

SEND

Response

Copy

## Enter your user ID and password to log in

LOG IN

[FORGOT PASSWORD OR USER ID?](https://www.fedex.com/fcl/web/jsp/forgotPassword.jsp?appName=fclfsm&locale=en_ca)

---

Get access to FedEx APIs by creating a user ID.

SIGN UP

  

 

## Embedded Content

The page you are looking for is not found.  

## Please visit our [Home Page](https://developer.fedex.com/)