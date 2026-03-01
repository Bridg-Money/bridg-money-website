const AddBeneficiary = () => {
  const createBeneficiaryBody = [
    {
      name: "name",
      type: "string",
      required: true,
      description:
        "Beneficiary name. Max 100 characters; letters, numbers, spaces, and common special characters allowed.",
      example: "Ravi Traders Pvt Ltd",
    },
    {
      name: "email",
      type: "string",
      required: false,
      description: "Valid email address (optional).",
      example: "ravi@merchant.com",
    },
    {
      name: "phoneNumber",
      type: "string",
      required: true,
      description: "Beneficiary mobile number (valid Indian mobile number).",
      example: "9876543210",
    },
    {
      name: "accountNumber",
      type: "string",
      required: true,
      description:
        "Bank account number (9–18 digits). Must be unique for active beneficiaries under the same business.",
      example: "0002053000010425",
    },
    {
      name: "ifsc",
      type: "string",
      required: true,
      description: "Bank IFSC (11 characters. Format: AAAA0XXXXXX).",
      example: "UTIB0000123",
    },
  ];

  const createBeneficiaryResponses = [
    {
      status: 201,
      description: "Beneficiary created successfully",
      clr: "text-green-500",
      body: {
        success: true,
        message: "Beneficiary created successfully",
        data: {
          beneficiaryId: "123e4567-e89b-12d3-a456-426614174000",
          beneficiaryCode: "BEN000123",
        },
      },
    },
    {
      status: 400,
      clr: "text-red-400",
      description: "Duplicate active beneficiary or invalid data",
      body: {
        success: false,
        message: "Duplicate active beneficiary account",
      },
    },
    {
      status: 401,
      clr: "text-red-400",
      description: "Unauthorized",
      body: {
        success: false,
        message: "Unauthorized",
      },
    },
    {
      status: 500,
      clr: "text-red-400",
      description: "Internal server error",
      body: {
        success: false,
        message: "Something went wrong",
      },
    },
  ];

  return (
    <>
      <p className="mb-3">
        Use this API to add a beneficiary to your Bridg.Money account by
        providing the beneficiary’s name, phone number, and bank account
        details. Only active beneficiaries can receive payouts.
      </p>

      <div className="flex gap-2 border rounded-lg p-2 justify-between mb-10">
        <div>
          <span className="bg-blue-100 py-1 p-2 rounded-md text-blue-600 text-[12px]">
            POST
          </span>
          <span> /v1/beneficiaries </span>
        </div>
      </div>

      <div>
        <div className="flex border-b pb-2 mb-3 justify-between">
          <p className="font-semibold">Body</p>
          <span>application/json</span>
        </div>

        {createBeneficiaryBody.map((field, idx) => (
          <div
            key={field.name}
            className={`${
              idx !== createBeneficiaryBody.length - 1 ? "border-b" : ""
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
            {field.example && (
              <p className="text-gray-400">sample - {field.example}</p>
            )}
          </div>
        ))}
      </div>

      <div className="pb-3">
        <div className="flex border-b pb-2 mb-3 justify-between">
          <p className="font-semibold">Response</p>
          <span>application/json</span>
        </div>

        {createBeneficiaryResponses.map((resp) => (
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
    </>
  );
};

const DeleteBeneficiary = () => {
  const deleteBeneficiaryParams = [
    {
      name: "beneficiaryId",
      type: "string",
      required: true,
      description: "Unique ID of the beneficiary to deactivate",
      example: "123e4567-e89b-12d3-a456-426614174000",
    },
  ];

  const deleteResponses = [
    {
      status: 200,
      description: "Beneficiary deleted successfully",
      clr: "text-green-500",
      body: {
        success: true,
        message: "Beneficiary deleted successfully",
        data: {
          beneficiaryId: "123e4567-e89b-12d3-a456-426614174000",
          status: 0,
        },
      },
    },
    {
      status: 404,
      clr: "text-red-400",
      description: "Beneficiary not found",
      body: {
        success: false,
        message: "Beneficiary not found",
      },
    },
    {
      status: 500,
      clr: "text-red-400",
      description: "Internal server error",
      body: {
        success: false,
        message: "Internal server error",
      },
    },
  ];

  return (
    <>
      <p className="mb-3">
        This operation performs a soft delete by setting the beneficiary status
        to Inactive (0). Inactive beneficiaries cannot receive payouts, but
        historical payout records remain preserved.
      </p>

      <div className="flex gap-2 border rounded-lg p-2 justify-between mb-10">
        <div>
          <span className="bg-red-100 py-1 p-2 rounded-md text-red-500 text-[12px]">
            DELETE
          </span>
          <span> /v1/beneficiaries/:beneficiaryId </span>
        </div>
      </div>

      <div>
        <div className="flex border-b pb-2 mb-3 justify-between">
          <p className="font-semibold">Path Parameters</p>
        </div>

        {deleteBeneficiaryParams.map((field) => (
          <div key={field.name} className="pb-5 mb-4">
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

      <div>
        <div className="flex border-b pb-2 mb-3 justify-between">
          <p className="font-semibold">Response</p>
          <span>application/json</span>
        </div>

        {deleteResponses.map((resp) => (
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
    </>
  );
};

export { AddBeneficiary, DeleteBeneficiary };
