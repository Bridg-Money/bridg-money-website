import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AddBeneficiary, DeleteBeneficiary } from "./Beneficiaries";
import IpWhitelisting from "./IPWhiteList";
import Webhook from "./Webhook";
import { GetPayoutTransaction, InitiatePayout } from "./Payout";
import { PayoutApiCallBlock } from "./PayoutApiCallBlock";
import { GenerateSignatureMultiLang } from "./GenerateSignatureMultiLang";
import { VerifySignatureMultiLang } from "./VerifySignatureMultiLang";

export const CodeBlock = ({ fileName, code }) => {
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
          className={`flex items-center ${
            fileName ? "justify-between border-b pb-3" : "justify-end"
          } mb-4`}
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
              { environment: "Beta", url: "https://api-beta.bridg.money" },
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
    id: "beneficiaries",
    title: "Beneficiaries",
    label: "Beneficiaries",
    children: [
      {
        id: "add-beneficiary",
        title: "Add Beneficiary",
        label: (
          <div className="flex gap-3 items-center">
            <span className="bg-blue-100 px-2 py-1 rounded text-[12px] text-blue-600">
              POST
            </span>
            Add Beneficiary
          </div>
        ),
        content: <AddBeneficiary />,
      },
      {
        id: "delete-beneficiary",
        title: "Delete Beneficiary",
        label: (
          <div className="flex gap-3 items-center">
            <span className="bg-red-100 px-2 py-1 rounded text-[12px] text-red-600">
              DELETE
            </span>
            Delete Beneficiary
          </div>
        ),
        content: <DeleteBeneficiary />,
      },
    ],
  },
  {
    id: "payouts",
    title: "Payouts",
    label: "Payouts",
    children: [
      {
        id: "initiate-payout-transaction",
        title: "Initiate Payout Transaction",
        label: (
          <div className="flex gap-3 items-center">
            <span className="bg-blue-100 px-2 py-1 rounded text-[12px] text-blue-600">
              POST
            </span>
            Initiate Payout Transaction
          </div>
        ),
        content: <InitiatePayout />,
      },
      {
        id: "payout-transaction",
        title: "Payout Transaction",
        label: (
          <div className="flex gap-3 items-center">
            <span className="bg-red-100 px-2 py-1 rounded text-[12px] text-red-600">
              GET
            </span>
            Payout Transaction
          </div>
        ),
        content: <GetPayoutTransaction />,
      },
    ],
  },
  {
    id: "postman-collection",
    title: "Postman Collection",
    label: "Postman Collection",
    content: (
      <div className="space-y-4">
        <p>
          Use the official Postman collection to quickly test and integrate
          Bridg.Money Payout APIs.
        </p>

        <div className="bg-gray-50 border rounded-lg p-4 mb-4 text-sm text-gray-700">
          <p className="font-semibold mb-2">Postman Setup Instructions</p>

          <ul className="list-disc ml-5 space-y-1">
            <li>
              Set{" "}
              <span className="font-mono bg-gray-200 px-1 rounded">
                base_url
              </span>{" "}
              in environment Variables.
            </li>
            <li>
              Set{" "}
              <span className="font-mono bg-gray-200 px-1 rounded">
                api_key
              </span>{" "}
              in environment Variables.
            </li>
            <li>
              Set{" "}
              <span className="font-mono bg-gray-200 px-1 rounded">
                api_secret
              </span>{" "}
              in environment Variables.
            </li>
            <li>
              All request URLs use{" "}
              <span className="font-mono bg-gray-200 px-1 rounded">
                {`{{base_url}}`}
              </span>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          {/* Run in Postman Button */}
          <a
            href="https://www.postman.com/warped-equinox-340815/bridg-money-payout-api-integration/collection/8245079-e1bd6021-a52b-41f2-a783-8925c43b0614?action=share&source=copy-link&creator=8245079"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://run.pstmn.io/button.svg"
              alt="Run in Postman"
              className="h-10"
            />
          </a>

          {/* Optional: Download JSON */}
          <a
            href="/assets/bridg-money-payout.postman_collection.json"
            download
            className="text-blue-600 underline text-sm"
          >
            Download Postman Collection (v1)
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "payout-api-call-dynamic",
    title: "Payout API Call with Signature",
    label: "Payout API Call (Language Based)",
    content: <PayoutApiCallBlock />,
  },
  {
    id: "payout-testing-accounts",
    title: "Payout Testing Accounts",
    label: "Payout Testing Accounts",
    content: (
      <div className="space-y-6">
        {/* SELF BANK */}
        <div>
          <h4 className="font-semibold mb-2">SELF BANK TESTING</h4>
          <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
            <p>
              <span className="font-medium">Beneficiary Account Number:</span>{" "}
              0002053000010425
            </p>
            <p>
              <span className="font-medium">Account Name:</span> BEENA DENNY
            </p>
          </div>
        </div>

        {/* NEFT / OTHER BANK */}
        <div>
          <h4 className="font-semibold mb-2">NEFT / OTHER BANK TESTING</h4>
          <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
            <p>
              <span className="font-medium">Beneficiary Account Number:</span>{" "}
              0574050000000449
            </p>
            <p>
              <span className="font-medium">Beneficiary IFSC:</span> CSBK0000237
            </p>
          </div>
        </div>

        {/* IMPS / OTHER BANK */}
        <div>
          <h4 className="font-semibold mb-2">IMPS / OTHER BANK TESTING</h4>
          <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
            <p>
              <span className="font-medium">Beneficiary Account Number:</span>{" "}
              123456041
            </p>
            <p>
              <span className="font-medium">Beneficiary IFSC:</span> UTIB0000119
            </p>
          </div>
        </div>
      </div>
    ),
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
    content: <GenerateSignatureMultiLang />,

    //   content: (
    //     <CodeBlock
    //       fileName="generateApiSignature.js"
    //       code={`import crypto from "crypto";

    // export function generateApiSignature({
    //   method,
    //   path,
    //   body,
    //   apiSecret,
    // }) {
    //   const timestamp = Date.now().toString();

    //   const canonicalString = [
    //     method.toUpperCase(),
    //     path,
    //     timestamp,
    //     body ? JSON.stringify(body) : "",
    //   ].join("\\n");

    //   const signature = crypto
    //     .createHmac("sha256", apiSecret)
    //     .update(canonicalString)
    //     .digest("hex");

    //   return {
    //     timestamp,
    //     signature,
    //   };
    // }`}
    //     />
    //   ),
  },
  {
    id: "verify-signature",
    title: "Verify Response Signature",
    label: "Verify Response Signature",
    content: <VerifySignatureMultiLang />,
    //     content: (
    //       <CodeBlock
    //         fileName="verifyResponseSignature.js"
    //         code={`import crypto from "crypto";

    // export function verifyResponseSignature({
    //   status,
    //   path,
    //   timestamp,
    //   body,
    //   signature,
    //   apiSecret,
    // }) {
    //   const canonicalString = [
    //     status,
    //     path,
    //     timestamp,
    //     JSON.stringify(body),
    //   ].join("|");

    //   const expectedSignature = crypto
    //     .createHmac("sha256", apiSecret)
    //     .update(canonicalString)
    //     .digest("hex");

    //   return crypto.timingSafeEqual(
    //     Buffer.from(signature, "hex"),
    //     Buffer.from(expectedSignature, "hex")
    //   );
    // } `}
    //       />
    //     ),
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
            { statusCode: 200, desc: "Request successful" },
            {
              statusCode: 400,
              desc: "Invalid request format or malformed signature",
            },
            {
              statusCode: 401,
              desc: "Missing authentication headers or request expired",
            },
            {
              statusCode: 403,
              desc: "Invalid API key, signature, or IP not whitelisted",
            },
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
          <span className="font-semibold">Last Updated</span>:March 2026
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
      { rootMargin: "-50%  0px -50% 0px" }
    );

    headings.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);

      sec.children?.forEach((child) => {
        const childEl = document.getElementById(child.id);
        if (childEl) observer.observe(childEl);
      });
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const parent = headings.find((h) =>
      h.children?.some((c) => c.id === activeId)
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
                    {sec.children.map((child) => (
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
                <h3 className="text-xl font-semibold mb-3">{child.title}</h3>
                {child.content}
              </section>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}
