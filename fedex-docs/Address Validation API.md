# FedEx APIs and Developer Portal

    

 [![ Sign Up or Log In](https://developer.fedex.com/api/content/dam/fedex-com/irc/leftnav/login-icon_white.svg) Sign Up or Log In](#)

---

[](https://www.fedex.com/en-ca/developer.html)

# 

Address Validation API

[DOWNLOAD JSON SCHEMA](blob:https://developer.fedex.com/6d3d0906-8a78-43bf-826c-3f6f76096897)

-   Introduction-   Address Validation API Details-   How Address Validation API Works-   Address Classification-   Tips for Using the Address Validation API-   Business Rules-   JSON API Collection

-   Error Codes

### Introduction

The Address Validation API is a smart solution to resolve inaccurate contact details and enable faster delivery of packages with precision. This API appropriately formats the input recipient address information that closely resembles a valid address and returns a real-world address that is likely to be the one intended.

The API also provides annotations about deficiencies in the input address or changes that were made to the input to arrive at that real-world address. You can use this API to validate and resolve the recipient address information before you ship a package.

_Note: Do not use this API to determine the deliverability of an address. FedEx does not offer delivery service to every valid address. FedEx does not deliver to P.O. Boxes except via FedEx Ground® Economy (Formerly known as FedEx SmartPost®)._

### Address Validation API Details

This API allows to validate and correct recipient address information before shipping a package. Accurate addresses on the shipping label will help eliminate delivery delays and additional address correction fees (due to malformed addresses).

_Note:_

_-   Address resolution results vary by country/territory.
-   The entered address in the request is compared with the reference data in the FedEx database and the matched address is returned._

**Address Validation API Functionalities**

-   Provides street level address matches.
-   Receives monthly updates to its address database.
-   Distinguishes between business and residential addresses if an exact match is found.

**Address Validation API Capabilities**

-   Completes the incomplete recipient addresses. In some cases, Address Validation API will be able to add missing information, depending on the verification of the provided information against reference data. Address Validation API cannot add missing secondary information (i.e., apartment or suite) at this time.
-   Receives monthly updates to its address database.
-   Corrects invalid recipient addresses. For example, correction of an incorrect postal code to agree with the remainder of the input.
-   Determine whether an address is business or residential to increase the accuracy of courtesy rate quotes. Applies to U.S. and Canada addresses only.
-   Confirm the validity and completeness of addresses in many countries in these regions: U.S., Canada, Latin America, Europe, the Middle East and Asia Pacific. You are now able to validate domestic and international address information before shipping a package, eliminating unnecessary delivery delays and additional service fees.
-   Provides street level matches.
-   Up to 100 addresses can be checked in one API request.

**Countries/Territories Supporting Address Validation API**

You can use the FedEx Address Validation API in the following countries to validate and correct the recipient addresses for efficient deliveries.

Antilles

Denmark

Panama

Argentina

Dominican Republic

Peru

Aruba

Estonia

Portugal

Australia

Finland

Singapore

Austria

France

South Africa

Bahamas

Germany

Spain

Barbados

Greece

Sweden

Belgium

Guatemala

Switzerland

Bermuda

Hong Kong SAR, China

Trinidad and Tobago

Brazil

Italy

United Kingdom

Canada

Jamaica

United States

Cayman Islands

Malaysia

Uruguay

Chile

Mexico

Venezuela

Columbia

Netherlands

Virgin Islands

Costa Rica

New Zealand

 

Czech Republic

Norway

 

**_Note:_** _The information returned by Validate Address Request is for suggested use only._

**_Legal Disclaimer:_** _The data provided herein is FedEx proprietary and confidential information, provided as a courtesy at your request. No part of this data may be distributed or disclosed in any form to any third party without the written permission of FedEx. It reflects the current FedEx address-level business/residential classification in the FedEx delivery address database, and is subject to change. In furnishing this information, FedEx does not guarantee its present or future accuracy, and does not guarantee that packages shipped to these addresses will be invoiced according to the business/residential classification provided herein. Providing this information shall not be deemed to alter the terms of the relationship between the parties. See the FedEx [Service Guide](https://www.fedex.com/en-us/service-guide.html) and any applicable account pricing agreement for terms and conditions governing FedEx shipping and charges._

### How Address Validation API Works

**Validate Address**

Use this endpoint to validate and resolve input addresses and returns real-world addresses. The address details are provided and validated in order to resolve an address. An address is stated as resolved when the input address matches the known reference data.

The required input information associated with this request is:

-   Street Lines
-   City (Optional)
-   State or Province Code (Optional)
-   Postal Code (Optional)
-   Country Code

_Note: State code or city name is enough when customer shipping to a country which does not have a postal code._

The Address Validation API returns a real-world address by performing the following operations on the input address:

-   As the first step, the API attempts to normalize the input address. This can include replacing common roadway identifiers such as street and parkway with their standard abbreviations such as ST and PKWY, as well as reordering components of the address. If an input address cannot be normalized, the resolved addresses returned will be the input address. Non-address values are discarded.
-   In the second step, the API attempts to standardize the normalized address by finding a possible or actual address that is likely the one intended by the user. If that standardization fails, the resolved addresses returned will be the normalized form of the input address. Refer to the elements returned to help determine the problems with the address submitted.
-   Certain elements of that normalized address will also be returned. If standardization does succeed, the resolved addresses returned will be that real-world address. In this case, various additional elements of the standardized address and information on how it was derived from the normalized address is also returned.

### Address Validation API Return Values

If the address returned includes the following values for the below attributes, then the address is valid:

-   Address State is Standardized
-   Attributes of Resolved address are True
-   Delivery Point Valid (DPV) is True
-   Interpolated Address is False

If these are not listed, then use the additional attributes to determine the possible problems with the address values.

For more information on Address Attributes, see [Address Attributes.](https://developer.fedex.com/api/en-ca/guides/api-reference.html#addressattributes)

If the output returned customer message is INTERPOLATED.STREET.ADDRESS, then there is a chance that the address is not valid. For more information on customer message code, refer to the element description of customer message.  

**Annotations**

Address Validation API returns annotations with every address validated and returned. The annotations give you information on the deficiencies if any and the changes made to the input address to arrive at that real-world address.

### Address Classification

The Address Validation API uses reference data to determine the classification of a given address. The classification for a functional address is calculated independently of the validation address process and is based on feedback by operational personnel, with commercial data sources used for confirmation only.  
  
The Address Validation API has only four possible classifications for addresses: unknown, business, residential and mixed. All addresses begin with an 'unknown' classification and stay that way until address validation business rules determine that their classifications should change. A location only gets a 'mixed' classification if it is a multi-tenant-based address and contains both business and residential units.

_Note: FedEx Express service provides an additional address line (address line 3) for recipient addresses. This additional address information provides more complete and accurate location details improving your chances of getting accurate address._

The real-world addresses are classified as follows:

**Business Address**

A business address is an address that is used to designate your principal place of business. It is where your business is supposedly operating from, but that may not always be the case.

A business address is the official location of a company's premises. It could be anything from someone's home address right up to a multi-million-dollar campus, such as those big tech companies favor and everything in between.

**Residential Address**

A residential delivery charge will apply to shipments within the U.S. made to a home or private residence, including locations where a business is operated from a home. Use FedEx Home Delivery for residential delivery via FedEx Ground in 1 -7 business days, based on distance to the destination.

Example:

-   Rectory
-   Convent
-   Parsonage
-   Residents of multiple-unit dwellings, such as:
    -   Apartment buildings
    -   Condominiums
    -   College dormitories

-   A residence where products are sold and/or distributed

### Tips for Using the Address Validation API

Following are some useful tips for using the Address Validation API:

-   **Use correct spacing:** Make sure spaces are placed correctly and avoid unnecessary spaces.
-   **Use correct spelling:** Avoid any spelling and typographical errors. Also, make sure you have the correct usage of the number zero (0) and letter O.
-   **Avoid special characters:** Please refrain from using special characters not required for the address, such as periods after abbreviations (Ave vs. Ave.).
-   **Provide additional address and Street Information:** By providing additional address information, you can increase the accuracy of address results.
    -   Building or House number - 1, 1A, 1½, One
    -   Street Name - Main, George Washington, 42nd
    -   Street Suffix - Road, Avenue, Rd, Ave
-   **Enter city, state/province and ZIP or postal code:** Providing all three will increase the accuracy of your address results.
-   **Enter street and address in order:** Street address elements usually follow a format starting with the building or house number followed by a pre-directional element, a street name, street type or suffix, a post-directional element, apartment designation, apartment number and/or private mailbox designation and number.
-   **Use correct abbreviations:** The U.S. Postal Service and Canada Post has standard abbreviations for state/province, street suffix and apartment or unit designations.
    -   A non-standard abbreviation may cause poor search results.
    -   If you are unsure about an abbreviation, do not use it.

For example:

-   Building or house number such as 1, 1A, One.
-   Street name such as Main, George Washington, 42nd.
-   Street suffix such as Road, Avenue, Rd, Ave.
-   Enter city, state/province and postal code: Providing all address information will increase the accuracy of your results. The ZIP+4 portion of the postal code is not necessary to check an address.
-   Use correct abbreviations: The United States Postal Service and postal authorities in other countries define standard abbreviations for state/province, street suffix, and apartment/unit designations. A nonstandard abbreviation may cause poor search results. If you are unsure about an abbreviation, do not use it.
-   Consider returning the address validation response feedback to the user in order to give them the option to choose the most correct address for them.

### Business Rules

-   Do not use this API to determine the package deliverability of an address. FedEx does not offer delivery service to every valid address. FedEx does not deliver to P.O. Boxes (except via FedEx Ground® Economy (Formerly known as FedEx SmartPost®).
-   The information returned by resolved address is for suggested use only.
-   Up to 100 addresses can be checked in one request.
-   The minimum required fields vary among countries.
    
    For example, for U.S. addresses, at least one address line and either a postal code or a city and a state code are required, but for AUS (Australia address format) addresses, the state code may be omitted even without a postal code.
    
-   Address resolution result may vary by country/territory.

_Note: Address Validation API might not be applicable for all the countries. Refer the section **Countries/Territories Supporting Address Validation API**._

### JSON API Collection

Explore our JSON API collection to see how we can deliver on your business needs. Test your integration with these sample requests.

[Learn more about sandbox virtualization guide](https://developer.fedex.com/api/en-ca/guides/sandboxvirtualization.html)

[Documentation Powered by ReDoc](https://github.com/Redocly/redoc)

# Address Validation API (1.0.0)

## [](#operation/Validate Address)Validate Address

Use this endpoint to get address resolution details. These details are the outcome of validation and resolution of the input address. An address is stated as resolved when the input address matches the known reference data.  
_Note: FedEx APIs do not support Cross-Origin Resource Sharing (CORS) mechanism._

  

EXPAND ALLCOLLAPSE ALL

To learn more about how to get OAuth access token, refer to [API Authorization documentation.](/api/en-ca/catalog/authorization/v1/docs.html)

##### header Parameters

x-customer-transaction-id

string

Example: 624deea6-b709-470c-8c39-4b5511281492

This element allows you to assign a unique identifier to your transaction. This element is also returned in the reply and helps you match the request to the reply.

content-type

required

string

Example: application/json

This is used to indicate the media type of the resource. The media type is a string sent along with the file indicating format of the file.

x-locale

string

Example: en\_US

This indicates the combination of language code and country code. Click here to see Locales

authorization

required

string

Example: Bearer XXX

This indicates the authorization token for the input request.

##### Request Body schema: application/json

One of

-   Full\_Schema\_Validate\_Address
-   Address\_Validation\_Canada
-   Address\_Validation\_US
-   Address\_Validation\_for\_Germany
-   Address\_Validation\_for\_Italy
-   Address\_Validation\_for\_UK

inEffectAsOfTimestamp

string

This can be used to request the characteristics of an address had at a particular time in history. This defaults to current date time (of the Address Validation System). This is useful because the AddressValidation database is dynamic and stores historical data. Characteristics such as Business/Residential indicator may change over time.  
Example: 2019-09-06

validateAddressControlParameters

object (AddressResolutionControlParameters)

Specify the parameters applied to validate the address.

addressesToValidate

required

Array of objects (ResolveContactAndAddress)

Indicate the address to be validated and resolved. This includes the address details, such as streetline, state or province code, country code and postal code.  
  
_Note: Up to 100 of these can be submitted in a single request._

### Responses

**200**

Success

**400**

Bad Request

**401**

Unauthorized

**403**

Forbidden

**404**

Not Found

**500**

Failure

**503**

Service Unavailable

post /address/v1/addresses/resolve

Sandbox Server

https://apis-sandbox.fedex.com/address/v1/addresses/resolve

Production Server

https://apis.fedex.com/address/v1/addresses/resolve

### Request samples - Validate Address

-   Payload
-   C#
-   JAVA
-   JAVASCRIPT
-   PHP
-   PYTHON
-   RUST
-   SWIFT

Content type

application/json

Example

Full\_Schema\_Validate\_Address

Copy

Expand all Collapse all

{

-   "inEffectAsOfTimestamp": "2019-09-06",
    
-   "validateAddressControlParameters":
    
    {
    
    -   "includeResolutionTokens": true
        
    
    },
    
-   "addressesToValidate":
    
    \[
    
    -   {
        
        -   "address":
            
            {
            
            -   "streetLines":
                
                \[
                
                -   "7372 PARKRIDGE BLVD",
                    
                -   "APT 286",
                    
                -   "2903 sprank"
                    
                
                \],
                
            -   "city": "IRVING",
                
            -   "stateOrProvinceCode": "TX",
                
            -   "postalCode": "75063-8659",
                
            -   "countryCode": "US"
                
            
            },
            
        -   "clientReferenceId": "None"
            
        
        }
        
    
    \]
    

}

### Response samples - Validate Address

-   200
-   400
-   401
-   403
-   404
-   500
-   503

Content type

application/json

Copy

Expand all Collapse all

{

-   "transactionId": "XXX\_ORDERXXXX789",
    
-   "customerTransactionId": "AnyCo\_order123456789",
    
-   "output":
    
    {
    
    -   "resolvedAddresses":
        
        \[
        
        -   {
            
            -   "streetLinesToken":
                
                \[
                
                -   "7372 PARKRIDGE BLVD",
                    
                -   "APT 286"
                    
                
                \],
                
            -   "city": "IRVING",
                
            -   "stateOrProvinceCode": "TX",
                
            -   "countryCode": "US",
                
            -   "customerMessage":
                
                \[
                
                -   null
                    
                
                \],
                
            -   "cityToken":
                
                \[
                
                -   "TOK-1X3256"
                    
                
                \],
                
            -   "postalCodeToken":
                
                {
                
                -   "changed": false,
                    
                -   "value": "SAN JUAN"
                    
                
                },
                
            -   "parsedPostalCode":
                
                {
                
                -   "base": "00926",
                    
                -   "addOn": "2716",
                    
                -   "deliveryPoint": "50"
                    
                
                },
                
            -   "classification": "BUSINESS",
                
            -   "postOfficeBox": true,
                
            -   "normalizedStatusNameDPV": true,
                
            -   "standardizedStatusNameMatchSource": "Postal",
                
            -   "resolutionMethodName": "USPS\_VALIDATE",
                
            -   "ruralRouteHighwayContract": false,
                
            -   "generalDelivery": false,
                
            -   "attributes":
                
                {
                
                -   "POBox": false,
                    
                -   "POBoxOnlyZIP": false,
                    
                -   "SplitZip": false,
                    
                -   "SuiteRequiredButMissing": "false",
                    
                -   "InvalidSuiteNumber": "false",
                    
                -   "ResolutionInput": "RAW\_ADDRESS",
                    
                -   "DPV": false,
                    
                -   "ResolutionMethod": "GENERIC\_VALIDATE",
                    
                -   "DataVintage": "July 2020",
                    
                -   "MatchSource": "Postal",
                    
                -   "CountrySupported": true,
                    
                -   "ValidlyFormed": true,
                    
                -   "Matched": true,
                    
                -   "Resolved": true,
                    
                -   "Inserted": false,
                    
                -   "MultiUnitBase": false,
                    
                -   "ZIP11Match": false,
                    
                -   "ZIP4Match": false,
                    
                -   "UniqueZIP": false,
                    
                -   "StreetAddress": false,
                    
                -   "RRConversion": false,
                    
                -   "ValidMultiUnit": false,
                    
                -   "AddressType": "STANDARDIZED",
                    
                -   "AddressPrecision": "MULTI\_TENANT\_UNIT",
                    
                -   "MultipleMatches": false
                    
                
                }
                
            
            }
            
        
        \],
        
    -   "alerts":
        
        \[
        
        -   {
            
            -   "code": "SHIP.RECIPIENT.POSTALCITY.MISMATCH",
                
            -   "message": "Recipient Postal-City Mismatch.",
                
            -   "alertType": "NOTE"
                
            
            }
            
        
        \]
        
    
    }
    

}

## Error Codes

-   DATESTAMP.FORMAT.INVALID
    
    We are unable to process this request. Please try again later or contact FedEx Customer Service.
    
-   COUNTRY.CODE.INVALID
    
    Specified country code {country\_code} is invalid
    
-   STANDARDIZED.ADDRESS.NOTFOUND
    
    Standardized addresss is not found.
    
-   ACCOUNTVERIFICATION.ACCOUNT.NOTFOUND
    
    Account is not shippable.
    

    

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