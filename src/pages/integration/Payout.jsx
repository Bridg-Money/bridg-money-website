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
      description: "Payout accepted and currently in progress",
      clr: "text-green-500",
      body: {
        status: 200,
        data: {
          payoutTransactionId: "ca4bac52-2800-11f1-8a8e-0a0c26167b3f",
          transactionId: "BMPT2026032500001",
          amount: 100,
          status: 4,
          commissionAmount: 0.75,
          commissionGSTAmount: 0.14,
        },
        message: "Payout initiated and is being processed",
        meta: null,
      },
    },
    {
      status: 500,
      description: "Payout failed at bank",
      clr: "text-red-400",
      body: {
        status: 500,
        data: {
          payoutTransactionId: "ca4bac52-2800-11f1-8a8e-0a0c26167b3f",
          transactionId: "BMPT2026032500001",
          amount: 100,
          status: 12,
          commissionAmount: 0.75,
          commissionGSTAmount: 0.14,
        },
        message: "Payout failed",
        meta: null,
      },
    },
    {
      status: 400,
      description:
        "Validation error, insufficient balance, limit exceeded, or configuration issue",
      clr: "text-red-400",
      body: {
        status: 400,
        data: null,
        message: "Failed to initiate payout",
        meta: null,
      },
    },
    {
      status: 401,
      description: "Missing headers, expired timestamp, or invalid signature",
      clr: "text-red-400",
      body: {
        status: 401,
        data: null,
        message: "Missing API authentication headers",
        meta: null,
      },
    },
  ];

  return (
    <>
      <p className="mb-3">
        Initiates a payout transfer to a beneficiary. Wallet balance is
        validated and debited during processing.
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
        ⚠️ The 200 response confirms the payout was accepted for processing
        (status <code>4</code> — InProgress). Final status must be verified
        using the Get Payout API.
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

      {/* STATUS CODES */}
      <div className="mt-6">
        <div className="flex border-b pb-2 mb-3">
          <p className="font-semibold">Payout Status Codes</p>
        </div>
        <table className="w-full text-sm text-gray-600 border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-6 font-semibold text-gray-700">
                Code
              </th>
              <th className="text-left py-2 font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { code: 2, label: "Initiated" },
              { code: 4, label: "InProgress" },
              { code: 3, label: "Pending" },
              { code: 11, label: "Successful" },
              { code: 12, label: "Failed" },
            ].map((s) => (
              <tr key={s.code} className="border-b last:border-0">
                <td className="py-2 pr-6 font-mono">{s.code}</td>
                <td className="py-2">{s.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
      example: "ca4bac52-2800-11f1-8a8e-0a0c26167b3f",
    },
  ];

  const responses = [
    {
      status: 200,
      description: "Payout details retrieved successfully",
      clr: "text-green-500",
      body: {
        status: 200,
        data: [
          {
            payoutTransactionId: "ca4bac52-2800-11f1-8a8e-0a0c26167b3f",
            transactionId: "BMPT2026032500001",
            businessId: "123e4567-e89b-12d3-a456-426614174000",
            merchantId: "123e4567-e89b-12d3-a456-426614174999",
            vendorId: "123e4567-e89b-12d3-a456-426614174001",
            vendorCode: "VEND001",
            name: "Ravi Traders",
            ifsc: "HDFC0001234",
            accountNumber: "123456789012",
            transactionType: "N",
            transactionTypeName: "NEFT",
            amount: 1000,
            commissionAmount: 0.75,
            commissionGSTAmount: 0.14,
            status: 11,
            responseCode: "100",
            responseMessage: "Transfer completed",
            transactionReference: "BANKREF12345",
            createdDate: "2026-03-25T10:30:00Z",
            updatedDate: "2026-03-25T10:31:00Z",
          },
        ],
        message: null,
        meta: null,
      },
    },
    {
      status: 404,
      description: "Payout not found",
      clr: "text-red-400",
      body: {
        status: 404,
        data: null,
        message: "Data does not exist",
        meta: null,
      },
    },
    {
      status: 400,
      description: "Server error",
      clr: "text-red-400",
      body: {
        status: 400,
        data: null,
        message: "Server error",
        meta: null,
      },
    },
    {
      status: 401,
      description: "Missing headers, expired timestamp, or invalid signature",
      clr: "text-red-400",
      body: {
        status: 401,
        data: null,
        message: "Missing API authentication headers",
        meta: null,
      },
    },
  ];

  return (
    <>
      <p className="mb-3">
        Fetches complete payout transaction details including beneficiary
        information, bank reference, commission breakdown, and current payout
        status.
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
            The <code>status</code> field is a numeric code. See the status code
            table in the Initiate Payout section for reference.
          </li>
          <li>
            If no record is found, the API may return an empty array unless 404
            mode is explicitly enabled.
          </li>
        </ul>
      </div>
    </>
  );
};

export { InitiatePayout, GetPayoutTransaction };
