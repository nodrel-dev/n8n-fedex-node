# FedEx APIs and Developer Portal

    

 [![ Sign Up or Log In](https://developer.fedex.com/api/content/dam/fedex-com/irc/leftnav/login-icon_white.svg) Sign Up or Log In](#)

---

[](https://www.fedex.com/en-ca/developer.html)

# 

Basic Integrated Visibility

[DOWNLOAD JSON SCHEMA](blob:https://developer.fedex.com/c88d6db0-ed00-4c69-b429-2a589208c393)

-   Introduction-   Basic Integrated Visibility Details-   FedEx Tracking Methods-   How Basic Integrated Visibility Works-   Track Summary Results-   Tracking Delivery Schedule (On Schedule/Delayed)-   FedEx Estimated Delivery Time Window (EDTW)-   Track by Reference-   Batch Tracking-   International Package Tracking/Tracing-   Request Notifications-   Business Rules-   JSON API Collection

-   Error Codes

### Introduction

A tracking number is a unique identifier assigned to each package, enabling you to monitor its movement both domestically and internationally. FedEx tracking services provide accurate, real‑time visibility for shipments across FedEx Express®, FedEx Ground®, FedEx Home Delivery®, FedEx Freight®, and FedEx Ground® Economy (formerly FedEx SmartPost®).

### Basic Integrated Visibility Details

FedEx Tracking helps you to get an insight into the location of the shipments.With the availability of tracking notifications, you can request various types of notifications about your shipments on your email and on your mobile on the go.

You can also track the status of shipments by using a reference number, such as a purchase order (PO) number, customer reference, invoice, Bill of Lading (BOL), part number, or Transportation Control Number (TCN). Tracking by something other than a tracking number also requires inclusion of Sender's account number and should contain secure tracking content.

Take advantage of detailed shipment–status updates, search capabilities and other tools that help you manage your shipments.

-   Track the status of up to 30 FedEx Express, FedEx Ground, FedEx Home Delivery, FedEx Freight, FedEx Ground® Economy and FedEx Office shipments/orders tracking numbers.
-   Send requests for notifications and receive the status of your shipments/orders on email.
-   Review status updates in a calendar or list view to help you plan more effectively.
-   Filter by reference number, shipment date, company name and other variables.
-   View print or email FedEx Signature Proof of Delivery letters. Even if no signature is available, you can still view/print, email and fax the available proof of delivery information. Fax option is not available for multiple Signature proof of delivery requests.
-   Request that an eligible package be held for pickup at a FedEx location (U.S. only).
-   Track Package delivery schedule. i.e., on schedule or expected to deliver early or any delays with details 

### FedEx Tracking Methods

To help you ship with confidence, FedEx provides you with various ways to track the approximate location of your shipments.

Following are the tracking methods:

**Track by Tracking Numbers**

This option applies to FedEx Express, FedEx Ground shipments and FedEx Ground® Economy (Formerly known as FedEx SmartPost®) shipments. You can track any package shipped by FedEx using this tracking method.

You can enter any combination of up to 30 FedEx Express, FedEx Ground, FedEx Home Delivery, FedEx Ground® Economy, or FedEx Custom Critical® tracking numbers. Please ensure that you enter only one tracking number per line.

_Note: FedEx Ground® service is available in the U.S. and Canada only. FedEx Home Delivery, FedEx Ground® Economy and FedEx Custom Critical services are available in the U.S. only._

**Track by Door Tag Number**

This option is available for FedEx Express and FedEx Ground U.S. and Canadian shipments. This option allows you to track the status of shipments by a FedEx door tag number. A Door Tag is left at the recipient address, if the recipient is not there to receive the package. A Door Tag number is linked at FedEx with the package’s original tracking number.

This tracking functionality allows you to track using only the door tag number without requiring the associated tracking number. No additional search elements are required to track by door tag. You may request tracking scan information for any packages shipped by FedEx by entering a valid door tag number.

Door tag numbers start with the letter’s 'DT' followed by 12 numbers. You can enter more than one door tag number in the request to get more details. You can enter any combination of up to 30 door tag tracking numbers at a time ensuring one door tag per line.

**Track by FedEx Office Order Number**

You can enter a combination of up to 30 FedEx Office order numbers at a time. You need to ensure that you enter only one FedEx Office order number per line. Hyphen and spaces between office order numbers are not allowed.

_Note: FedEx Office orders are available in the U.S. only._Tracking by something other than tracking number is referred to as tracking by reference. A reference number can be any of the following: purchase order (PO) number, customer reference, invoice, Bill of Lading (BOL), or part number. This option applies to FedEx Express, FedEx Ground, and FedEx Ground® Economy.

_Note: Door tags are available in the U.S. and Canada only._

**Track by Reference**

Tracking by something other than tracking number is referred to as tracking by reference. A reference number can be any of the following: purchase order (PO) number, customer reference, invoice, Bill of Lading (BOL), part number. This option applies to FedEx Express, FedEx Freight, FedEx Ground, and FedEx Ground® Economy.

**Track by Transportation Control Number(TCN)**

Track your Government orders by simply entering the Transportation Control Number (TCN).

_Note: Do not precede the number with any spaces or with the letters 'TCN.'_

**Request Signature Proof of Delivery (SPOD)**

Use the Signature Proof of Delivery option to obtain an image of the recipient's signature (if the signature is available) after the shipment has been delivered. SPOD is available for FedEx Express and FedEx Ground shipments up to 16 months from the ship date. This includes the signature image and associated shipment data. The signature image and additional recipient information may not be available for display in all countries and is indicated on the SPOD where applicable.

The SPOD information will be presented as a byte array instead of an image. The byte array is a base64 encoded string, which should be decoded to get the final signature image in PDF or PNG format.

**Note:** To retrieve a Signature Proof of Delivery (SPOD) that includes the recipient’s signature image, the Track API request must include the shipper’s billing account number associated with the shipment. Without the shipper account in the request, the system will return a Proof of Delivery (POD) document without a signature image, even if a signature is available.

Including only the tracking number—or the tracking number with optional fields such as ship date range—is not sufficient to return a signature image. The shipper account is required to authorize access to the signature.

**Track by Multiple–Piece Shipment (MPS) Tracking Number**

This option is available for FedEx Express U.S. and international multiple–piece shipments (MPS), FedEx Ground U.S. and international multiple–piece shipments, FedEx Express International C.O.D. multiple–piece shipments, FedEx Freight, and FedEx International C.O.D. multiple–piece shipments.

MPS tracking allows you to track by the master tracking number or by one of the associated sequential tracking numbers of child packages.

-   Tracking by master tracking number returns the tracking data of all the associated child tracking numbers.
-   Tracking by the child tracking number returns details specific to package associated with it.

To track MPS packages, use the Master Tracking Number and use the Package Identifier Type value as STANDARD\_MPS.

### How Basic Integrated Visibility Works

The Basic Integrated Visibility provides the following options to actively track your shipments:

**Track by Tracking Numbers**

You can use this option to track packages based on a tracking number or Door Tag Number or FedEx Office Order Number for various shipping services.

The key input information associated with this request are as:

-   Tracking Number (Maximum 30 tracking numbers are allowed)
-   Detailed Scans to be included (True/False)

Result of this request will provide the tracking results for all the input tracking numbers along with key information such as latest status, last updated destination/location, distance to destination, any special handling details, scan events and return information in case of a return shipment.

**Track by References**

You can use this option to track packages based on alternate references other than tracking number such as customer reference numbers, etc.

The key input information associated with this request are as:

-   Reference Type and Values (BILL OF LADING, CUSTOMER\_REFERENCE, INVOICE, PURCHASE\_ORDER)
-   FedEx Account Number
-   Detailed Scans to be included (True/False)

Result of this request will provide the tracking results for all the input reference numbers along with key information such as detailed tracking entry information, latest status, last updated destination/location, distance to destination, any special handling details, scan events and return information in case of a return shipment.

**Track by Transportation Control Number**

You can use this option to track packages based on Tracking Control Number.

The key input information associated with this request are as:

-   Transportation Control Number (N552428361Y555XXX) – Only 1 TCN is supported per request.
-   Detailed scans to be included (True/False)

Result of this request will provide the tracking results for the input Tracking Control Number along with key information such as detailed tracking entry information, latest status, last updated destination/location, distance to destination, any special handling details, scan events and return information in case of a return shipment.

**Track Multiple-Piece Shipment (MPS)**

You can use this option to track multiple piece shipments, Group MPS, or an outbound shipment which is linked to a return shipment.

The key input information associated with this request are as:

-   Master Tracking number
-   Associated shipment type – MPS, Group MPS, or an outbound shipment which is linked to a return shipment (Example: STANDARD\_MPS)
-   Detailed scans to be included (True/False)

Result of this request will provide the tracking results for the input master tracking Number along with key information such as detailed tracking entry information, latest status, last updated destination/location, distance to destination, any special handling details, scan events and return information in case of a return shipment.

**Track Document**

You can use this option to request any one of the below documents:  

-   Signature Proof of Delivery (SPOD)
-   Bill of Lading (BOL)
-   Freight Billing Document (FBD)

The key input information associated with this request are as:

-   Document Type (SIGNATURE\_PROOF\_OF\_DELIVERY, BILL\_OF\_LADING or FREIGHT\_BILLING\_DOCUMENT)
-   Tracking number
-   Document Format (PDF/PNG)

If SPOD is selected as the document type, then you will receive the image of the recipient's signature (if the signature is available) once the shipment has been delivered.  
If Bill of Lading is selected as the document type, then you will receive a document that will contain the details of your shipment, and the legal contracts of carriage with terms and conditions.  
If Freight Billing document is selected as the document type, then you will receive the shipment invoice.

**Send Notifications**

You can use this option to setup up and customize the tracking event notifications to be received for a shipment.

Use Notification to have FedEx automatically notify you and/or your customer and/or another third party by email of significant shipment events, such as clearance delays, delivery attempts, releases, and pre–alerts.

FedEx offers email notification for the shipment being created, for estimated delivery, Tendered, for any Exception and delivery.

Recipient emails may be specified with the shipment request and use any or all of these notification types if you want an email notification sent to the recipients. This notification is supported for FedEx Express, FedEx Freight, FedEx Ground, and FedEx Ground® Economy. FedEx also offers a new email notification for Estimated Delivery which triggers an email on the delivery date.

The key input information associated with this request are as:

-   Sender Name
-   Email
-   Notification events (ON\_DELIVERY, ON\_ESTIMATED\_DELIVERY, ON\_EXCEPTION, ON\_TENDER.)
-   Tracking number

The successful result of this request will set the notifications on the given events and will be sent to the given email address as and when the event occurs.

### Track Summary Results

When tracking multiple shipments at once, the summary results screen shows date/time, status, destination for FedEx shipments, and/or order number, order status, date/time for FedEx Office orders.

To get tracking detail results for your shipment, send in the tracking request with the tracking number and/or FedEx order number.

You can also get email Signature Proof of Delivery letters for all delivered FedEx Express, and FedEx Ground shipments you select. Please note Signature Proof of Delivery is not available for FedEx Ground® Economy shipments.

### Tracking Delivery Schedule (On Schedule/Delayed)

You can get real time single/MPS shipment delivery schedule estimates such as delay in delivery, on time and early delivery. This is applicable when you track your package by Tracking number, by reference or tracking control number (TCN).

If a package delivery is on schedule or expected to be delivered early, then the tracking response element _trackResults\\scanEvents\\delayDetail\\status_ will have value as ON\_TIME and EARLY respectively.

If your packages are delayed due to any reason, the tracking response will provide you the required delay details (if any) with reason. In this case, the tracking response element _trackResults\\scanEvents\\delayDetail\\status_ will have value as DELAYED along with delay category (type) such due to WEATHER and additional delay category (subType) such as due to SNOW.

### FedEx Estimated Delivery Time Window (EDTW)

The FedEx Estimated Delivery Time Window (EDTW) helps recipients plan their schedules by providing a time range for shipment deliveries based on historical data of shipments delivered in the location requested by the customer. 

_**Note**: The estimated delivery time may vary based certain delivery locations._

EDTWs are available for the following regions and operating companies:

-   Regions: Packages destined to following countries:
    -   U.S.
    -   Canada
    -   Belgium
    -   Germany
    -   Netherlands
-   Operating Companies: The following are the services which provide EDTW feature:
    -   FedEx Express
    -   FedEx Ground
    -   FedEx Home Delivery (FHD) services

_**Note**: The EDTW details are not returned for all the tracking numbers due to various reasons and package handlings such as Request Appointment, Date Certain, or Evening delivery for FHD shipments or changing delivery to FedEx Hold at Location (HAL) for pickup at the nearest FedEx Authorized Ship Centers (FASCs), FedEx-staffed Ship Centers (Express only packages), FedEx Office, and FedEx OnSite locations. Contact your FedEx representative for more information._

**EDTW Technical details:**

No specific inputs to be included in the track requests as most tracking numbers will return EDTW information based on the shipment events.

The below information in the Track output/response can be used for getting EDTW:

You should use below EDTW elements in object _estimatedDeliveryTimeWindow_ returned in the Track response under _output/completeTrackResults/trackResults_:

·        **_window/begins_** _–_ EDTW begin date/timestamp range. Example: '2019-05-07T08:00:07'

·        **_window/ends_** _–_ EDTW end date/timestamp range. Example: '2019-05-15T15:00:07'

**EDTW Benefits:**

The following are the advantages of EDTW:

-   Incorporation of EDTW reduces the time spent on shipment delay resolution.
-   No more wait time on calls to inquire about package delivery times.
-   Reduced risk of package damage and narrowed scope of any possible theft.

### Signature Proof of Delivery

After your shipment is successfully delivered and if signature is obtained, the signature will be returned with the shipment (depends on signature availability) when requested through secured tracking. This is only applicable for FedEx Express and FedEx Ground shipments.

To confirm a shipment that has been received and signed for, you can also use our signature proof of delivery option to obtain this letter online, print it out, email or fax it.

Below are some helpful tips:

-   **The difference between tracking and Signature Proof of Delivery**:
    
    You can use tracking to check the status of your shipment at any time during and within 90 days after delivery. You can use signature proof of delivery to get a picture of the recipient's signature (if the signature is available) once the shipment has been delivered.
    
-   **Signature Proof of Delivery data availability:**
    
    Signature Proof of Delivery is available for up to 16 months for FedEx Express and FedEx Ground shipments. This includes the signature image and associated shipment information. The signature image and additional recipient information may not be available for display in all countries. This will be indicated on the Signature Proof of Delivery where applicable.
    
-   **Multiple Signature Proof of Delivery Requests**
    
    You can request up to 30 Signature Proof of Delivery letters at once.
    
    -   Signature Proof of Delivery letters with multiple requests may take up to several minutes to process.
    -   Please note – the fax option is not available for multiple Signature Proof of Delivery requests.
    -   Signature Proof of Delivery letters will be provided for delivered shipments only. SPOD for shipments currently in–transit will not be provided until they are delivered.

**Signature Types**

The following are the signature types and features supported by FedEx shipments:

-   **Indirect Signature Required**
    
    FedEx obtains a signature from someone at the delivery address; from a neighbor, building manager or someone at a neighboring address; or the recipient can also leave a FedEx Door Tag authorizing release of the package without anyone present. This option is available for residential deliveries only.
    
-   **Direct Signature Required**
    
    FedEx obtains a signature from someone at the delivery address. If no one is at the address, the delivery is reattempted.
    
-   **Adult Signature Required**
    
    FedEx obtains a signature from someone at least 21 years old (and possessing the required government–issued photo ID) at the delivery address. If no eligible is at the address, the delivery is reattempted.
    
-   **No Signature Required**
    
    Even if no signature is available, you can still view/print, email and fax the available proof of delivery information. If no signature is available after seven business days, please call Customer Service. Please note that the signature may be unavailable if it was released (the sender or recipient signed a signature release agreement).
    
-   **Summary Signature Proof of Delivery**
    
    You can obtain a Signature Proof of Delivery letter with summary information without providing the 9–digit FedEx shipper or payer account number. This letter contains limited shipment information such as the city, state/province, and country information for the shipper and recipient. The signature image may not be available for display in all countries. This will be indicated on the signature proof of delivery letter where applicable.
    
-   **Signature Proof of Delivery details**
    
    You can obtain a Signature Proof of Delivery letter with detailed information by providing the 9–digit FedEx account number or logging into fedex.com. If the account number or your login matches the shipper or payer of the shipment, you will be able to view detailed Signature Proof of Delivery information, which includes complete contact name, company name, street address, city, state/province, ZIP, and country information for both the shipper and recipient (if available).
    
    _Note: The signature image and additional recipient information may not be available for display in all countries. This will be indicated on the Signature proof of delivery letter where applicable._
-   **Addressee**
    
    You can add addressee information for the Proof of Delivery letter.
    
-   **Your Shipment Notes**
    
    Add personal notes specific to a tracking number to remind you of important details of your shipment. These notes are visible only to you and can be used when performing a search within FedEx Tracking.
    

### Track by Reference

You can track packages by a reference number entered during the shipping operation.

This option applies to FedEx Express, FedEx Freight and FedEx Ground shipments. You can track packages by a reference number entered during the shipping operation.

Track by Reference Number can use any of the following sources –

-   Shipper/Customer Reference  
    _Note: With a FedEx Express, FedEx Freight and FedEx Ground shipment, the customer's reference number is coded as a Shipper Reference and Customer Reference._
-   Invoice Number
-   PO
-   Department (not available for FedEx Ground® Economy)
-   Part Number (not available for FedEx Ground® Economy)
-   Returns Material Authorization (RMA) (not available for FedEx Freight®)
-   TCN (not available for FedEx Freight and FedEx Ground® Economy)
-   BOL (not available for FedEx Ground® Economy)

_Note:_

_-   If you enter a tracking number as part of this request, the tracking number always takes precedence over the Reference element. Therefore, if you enter a tracking number for a shipment that does not include the Reference data you requested, the tracking number is returned with no error message. To limit the number of tracking replies for a specific reference, you can enter a date range for this search.
-   The Shipment Account Number is not required but makes tracking by reference much easier. If Shipment Account Number is not specified, then the Destination Postal Code & Country Code, and the ship date range (Begin date & End date), must be specified._

**Reference with an Account Number**

You can track using reference account number. The minimum information for this request are reference value, account number, Ship date begin and end date. All shipments associated with the account number and reference(s) will be displayed.

**Reference without an Account Number**

You can track using without referencing account number. The minimum information for this request are reference value, destinationPostalCode, destinationCountryCode, Ship date begin and end date. Please enter ship date (+/– 15 days), destination country, and destination postal code. Not all countries support postal codes. Please select destination country first to determine the postal code requirement.

_Note: Only unique matches will be displayed when tracking by reference without an account number. If multiple results are found for the same reference number, you must select a FedEx service before clicking Resubmit all. If a unique match cannot be found, you will be prompted to enter the account number._

**Track Associated Shipments**

FedEx provides you convenient multiple–piece shipment status tracking information. Each shipment in a multiple–piece shipment is linked as associated shipments (track the status of one shipment and have access to information for all associated multiple–piece shipments).

Master Tracking Number: The first tracking number in a multiple–piece shipment that associates all tracking numbers in the shipment.

### Batch Tracking

The Batch Tracking service enables you to send multiple tracking numbers to track the shipments. The batch additional information on batch tracking is required for request and reply elements.

For example, within a request, it is possible to have multiple occurrences of the Request Selection Details element for batch tracking. The maximum number of packages within a single–track transaction is limited to 30.

Each level of Notifications within the new tracking response is as shown below

-   The Reply’s Notifications element provides the Overall Transaction Status
-   The Reply’s Completed Tracking Details>>Notifications element provides Individual Track Request Status
-   The Reply’s Completed Tracking Details>>Tracking Details>>Notification = Specific Tracking Number Status

_Note:_

_-   If there is a failure or error notification at the method level, (Reply>>Notifications) then Ignore the remaining response/payload.
-   If there is a failure or error notification at the individual reply notification level, then Ignore the remaining response/payload._

### International Package Tracking/Tracing

Tracking of international packages is available upon request. You can also track the status of shipments by using a reference number, such as a purchase order (PO) number, customer reference, invoice, Bill of Lading (BOL), part number, or Transportation Control Number (TCN).It uses elements such as carrier code, geographic coordinates, operating company, package identifier, and so on for tracking a package.

You can track international package tracking using the following methods:

-   Track by Tracking Number provides customers Package tracking information based on a tracking number for various shipping services.
-   Track by Tracking Control Number returns tracking information based on a Tracking Control Number. Opcos: FedEx Cargo, Custom Critical, Express, and Ground Shipment.
-   Track by Multiple–Piece Shipment (MPS) Tracking Number allows you to track by the master tracking number or by one of the associated sequential tracking numbers for child packages. To track MPS packages, use the Master Tracking Number and use the PackageIdentifier /Type value of STANDARD\_MPS.
-   Track by References returns tracking information based on alternate references other than Tracking Number such as Customer reference numbers, etc. Either shipper.AccountNumber or Destination.countryCode (and postal for postal aware countries) are required.
-   Track by Document to request any one of the document: Signature Proof of Delivery, Bill of Lading, or Freight Billing Document.
-   Track by Tracking number provides customers Package tracking information based on a tracking number for various shipping services.
-   Track by Door Tag Number allows you to track the status of shipments by a FedEx Door Tag number. A Door Tag is left at the recipient’s shipping address if the recipient is not there to receive the package. This option is available for FedEx Express and FedEx Ground U.S. and Canadian shipments.

_Note:_

-   _Tracking by something other than tracking number requires inclusion of Sender's account number and it must contain secure tracking content._
-   _FedEx Express shipments support intra–Mexico shipping for Signature Proof of Delivery (SPOD)._
-   _FedEx Express and FedEx Ground Signature Proof of Delivery (SPOD) are available for 16 months after the ship date._

To trace your package, you must have all of the following information when you call FedEx Customer Service.

-   Air waybill number
-   Date of shipment
-   Recipient’s name and address
-   Number of packages and total weight of shipment
-   Contents and value of shipment
-   Your name and phone number

### Request Notifications

FedEx provides you convenient email notifications (Plain Text or HTML) that you can use to notify up to 4 email recipients. You can also add a personal message per your preference (not available for non–English characters). Notification types include:

-   **Send me the current status** – Notify the current tracking detailed results.
-   **FedEx has received the package** – Notify when a shipment has been taken into FedEx possession.
-   **A delivery exception has occurred** – Notify when a clearance delay or a delivery exception (unexpected events that could possibly interrupt package movement or delivery) occurs. If a clearance delay occurs and once the international shipment is released from clearance process, another notification will be sent automatically.
-   **Estimated delivery updates** – Send reminder the day before scheduled delivery and on the day of delivery. Also notify when FedEx updates the scheduled delivery date and/or time.
-   **Delivery has been made** – Notify when a shipment has been delivered.

### Business Rules

-   Limit the number of tracking numbers in a single–track request to 30. This will decrease the size of the reply and reduce the transaction response time.
-   Limit the number of times a package/order is tracked to what is necessary for business needs.
-   For batch tracking, remove any packages/orders that have returned a track status of “delivered” from the batch.
-   The most common cause for non–availability of tracking records is incorrect tracking/order number provided as input. It is advised to check with the sender if you are not sure about the tracking/order number. Besides, it takes up to 24 hours for a new package/order to show up in the system.
-   Tracking information is available for 90 days after delivery for FedEx Express, FedEx Ground, and FedEx Custom Critical.
-   Account number or destination postal code or country detail is mandatory to use track by reference.
-   You will get the Estimated Delivery Date (EDD) only after the package is tendered to FedEx.

### JSON API Collection

Explore our JSON API collection to see how we can deliver on your business needs. Test your integration with these sample requests.

[Learn more about sandbox virtualization guide](https://developer.fedex.com/api/en-ca/guides/sandboxvirtualization.html)

[Documentation Powered by ReDoc](https://github.com/Redocly/redoc)

# Basic Integrated Visibility (1.0.0)

## [](#operation/Track Multiple Piece Shipment)Track Multiple Piece Shipment

This endpoint returns tracking information for multiplee piece shipments, Group MPS, or an outbounddd shipment which is linked to a return shipment.  
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

-   Full\_Schema\_Multiple\_Piece\_Shipment
-   Minimum\_Payload\_Track\_Multiple\_Piece\_Shipment

includeDetailedScans

boolean

Indicates if detailed scans are requested or not.  
Valid values are True, or False.

masterTrackingNumberInfo

required

object (MasterTrackingInfo)

The detailed master tracking details for the shipment to be tracked.

associatedType

required

string

Enum: "OUTBOUND\_LINK\_TO\_RETURN" "STANDARD\_MPS" "GROUP\_MPS"

The associated shipment type, such as MPS, Group MPS, or an outbound shipment which is linked to a return shipment.  
Example: STANDARD\_MPS  
STANDARD\_MPS: Single shipment with multiple packages, where tracking number got assigned to all pieces, one tracking number is treated as master tracking number while others are child tracking numbers.  
Group MPS: Behavior is just like standard MPS but it’s created differently. The shipper must be enrolled for this by a particular reference type like ‘PO’ (purchase order).Then any package order create on the same day going to the same place that has the reference number will get grouped into GMPS relationships.  
OUTBOUND\_LINK\_TO\_RETURN: is an RTRN relationship.Same concept as an MPS.the OUTBOUND\_LINK\_TO\_RETURN is the Master outbound package tracking number, that when tracked with this indicator you can get all the child return pieces.

pagingDetails

object (PagingDetails)

The details about how to retrieve the subsequent pages when there is more than one page in the TrackReply.

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

post /track/v1/associatedshipments

Sandbox Server

https://apis-sandbox.fedex.com/track/v1/associatedshipments

Production Server

https://apis.fedex.com/track/v1/associatedshipments

### Request samples - Track Multiple Piece Shipment

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

Full\_Schema\_Multiple\_Piece\_Shipment

Copy

Expand all Collapse all

{

-   "includeDetailedScans": true,
    
-   "associatedType": "STANDARD\_MPS",
    
-   "masterTrackingNumberInfo":
    
    {
    
    -   "shipDateEnd": "2018-11-03",
        
    -   "shipDateBegin": "2018-11-01",
        
    -   "trackingNumberInfo":
        
        {
        
        -   "trackingNumberUniqueId": "245822~123456789012~FDEG",
            
        -   "carrierCode": "FDXE",
            
        -   "trackingNumber": "858488600850"
            
        
        }
        
    
    },
    
-   "pagingDetails":
    
    {
    
    -   "resultsPerPage": 56,
        
    -   "pagingToken": "38903279038"
        
    
    }
    

}

### Response samples - Track Multiple Piece Shipment

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
    
    -   "completeTrackResults":
        
        \[
        
        -   {
            
            -   "trackingNumber": "123456789012",
                
            -   "trackResults":
                
                \[
                
                -   {
                    
                    -   "trackingNumberInfo":
                        
                        {
                        
                        -   "trackingNumber": "128667043726",
                            
                        -   "carrierCode": "FDXE",
                            
                        -   "trackingNumberUniqueId": "245822~123456789012~FDEG"
                            
                        
                        },
                        
                    -   "additionalTrackingInfo":
                        
                        {
                        
                        -   "hasAssociatedShipments": false,
                            
                        -   "nickname": "shipment nickname",
                            
                        -   "packageIdentifiers":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "SHIPPER\_REFERENCE",
                                    
                                -   "value": "ASJFGVAS",
                                    
                                -   "trackingNumberUniqueId": "245822~123456789012~FDEG"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "shipmentNotes": "shipment notes"
                            
                        
                        },
                        
                    -   "distanceToDestination":
                        
                        {
                        
                        -   "units": "KM",
                            
                        -   "value": 685.7
                            
                        
                        },
                        
                    -   "consolidationDetail":
                        
                        \[
                        
                        -   {
                            
                            -   "timeStamp": "2020-10-13T03:54:44-06:00",
                                
                            -   "consolidationID": "47936927",
                                
                            -   "reasonDetail":
                                
                                {
                                
                                -   "description": "Wrong color",
                                    
                                -   "type": "REJECTED"
                                    
                                
                                },
                                
                            -   "packageCount": 25,
                                
                            -   "eventType": "PACKAGE\_ADDED\_TO\_CONSOLIDATION"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "meterNumber": "8468376",
                        
                    -   "returnDetail":
                        
                        {
                        
                        -   "authorizationName": "Sammy Smith",
                            
                        -   "reasonDetail":
                            
                            \[
                            
                            -   {
                                
                                -   "description": "Wrong color",
                                    
                                -   "type": "REJECTED"
                                    
                                
                                }
                                
                            
                            \]
                            
                        
                        },
                        
                    -   "serviceDetail":
                        
                        {
                        
                        -   "description": "FedEx Freight Economy.",
                            
                        -   "shortDescription": "FL",
                            
                        -   "type": "FEDEX\_FREIGHT\_ECONOMY"
                            
                        
                        },
                        
                    -   "destinationLocation":
                        
                        {
                        
                        -   "locationId": "SEA",
                            
                        -   "locationContactAndAddress":
                            
                            {
                            
                            -   "address":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                }
                                
                            
                            },
                            
                        -   "locationType": "FEDEX\_SHIPSITE"
                            
                        
                        },
                        
                    -   "latestStatusDetail":
                        
                        {
                        
                        -   "scanLocation":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            },
                            
                        -   "code": "PU",
                            
                        -   "derivedCode": "PU",
                            
                        -   "ancillaryDetails":
                            
                            \[
                            
                            -   {
                                
                                -   "reason": "15",
                                    
                                -   "reasonDescription": "Customer not available or business closed",
                                    
                                -   "action": "Contact us at <http://www.fedex.com/us/customersupport/call/index.html> to discuss possible delivery or pickup alternatives.",
                                    
                                -   "actionDescription": "Customer not Available or Business Closed"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "statusByLocale": "Picked up",
                            
                        -   "description": "Picked up",
                            
                        -   "delayDetail":
                            
                            {
                            
                            -   "type": "WEATHER",
                                
                            -   "subType": "SNOW",
                                
                            -   "status": "DELAYED"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "serviceCommitMessage":
                        
                        {
                        
                        -   "message": "No scheduled delivery date available at this time.",
                            
                        -   "type": "ESTIMATED\_DELIVERY\_DATE\_UNAVAILABLE"
                            
                        
                        },
                        
                    -   "informationNotes":
                        
                        \[
                        
                        -   {
                            
                            -   "code": "CLEARANCE\_ENTRY\_FEE\_APPLIES",
                                
                            -   "description": "this is an informational message"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "error":
                        
                        {
                        
                        -   "code": "TRACKING.TRACKINGNUMBER.EMPTY",
                            
                        -   "parameterList":
                            
                            \[
                            
                            -   {
                                
                                -   "value": "value",
                                    
                                -   "key": "key"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "message": "Please provide tracking number."
                            
                        
                        },
                        
                    -   "specialHandlings":
                        
                        \[
                        
                        -   {
                            
                            -   "description": "Deliver Weekday",
                                
                            -   "type": "DELIVER\_WEEKDAY",
                                
                            -   "paymentType": "OTHER"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "availableImages":
                        
                        \[
                        
                        -   {
                            
                            -   "size": "LARGE",
                                
                            -   "type": "BILL\_OF\_LADING"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "deliveryDetails":
                        
                        {
                        
                        -   "receivedByName": "Reciever",
                            
                        -   "destinationServiceArea": "EDDUNAVAILABLE",
                            
                        -   "destinationServiceAreaDescription": "Appointment required",
                            
                        -   "locationDescription": "Receptionist/Front Desk",
                            
                        -   "actualDeliveryAddress":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            },
                            
                        -   "deliveryToday": false,
                            
                        -   "locationType": "APARTMENT\_OFFICE",
                            
                        -   "signedByName": "Reciever",
                            
                        -   "officeOrderDeliveryMethod": "Courier",
                            
                        -   "deliveryAttempts": "0",
                            
                        -   "deliveryOptionEligibilityDetails":
                            
                            \[
                            
                            -   {
                                
                                -   "option": "INDIRECT\_SIGNATURE\_RELEASE",
                                    
                                -   "eligibility": "INELIGIBLE"
                                    
                                
                                }
                                
                            
                            \]
                            
                        
                        },
                        
                    -   "scanEvents":
                        
                        \[
                        
                        -   {
                            
                            -   "date": "2018-02-02T12:01:00-07:00",
                                
                            -   "derivedStatus": "Picked Up",
                                
                            -   "scanLocation":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                },
                                
                            -   "locationId": "SEA",
                                
                            -   "locationType": "CUSTOMS\_BROKER",
                                
                            -   "exceptionDescription": "Package available for clearance",
                                
                            -   "eventDescription": "Picked Up",
                                
                            -   "eventType": "PU",
                                
                            -   "derivedStatusCode": "PU",
                                
                            -   "exceptionCode": "A25",
                                
                            -   "delayDetail":
                                
                                {
                                
                                -   "type": "WEATHER",
                                    
                                -   "subType": "SNOW",
                                    
                                -   "status": "DELAYED"
                                    
                                
                                }
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "dateAndTimes":
                        
                        \[
                        
                        -   {
                            
                            -   "dateTime": "2007-09-27T00:00:00",
                                
                            -   "type": "ACTUAL\_DELIVERY"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "packageDetails":
                        
                        {
                        
                        -   "physicalPackagingType": "BARREL",
                            
                        -   "sequenceNumber": "45",
                            
                        -   "undeliveredCount": "7",
                            
                        -   "packagingDescription":
                            
                            {
                            
                            -   "description": "FedEx Pak",
                                
                            -   "type": "FEDEX\_PAK"
                                
                            
                            },
                            
                        -   "count": "1",
                            
                        -   "weightAndDimensions":
                            
                            {
                            
                            -   "weight":
                                
                                \[
                                
                                -   {
                                    
                                    -   "unit": "LB",
                                        
                                    -   "value": "22222.0"
                                        
                                    
                                    }
                                    
                                
                                \],
                                
                            -   "dimensions":
                                
                                \[
                                
                                -   {
                                    
                                    -   "length": 100,
                                        
                                    -   "width": 50,
                                        
                                    -   "height": 30,
                                        
                                    -   "units": "CM"
                                        
                                    
                                    }
                                    
                                
                                \]
                                
                            
                            },
                            
                        -   "packageContent":
                            
                            \[
                            
                            -   "wire hangers",
                                
                            -   "buttons"
                                
                            
                            \],
                            
                        -   "contentPieceCount": "100",
                            
                        -   "declaredValue":
                            
                            {
                            
                            -   "currency": "USD",
                                
                            -   "value": 56.8
                                
                            
                            }
                            
                        
                        },
                        
                    -   "goodsClassificationCode": "goodsClassificationCode",
                        
                    -   "holdAtLocation":
                        
                        {
                        
                        -   "locationId": "SEA",
                            
                        -   "locationContactAndAddress":
                            
                            {
                            
                            -   "address":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                }
                                
                            
                            },
                            
                        -   "locationType": "FEDEX\_SHIPSITE"
                            
                        
                        },
                        
                    -   "customDeliveryOptions":
                        
                        \[
                        
                        -   {
                            
                            -   "requestedAppointmentDetail":
                                
                                {
                                
                                -   "date": "2019-05-07",
                                    
                                -   "window":
                                    
                                    \[
                                    
                                    -   {
                                        
                                        -   "description": "Description field",
                                            
                                        -   "window":
                                            
                                            {
                                            
                                            -   "begins": "2021-10-01T08:00:00",
                                                
                                            -   "ends": "2021-10-15T00:00:00-06:00"
                                                
                                            
                                            },
                                            
                                        -   "type": "ESTIMATED\_DELIVERY"
                                            
                                        
                                        }
                                        
                                    
                                    \]
                                    
                                
                                },
                                
                            -   "description": "Redirect the package to the hold location.",
                                
                            -   "type": "REDIRECT\_TO\_HOLD\_AT\_LOCATION",
                                
                            -   "status": "HELD"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "estimatedDeliveryTimeWindow":
                        
                        {
                        
                        -   "description": "Description field",
                            
                        -   "window":
                            
                            {
                            
                            -   "begins": "2021-10-01T08:00:00",
                                
                            -   "ends": "2021-10-15T00:00:00-06:00"
                                
                            
                            },
                            
                        -   "type": "ESTIMATED\_DELIVERY"
                            
                        
                        },
                        
                    -   "pieceCounts":
                        
                        \[
                        
                        -   {
                            
                            -   "count": "35",
                                
                            -   "description": "picec count description",
                                
                            -   "type": "ORIGIN"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "originLocation":
                        
                        {
                        
                        -   "locationId": "SEA",
                            
                        -   "locationContactAndAddress":
                            
                            {
                            
                            -   "address":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                }
                                
                            
                            }
                            
                        
                        },
                        
                    -   "recipientInformation":
                        
                        {
                        
                        -   "address":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "standardTransitTimeWindow":
                        
                        {
                        
                        -   "description": "Description field",
                            
                        -   "window":
                            
                            {
                            
                            -   "begins": "2021-10-01T08:00:00",
                                
                            -   "ends": "2021-10-15T00:00:00-06:00"
                                
                            
                            },
                            
                        -   "type": "ESTIMATED\_DELIVERY"
                            
                        
                        },
                        
                    -   "shipmentDetails":
                        
                        {
                        
                        -   "contents":
                            
                            \[
                            
                            -   {
                                
                                -   "itemNumber": "RZ5678",
                                    
                                -   "receivedQuantity": "13",
                                    
                                -   "description": "pulyurethane rope",
                                    
                                -   "partNumber": "RK1345"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "beforePossessionStatus": false,
                            
                        -   "weight":
                            
                            \[
                            
                            -   {
                                
                                -   "unit": "LB",
                                    
                                -   "value": "22222.0"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "contentPieceCount": "3333",
                            
                        -   "splitShipments":
                            
                            \[
                            
                            -   {
                                
                                -   "pieceCount": "10",
                                    
                                -   "statusDescription": "status",
                                    
                                -   "timestamp": "2019-05-07T08:00:07",
                                    
                                -   "statusCode": "statuscode"
                                    
                                
                                }
                                
                            
                            \]
                            
                        
                        },
                        
                    -   "reasonDetail":
                        
                        {
                        
                        -   "description": "Wrong color",
                            
                        -   "type": "REJECTED"
                            
                        
                        },
                        
                    -   "availableNotifications":
                        
                        \[
                        
                        -   "ON\_DELIVERY",
                            
                        -   "ON\_EXCEPTION"
                            
                        
                        \],
                        
                    -   "shipperInformation":
                        
                        {
                        
                        -   "address":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "lastUpdatedDestinationAddress":
                        
                        {
                        
                        -   "addressClassification": "BUSINESS",
                            
                        -   "residential": false,
                            
                        -   "streetLines":
                            
                            \[
                            
                            -   "1043 North Easy Street",
                                
                            -   "Suite 999"
                                
                            
                            \],
                            
                        -   "city": "SEATTLE",
                            
                        -   "stateOrProvinceCode": "WA",
                            
                        -   "postalCode": "98101",
                            
                        -   "countryCode": "US",
                            
                        -   "countryName": "United States"
                            
                        
                        }
                        
                    
                    }
                    
                
                \]
                
            
            }
            
        
        \],
        
    -   "alerts": "TRACKING.DATA.NOTFOUND - Tracking data unavailable"
        
    
    }
    

}

## [](#operation/19f112535f47e237486334074740bb66)Send Notification

This endpoint helps you setup up, customize the tracking event notifications to be received for a shipment.  
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

-   Full\_Schema\_Notification
-   Send\_Shipment\_Notifications

senderContactName

required

string

Placeholder for Sender contact name.  
Example: Sam Smith

senderEMailAddress

required

string

Email address of the sender from which the shipment notification will be sent.  
Example: [LSR123@gmail.com](mailto:LSR123@gmail.com)

trackingEventNotificationDetail

required

object (TrackingEventNotificationDetail)

Object for holding tracking event Notification details.

trackingNumberInfo

required

object (TrackingNumberInfo)

Information uniquely identifying a shipment such as Tracking number, ShipDate, and Tracking number uniqueId.

shipDateBegin

string

ShipDateBegin and ShipDateEnd are recommended to narrow the search, reduce lookup time, and avoid duplicates when searching for a specific tracking number in a specific time range.  
Format: YYYY-MM-DD  
example:'2019-10-13'

shipDateEnd

string

ShipDateBegin and ShipDateEnd are recommended to narrow the search, reduce lookup time, and avoid duplicates when searching for a specific tracking number in a specific time range.  
Format: YYYY-MM-DD  
example:'2019-10-13'

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

post /track/v1/notifications

Sandbox Server

https://apis-sandbox.fedex.com/track/v1/notifications

Production Server

https://apis.fedex.com/track/v1/notifications

### Request samples - Send Notification

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

Full\_Schema\_Notification

Copy

Expand all Collapse all

{

-   "senderContactName": "Sam Smith",
    
-   "senderEMailAddress": "Lsr1234@gmail.com",
    
-   "trackingEventNotificationDetail":
    
    {
    
    -   "trackingNotifications":
        
        \[
        
        -   {
            
            -   "notificationDetail":
                
                {
                
                -   "localization":
                    
                    {
                    
                    -   "languageCode": "en",
                        
                    -   "localeCode": "US"
                        
                    
                    },
                    
                -   "emailDetail":
                    
                    {
                    
                    -   "emailAddress": "p1@fedex.com",
                        
                    -   "name": "Preethi"
                        
                    
                    },
                    
                -   "notificationType": "HTML"
                    
                
                },
                
            -   "role": "SHIPPER",
                
            -   "notificationEventTypes":
                
                \[
                
                -   "ON\_DELIVERY",
                    
                -   "ON\_EXCEPTION",
                    
                -   "ON\_ESTIMATED\_DELIVERY"
                    
                
                \],
                
            -   "currentResultRequestedFlag": true
                
            
            }
            
        
        \],
        
    -   "personalMessage": "Personal message content",
        
    -   "supportHTML": null
        
    
    },
    
-   "trackingNumberInfo":
    
    {
    
    -   "trackingNumber": "128667043726",
        
    -   "carrierCode": "FDXE",
        
    -   "trackingNumberUniqueId": "245822~123456789012~FDEG"
        
    
    },
    
-   "shipDateBegin": "2019-10-13",
    
-   "shipDateEnd": "2019-10-31"
    

}

### Response samples - Send Notification

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
    
    -   "TrackingNumberInfo":
        
        {
        
        -   "trackingNumber": "128667043726",
            
        -   "carrierCode": "FDXE",
            
        -   "trackingNumberUniqueId": "245822~123456789012~FDEG"
            
        
        },
        
    -   "destinationAddress":
        
        {
        
        -   "classification": "BUSINESS",
            
        -   "residential": false,
            
        -   "streetLines":
            
            \[
            
            -   "1043 North Easy Street",
                
            -   "Suite 999"
                
            
            \],
            
        -   "city": "SEATTLE",
            
        -   "stateOrProvinceCode": "WA",
            
        -   "postalCode": "98101",
            
        -   "countryCode": "US",
            
        -   "countryName": "United States"
            
        
        },
        
    -   "recipientDetails":
        
        \[
        
        -   \[
            
            -   "\[\\"ON\_ESTIMATED\_DELIVERY\\"\]"
                
            
            \]
            
        
        \],
        
    -   "alerts": "TRACKING.DATA.NOTFOUND - Tracking data unavailable"
        
    
    }
    

}

## [](#operation/Track by References)Track by References

This endpoint returns tracking information based on alternate references other than Tracking Number such as Customer reference numbers, etc.  
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

-   Full\_Schema\_Tracking\_References
-   Track\_by\_References\_using\_accountNumber
-   Track\_by\_References\_using\_destination

referencesInformation

required

object (ReferenceInformation)

Specifies the reference details for the tracked shipment. The following rules apply  
\- Either shipper.AccountNumber or Destination.countryCode(and postal for postal aware countries) are required  
\- If ShipDateRangeBegin and End are not present, shipDateRangeBegin will be set to the current date minus 30 days, and shipDdateRangeEnd will default to current date plus one day.

includeDetailedScans

boolean

Indicates if the detailed scans are being requested or not. If true, the detailed scans will be included in the response returned.  
Valid values are True or False.

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

post /track/v1/referencenumbers

Sandbox Server

https://apis-sandbox.fedex.com/track/v1/referencenumbers

Production Server

https://apis.fedex.com/track/v1/referencenumbers

### Request samples - Track by References

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

Full\_Schema\_Tracking\_References

Copy

Expand all Collapse all

{

-   "referencesInformation":
    
    {
    
    -   "type": "BILL\_OF\_LADING",
        
    -   "value": "56754674567546754",
        
    -   "accountNumber": "XXX61073",
        
    -   "carrierCode": "FDXE",
        
    -   "shipDateBegin": "2019-02-13",
        
    -   "shipDateEnd": "2019-02-13",
        
    -   "destinationCountryCode": "US",
        
    -   "destinationPostalCode": "75063"
        
    
    },
    
-   "includeDetailedScans": "true"
    

}

### Response samples - Track by References

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
    
    -   "cxsErrors":
        
        \[
        
        -   {
            
            -   "code": "TRACKING.TRACKINGNUMBER.EMPTY",
                
            -   "parameterList":
                
                \[
                
                -   {
                    
                    -   "value": "value",
                        
                    -   "key": "key"
                        
                    
                    }
                    
                
                \],
                
            -   "message": "Please provide tracking number."
                
            
            }
            
        
        \],
        
    -   "completeTrackResults":
        
        \[
        
        -   {
            
            -   "trackingNumber": "123456789012",
                
            -   "trackResults":
                
                \[
                
                -   {
                    
                    -   "trackingNumberInfo":
                        
                        {
                        
                        -   "trackingNumber": "128667043726",
                            
                        -   "carrierCode": "FDXE",
                            
                        -   "trackingNumberUniqueId": "245822~123456789012~FDEG"
                            
                        
                        },
                        
                    -   "additionalTrackingInfo":
                        
                        {
                        
                        -   "hasAssociatedShipments": false,
                            
                        -   "nickname": "shipment nickname",
                            
                        -   "packageIdentifiers":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "SHIPPER\_REFERENCE",
                                    
                                -   "value": "ASJFGVAS",
                                    
                                -   "trackingNumberUniqueId": "245822~123456789012~FDEG"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "shipmentNotes": "shipment notes"
                            
                        
                        },
                        
                    -   "distanceToDestination":
                        
                        {
                        
                        -   "units": "KM",
                            
                        -   "value": 685.7
                            
                        
                        },
                        
                    -   "consolidationDetail":
                        
                        \[
                        
                        -   {
                            
                            -   "timeStamp": "2020-10-13T03:54:44-06:00",
                                
                            -   "consolidationID": "47936927",
                                
                            -   "reasonDetail":
                                
                                {
                                
                                -   "description": "Wrong color",
                                    
                                -   "type": "REJECTED"
                                    
                                
                                },
                                
                            -   "packageCount": 25,
                                
                            -   "eventType": "PACKAGE\_ADDED\_TO\_CONSOLIDATION"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "meterNumber": "8468376",
                        
                    -   "returnDetail":
                        
                        {
                        
                        -   "authorizationName": "Sammy Smith",
                            
                        -   "reasonDetail":
                            
                            \[
                            
                            -   {
                                
                                -   "description": "Wrong color",
                                    
                                -   "type": "REJECTED"
                                    
                                
                                }
                                
                            
                            \]
                            
                        
                        },
                        
                    -   "serviceDetail":
                        
                        {
                        
                        -   "description": "FedEx Freight Economy.",
                            
                        -   "shortDescription": "FL",
                            
                        -   "type": "FEDEX\_FREIGHT\_ECONOMY"
                            
                        
                        },
                        
                    -   "destinationLocation":
                        
                        {
                        
                        -   "locationId": "SEA",
                            
                        -   "locationContactAndAddress":
                            
                            {
                            
                            -   "address":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                }
                                
                            
                            },
                            
                        -   "locationType": "FEDEX\_SHIPSITE"
                            
                        
                        },
                        
                    -   "latestStatusDetail":
                        
                        {
                        
                        -   "scanLocation":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            },
                            
                        -   "code": "PU",
                            
                        -   "derivedCode": "PU",
                            
                        -   "ancillaryDetails":
                            
                            \[
                            
                            -   {
                                
                                -   "reason": "15",
                                    
                                -   "reasonDescription": "Customer not available or business closed",
                                    
                                -   "action": "Contact us at <http://www.fedex.com/us/customersupport/call/index.html> to discuss possible delivery or pickup alternatives.",
                                    
                                -   "actionDescription": "Customer not Available or Business Closed"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "statusByLocale": "Picked up",
                            
                        -   "description": "Picked up",
                            
                        -   "delayDetail":
                            
                            {
                            
                            -   "type": "WEATHER",
                                
                            -   "subType": "SNOW",
                                
                            -   "status": "DELAYED"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "serviceCommitMessage":
                        
                        {
                        
                        -   "message": "No scheduled delivery date available at this time.",
                            
                        -   "type": "ESTIMATED\_DELIVERY\_DATE\_UNAVAILABLE"
                            
                        
                        },
                        
                    -   "informationNotes":
                        
                        \[
                        
                        -   {
                            
                            -   "code": "CLEARANCE\_ENTRY\_FEE\_APPLIES",
                                
                            -   "description": "this is an informational message"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "error":
                        
                        {
                        
                        -   "code": "TRACKING.TRACKINGNUMBER.EMPTY",
                            
                        -   "parameterList":
                            
                            \[
                            
                            -   {
                                
                                -   "value": "value",
                                    
                                -   "key": "key"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "message": "Please provide tracking number."
                            
                        
                        },
                        
                    -   "specialHandlings":
                        
                        \[
                        
                        -   {
                            
                            -   "description": "Deliver Weekday",
                                
                            -   "type": "DELIVER\_WEEKDAY",
                                
                            -   "paymentType": "OTHER"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "availableImages":
                        
                        \[
                        
                        -   {
                            
                            -   "size": "LARGE",
                                
                            -   "type": "BILL\_OF\_LADING"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "deliveryDetails":
                        
                        {
                        
                        -   "receivedByName": "Reciever",
                            
                        -   "destinationServiceArea": "EDDUNAVAILABLE",
                            
                        -   "destinationServiceAreaDescription": "Appointment required",
                            
                        -   "locationDescription": "Receptionist/Front Desk",
                            
                        -   "actualDeliveryAddress":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            },
                            
                        -   "deliveryToday": false,
                            
                        -   "locationType": "APARTMENT\_OFFICE",
                            
                        -   "signedByName": "Reciever",
                            
                        -   "officeOrderDeliveryMethod": "Courier",
                            
                        -   "deliveryAttempts": "0",
                            
                        -   "deliveryOptionEligibilityDetails":
                            
                            \[
                            
                            -   {
                                
                                -   "option": "INDIRECT\_SIGNATURE\_RELEASE",
                                    
                                -   "eligibility": "INELIGIBLE"
                                    
                                
                                }
                                
                            
                            \]
                            
                        
                        },
                        
                    -   "scanEvents":
                        
                        \[
                        
                        -   {
                            
                            -   "date": "2018-02-02T12:01:00-07:00",
                                
                            -   "derivedStatus": "Picked Up",
                                
                            -   "scanLocation":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                },
                                
                            -   "locationId": "SEA",
                                
                            -   "locationType": "CUSTOMS\_BROKER",
                                
                            -   "exceptionDescription": "Package available for clearance",
                                
                            -   "eventDescription": "Picked Up",
                                
                            -   "eventType": "PU",
                                
                            -   "derivedStatusCode": "PU",
                                
                            -   "exceptionCode": "A25",
                                
                            -   "delayDetail":
                                
                                {
                                
                                -   "type": "WEATHER",
                                    
                                -   "subType": "SNOW",
                                    
                                -   "status": "DELAYED"
                                    
                                
                                }
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "dateAndTimes":
                        
                        \[
                        
                        -   {
                            
                            -   "dateTime": "2007-09-27T00:00:00",
                                
                            -   "type": "ACTUAL\_DELIVERY"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "packageDetails":
                        
                        {
                        
                        -   "physicalPackagingType": "BARREL",
                            
                        -   "sequenceNumber": "45",
                            
                        -   "undeliveredCount": "7",
                            
                        -   "packagingDescription":
                            
                            {
                            
                            -   "description": "FedEx Pak",
                                
                            -   "type": "FEDEX\_PAK"
                                
                            
                            },
                            
                        -   "count": "1",
                            
                        -   "weightAndDimensions":
                            
                            {
                            
                            -   "weight":
                                
                                \[
                                
                                -   {
                                    
                                    -   "unit": "LB",
                                        
                                    -   "value": "22222.0"
                                        
                                    
                                    }
                                    
                                
                                \],
                                
                            -   "dimensions":
                                
                                \[
                                
                                -   {
                                    
                                    -   "length": 100,
                                        
                                    -   "width": 50,
                                        
                                    -   "height": 30,
                                        
                                    -   "units": "CM"
                                        
                                    
                                    }
                                    
                                
                                \]
                                
                            
                            },
                            
                        -   "packageContent":
                            
                            \[
                            
                            -   "wire hangers",
                                
                            -   "buttons"
                                
                            
                            \],
                            
                        -   "contentPieceCount": "100",
                            
                        -   "declaredValue":
                            
                            {
                            
                            -   "currency": "USD",
                                
                            -   "value": 56.8
                                
                            
                            }
                            
                        
                        },
                        
                    -   "goodsClassificationCode": "goodsClassificationCode",
                        
                    -   "holdAtLocation":
                        
                        {
                        
                        -   "locationId": "SEA",
                            
                        -   "locationContactAndAddress":
                            
                            {
                            
                            -   "address":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                }
                                
                            
                            },
                            
                        -   "locationType": "FEDEX\_SHIPSITE"
                            
                        
                        },
                        
                    -   "customDeliveryOptions":
                        
                        \[
                        
                        -   {
                            
                            -   "requestedAppointmentDetail":
                                
                                {
                                
                                -   "date": "2019-05-07",
                                    
                                -   "window":
                                    
                                    \[
                                    
                                    -   {
                                        
                                        -   "description": "Description field",
                                            
                                        -   "window":
                                            
                                            {
                                            
                                            -   "begins": "2021-10-01T08:00:00",
                                                
                                            -   "ends": "2021-10-15T00:00:00-06:00"
                                                
                                            
                                            },
                                            
                                        -   "type": "ESTIMATED\_DELIVERY"
                                            
                                        
                                        }
                                        
                                    
                                    \]
                                    
                                
                                },
                                
                            -   "description": "Redirect the package to the hold location.",
                                
                            -   "type": "REDIRECT\_TO\_HOLD\_AT\_LOCATION",
                                
                            -   "status": "HELD"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "estimatedDeliveryTimeWindow":
                        
                        {
                        
                        -   "description": "Description field",
                            
                        -   "window":
                            
                            {
                            
                            -   "begins": "2021-10-01T08:00:00",
                                
                            -   "ends": "2021-10-15T00:00:00-06:00"
                                
                            
                            },
                            
                        -   "type": "ESTIMATED\_DELIVERY"
                            
                        
                        },
                        
                    -   "pieceCounts":
                        
                        \[
                        
                        -   {
                            
                            -   "count": "35",
                                
                            -   "description": "picec count description",
                                
                            -   "type": "ORIGIN"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "originLocation":
                        
                        {
                        
                        -   "locationId": "SEA",
                            
                        -   "locationContactAndAddress":
                            
                            {
                            
                            -   "address":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                }
                                
                            
                            }
                            
                        
                        },
                        
                    -   "recipientInformation":
                        
                        {
                        
                        -   "address":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "standardTransitTimeWindow":
                        
                        {
                        
                        -   "description": "Description field",
                            
                        -   "window":
                            
                            {
                            
                            -   "begins": "2021-10-01T08:00:00",
                                
                            -   "ends": "2021-10-15T00:00:00-06:00"
                                
                            
                            },
                            
                        -   "type": "ESTIMATED\_DELIVERY"
                            
                        
                        },
                        
                    -   "shipmentDetails":
                        
                        {
                        
                        -   "contents":
                            
                            \[
                            
                            -   {
                                
                                -   "itemNumber": "RZ5678",
                                    
                                -   "receivedQuantity": "13",
                                    
                                -   "description": "pulyurethane rope",
                                    
                                -   "partNumber": "RK1345"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "beforePossessionStatus": false,
                            
                        -   "weight":
                            
                            \[
                            
                            -   {
                                
                                -   "unit": "LB",
                                    
                                -   "value": "22222.0"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "contentPieceCount": "3333",
                            
                        -   "splitShipments":
                            
                            \[
                            
                            -   {
                                
                                -   "pieceCount": "10",
                                    
                                -   "statusDescription": "status",
                                    
                                -   "timestamp": "2019-05-07T08:00:07",
                                    
                                -   "statusCode": "statuscode"
                                    
                                
                                }
                                
                            
                            \]
                            
                        
                        },
                        
                    -   "reasonDetail":
                        
                        {
                        
                        -   "description": "Wrong color",
                            
                        -   "type": "REJECTED"
                            
                        
                        },
                        
                    -   "availableNotifications":
                        
                        \[
                        
                        -   "ON\_DELIVERY",
                            
                        -   "ON\_EXCEPTION"
                            
                        
                        \],
                        
                    -   "shipperInformation":
                        
                        {
                        
                        -   "address":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "lastUpdatedDestinationAddress":
                        
                        {
                        
                        -   "addressClassification": "BUSINESS",
                            
                        -   "residential": false,
                            
                        -   "streetLines":
                            
                            \[
                            
                            -   "1043 North Easy Street",
                                
                            -   "Suite 999"
                                
                            
                            \],
                            
                        -   "city": "SEATTLE",
                            
                        -   "stateOrProvinceCode": "WA",
                            
                        -   "postalCode": "98101",
                            
                        -   "countryCode": "US",
                            
                        -   "countryName": "United States"
                            
                        
                        }
                        
                    
                    }
                    
                
                \]
                
            
            }
            
        
        \],
        
    -   "alerts": "TRACKING.DATA.NOTFOUND - Tracking data unavailable",
        
    -   "successful": true
        
    
    }
    

}

## [](#operation/f1f9080e8452d9ac903f562a2d2626d0)Track by Tracking Control Number

Use this endpoint to return tracking information based on a Tracking Control Number.  
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

-   Full\_Schema\_TCN
-   Minimum\_Payload\_Track\_By\_Tracking\_Control\_Number

tcnInfo

required

object

The information associated with the transportation control number.  
Only 1 TCN is supported per request.

includeDetailedScans

boolean

Indicates if detailed scans are requested or not.  
Valid values are True, or False.

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

post /track/v1/tcn

Sandbox Server

https://apis-sandbox.fedex.com/track/v1/tcn

Production Server

https://apis.fedex.com/track/v1/tcn

### Request samples - Track by Tracking Control Number

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

Full\_Schema\_TCN

Copy

Expand all Collapse all

{

-   "tcnInfo":
    
    {
    
    -   "value": "N552428361Y555XXX",
        
    -   "carrierCode": "FDXE",
        
    -   "shipDateBegin": "2019-02-13",
        
    -   "shipDateEnd": "2019-02-13"
        
    
    },
    
-   "includeDetailedScans": true
    

}

### Response samples - Track by Tracking Control Number

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
    
    -   "completeTrackResults":
        
        \[
        
        -   {
            
            -   "trackingNumber": "123456789012",
                
            -   "trackResults":
                
                \[
                
                -   {
                    
                    -   "trackingNumberInfo":
                        
                        {
                        
                        -   "trackingNumber": "128667043726",
                            
                        -   "carrierCode": "FDXE",
                            
                        -   "trackingNumberUniqueId": "245822~123456789012~FDEG"
                            
                        
                        },
                        
                    -   "additionalTrackingInfo":
                        
                        {
                        
                        -   "hasAssociatedShipments": false,
                            
                        -   "nickname": "shipment nickname",
                            
                        -   "packageIdentifiers":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "SHIPPER\_REFERENCE",
                                    
                                -   "value": "ASJFGVAS",
                                    
                                -   "trackingNumberUniqueId": "245822~123456789012~FDEG"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "shipmentNotes": "shipment notes"
                            
                        
                        },
                        
                    -   "distanceToDestination":
                        
                        {
                        
                        -   "units": "KM",
                            
                        -   "value": 685.7
                            
                        
                        },
                        
                    -   "consolidationDetail":
                        
                        \[
                        
                        -   {
                            
                            -   "timeStamp": "2020-10-13T03:54:44-06:00",
                                
                            -   "consolidationID": "47936927",
                                
                            -   "reasonDetail":
                                
                                {
                                
                                -   "description": "Wrong color",
                                    
                                -   "type": "REJECTED"
                                    
                                
                                },
                                
                            -   "packageCount": 25,
                                
                            -   "eventType": "PACKAGE\_ADDED\_TO\_CONSOLIDATION"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "meterNumber": "8468376",
                        
                    -   "returnDetail":
                        
                        {
                        
                        -   "authorizationName": "Sammy Smith",
                            
                        -   "reasonDetail":
                            
                            \[
                            
                            -   {
                                
                                -   "description": "Wrong color",
                                    
                                -   "type": "REJECTED"
                                    
                                
                                }
                                
                            
                            \]
                            
                        
                        },
                        
                    -   "serviceDetail":
                        
                        {
                        
                        -   "description": "FedEx Freight Economy.",
                            
                        -   "shortDescription": "FL",
                            
                        -   "type": "FEDEX\_FREIGHT\_ECONOMY"
                            
                        
                        },
                        
                    -   "destinationLocation":
                        
                        {
                        
                        -   "locationId": "SEA",
                            
                        -   "locationContactAndAddress":
                            
                            {
                            
                            -   "address":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                }
                                
                            
                            },
                            
                        -   "locationType": "FEDEX\_SHIPSITE"
                            
                        
                        },
                        
                    -   "latestStatusDetail":
                        
                        {
                        
                        -   "scanLocation":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            },
                            
                        -   "code": "PU",
                            
                        -   "derivedCode": "PU",
                            
                        -   "ancillaryDetails":
                            
                            \[
                            
                            -   {
                                
                                -   "reason": "15",
                                    
                                -   "reasonDescription": "Customer not available or business closed",
                                    
                                -   "action": "Contact us at <http://www.fedex.com/us/customersupport/call/index.html> to discuss possible delivery or pickup alternatives.",
                                    
                                -   "actionDescription": "Customer not Available or Business Closed"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "statusByLocale": "Picked up",
                            
                        -   "description": "Picked up",
                            
                        -   "delayDetail":
                            
                            {
                            
                            -   "type": "WEATHER",
                                
                            -   "subType": "SNOW",
                                
                            -   "status": "DELAYED"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "serviceCommitMessage":
                        
                        {
                        
                        -   "message": "No scheduled delivery date available at this time.",
                            
                        -   "type": "ESTIMATED\_DELIVERY\_DATE\_UNAVAILABLE"
                            
                        
                        },
                        
                    -   "informationNotes":
                        
                        \[
                        
                        -   {
                            
                            -   "code": "CLEARANCE\_ENTRY\_FEE\_APPLIES",
                                
                            -   "description": "this is an informational message"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "error":
                        
                        {
                        
                        -   "code": "TRACKING.TRACKINGNUMBER.EMPTY",
                            
                        -   "parameterList":
                            
                            \[
                            
                            -   {
                                
                                -   "value": "value",
                                    
                                -   "key": "key"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "message": "Please provide tracking number."
                            
                        
                        },
                        
                    -   "specialHandlings":
                        
                        \[
                        
                        -   {
                            
                            -   "description": "Deliver Weekday",
                                
                            -   "type": "DELIVER\_WEEKDAY",
                                
                            -   "paymentType": "OTHER"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "availableImages":
                        
                        \[
                        
                        -   {
                            
                            -   "size": "LARGE",
                                
                            -   "type": "BILL\_OF\_LADING"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "deliveryDetails":
                        
                        {
                        
                        -   "receivedByName": "Reciever",
                            
                        -   "destinationServiceArea": "EDDUNAVAILABLE",
                            
                        -   "destinationServiceAreaDescription": "Appointment required",
                            
                        -   "locationDescription": "Receptionist/Front Desk",
                            
                        -   "actualDeliveryAddress":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            },
                            
                        -   "deliveryToday": false,
                            
                        -   "locationType": "APARTMENT\_OFFICE",
                            
                        -   "signedByName": "Reciever",
                            
                        -   "officeOrderDeliveryMethod": "Courier",
                            
                        -   "deliveryAttempts": "0",
                            
                        -   "deliveryOptionEligibilityDetails":
                            
                            \[
                            
                            -   {
                                
                                -   "option": "INDIRECT\_SIGNATURE\_RELEASE",
                                    
                                -   "eligibility": "INELIGIBLE"
                                    
                                
                                }
                                
                            
                            \]
                            
                        
                        },
                        
                    -   "scanEvents":
                        
                        \[
                        
                        -   {
                            
                            -   "date": "2018-02-02T12:01:00-07:00",
                                
                            -   "derivedStatus": "Picked Up",
                                
                            -   "scanLocation":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                },
                                
                            -   "locationId": "SEA",
                                
                            -   "locationType": "CUSTOMS\_BROKER",
                                
                            -   "exceptionDescription": "Package available for clearance",
                                
                            -   "eventDescription": "Picked Up",
                                
                            -   "eventType": "PU",
                                
                            -   "derivedStatusCode": "PU",
                                
                            -   "exceptionCode": "A25",
                                
                            -   "delayDetail":
                                
                                {
                                
                                -   "type": "WEATHER",
                                    
                                -   "subType": "SNOW",
                                    
                                -   "status": "DELAYED"
                                    
                                
                                }
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "dateAndTimes":
                        
                        \[
                        
                        -   {
                            
                            -   "dateTime": "2007-09-27T00:00:00",
                                
                            -   "type": "ACTUAL\_DELIVERY"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "packageDetails":
                        
                        {
                        
                        -   "physicalPackagingType": "BARREL",
                            
                        -   "sequenceNumber": "45",
                            
                        -   "undeliveredCount": "7",
                            
                        -   "packagingDescription":
                            
                            {
                            
                            -   "description": "FedEx Pak",
                                
                            -   "type": "FEDEX\_PAK"
                                
                            
                            },
                            
                        -   "count": "1",
                            
                        -   "weightAndDimensions":
                            
                            {
                            
                            -   "weight":
                                
                                \[
                                
                                -   {
                                    
                                    -   "unit": "LB",
                                        
                                    -   "value": "22222.0"
                                        
                                    
                                    }
                                    
                                
                                \],
                                
                            -   "dimensions":
                                
                                \[
                                
                                -   {
                                    
                                    -   "length": 100,
                                        
                                    -   "width": 50,
                                        
                                    -   "height": 30,
                                        
                                    -   "units": "CM"
                                        
                                    
                                    }
                                    
                                
                                \]
                                
                            
                            },
                            
                        -   "packageContent":
                            
                            \[
                            
                            -   "wire hangers",
                                
                            -   "buttons"
                                
                            
                            \],
                            
                        -   "contentPieceCount": "100",
                            
                        -   "declaredValue":
                            
                            {
                            
                            -   "currency": "USD",
                                
                            -   "value": 56.8
                                
                            
                            }
                            
                        
                        },
                        
                    -   "goodsClassificationCode": "goodsClassificationCode",
                        
                    -   "holdAtLocation":
                        
                        {
                        
                        -   "locationId": "SEA",
                            
                        -   "locationContactAndAddress":
                            
                            {
                            
                            -   "address":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                }
                                
                            
                            },
                            
                        -   "locationType": "FEDEX\_SHIPSITE"
                            
                        
                        },
                        
                    -   "customDeliveryOptions":
                        
                        \[
                        
                        -   {
                            
                            -   "requestedAppointmentDetail":
                                
                                {
                                
                                -   "date": "2019-05-07",
                                    
                                -   "window":
                                    
                                    \[
                                    
                                    -   {
                                        
                                        -   "description": "Description field",
                                            
                                        -   "window":
                                            
                                            {
                                            
                                            -   "begins": "2021-10-01T08:00:00",
                                                
                                            -   "ends": "2021-10-15T00:00:00-06:00"
                                                
                                            
                                            },
                                            
                                        -   "type": "ESTIMATED\_DELIVERY"
                                            
                                        
                                        }
                                        
                                    
                                    \]
                                    
                                
                                },
                                
                            -   "description": "Redirect the package to the hold location.",
                                
                            -   "type": "REDIRECT\_TO\_HOLD\_AT\_LOCATION",
                                
                            -   "status": "HELD"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "estimatedDeliveryTimeWindow":
                        
                        {
                        
                        -   "description": "Description field",
                            
                        -   "window":
                            
                            {
                            
                            -   "begins": "2021-10-01T08:00:00",
                                
                            -   "ends": "2021-10-15T00:00:00-06:00"
                                
                            
                            },
                            
                        -   "type": "ESTIMATED\_DELIVERY"
                            
                        
                        },
                        
                    -   "pieceCounts":
                        
                        \[
                        
                        -   {
                            
                            -   "count": "35",
                                
                            -   "description": "picec count description",
                                
                            -   "type": "ORIGIN"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "originLocation":
                        
                        {
                        
                        -   "locationId": "SEA",
                            
                        -   "locationContactAndAddress":
                            
                            {
                            
                            -   "address":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                }
                                
                            
                            }
                            
                        
                        },
                        
                    -   "recipientInformation":
                        
                        {
                        
                        -   "address":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "standardTransitTimeWindow":
                        
                        {
                        
                        -   "description": "Description field",
                            
                        -   "window":
                            
                            {
                            
                            -   "begins": "2021-10-01T08:00:00",
                                
                            -   "ends": "2021-10-15T00:00:00-06:00"
                                
                            
                            },
                            
                        -   "type": "ESTIMATED\_DELIVERY"
                            
                        
                        },
                        
                    -   "shipmentDetails":
                        
                        {
                        
                        -   "contents":
                            
                            \[
                            
                            -   {
                                
                                -   "itemNumber": "RZ5678",
                                    
                                -   "receivedQuantity": "13",
                                    
                                -   "description": "pulyurethane rope",
                                    
                                -   "partNumber": "RK1345"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "beforePossessionStatus": false,
                            
                        -   "weight":
                            
                            \[
                            
                            -   {
                                
                                -   "unit": "LB",
                                    
                                -   "value": "22222.0"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "contentPieceCount": "3333",
                            
                        -   "splitShipments":
                            
                            \[
                            
                            -   {
                                
                                -   "pieceCount": "10",
                                    
                                -   "statusDescription": "status",
                                    
                                -   "timestamp": "2019-05-07T08:00:07",
                                    
                                -   "statusCode": "statuscode"
                                    
                                
                                }
                                
                            
                            \]
                            
                        
                        },
                        
                    -   "reasonDetail":
                        
                        {
                        
                        -   "description": "Wrong color",
                            
                        -   "type": "REJECTED"
                            
                        
                        },
                        
                    -   "availableNotifications":
                        
                        \[
                        
                        -   "ON\_DELIVERY",
                            
                        -   "ON\_EXCEPTION"
                            
                        
                        \],
                        
                    -   "shipperInformation":
                        
                        {
                        
                        -   "address":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "lastUpdatedDestinationAddress":
                        
                        {
                        
                        -   "addressClassification": "BUSINESS",
                            
                        -   "residential": false,
                            
                        -   "streetLines":
                            
                            \[
                            
                            -   "1043 North Easy Street",
                                
                            -   "Suite 999"
                                
                            
                            \],
                            
                        -   "city": "SEATTLE",
                            
                        -   "stateOrProvinceCode": "WA",
                            
                        -   "postalCode": "98101",
                            
                        -   "countryCode": "US",
                            
                        -   "countryName": "United States"
                            
                        
                        }
                        
                    
                    }
                    
                
                \]
                
            
            }
            
        
        \],
        
    -   "alerts": "TRACKING.DATA.NOTFOUND - Tracking data unavailable"
        
    
    }
    

}

## [](#operation/TrackingDocuments)Track Document

This endpoint helps you to request a letter that includes the recipient's signature as a proof of delivery.  
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

-   Full\_Schema\_SPOD
-   Minimum\_Payload\_Track\_Document
-   Minimum\_Sample\_Payload\_BOL
-   Minimum\_Sample\_Payload\_FBD

trackDocumentDetail

required

object

This object specifies the tracking document details such as types of documents, for example, SIGNATURE\_PROOF\_OF\_DELIVERY and also the format of tracking document. Supported values are PDF and PNG. Default is PDF.

trackDocumentSpecification

required

Array of objects (TrackDocumentSpecification)

This is the placeholder for document specification details required to identify the shipment being tracked. This includes tracking information such as tracking qualifier, carrier code, and tracking number.  
At least one trackDocumentSpecification is required. Maximum limit is 30.

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

post /track/v1/trackingdocuments

Sandbox Server

https://apis-sandbox.fedex.com/track/v1/trackingdocuments

Production Server

https://apis.fedex.com/track/v1/trackingdocuments

### Request samples - Track Document

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

Full\_Schema\_SPOD

Copy

Expand all Collapse all

{

-   "trackDocumentDetail":
    
    {
    
    -   "documentType": "SIGNATURE\_PROOF\_OF\_DELIVERY",
        
    -   "documentFormat": "PNG"
        
    
    },
    
-   "trackDocumentSpecification":
    
    \[
    
    -   {
        
        -   "trackingNumberInfo":
            
            {
            
            -   "trackingNumber": "128667043726",
                
            -   "carrierCode": "FDXE",
                
            -   "trackingNumberUniqueId": "245822~123456789012~FDEG"
                
            
            },
            
        -   "shipDateBegin": "2020-03-29",
            
        -   "shipDateEnd": "2020-04-01",
            
        -   "accountNumber": "XXX61073"
            
        
        }
        
    
    \]
    

}

### Response samples - Track Document

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
    
    -   "localization":
        
        {
        
        -   "languageCode": "en",
            
        -   "localeCode": "US"
            
        
        },
        
    -   "documentType": "string",
        
    -   "documentFormat": "PNG",
        
    -   "document":
        
        \[
        
        -   "string"
            
        
        \],
        
    -   "alerts": "TRACKING.DATA.NOTFOUND - Tracking data unavailable"
        
    
    }
    

}

## [](#operation/Track by Tracking Number)Track by Tracking Number

This endpoint provides customers package tracking information based on a tracking number for various shipping services.  
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

-   Full\_Schema\_Tracking\_Numbers
-   Track\_by\_Tracking\_Number

includeDetailedScans

required

boolean

Indicates if detailed scans are requested or not.  
Valid values are True, or False.

trackingInfo

required

Array of objects (TrackingInfo)

The tracking information of the shipment to be tracked. At least one occurrence of TrackingInfo is required. Maximum limit is 30.

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

post /track/v1/trackingnumbers

Sandbox Server

https://apis-sandbox.fedex.com/track/v1/trackingnumbers

Production Server

https://apis.fedex.com/track/v1/trackingnumbers

### Request samples - Track by Tracking Number

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

Full\_Schema\_Tracking\_Numbers

Copy

Expand all Collapse all

{

-   "includeDetailedScans": true,
    
-   "trackingInfo":
    
    \[
    
    -   {
        
        -   "shipDateBegin": "2020-03-29",
            
        -   "shipDateEnd": "2020-04-01",
            
        -   "trackingNumberInfo":
            
            {
            
            -   "trackingNumber": "128667043726",
                
            -   "carrierCode": "FDXE",
                
            -   "trackingNumberUniqueId": "245822~123456789012~FDEG"
                
            
            }
            
        
        }
        
    
    \]
    

}

### Response samples - Track by Tracking Number

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
    
    -   "completeTrackResults":
        
        \[
        
        -   {
            
            -   "trackingNumber": "123456789012",
                
            -   "trackResults":
                
                \[
                
                -   {
                    
                    -   "trackingNumberInfo":
                        
                        {
                        
                        -   "trackingNumber": "128667043726",
                            
                        -   "carrierCode": "FDXE",
                            
                        -   "trackingNumberUniqueId": "245822~123456789012~FDEG"
                            
                        
                        },
                        
                    -   "additionalTrackingInfo":
                        
                        {
                        
                        -   "hasAssociatedShipments": false,
                            
                        -   "nickname": "shipment nickname",
                            
                        -   "packageIdentifiers":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "SHIPPER\_REFERENCE",
                                    
                                -   "value": "ASJFGVAS",
                                    
                                -   "trackingNumberUniqueId": "245822~123456789012~FDEG"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "shipmentNotes": "shipment notes"
                            
                        
                        },
                        
                    -   "distanceToDestination":
                        
                        {
                        
                        -   "units": "KM",
                            
                        -   "value": 685.7
                            
                        
                        },
                        
                    -   "consolidationDetail":
                        
                        \[
                        
                        -   {
                            
                            -   "timeStamp": "2020-10-13T03:54:44-06:00",
                                
                            -   "consolidationID": "47936927",
                                
                            -   "reasonDetail":
                                
                                {
                                
                                -   "description": "Wrong color",
                                    
                                -   "type": "REJECTED"
                                    
                                
                                },
                                
                            -   "packageCount": 25,
                                
                            -   "eventType": "PACKAGE\_ADDED\_TO\_CONSOLIDATION"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "meterNumber": "8468376",
                        
                    -   "returnDetail":
                        
                        {
                        
                        -   "authorizationName": "Sammy Smith",
                            
                        -   "reasonDetail":
                            
                            \[
                            
                            -   {
                                
                                -   "description": "Wrong color",
                                    
                                -   "type": "REJECTED"
                                    
                                
                                }
                                
                            
                            \]
                            
                        
                        },
                        
                    -   "serviceDetail":
                        
                        {
                        
                        -   "description": "FedEx Freight Economy.",
                            
                        -   "shortDescription": "FL",
                            
                        -   "type": "FEDEX\_FREIGHT\_ECONOMY"
                            
                        
                        },
                        
                    -   "destinationLocation":
                        
                        {
                        
                        -   "locationId": "SEA",
                            
                        -   "locationContactAndAddress":
                            
                            {
                            
                            -   "address":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                }
                                
                            
                            },
                            
                        -   "locationType": "FEDEX\_SHIPSITE"
                            
                        
                        },
                        
                    -   "latestStatusDetail":
                        
                        {
                        
                        -   "scanLocation":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            },
                            
                        -   "code": "PU",
                            
                        -   "derivedCode": "PU",
                            
                        -   "ancillaryDetails":
                            
                            \[
                            
                            -   {
                                
                                -   "reason": "15",
                                    
                                -   "reasonDescription": "Customer not available or business closed",
                                    
                                -   "action": "Contact us at <http://www.fedex.com/us/customersupport/call/index.html> to discuss possible delivery or pickup alternatives.",
                                    
                                -   "actionDescription": "Customer not Available or Business Closed"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "statusByLocale": "Picked up",
                            
                        -   "description": "Picked up",
                            
                        -   "delayDetail":
                            
                            {
                            
                            -   "type": "WEATHER",
                                
                            -   "subType": "SNOW",
                                
                            -   "status": "DELAYED"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "serviceCommitMessage":
                        
                        {
                        
                        -   "message": "No scheduled delivery date available at this time.",
                            
                        -   "type": "ESTIMATED\_DELIVERY\_DATE\_UNAVAILABLE"
                            
                        
                        },
                        
                    -   "informationNotes":
                        
                        \[
                        
                        -   {
                            
                            -   "code": "CLEARANCE\_ENTRY\_FEE\_APPLIES",
                                
                            -   "description": "this is an informational message"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "error":
                        
                        {
                        
                        -   "code": "TRACKING.TRACKINGNUMBER.EMPTY",
                            
                        -   "parameterList":
                            
                            \[
                            
                            -   {
                                
                                -   "value": "value",
                                    
                                -   "key": "key"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "message": "Please provide tracking number."
                            
                        
                        },
                        
                    -   "specialHandlings":
                        
                        \[
                        
                        -   {
                            
                            -   "description": "Deliver Weekday",
                                
                            -   "type": "DELIVER\_WEEKDAY",
                                
                            -   "paymentType": "OTHER"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "availableImages":
                        
                        \[
                        
                        -   {
                            
                            -   "size": "LARGE",
                                
                            -   "type": "BILL\_OF\_LADING"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "deliveryDetails":
                        
                        {
                        
                        -   "receivedByName": "Reciever",
                            
                        -   "destinationServiceArea": "EDDUNAVAILABLE",
                            
                        -   "destinationServiceAreaDescription": "Appointment required",
                            
                        -   "locationDescription": "Receptionist/Front Desk",
                            
                        -   "actualDeliveryAddress":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            },
                            
                        -   "deliveryToday": false,
                            
                        -   "locationType": "APARTMENT\_OFFICE",
                            
                        -   "signedByName": "Reciever",
                            
                        -   "officeOrderDeliveryMethod": "Courier",
                            
                        -   "deliveryAttempts": "0",
                            
                        -   "deliveryOptionEligibilityDetails":
                            
                            \[
                            
                            -   {
                                
                                -   "option": "INDIRECT\_SIGNATURE\_RELEASE",
                                    
                                -   "eligibility": "INELIGIBLE"
                                    
                                
                                }
                                
                            
                            \]
                            
                        
                        },
                        
                    -   "scanEvents":
                        
                        \[
                        
                        -   {
                            
                            -   "date": "2018-02-02T12:01:00-07:00",
                                
                            -   "derivedStatus": "Picked Up",
                                
                            -   "scanLocation":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                },
                                
                            -   "locationId": "SEA",
                                
                            -   "locationType": "CUSTOMS\_BROKER",
                                
                            -   "exceptionDescription": "Package available for clearance",
                                
                            -   "eventDescription": "Picked Up",
                                
                            -   "eventType": "PU",
                                
                            -   "derivedStatusCode": "PU",
                                
                            -   "exceptionCode": "A25",
                                
                            -   "delayDetail":
                                
                                {
                                
                                -   "type": "WEATHER",
                                    
                                -   "subType": "SNOW",
                                    
                                -   "status": "DELAYED"
                                    
                                
                                }
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "dateAndTimes":
                        
                        \[
                        
                        -   {
                            
                            -   "dateTime": "2007-09-27T00:00:00",
                                
                            -   "type": "ACTUAL\_DELIVERY"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "packageDetails":
                        
                        {
                        
                        -   "physicalPackagingType": "BARREL",
                            
                        -   "sequenceNumber": "45",
                            
                        -   "undeliveredCount": "7",
                            
                        -   "packagingDescription":
                            
                            {
                            
                            -   "description": "FedEx Pak",
                                
                            -   "type": "FEDEX\_PAK"
                                
                            
                            },
                            
                        -   "count": "1",
                            
                        -   "weightAndDimensions":
                            
                            {
                            
                            -   "weight":
                                
                                \[
                                
                                -   {
                                    
                                    -   "unit": "LB",
                                        
                                    -   "value": "22222.0"
                                        
                                    
                                    }
                                    
                                
                                \],
                                
                            -   "dimensions":
                                
                                \[
                                
                                -   {
                                    
                                    -   "length": 100,
                                        
                                    -   "width": 50,
                                        
                                    -   "height": 30,
                                        
                                    -   "units": "CM"
                                        
                                    
                                    }
                                    
                                
                                \]
                                
                            
                            },
                            
                        -   "packageContent":
                            
                            \[
                            
                            -   "wire hangers",
                                
                            -   "buttons"
                                
                            
                            \],
                            
                        -   "contentPieceCount": "100",
                            
                        -   "declaredValue":
                            
                            {
                            
                            -   "currency": "USD",
                                
                            -   "value": 56.8
                                
                            
                            }
                            
                        
                        },
                        
                    -   "goodsClassificationCode": "goodsClassificationCode",
                        
                    -   "holdAtLocation":
                        
                        {
                        
                        -   "locationId": "SEA",
                            
                        -   "locationContactAndAddress":
                            
                            {
                            
                            -   "address":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                }
                                
                            
                            },
                            
                        -   "locationType": "FEDEX\_SHIPSITE"
                            
                        
                        },
                        
                    -   "customDeliveryOptions":
                        
                        \[
                        
                        -   {
                            
                            -   "requestedAppointmentDetail":
                                
                                {
                                
                                -   "date": "2019-05-07",
                                    
                                -   "window":
                                    
                                    \[
                                    
                                    -   {
                                        
                                        -   "description": "Description field",
                                            
                                        -   "window":
                                            
                                            {
                                            
                                            -   "begins": "2021-10-01T08:00:00",
                                                
                                            -   "ends": "2021-10-15T00:00:00-06:00"
                                                
                                            
                                            },
                                            
                                        -   "type": "ESTIMATED\_DELIVERY"
                                            
                                        
                                        }
                                        
                                    
                                    \]
                                    
                                
                                },
                                
                            -   "description": "Redirect the package to the hold location.",
                                
                            -   "type": "REDIRECT\_TO\_HOLD\_AT\_LOCATION",
                                
                            -   "status": "HELD"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "estimatedDeliveryTimeWindow":
                        
                        {
                        
                        -   "description": "Description field",
                            
                        -   "window":
                            
                            {
                            
                            -   "begins": "2021-10-01T08:00:00",
                                
                            -   "ends": "2021-10-15T00:00:00-06:00"
                                
                            
                            },
                            
                        -   "type": "ESTIMATED\_DELIVERY"
                            
                        
                        },
                        
                    -   "pieceCounts":
                        
                        \[
                        
                        -   {
                            
                            -   "count": "35",
                                
                            -   "description": "picec count description",
                                
                            -   "type": "ORIGIN"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "originLocation":
                        
                        {
                        
                        -   "locationId": "SEA",
                            
                        -   "locationContactAndAddress":
                            
                            {
                            
                            -   "address":
                                
                                {
                                
                                -   "addressClassification": "BUSINESS",
                                    
                                -   "residential": false,
                                    
                                -   "streetLines":
                                    
                                    \[
                                    
                                    -   "1043 North Easy Street",
                                        
                                    -   "Suite 999"
                                        
                                    
                                    \],
                                    
                                -   "city": "SEATTLE",
                                    
                                -   "stateOrProvinceCode": "WA",
                                    
                                -   "postalCode": "98101",
                                    
                                -   "countryCode": "US",
                                    
                                -   "countryName": "United States"
                                    
                                
                                }
                                
                            
                            }
                            
                        
                        },
                        
                    -   "recipientInformation":
                        
                        {
                        
                        -   "address":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "standardTransitTimeWindow":
                        
                        {
                        
                        -   "description": "Description field",
                            
                        -   "window":
                            
                            {
                            
                            -   "begins": "2021-10-01T08:00:00",
                                
                            -   "ends": "2021-10-15T00:00:00-06:00"
                                
                            
                            },
                            
                        -   "type": "ESTIMATED\_DELIVERY"
                            
                        
                        },
                        
                    -   "shipmentDetails":
                        
                        {
                        
                        -   "contents":
                            
                            \[
                            
                            -   {
                                
                                -   "itemNumber": "RZ5678",
                                    
                                -   "receivedQuantity": "13",
                                    
                                -   "description": "pulyurethane rope",
                                    
                                -   "partNumber": "RK1345"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "beforePossessionStatus": false,
                            
                        -   "weight":
                            
                            \[
                            
                            -   {
                                
                                -   "unit": "LB",
                                    
                                -   "value": "22222.0"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "contentPieceCount": "3333",
                            
                        -   "splitShipments":
                            
                            \[
                            
                            -   {
                                
                                -   "pieceCount": "10",
                                    
                                -   "statusDescription": "status",
                                    
                                -   "timestamp": "2019-05-07T08:00:07",
                                    
                                -   "statusCode": "statuscode"
                                    
                                
                                }
                                
                            
                            \]
                            
                        
                        },
                        
                    -   "reasonDetail":
                        
                        {
                        
                        -   "description": "Wrong color",
                            
                        -   "type": "REJECTED"
                            
                        
                        },
                        
                    -   "availableNotifications":
                        
                        \[
                        
                        -   "ON\_DELIVERY",
                            
                        -   "ON\_EXCEPTION"
                            
                        
                        \],
                        
                    -   "shipperInformation":
                        
                        {
                        
                        -   "address":
                            
                            {
                            
                            -   "addressClassification": "BUSINESS",
                                
                            -   "residential": false,
                                
                            -   "streetLines":
                                
                                \[
                                
                                -   "1043 North Easy Street",
                                    
                                -   "Suite 999"
                                    
                                
                                \],
                                
                            -   "city": "SEATTLE",
                                
                            -   "stateOrProvinceCode": "WA",
                                
                            -   "postalCode": "98101",
                                
                            -   "countryCode": "US",
                                
                            -   "countryName": "United States"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "lastUpdatedDestinationAddress":
                        
                        {
                        
                        -   "addressClassification": "BUSINESS",
                            
                        -   "residential": false,
                            
                        -   "streetLines":
                            
                            \[
                            
                            -   "1043 North Easy Street",
                                
                            -   "Suite 999"
                                
                            
                            \],
                            
                        -   "city": "SEATTLE",
                            
                        -   "stateOrProvinceCode": "WA",
                            
                        -   "postalCode": "98101",
                            
                        -   "countryCode": "US",
                            
                        -   "countryName": "United States"
                            
                        
                        }
                        
                    
                    }
                    
                
                \]
                
            
            }
            
        
        \],
        
    -   "alerts": "TRACKING.DATA.NOTFOUND - Tracking data unavailable"
        
    
    }
    

}

## Error Codes

-   CUSTOMER.REVOKE.REQUIRED
    
    Customer has been revoked to view invited shipments.
    
-   CUSTOMER.SIZE.INVALID
    
    Extraordinary sized customer.
    
-   CUSTOMER.USAGE.LOCKED
    
    Customer is locked out.
    
-   REFERENCETRACKING.SHIPDATERANGE.INVALID
    
    Please provide a valid ship date range as a part of search criteria when entering account number.
    
-   TRACKING.ACCOUNTNUMBER.EMPTY
    
    If not providing FedEx account number, please enter destination country/territory and postal code.
    
-   TRACKING.CUSTOMCRITICAL.ERROR
    
    For tracking information, please log in to customcritical.fedex.com or contact Customer Service at 1.866.274.6117.
    
-   TRACKING.DATA.NOTUNIQUE
    
    A unique match was not found. Please resubmit your request with a FedEx service or enter your FedEx account number.
    
-   TRACKING.DESTINATIONCOUNTRYCODE.INVALID
    
    Please provide a valid destination country/territory code.
    
-   TRACKING.MULTISTOP.ERROR
    
    For tracking information, please log in to customcritical.fedex.com or contact Customer Service at 1.866.274.6117.
    
-   TRACKING.POSTALCODE.INVALID
    
    Please provide a valid postal code.
    
-   TRACKING.REFERENCEDATA.INCOMPLETE
    
    Please enter an account number or destination country/territory and postal code.
    
-   TRACKING.REFERENCENUMBER.NOTFOUND
    
    Reference number cannot be found. Please correct the reference number and try again.
    
-   TRACKING.REFERENCETYPE.INVALID
    
    Please provide a valid reference/associated type.
    
-   TRACKING.REFERENCEVALUE.EMPTY
    
    Missing or invalid shipment. Please enter a valid shipment number.
    
-   TRACKING.REFRENCEVALUE.INVALID
    
    Invalid reference number. Please correct the request and try again.
    
-   TRACKING.SHIPDATE.ENDDATEBEFOREBEGINDATE
    
    Invalid ship date range. End date should not be before begin date.
    
-   TRACKING.SHIPDATEBEGIN.INVALID
    
    Please provide valid ship begin date.
    
-   TRACKING.SHIPDATEBEGIN.TOOOLD
    
    We are unable to provide tracking information. Begin date is too far in the past.
    
-   TRACKING.SHIPDATEEND.FUTURE
    
    Invalid ship date range. End date must not be in the future.
    
-   TRACKING.SHIPDATEEND.INVALID
    
    Please provide valid ship end date.
    
-   TRACKING.SHIPDATERANGE.ERROR
    
    Invalid date range. Please check for following conditions: 1. End date is before Begin date. 2. Begin date is beyond 2 years. 3. Begin to End date exceeds 30 days.
    
-   TRACKING.SHIPDATERANGE.INVALID
    
    Invalid ship date range. Please provide valid ship begin and end date.
    
-   TRACKING.SHIPDATERANGE.TOOLONG
    
    Ship date range is too long. Please reduce the range and try again.
    
-   TRACKING.TCN.NOTFOUND
    
    Transportation control number cannot be found. Please correct the transportation control number and try again.
    
-   TRACKING.TCNVALUE.EMPTY
    
    Please provide a valid Transportation Control Number.
    
-   TRACKING.TRACKINGNUMBER.EMPTY
    
    Please provide tracking number.
    
-   TRACKING.TRACKINGNUMBER.INVALID
    
    Invalid tracking number. Please correct the tracking number format and try again.
    
-   TRACKING.TRACKINGNUMBER.NOTFOUND
    
    Tracking number cannot be found. Please correct the tracking number and try again.
    
-   TRACKING.TRACKINGNUMBERS.LIMITEXCEEDED
    
    Please limit your inquiry to 30 tracking numbers or references.
    
-   USER.RELOGIN.REQUIRED
    
    We are unable to process this shipment for the moment. Try again later or contact FedEx Customer Service.
    
-   INTERNAL.SERVER.ERROR
    
    We encountered an unexpected error and are working to resolve the issue. We apologize for any inconvenience. Please check back at a later time.
    
-   TRACKING.MULTIPIECE.ERROR
    
    We are unable to provide notifications because either the package is too old or there is more than one package with the provided tracking number.
    
-   NOTIFICATION.TRACKINGNBR.NOTFOUND
    
    Tracking number cannot be found. Please update and try again.
    
-   TRACKING.EMAILADDRESS.INVALID
    
    One or more of the Email addresses you entered is invalid. Please update and try again.
    
-   TRACKING.LOCALE.INVALID
    
    Requested localization is invalid or not supported. Please update and try again.
    
-   TRACKING.SENDERCONTACTNAME.INVALID
    
    Sender contact name is missing or invalid. Please update and try again.
    
-   TRACKING.SENDEREMAILADDRESS.INVALID
    
    Sender email address is missing or invalid. Please update and try again.
    
-   TRACKINGDOCUMENT.DOCUMENT.UNAVAILABLE
    
    Signature Proof of Delivery is not currently available for this Tracking Number. Availability of signature images may take up to 5 days after delivery date. Please try later.
    

    

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