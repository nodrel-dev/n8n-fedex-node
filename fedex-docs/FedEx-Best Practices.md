# FedEx APIs and Developer Portal

![FedEx Logo](/wirc/browser/assets/FedEx_logo.svg)

Developer Portal

![Hamburger Menu](/wirc/browser/assets/hamburgerMenu.svg)![Close Menu](/wirc/browser/assets/hamburgerClose.svg)Developer Portal![User Profile](/wirc/browser/assets/user_icon_m_logged_in.svg)

![User Profile](/wirc/browser/assets/user_icon.svg)

Sign Up / Log In

![Perform search](/wirc/browser/assets/searchIcon.svg)

Main Menu![Expand/Collapse](/wirc/browser/assets/chevronDownWhite.svg)

-   Getting Started
-   API Catalog
-   API Recipes
-   Guides
-   Announcements
-   API Validation
-   Support/FAQs
-   Other Products![Expand/Collapse](/wirc/browser/assets/chevronDownWhite.svg)![Expand/Collapse](/wirc/browser/assets/chevronDownMobile.svg)

-   FedEx Web Services![External Link](/wirc/browser/assets/externalLink.svg)![External Link](/wirc/browser/assets/externalLinkMobile.svg)
-   FedEx Ship Manager Server![External Link](/wirc/browser/assets/externalLink.svg)![External Link](/wirc/browser/assets/externalLinkMobile.svg)

![Search](/wirc/browser/assets/searchIcon.svg)

FedEx APIs Integration Best Practices

This is a quick reference guide intended to help API consumers understand ways to improve integration experience with FedEx and ensure the quality of integration solution in terms of design, speed and security.

To efficiently integrate with FedEx APIs, developers should follow these integration best practices:

API URIs

-   There are separate API URIs for test and production. 
-   Developers should use the test URIs for development and integration testing and the production URI for production.

Listed are the API URIs:

Test: https://apis-sandbox.fedex.com/

Production: https://apis.fedex.com/

Credential management

-   API Key and Secret Key
    

-   Your API Key and Secret Key are used to identify your application and need to be used in OAuth token request.

1.  Your API Key and Secret Key should be treated very securely. Do not distribute API Key or Secret Key via email or distributed code including client-side JavaScript.
2.  Your application will be compromised if your API Key or Secret Key are stolen. If you suspect that your credentials are stolen or compromised, please recreate the Secret Key immediately.
3.  Avoid logging sensitive information such as Secret Key.

-   Do not hardcode the API Key and Secret Key in your code.
-   Your application should be dynamically able to update the API Key and Secret Key.
-   The client credentials should be stored in a vault/a safe place so that it cannot be compromised.

-   OAuth token
    

-   The access token should be stored on the web application server only and must not be exposed to the browser.
-   Do not hardcode the token in your applications.
-   Secure the access tokens to avoid compromising them.
-   Avoid making multiple calls to the OAuth token API for a new access token. It is recommended to cache the access token until the HTTP error code 401 is observed. Regenerate the OAuth token at that time.
-   Do not expose the token to the end user or application.
-   Use HTTPS for any API transaction.

Coding practices

-   To maintain compliance with the latest and most secure data encryption communication protocol, it is recommended to use Transport Layer Security (TLS) version 1.2 or higher.
-   Do not forget to set the right API headers needed for each API request. You will find the header information under each API documentation page. 
-   The ’Content-Type’ in HTTP POST should be ‘application/json’.
-   Please refer to the sample code to get started with each API. Each API endpoint is accompanied by several samples that will help you understand required elements, formats and other details.
-   When users or developers send many decimals in their values, it can cause odd errors. For weight and currency value/amount, only two explicit decimal places are allowed. Dimensions – such as length, width and height – do not support decimals.

**Example**: Weight: 45.26, currency value/amount: 100.52, length: 10, width: 25, height:15.

-   Avoid sending empty elements.

**Example**: “Streetlines”:””

-   Only send data necessary to process the request.

For example, for a U.S. domestic shipment, avoid sending the commercial invoice and commodity data that may only be required for international shipments.

-   When developing, determine how to react if a non-required reply element, such as a rate, is not returned. Evaluate the transaction reply for missing elements before using data.

For example, it is possible to ship a package if the rating is not functional. Test the transaction reply for missing elements before using data.

-   In general, avoid hard dependencies on FedEx API integration when applicable.
-   In order to reduce latency and get accurate results, the following should be used:  
    
    -   Filtering - Use this to narrow down the search with the parameters you are looking for.
    -   Sorting - Use this to sort the results by a certain parameter in ascending or descending order.
    
-   Validate that required fields – such as recipient postal code and package weight – have data before sending the transaction. Validate the data is appropriate for the field in question. This will minimize transaction errors.  
    

For example, for US postal codes, verify that the field is all numeric and is in the form of a 5-digit or a ZIP+4 postal code format.

-   To avoid adverse impact on the FedEx system availability and reliability:  
    
    -   Do not run performance testing in the test or production environment.
    -   Have coding logic in place to keep the same transaction from failing repeatedly.
    
-   The throttling limit is set to 1400 transaction over 10 seconds. If this limit is reached in the first few seconds, HTTP error code **429 Too many requests** will be returned and transactions will be restricted until 10 seconds is reached; transactions will then resume again.  
    

For example, if we receive 1400 requests in the first four seconds, an HTTP error code **429 Too many requests** - ‘We have received too many requests in a short duration. Please wait a while to try again.’ will be returned and transactions will be restricted for the next six seconds and then resume again.

-   Do not hardcode business rules like service types, package types, weight limits, etc. for shipments since they are subject to change.
-   Moreover, to ensure flexibility and future-proofing, we recommend avoiding the hard-coding to specific enumeration values in API responses, as these values may change over time. Instead, implement dynamic logic that can handle new or unexpected values as they arise.

Error handling

Each API response will contain an HTTP status code and response payload. Some responses will be accompanied with an error, warning or note, as applicable. Warnings and notes are not indications of a failure; however, the error or warning message should be logged and examined. Proper error handling will ensure that your integration with FedEx goes smoothly and could help avoid breakage.

HTTP status codes

**200 OK**  
Your request was processed successfully. This is a standard response for successful HTTP requests.

-   Note: The API response can contain notes and warnings that provide informative content. Please be sure to log and parse the messages.

**400 Bad request  
**We received a bad request that we are unable to process. Please modify your request and try again.

-   Note: Please review the error code and message to fix the request and try again. Code only to error codes and not error messages since messages are subject to change dynamically.

**401 Unauthorized  
**We could not authenticate your credentials. Please make sure to cross-check your API keys and try again.

**403 Forbidden  
**We could not authorize your credentials. Please check your permissions and try again.

**404 Not found  
**The resource you requested is no longer available. Please modify your request and try again.

**405 Method not allowed  
**We received a requested method that is not supported. You should only use the methods provided for each endpoint.

For example, to create a shipment you must use POST method as described in an API’s documentation.

**409 Conflict  
**{provide reason of conflict}. Please modify your request and try again.

**415 Unsupported media type  
**We do not support the content type in your request. Please modify the format and try again.

**422 Unprocessable entity  
**We understood the format of your request, but we were unable to process the entity. Please modify your request and try again.

**429 Too many requests  
**We have received too many requests in a short duration. Please make sure to review the [Transaction Quotas & Rate-limits](#/en-ca/guides/ratelimits).

**500 Failure  
**We encountered an unexpected error and are working to resolve the issue. We apologize for any inconvenience. Please check back later and watch out for any communication from FedEx.

**503 Service unavailable  
**The service is currently unavailable, and we are working to resolve the issue. We apologize for any inconvenience. Please check back later and watch out for any communication from FedEx.

Rate

-   There are two ways to get a rate quote:  
    -   Rate for a specific serviceType - The results will be filtered by the serviceType value indicated. This will decrease the size of the reply and reduce the transaction response time.  
        
        **Example:** STANDARD\_OVERNIGHT
        
    -   Rate shop – If no serviceType is indicated, then all the applicable services and corresponding rates will be returned.
-   Use the Service Availability API to determine which services, package options and special services are available for a given origin-destination pair, and pass the serviceType and package option in the Rate request.  
    
    For example, STANDARD\_OVERNIGHT (among others) is not available between all postal codes.
    
-   For a special service to be applied on a shipment, the special service type and its details must be included.   
    
    -   Note: Some special services do not have details.
    
-   View the [Rate API documentation](#/en-ca/catalog/rate/docs).

Ship

-   Use the Service Availability API to determine which services are available for a given origin-destination pair and pass the serviceType and package option in the Ship request.
-   For a special service to be applied on a shipment, the special service type and its details must be included.  
    
    -   Note: Some special services do not have details.
    
-   Perform the close for FedEx Ground at the end of the shipping day before the shipment is picked up.  
    
-   View the [Ship API documentation](#/en-ca/catalog/ship/docs).  
    

Track

-   Limit the number of tracking numbers in a single-track request to 30. This will decrease the size of the reply and reduce the transaction response time.
-   Limit the number of times a package is tracked to what is necessary for business needs.
-   For batch tracking, remove any packages that have returned a track status of “delivered” from batch.
-   FedEx reuses tracking numbers. For best experience provide the date range to avoid duplicate results.
-   View the [Basic Integrated Visibility documentation](#/en-ca/catalog/track/docs).

Address Validation

-   FedEx provides Address Validation as a suggestion and not a final determination. The end user needs to make a final determination of whether an address is usable from the data provided and their business needs. A process must be in place to handle addresses that cannot be validated so orders can still be processed.
-   To ensure a better shipping experience, do not make the shipping process dependent on optional services such as Address Validation.

For example, if Address Validation API is unavailable at the time of order entry or shipping, a contingency should be in place to complete the shipment.

-   View the [Address Validation API documentation](#/en-ca/catalog/address-validation/docs).  
    

FedEx Locations Search

-   Narrow your search by providing specific attributes (i.e., type of location, services offered, etc.) to get suitable location options and faster response time.
-   View the [FedEx Locations Search API documentation](#/en-ca/catalog/locations/docs).  
    

Pickup Request

-   Do not input past ready time, past date or a date that is too far in the future for scheduling a pickup.
-   Anonymous pickups are not allowed.  
    
-   View the [Pickup Request API documentation](#/en-ca/catalog/pickup/docs).  
    

Service Availability

-   To get results for multiple operating companies like FedEx Express (FDXE), FedEx Ground (FDXG), FedEx Freight (FXFR) and FedEx Ground® Economy, either omit the carrierCodes element or send separate service availability requests since multiple carrier codes cannot be specified.
-   Please ensure that you have preapproval for individual skids of 151 lbs. or more and skids exceeding 2,200 lbs.  
    
-   If you specify SATURDAY\_DELIVERY for variable options, you will get both Saturday delivery options and regular options for all services where Saturday delivery is an option. Do not specify SATURDAY\_DELIVERY for special services, or it will only return any applicable Saturday delivery options.
-   View the [Service Availability API documentation](#/en-ca/catalog/service-availability/docs).

Customer support

If you have questions or need assistance, we’re here to help! Please go to our [Support](#/en-ca/support) page for resources and information on ways to contact us.

Are you an existing Web Services or FedEx Ship Manager Server Customer? If so, you can still access the [Developer Resource Center](https://www.fedex.com/en-us/developer.html).

-   [Integration Solutions](https://www.fedex.com/en-us/integration.html)
-   [Support](https://www.fedex.com/en-us/integration/support.html)
-   [FedEx.com](https://www.fedex.com/en-us/home.html)
-   [Terms of Use](https://www.fedex.com/en-us/terms-of-use.html)
-   [Security & Privacy](https://www.fedex.com/en-us/trust-center.html)

© FedEx Corporate Services Inc. All rights reserved.

![Country](/wirc/browser/assets/Country.svg)Canada

English ![Chevron icon](/wirc/browser/assets/chevronDown.svg) 

Back to Top ![Up arrow](/wirc/browser/assets/BackToTop.svg) <iframe id="uc-cross-domain-consent-sharing-bridge" src="https://web.cmp.usercentrics.eu/cdcs/v/1.0.0/index.html" style="display: none;"></iframe>

<iframe id="inqChatStage" title="Chat Window" name="10006050" src="https://developer.fedex.com/nuance/nuance.html?IFRAME&amp;nuance-frame-ac=0" style="z-index:9999999; display: none;overflow: hidden; position: absolute; height: 1px; width: 1px; left: 0px; top: 0px; border-style: none; border-width: 0px;"></iframe>

## Embedded Content

The page you are looking for is not found.  

## Please visit our [Home Page](https://developer.fedex.com/)