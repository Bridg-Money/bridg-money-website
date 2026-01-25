import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

const CodeBlock = ({ fileName, code }) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!codeRef.current) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <>
      <div className="relative bg-gray-50 rounded-xl p-4 font-mono text-sm">
        <div
          className={`flex items-center ${fileName ? "justify-between border-b pb-3" : "justify-end"} mb-4`}
        >
          <span className="text-xs text-gray-400">{fileName}</span>

          <button
            onClick={handleCopy}
            className="text-xs text-gray-500 hover:text-black bg-gray-100 px-2 py-1 rounded-md cursor-pointer"
          >
            {copied ? "Copied" : "Copy code "}
          </button>
        </div>

        <pre className="overflow-x-auto">
          <code ref={codeRef}>{code}</code>
        </pre>
      </div>
    </>
  );
};

const AddVendor = () => {
  const createVendorBody = [
    {
      name: "name",
      type: "string",
      required: true,
      description:
        "Vendor name. Max 100 characters; alphabets, numbers, spaces, and special characters allowed.",
      example: "Ravi Traders",
    },
    {
      name: "email",
      type: "string",
      required: true,
      description: "Vendor email in valid format (e.g., ravi@merchant.com).",
      example: "ravi@merchant.com",
    },
    {
      name: "phoneNumber",
      type: "string",
      required: true,
      description:
        "Vendor phone number (only digits, 8–12 characters after removing +91).",
      example: "9876543210",
    },
    {
      name: "accountNumber",
      type: "string",
      required: true,
      description: "Vendor bank account number (9–18 alphanumeric characters).",
      example: "123456789012",
    },
    {
      name: "ifsc",
      type: "string",
      required: true,
      description:
        "Bank IFSC (standard format, length 11, first 4 letters = bank code, 5th digit = 0).",
      example: "HDFC0001234",
    },
  ];

  const createVendorResponses = [
    {
      status: 201,
      description: "Vendor created successfully",
      clr: "text-green-500",
      body: {
        success: true,
        message: "Vendor created successfully",
        data: { vendorId: "123e4567-e89b-12d3-a456-426614174000" },
      },
    },
    {
      status: 400,
      clr: "text-red-400",
      description: "Duplicate or invalid data",
      body: { success: false, message: "Duplicate or invalid data" },
    },
    {
      status: 500,
      clr: "text-red-400",
      description: "Internal server error",
      body: { success: false, message: "Something went wrong" },
    },
  ];

  return (
    <>
      <p className="mb-3">
        Use this API to add a vendor to your Bridg.Money account by providing
        the vendor’s name, email, phone number, and bank account details. Before
        making any payouts or vendor-related transactions, ensure the vendor is
        successfully added.
      </p>

      <div className="flex gap-2 border rounded-lg p-2 justify-between mb-10">
        <div>
          <span className="bg-blue-100 py-1 p-2 rounded-md text-blue-600 text-[12px]">
            POST
          </span>
          <span> /v1/vendors </span>
        </div>
        <button className="text-xs text-gray-500 hover:text-black bg-gray-100 px-2 py-1 rounded-md cursor-pointer">
          {true ? "Copied" : "Copy code "}
        </button>
      </div>

      <div>
        <div className="flex border-b pb-2 mb-3 justify-between">
          <p className="font-semibold">Body</p>
          <span>application/json</span>
        </div>
        {createVendorBody.map((field, idx) => (
          <div
            key={field.name}
            className={`${idx !== createVendorBody.length - 1 ? "border-b" : ""} pb-5 mb-4`}
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
        {createVendorResponses.map((resp) => (
          <div
            key={resp.status}
            className="border rounded-md p-4 mb-4 bg-gray-50"
          >
            <div className="flex gap-3 items-center mb-2">
              <span className={`font-bold ${resp.clr || "text-blue-500"}`}>
                {resp.status}
              </span>
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

const DeleteVendor = () => {
  const deleteVendorQueryParams = [
    {
      name: "vendorId",
      type: "string",
      required: true,
      description: "Unique ID of the vendor to delete",
      example: "123e4567-e89b-12d3-a456-426614174000",
    },
  ];

  const createVendorResponses = [
    {
      status: 200,
      description: "Vendor deleted successfully",
      clr: "text-green-500",
      body: {
        success: true,
        message: "Vendor deleted successfully",
        data: { vendorId: "123e4567-e89b-12d3-a456-426614174000" },
      },
    },
    {
      status: 404,
      clr: "text-red-400",
      description: "Vendor not found",
      body: { success: false, message: "Vendor not found" },
    },
    {
      status: 500,
      clr: "text-red-400",
      description: "Internal server error",
      body: { success: false, message: "Internal server error" },
    },
  ];

  return (
    <>
      <p className="mb-3">
        This operation performs a soft delete, meaning the vendor status is
        marked as Inactive and the vendor can no longer be used for payouts or
        transactions.
      </p>

      <div className="flex gap-2 border rounded-lg p-2 justify-between mb-10">
        <div>
          <span className="bg-red-100 py-1 p-2 rounded-md text-red-500 text-[12px]">
            DELETE
          </span>
          <span> /v1/vendors </span>
        </div>
        <button className="text-xs text-gray-500 hover:text-black bg-gray-100 px-2 py-1 rounded-md cursor-pointer">
          {true ? "Copied" : "Copy code "}
        </button>
      </div>

      <>
        <div className="flex border-b pb-2 mb-3 justify-between">
          <p className="font-semibold">Query Parameters</p>
        </div>
        {deleteVendorQueryParams.map((field, idx) => (
          <div
            key={field.name}
            className={`${idx !== deleteVendorQueryParams.length - 1 ? "border-b" : ""} pb-5 mb-4`}
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
      </>

      <div>
        <div className="flex border-b pb-2 mb-3 justify-between">
          <p className="font-semibold">Response</p>
          <span>application/json</span>
        </div>
        {createVendorResponses.map((resp) => (
          <div
            key={resp.status}
            className="border rounded-md p-4 mb-4 bg-gray-50"
          >
            <div className="flex gap-3 items-center mb-2">
              <span className={`font-bold ${resp.clr || "text-blue-500"}`}>
                {resp.status}
              </span>
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

const IpWhitelisting = () => {
  return (
    <>
      <p className="mb-5">
        Follow the instructions below to configure IP whitelisting:
      </p>

      <ul className="list-disc pl-5 mb-4">
        <li>Log in to your dashboard using your credentials.</li>
        <li>
          Navigate to <strong>Settings &gt; IP Whitelist</strong>.
        </li>
        <li>You will see the IP Whitelisting page with no IPs added.</li>
      </ul>

      <img
        className="px-10 mb-5 border rounded-lg"
        alt="IP whitelisting initial page"
        src="/assets/images/integration/ip whitelist/ip init.png"
      />

      <ul className="list-disc pl-5 mb-4">
        <li>
          <strong>IP:</strong> Enter the IP address from which you want to allow
          API access.
        </li>
        <li>
          Click <strong>Add IP</strong> to whitelist the entered IP address.
        </li>
      </ul>

      <img
        className="px-5 mb-5 border rounded-lg"
        alt="IP whitelisting setup"
        src="/assets/images/integration/ip whitelist/ip setup.png"
      />

      <p>
        Once IP addresses are added to the whitelist, only requests originating
        from these IPs will be allowed to access your APIs. This helps ensure
        that only trusted systems can interact with your account, reducing the
        risk of unauthorized access. You can add or remove whitelisted IPs at
        any time, giving you full control over API access.
      </p>
    </>
  );
};

const Webhook = () => {
  return (
    <>
      <p className="mb-5">
        Follow the instructions below to configure webhooks for APIs
      </p>

      <ul className="list-disc pl-5 mb-4">
        <li>Log in to your dashboard using your credentials.</li>
        <li>
          Navigate to <strong>Settings &gt; Webhooks</strong>.
        </li>
        <li>Click Add in the Webhooks page.</li>
      </ul>

      <img
        className="px-10 mb-5 border rounded-lg"
        alt="Webhook initial page"
        src="/assets/images/integration/webhook/webhook init.png"
      />

      <p>In the Add Webhook popup, enter the following information:</p>
      <ul className="list-disc pl-5 mb-4">
        <li>
          <strong>Webhook URL:</strong> Enter the URL where you want to receive
          the transfer related notifications.
        </li>
        <li>
          Select a <strong>webhook Type:</strong> Select initiated from the
          dropdown menu.
        </li>
        <li>
          Click <strong>Add Webhook.</strong>
        </li>
      </ul>

      <img
        className="px-5 pb-10 border-b mb-5 border rounded-lg"
        alt="Webhook setup"
        src="/assets/images/integration/webhook/add webhook.png"
      />
      <h2 className="text-xl font-semibold mb-3">Webhook events</h2>
      <p>
        Payouts webhooks enable you to receive updates about all event-driven
        activities originating from your account. Below is the list of payouts
        webhooks:
      </p>
    </>
  );
};

const headings = [
  {
    id: "overview",
    title: "Overview",
    label: "Overview",
    content: (
      <>
        <p className="mb-2">
          Bridg.Money Merchant APIs use HMAC-SHA256 authentication to ensure
          request authenticity, payload integrity, replay-attack prevention, and
          response integrity
        </p>
        <h3 className="font-semibold mb-3">End Points</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-50">
              <td className="p-2 font-medium">Environment</td>
              <td className="p-2 font-medium">Base URL</td>
            </tr>
          </thead>
          <tbody>
            {[
              { environment: "Production", url: "https://api.bridg.money" },
            ].map((d, idx) => (
              <tr key={idx} className="border">
                <td className="p-2">
                  <span className="text-sm">{d.environment}</span>
                </td>
                <td className="p-2 underline">{d.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "payouts",
    title: "Payouts",
    label: "Payouts",
    children: [
      {
        id: "payouts-add-vendor",
        title: "Add Vendor",
        label: (
          <div className="flex gap-3 items-center">
            <span className="bg-blue-100 px-2 py-1 rounded text-[12px] text-blue-600">
              POST
            </span>
            Add Vendor
          </div>
        ),
        content: <AddVendor />,
      },
      {
        id: "payouts-delete-vendor",
        title: "Delete Vendor",
        label: (
          <div className="flex gap-3 items-center">
            <span className="bg-red-100 px-2 py-1 rounded text-[12px] text-red-600">
              DELETE
            </span>
            Delete Vendor
          </div>
        ),
        content: <DeleteVendor />,
      },
    ],
  },
  {
    id: "authentication-headers",
    title: "Authentication Headers",
    label: "Authentication Headers",
    content: (
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-50">
            <td className="p-2 font-medium">Headers</td>
            <td className="p-2 font-medium">Description</td>
          </tr>
        </thead>
        <tbody>
          {[
            { statusCode: "x-api-key", desc: "Public API key" },
            {
              statusCode: "x-timestamp",
              desc: "Unix epoch milliseconds as string (Date.now().toString())",
            },
            { statusCode: "x-signature", desc: "HMAC-SHA256 signature" },
          ].map((d, idx) => (
            <tr key={idx} className="border">
              <td className="p-2">
                <span className="bg-[#0062FF0D] text-blue-600 px-4 py-1 rounded-sm text-sm">
                  {d.statusCode}
                </span>
              </td>
              <td className="p-2">{d.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  {
     id: "timestamp-rules",
    title: "Timestamp Rules",
    label: "Timestamp Rules",
    content: (
      <ul className="list-disc pl-5 marker:text-blue-600">
        <li>
          <span className="font-semibold">Format:</span> Unix epoch milliseconds
          string
        </li>
        <li>
          {" "}
          <span className="font-semibold">Validity:</span> ±5 minutes
        </li>
      </ul>
    ),
  },
  {
   id: "canonical-request",
    title: "Canonical Request Format",
    label: "Canonical Request Format",
    content: (
      <p className="bg-gray-50 py-2 px-4 rounded-md">
        METHOD | PATH | TIMESTAMP | BODY
      </p>
    ),
  },
  {
    id: "signature-algorithm",
    title: "Signature Algorithm",
    label: "Signature Algorithm",
    content: <p>HMAC-SHA256 with hex encoding</p>,
  },
  {
 id: "generate-signature",
    title: "Generate Request Signature",
    label: "Generate Request Signature",
    content: (
      <CodeBlock
        fileName="generateApiSignature.js"
        code={`import crypto from "crypto";

export function generateApiSignature({
  method,
  path,
  body,
  apiSecret,
}) {
  const timestamp = Date.now().toString();

  const canonicalString = [
    method.toUpperCase(),
    path,
    timestamp,
    body ? JSON.stringify(body) : "",
  ].join("\\n");

  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(canonicalString)
    .digest("hex");

  return {
    timestamp,
    signature,
  };
}`}
      />
    ),
  },
  {
  id: "verify-signature",
    title: "Verify Response Signature",
    label: "Verify Response Signature",
    content: (
      <CodeBlock
        fileName="verifyResponseSignature.js"
        code={`import crypto from "crypto"; 

export function verifyResponseSignature({ 
  status, 
  path, 
  timestamp, 
  body, 
  signature, 
  apiSecret, 
}) { 
  const canonicalString = [ 
    status, 
    path, 
    timestamp, 
    JSON.stringify(body), 
  ].join("|"); 
 
  const expectedSignature = crypto 
    .createHmac("sha256", apiSecret) 
    .update(canonicalString) 
    .digest("hex"); 
 
  return crypto.timingSafeEqual( 
    Buffer.from(signature, "hex"), 
    Buffer.from(expectedSignature, "hex") 
  ); 
} `}
      />
    ),
  },
  {
  id: "ip-whitelisting",
    title: "IP Whitelisting",
    label: "IP Whitelisting",
    content: <IpWhitelisting />,
  },
  {
  id: "response-signing",
    title: "Response Signing",
    label: "Response Signing",
    content: (
      <>
        <p className="mb-2">Responses include:</p>
        <p className="bg-[#0062FF0D] text-blue-600 px-4 py-2 rounded-md mb-2 w-max">
          x-response-timestamp
        </p>
        <p className="bg-[#0062FF0D] text-blue-600 px-4 py-2 rounded-md mb-2 w-max">
          x-response-signature
        </p>
      </>
    ),
  },
  {
    id: "canonical-response-format",
    title: "Canonical Response Format",
    label: "Canonical Response Format",
    content: (
      <p className="bg-gray-50 p-2 rounded-md text-sm">
        STATUS | PATH | RESPONSE_TIMESTAMP | RESPONSE_BODY
      </p>
    ),
  },
  {
     id: "error-codes",
    title: "Error Codes",
    label: "Error Codes",
    content: (
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-50">
            <td className="p-2 font-medium">Code</td>
            <td className="p-2 font-medium">Description</td>
          </tr>
        </thead>
        <tbody>
          {[
            { statusCode: 401, desc: "Missing or expired authentication" },
            { statusCode: 403, desc: "Invalid API key, signature, or IP" },
            { statusCode: 500, desc: "Internal server error" },
          ].map((d, idx) => (
            <tr key={idx} className="border">
              <td className="p-2">
                <span className="bg-[#0062FF0D] text-blue-600 px-4 py-1 rounded-sm text-sm">
                  {d.statusCode}
                </span>
              </td>
              <td className="p-2">{d.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  {
       id: "webhook",
    title: "Webhook",
    label: "Webhook",
    content: <Webhook />,
  },
  {
        id: "version",
    title: "Version",
    label: "Version",
    content: (
      <ul className="list-disc marker:text-blue-600 pl-5">
        <li>
          <span className="font-semibold">API Security Spec</span>: v1.1
        </li>
        <li>
          <span className="font-semibold">Last Updated</span>: Jan 2026
        </li>
      </ul>
    ),
  },
];

const Integration = () => {
  return (
    <>
      <div className="contaier px-7 md:px-10 pt-28">
        <div className="lg:30 xl:px-40 pb-10">
          <h1 className="font-bold pl-3 text-center text-3xl md:text-4xl lg:text-4xl py-4">
            Merchant API – Access & Security Specification
          </h1>
        </div>
        <section className="relative">
          <SidebarHighlight />
        </section>
      </div>
    </>
  );
};

export default Integration;

export function SidebarHighlight() {
  const [activeId, setActiveId] = useState(headings[0].id);
  const [openId, setOpenId] = useState(null);

  const itemRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-50%  0px -50% 0px" },
    );

    headings.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);

      sec.children?.forEach(child => {
        const childEl = document.getElementById(child.id);
        if (childEl) observer.observe(childEl);
      });
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const parent = headings.find(h =>
      h.children?.some(c => c.id === activeId)
    );
    setOpenId(parent?.id || null);
  }, [activeId]);


  useEffect(() => {
    if (activeId && itemRefs.current[activeId]) {
      const sidebarEl = document.getElementById("sidebar");
      const activeEl = itemRefs.current[activeId];

      if (sidebarEl && activeEl) {
        const sidebarRect = sidebarEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();

        if (
          activeRect.top < sidebarRect.top ||
          activeRect.bottom > sidebarRect.bottom
        ) {
          sidebarEl.scrollTop += activeRect.top - sidebarRect.top - 20;
        }
      }
    }
  }, [activeId]);

  return (
    <div className="flex mb-20">
      <aside
        className="w-65 sticky top-25 h-screen hidden lg:block overflow-y-auto"
        id="sidebar"
      >
        <ul className="relative space-y-2">
          {headings.map((sec) => {
            const isOpen = openId === sec.id;
            const isActive = activeId === sec.id;
            return (
              <li
                key={sec.id}
                ref={(el) => (itemRefs.current[sec.id] = el)}
                className="relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBorder"
                    className="absolute left-0 top-0 h-full w-1 bg-[#96DC03] rounded-r"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <a
                  href={`#${sec.id}`}
                  className={`px-4 py-2 flex items-center justify-between rounded transition-colors ${
                    isActive ? "text-[#96DC03]" : "text-gray-500"
                  }`}
                >
                  {sec.title}
                  {/* {sec.children && (
                    <span className="text-xs">{isOpen ? "−" : "+"}</span>
                  )} */}
                </a>
                 {isOpen && sec.children && (
                  <ul className="ml-6 space-y-1">
                    {sec.children.map(child => (
                      <li key={child.id} className="my-2.5">
                        <a
                          href={`#${child.id}`}
                          className={`text-sm block ${
                            activeId === child.id
                              ? "text-[#96DC03]"
                              : "text-gray-400"
                          }`}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      <main className="flex-1 space-y-7 md:px-5 xl:pl-10">
        {headings.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-25">
            <h2 className="text-2xl font-bold mb-4">{sec.title}</h2>
            {sec?.content}
            {sec.children?.map((child) => (
              <section
                key={child.id}
                id={child.id}
                className="scroll-mt-28 mt-8"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {child.title}
                </h3>
                {child.content}
              </section>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}
