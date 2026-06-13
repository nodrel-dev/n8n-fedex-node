# FedEx APIs and Developer Portal

    

 [![ Sign Up or Log In](https://developer.fedex.com/api/content/dam/fedex-com/irc/leftnav/login-icon_white.svg) Sign Up or Log In](#)

---

[](https://www.fedex.com/en-ca/developer.html)

# 

Postal Code Validation API

[DOWNLOAD JSON SCHEMA](blob:https://developer.fedex.com/5775e9b2-c5e3-4e5f-acc0-e418a6adb4c0)

-   Introduction-   Postal Code Validation API Details-   How Postal Code Validation API works-   Business Rules-   JSON API Collection

-   Error Codes

### Introduction

FedEx Postal Code Validation API enables FedEx customers to validate postal codes and get the service commitments. It supports city, postal, country and Origin-Destination related lookups and the validations. It returns verified postal and location details in the reply.

### Postal Code Validation API Details

The Postal Code Validation validates the postal codes for countries and cities and provides the cleaned postal code as a response. The correctly formatted postal codes are mandatory to process a shipment or create shipping labels.

This API uses the provided input information such as ship date, postal code, country code and other various information and checks for mismatch between state and city values. The City and State is set if a mismatch is found and if country is U.S. or CA. For examples: FDXE - FedEx Express®, FDXG - FedEx Ground® and FXSP - FedEx Ground® Economy (Formerly known as FedEx SmartPost®). The API validates the given input and provides location details and cleaned postal code.

FedEx supports services to both postal aware countries and non-postal aware countries.

**Postal aware countries**

Shipments to these countries should include the postal codes on the airway bills and other documentation to help reduce delays and maximize efficiency. FedEx Express customers should be encouraged to include valid postal codes in their addresses for recipients located in the below countries.

For more information on the Postal aware countries refer to [Postal Aware Countries](https://developer.fedex.com/api/en-ca/guides/api-reference.html#postalawarecountries).

**Non–Postal aware countries**

As the name suggests, there are non-postal aware countries supported by FedEx that do not mandate postal codes in their shipments. State code or city name is enough when customer is shipping to a country which does not have a postal code. If validation error occurs for a country that does not use ZIP codes, try to force the address through by entering \\"00000\\" as a replacement postal code. Using this false postal code should not cause issues, as it does not exist.

The following are the benefits of using FedEx Postal Code Validation API:

-   Reduces Shipping delays and increases efficiency.
-   Increases number of on-time and complete deliveries.
-   Improves FedEx service to urban areas, offering flexibility in cutoff times and pickup schedules.

### How Postal Code Validation API works

The FedEx Postal Code Validation uses the below endpoint to validate the postal codes for cities, countries and origin-destination. The following section describes the key inputs and responses for the endpoint:

**Validate Postal**

This request is used to return postal details, cleaned postal code and location description based on input details. The key input information associated with this request are as follows:

-   carrierCode
-   countryCode
-   stateOrProvinceCode
-   postalCode
-   shipDate

The successful result of this request are _locationdetails_ and _cleanedpostalcode_ for the provided input. The request would fail if the postalcode is not valid for example CountryCode, State/Province and ZIP/Postal code combination is not valid.

**Clarification of Common Misconceptions**

-   It is not possible to cross-reference territory alignment to ZIP/postal alignment because these are distinctly separate alignment process outputs.
-   Not all geographic locations in the world have postal or ZIP codes.

For more information on the Region Specific list, refer to [Region Specific Service List.](https://developer.fedex.com/api/en-ca/guides/api-reference.html#regionspecificserviceslist)

### Business Rules

-   Combination of number, street name, etc. At least one line is required for a valid physical address; empty lines within the address are not allowed.
-   2-letter State or province code is required if recipient country is U.S. or Canada, or if EEI applies and country is Mexico {MX}.
-   Descriptive data for a physical location, may be used as an actual physical address (place to which one could go), or as a container of \\"address parts\\" which should be handled as a unit (such as a city state-ZIP combination within the U.S.).
-   Format and presence of postal code field will vary depending on country.

### JSON API Collection

Explore our JSON API collection to see how we can deliver on your business needs. Test your integration with these sample requests.

[Learn more about sandbox virtualization guide](https://developer.fedex.com/api/en-ca/guides/sandboxvirtualization.html)

[Documentation Powered by ReDoc](https://github.com/Redocly/redoc)

# Postal Code Validation API (1.0.0)

## [](#operation/Validate Postal)Validate Postal

Use this endpoint to validate postal codes and service commitments. Supports city, postal, country and origin-destination related lookups and validations.  
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

-   FullSchema-ValidatePostal
-   MinimumSamplePayload

carrierCode

required

string

Enum: "FDXE" "FDXG" "FXSP" "FDXC" "FXCC"

Specify the four letter code of a FedEx operating company that meets your requirements  
Examples of FedEx Operating Companies are:

-   FDXE - FedEx Express
-   FDXG - FedEx Ground
-   FXSP - FedEx SmartPost
-   FXCC - FedEx Custom Critical.

countryCode

required

string

The two-letter code used to identify a country.  
Example:US  
Click here to see Country Codes

stateOrProvinceCode

required

string

This is the state or province code. Format and presence of this field will vary, depending on country.  
Example: US  
Click here to see State Or Province Code

postalCode

required

string

Identification code of a region (usally small) for easier and accurate mail/package delivery. The format and presence of this field may vary depending on the country.  
Example: 75063-8659  
Click here to see Postal aware countries

shipDate

required

string

Specify the date on which the package is to be shipped. The specified date should not be the current date or any date, 10 days after the current date. The date format must be YYYY-MM-DD.  
Example: 2019-10-04

routingCode

string

Specify the routing code for the shipment. Routing code is the information that identifies the route the package or shipment may take.  
Example: Memphis 38017 - HKA/NQA

checkForMismatch

boolean

This element checks for mismatch between State/Province Code and Postal Code.

-   When the checkForMismatch is set TRUE, for U.S. and Canada: The values in State/Province Code are checked with respect to Postal Code provided. If these entries are valid, the response provides respective State/Province Code and Postal Code. In case of mismatch of Postal Code and State/Province Code an error message is displayed.
-   When the checkForMismatch is set FALSE, for U.S. and Canada: The values in State/Province Code are not checked with respect to Postal Code provided. Instead the given data is reflected in the response.

  
For regions other than U.S and Canada regardless of the value of checkForMismatch the State/Province Code are checked with respect to the Postal Code and the response provides the respective State/Province Code and Postal Code.

version

object (Version)

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

post /country/v1/postal/validate

Sandbox Server

https://apis-sandbox.fedex.com/country/v1/postal/validate

Production Server

https://apis.fedex.com/country/v1/postal/validate

### Request samples - Validate Postal

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

FullSchema-ValidatePostal

Copy

Expand all Collapse all

{

-   "carrierCode": "FDXG",
    
-   "countryCode": "US",
    
-   "stateOrProvinceCode": "US",
    
-   "postalCode": "502267",
    
-   "shipDate": "2019-10-04",
    
-   "routingCode": "Memphis 38017 - HKA/NQA",
    
-   "checkForMismatch": true,
    
-   "version":
    
    {
    
    -   "major": "1",
        
    -   "minor": "1",
        
    -   "patch": "1"
        
    
    }
    

}

### Response samples - Validate Postal

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

-   "transactionId": "624deea6-b709-470c-8c39-4b5511281492",
    
-   "customerTransactionId": "AnyCo\_order123456789",
    
-   "output":
    
    {
    
    -   "countryCode": "US",
        
    -   "cityFirstInitials": "C",
        
    -   "stateOrProvinceCode": "US",
        
    -   "alerts":
        
        \[
        
        -   {
            
            -   "code": "CITYNAME.POSTALCODE.REQUIRED",
                
            -   "alertType": "NOTE",
                
            -   "parameterList":
                
                \[
                
                -   {
                    
                    -   "value": "string",
                        
                    -   "key": "string"
                        
                    
                    }
                    
                
                \],
                
            -   "message": "We are unable to process this request. Please try again later or contact FedEx Customer Service."
                
            
            }
            
        
        \],
        
    -   "locationDescriptions":
        
        \[
        
        -   {
            
            -   "locationId": "MAAPD",
                
            -   "locationNumber": "6955",
                
            -   "serviceArea": "AA",
                
            -   "airportId": "BLR"
                
            
            }
            
        
        \],
        
    -   "cleanedPostalCode": "94267"
        
    
    }
    

}

## Error Codes

-   CREDITCARD.TYPE.REQUIRED
    
    Please select a credit card type.
    
-   ORIGIN.COUNTRYCODE.REQUIRED
    
    Shipment origin country code is required.
    
-   DESTINATION.POSTALCITY.MISMATCH
    
    The Destination Postal Code is not valid for the Destination City entered. Please verify the information and try again.
    
-   ORIGIN.POSTALCODE.INVALID
    
    Invalid ZIP/Postal code.
    
-   ADDRESS.DETAIL.INVALID
    
    The City, State/Province and ZIP/Postal code combination that you entered is not valid.
    
-   CITY.IS.REQUIRED
    
    City is required
    
-   CITYNAME.POSTALCODE.REQUIRED
    
    City Name or Postal Code is required.
    
-   COUNTRYCODE.ATLEASTTWOCHARACTER.REQUIRED
    
    Country Code is required and must be 2 characters long.
    
-   DATE.ENTERED.INVALID
    
    Please enter a valid date
    
-   DECLARED.VALUEMAXUSD.ERROR
    
    The maximum declared value is USD50,000.
    
-   DECLAREDVAULE.EXCEEDS.LIMIT
    
    The maximum declared value is USD50,000.
    
-   PACKAGE.TYPELIMIT.ERROR
    
    Your package is 150 lbs/68kg or less, and length plus girth (L+2W+2H) exceeds 130 inches/330.2cm and qualifies as a FedEx Express® Freight shipment.
    
-   POSTALCODE.ATLEASTTHREECHARACTERS.REQUIRED
    
    Postal Code must have at least 3 characters.
    
-   POSTALCODE.SHIP.ERROR
    
    You cannot ship from this postal code.
    
-   PRODUCT.INFORMATION.REQUIRED
    
    Complete the information required for your product.
    
-   SERVICES.POBOXS.NOTAVAILABLE
    
    FedEx does not provide services from or to P.O. Boxes.
    
-   STATE.POSTALCODE.MISMATCH
    
    State Postal Code mismatch
    
-   STATECODE.IS.REQUIRED
    
    State Code is required.
    
-   STATECODE.MINIMUMLENGTH.REQUIRED
    
    State Code must be 2 characters long.
    
-   STATECODE.TWOCHARACTERS.REQUIRED
    
    State Code must be 2 characters long.
    
-   CARRIER.CODE.INVALID
    
    Carrier code is invalid
    
-   COUNTRYCODE.INFO.INVALID
    
    Country code is invalid
    
-   SHIPPING.POSTAL.CODE.INVALID
    
    Postal code is null or empty
    
-   AVAILABILITY.SHIP.DATE.INVALID
    
    Ship date is invalid
    
-   STATE.PROVINCECODE.REQUIRED
    
    StateOrProvince code is null or empty
    
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