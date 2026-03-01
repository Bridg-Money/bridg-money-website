const InitiatePayout = () => {
  const payoutBody = [
    {
      name: "beneficiaryId",
      type: "string",
      required: true,
      description:
        "Beneficiary unique identifier (UUID). Beneficiary must exist, be active, and belong to the authenticated business.",
      example: "123e4567-e89b-12d3-a456-426614174001",
    },
    {
      name: "amount",
      type: "string",
      required: true,
      description:
        'Payout amount as a string with exact decimal format (e.g., "1000.00"). Must match configured decimal precision and business limits.',
      example: "1000.00",
    },
    {
      name: "transactionType",
      type: "string",
      required: true,
      description:
        "Transaction mode. Allowed values: I (IMPS), N (NEFT), R (RTGS), S (SELF). Must match business configuration.",
      example: "N",
    },
  ];

  const payoutResponses = [
    {
      status: 200,
      description: "Payout processed successfully or currently in progress",
      clr: "text-green-500",
      body: {
        success: true,
        message: "Payout initiated and is being processed",
        data: {
          payoutTransactionId: "e4df91c1-4180-43d7-8de4-6e0a20a86db9",
          amount: "1000.00",
          status: "InProgress",
          commissionAmount: "10.00",
          commissionGSTAmount: "1.80",
        },
      },
    },
    {
      status: 500,
      description: "Payout failed",
      clr: "text-red-400",
      body: {
        success: true,
        message: "Payout failed",
        data: {
          payoutTransactionId: "e4df91c1-4180-43d7-8de4-6e0a20a86db9",
          amount: "1000.00",
          status: "Failed",
          commissionAmount: "10.00",
          commissionGSTAmount: "1.80",
        },
      },
    },
    {
      status: 400,
      description:
        "Validation error, insufficient balance, limit exceeded, or configuration issue",
      clr: "text-red-400",
      body: {
        success: false,
        message: "Failed to initiate payout",
      },
    },
    {
      status: 401,
      description: "Unauthorized",
      clr: "text-red-400",
      body: {
        success: false,
        message: "Unauthorized",
      },
    },
  ];

  return (
    <>
      <p className="mb-3">
        Initiates a payout transfer to a vendor. Wallet balance is validated and
        debited during processing.
        <br />
        <br />
        <strong>Processing Flow:</strong>
        <br />
        • Step 1: Payout record created in database
        <br />
        • Step 2: Wallet validation and debit
        <br />
        • Step 3: Webhook triggered (if configured)
        <br />
        • Step 4: Bank transfer initiated
        <br />
        • Step 5: Final status persisted
        <br />
        <br />
        ⚠️ Final payout status should be verified using the Get Payout API.
      </p>

      <div className="flex gap-2 border rounded-lg p-2 justify-between mb-10">
        <div>
          <span className="bg-blue-100 py-1 p-2 rounded-md text-blue-600 text-[12px]">
            POST
          </span>
          <span> /v1/payouts </span>
        </div>
      </div>

      {/* BODY */}
      <div>
        <div className="flex border-b pb-2 mb-3 justify-between">
          <p className="font-semibold">Body</p>
          <span>application/json</span>
        </div>

        {payoutBody.map((field, idx) => (
          <div
            key={field.name}
            className={`${
              idx !== payoutBody.length - 1 ? "border-b" : ""
            } pb-5 mb-4`}
          >
            <div className="flex gap-3 items-center mb-3">
              <span className="text-green-500">{field.name}</span>
              <span className="text-gray-700 rounded-sm px-3 py-0.5 bg-gray-50">
                {field.type}
              </span>
              {field.required && (
                <span className="text-red-600 rounded-sm px-3 py-0.5 bg-red-50">
                  required
                </span>
              )}
            </div>
            <p className="text-gray-600">{field.description}</p>
            <p className="text-gray-400">sample - {field.example}</p>
          </div>
        ))}
      </div>

      {/* RESPONSE */}
      <div className="pb-3">
        <div className="flex border-b pb-2 mb-3 justify-between">
          <p className="font-semibold">Response</p>
          <span>application/json</span>
        </div>

        {payoutResponses.map((resp) => (
          <div
            key={resp.status}
            className="border rounded-md p-4 mb-4 bg-gray-50"
          >
            <div className="flex gap-3 items-center mb-2">
              <span className={`font-bold ${resp.clr}`}>{resp.status}</span>
              <span>{resp.description}</span>
            </div>
            <pre className="bg-gray-100 p-3 rounded text-sm">
              {JSON.stringify(resp.body, null, 2)}
            </pre>
          </div>
        ))}
      </div>

      {/* TRANSACTION TYPES */}
      <div className="mt-6">
        <div className="flex border-b pb-2 mb-3">
          <p className="font-semibold">Transaction Types</p>
        </div>
        <ul className="text-gray-600 list-disc pl-5 space-y-1">
          <li>
            <strong>I</strong> – IMPS
          </li>
          <li>
            <strong>N</strong> – NEFT
          </li>
          <li>
            <strong>R</strong> – RTGS
          </li>
          <li>
            <strong>S</strong> – SELF
          </li>
        </ul>
      </div>
    </>
  );
};

const GetPayoutTransaction = () => {
  const pathParams = [
    {
      name: "payoutTransactionId",
      type: "string",
      required: true,
      description: "Unique payout transaction identifier (UUID).",
      example: "5f8f75b4-8bc6-4c08-b90c-f90a34df2ec9",
    },
  ];

  const responses = [
    {
      status: 200,
      description: "Payout details retrieved successfully",
      clr: "text-green-500",
      body: {
        success: true,
        data: [
          {
            payoutTransactionId: "5f8f75b4-8bc6-4c08-b90c-f90a34df2ec9",
            businessId: "123e4567-e89b-12d3-a456-426614174000",
            merchantId: "123e4567-e89b-12d3-a456-426614174999",
            vendorId: "123e4567-e89b-12d3-a456-426614174001",
            vendorCode: "VEND001",
            name: "Ravi Traders",
            ifsc: "HDFC0001234",
            accountNumber: "123456789012",
            transactionType: "N",
            transactionTypeName: "NEFT",
            amount: "1000.00",
            commissionAmount: "10.00",
            commissionGSTAmount: "1.80",
            status: "Successful",
            responseCode: "100",
            responseMessage: "Transfer completed",
            transactionReference: "BANKREF12345",
            createdDate: "2025-01-10T10:30:00Z",
            updatedDate: "2025-01-10T10:31:00Z",
          },
        ],
      },
    },
    {
      status: 404,
      description: "Payout not found",
      clr: "text-red-400",
      body: {
        success: false,
        message: "Data does not exist",
      },
    },
    {
      status: 400,
      description: "Server error",
      clr: "text-red-400",
      body: {
        success: false,
        message: "Server error",
      },
    },
  ];

  return (
    <>
      <p className="mb-3">
        Fetches complete payout transaction details including vendor
        information, transaction reference, commission details, and current
        payout status.
      </p>

      <div className="flex gap-2 border rounded-lg p-2 justify-between mb-10">
        <div>
          <span className="bg-green-100 py-1 p-2 rounded-md text-green-600 text-[12px]">
            GET
          </span>
          <span> /v1/payouts/:payoutTransactionId </span>
        </div>
      </div>

      {/* PATH PARAMS */}
      <div>
        <div className="flex border-b pb-2 mb-3 justify-between">
          <p className="font-semibold">Path Parameters</p>
        </div>

        {pathParams.map((field, idx) => (
          <div
            key={field.name}
            className={`${
              idx !== pathParams.length - 1 ? "border-b" : ""
            } pb-5 mb-4`}
          >
            <div className="flex gap-3 items-center mb-3">
              <span className="text-green-500">{field.name}</span>
              <span className="text-gray-700 rounded-sm px-3 py-0.5 bg-gray-50">
                {field.type}
              </span>
              <span className="text-red-600 rounded-sm px-3 py-0.5 bg-red-50">
                required
              </span>
            </div>
            <p className="text-gray-600">{field.description}</p>
            <p className="text-gray-400">sample - {field.example}</p>
          </div>
        ))}
      </div>

      {/* RESPONSE */}
      <div className="pb-3">
        <div className="flex border-b pb-2 mb-3 justify-between">
          <p className="font-semibold">Response</p>
          <span>application/json</span>
        </div>

        {responses.map((resp) => (
          <div
            key={resp.status}
            className="border rounded-md p-4 mb-4 bg-gray-50"
          >
            <div className="flex gap-3 items-center mb-2">
              <span className={`font-bold ${resp.clr}`}>{resp.status}</span>
              <span>{resp.description}</span>
            </div>
            <pre className="bg-gray-100 p-3 rounded text-sm">
              {JSON.stringify(resp.body, null, 2)}
            </pre>
          </div>
        ))}
      </div>

      {/* NOTE */}
      <div className="mt-6 text-sm text-gray-600">
        ⚠️ Note:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Response returns an array containing the payout record.</li>
          <li>
            If no record is found, API may return an empty array unless 404 mode
            is explicitly enabled.
          </li>
        </ul>
      </div>
    </>
  );
};

export { InitiatePayout, GetPayoutTransaction };
