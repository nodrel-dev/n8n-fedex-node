# Keep the node declarative; produce the shipping label as binary via a postReceive function

The Create Shipment operation must turn FedEx's base64 `encodedLabel` (nested at
`output.transactionShipments[].pieceResponses[].packageDocuments[].encodedLabel`) into n8n binary
data, while Track, Get Rates, and Validate Address map cleanly to JSON. An n8n node is wholly
declarative or wholly programmatic, so the choice was: keep declarative routing and transform the
label in a `postReceive` hook, or drop the whole node to a programmatic `execute()`.

We keep the node **declarative**. The Shipment → Create operation's routing uses a **custom
`postReceive` function** that reads `encodedLabel`, base64-decodes it, calls
`helpers.prepareBinaryData(buffer, filename, mimeType)`, and attaches the result to the item's
`binary` while passing the JSON (tracking number, rates) through on the main output. The MIME type
follows the chosen image type (PDF→`application/pdf`, PNG→`image/png`, ZPLII/EPL2→
`application/octet-stream`).

## Why this is allowed under "declarative-first" (constitution III)

Only Create gets a transform, and only because base64→binary cannot be expressed in plain routing.
Track / Get Rates / Validate stay pure declarative routing. Going fully programmatic would force us
to re-implement request plumbing for the three operations that don't need it.

## Verification

Confirmed against the installed `n8n-workflow` types: `PostReceiveAction` includes the function
form `(this: IExecuteSingleFunctions, items, response) => Promise<INodeExecutionData[]>`, and
`IExecuteSingleFunctions.helpers` extends `BinaryHelperFunctions` with
`prepareBinaryData(Buffer | Readable, filePath?, mimeType?): Promise<IBinaryData>`. The built-in
`{ type: 'binaryData', properties: { destinationProperty } }` action was rejected because it treats
the whole response body as binary, whereas our label is base64 embedded inside a JSON envelope.
