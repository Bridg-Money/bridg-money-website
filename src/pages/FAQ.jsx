import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

const headings = [
  {
    id: "1",
    heading: "General",
    questions: [
      {
        question: "What is bridg.money?",
        ans: "bridg.money is a Technology Service Provider (TSP) offering a unified API stack for compliant, scalable money movement — including payouts, collections, connected banking, merchant onboarding, multi-bank routing, reconciliation, and escrow infrastructure.",
      },
      {
        question: "Is bridg.money a bank or financial institution?",
        ans: "No. We are not a bank. We partner with RBI-licensed banks and financial institutions to deliver API-based financial services.",
      },
      {
        question: "Who can use bridg.money’s services?",
        ans: "We serve businesses, marketplaces, platforms, fintechs, enterprises, and (if eligible) individual sellers who require secure and compliant money movement.",
      },
      {
        question: "Do you serve international merchants?",
        ans: "Currently, our services are for Indian entities. Cross-border capabilities may be available via select partner banks.",
      },
      {
        question: "What industries do you support?",
        ans: "We support a wide range of industries, subject to compliance checks. Certain high-risk categories may be restricted.",
      },
    ],
  },
  {
    id: "2",
    heading: "Pricing & Fees",
    questions: [
      {
        question: "What are the charges for using bridg.money’s services?",
        ans: "Pricing depends on your transaction volumes, risk profile, and product usage. Contact our sales team for a custom quote.",
      },
      {
        question: "Is there a minimum monthly commitment?",
        ans: "No fixed minimum for most products. High-volume plans may have minimum usage for preferential pricing.",
      },
      {
        question: "Are there any hidden fees?",
        ans: "No. All charges are transparently listed in your agreement.",
      },
    ],
  },
  {
    id: "3",
    heading: "Security & Compliance",
    questions: [
      {
        question: "How secure is my data?",
        ans: "We use bank-grade encryption, secure storage, and multi-layered security protocols.",
      },
      {
        question: "Are you PCI-DSS compliant?",
        ans: "Yes, through PCI-DSS certified partners.",
      },
      {
        question: "Do you comply with RBI guidelines?",
        ans: "Yes. All services are provided in full compliance with RBI and applicable laws.",
      },
      {
        question: "Do you hold any certifications?",
        ans: "We work with partners who are PCI-DSS certified, ISO 27001 certified, and SOC 2 ready.",
      },
      {
        question: "How do you prevent fraud and money laundering?",
        ans: "We perform KYC/KYB verification, transaction monitoring, and AML/CFT checks.",
      },
      {
        question: "Do you undergo regular compliance audits?",
        ans: "Yes. Our systems and processes are periodically reviewed for regulatory and security compliance.",
      },
    ],
  },
  {
    id: "4",
    heading: "Getting Started",
    questions: [
      {
        question: "How do I sign up?",
        ans: "Contact sales or register on our website to begin onboarding.",
      },
      {
        question: "Do you provide API documentation?",
        ans: "Yes. We offer detailed API docs, sandbox credentials, and sample code.",
      },
      {
        question: "Do you offer SDKs and plugins?",
        ans: "Yes. SDKs are available in popular languages, and plugins for platforms like Shopify and WooCommerce.",
      },
      {
        question: "Do you assist with integration?",
        ans: "Yes. Our technical team supports both API and plugin-based setups.",
      },
      {
        question: "Do you provide webhook and callback support?",
        ans: "Yes. We support webhooks for real-time status updates and callbacks for transaction events.",
      },
      {
        question: "What is your uptime SLA?",
        ans: "We target 99.9% uptime, with automatic failover routing to ensure service continuity.",
      },
    ],
  },
  {
    id: "5",
    heading: "BridgOnboard – Merchant Onboarding",
    questions: [
      {
        question: "What is BridgOnboard?",
        ans: "An API-first onboarding solution with automated document verification, KYC/KYB checks, and instant merchant activation.",
      },
      {
        question: "What documents are required?",
        ans: "Certificate of Incorporation, GST, PAN, bank proof, and authorized signatory KYC. Requirements vary by business type.",
      },
      {
        question: "How long does onboarding take?",
        ans: "Typically 24–48 hours after submitting all documents.",
      },
      {
        question: "Is onboarding paperless?",
        ans: "Yes — entirely digital via a secure upload flow.",
      },
    ],
  },
  {
    id: "6",
    heading: "BridgCollect – Multi-Channel Collections",
    questions: [
      {
        question: "What is BridgCollect?",
        ans: "Accept payments via Virtual Accounts, UPI/VPA, QR, and cards — with instant confirmation and auto-settlement.",
      },
      {
        question: "Are collections available 24x7?",
        ans: "Yes, including weekends and public holidays.",
      },
      {
        question: "How fast are settlements?",
        ans: "T+0 or T+1, depending on bank arrangements.",
      },
    ],
  },
  {
    id: "7",
    heading: "BridgPay – Instant Payouts",
    questions: [
      {
        question: "What is BridgPay?",
        ans: "Enables instant payouts via NEFT, RTGS, IMPS, UPI, and cards with smart retries and live tracking.",
      },
      {
        question: "Can I do bulk payouts?",
        ans: "Yes — through API or dashboard CSV upload.",
      },
      {
        question: "What happens if a payout fails?",
        ans: "It is retried automatically or refunded to your source account.",
      },
      {
        question: "Are payouts available 24x7?",
        ans: "Yes via IMPS/UPI; NEFT/RTGS follow banking hours.",
      },
    ],
  },
  {
    id: "8",
    heading: "BridgConnect – Connected Banking",
    questions: [
      {
        question: "What is BridgConnect?",
        ans: "Gives real-time access to your own bank account balances, transactions, and statements — with the ability to initiate payments directly.",
      },
      {
        question: "Can I connect multiple bank accounts?",
        ans: "Yes. You can link multiple accounts to view and operate them from a single dashboard.",
      },
    ],
  },
  {
    id: "9",
    heading: "BridgRoute – Multi-Bank Smart Routing",
    questions: [
      {
        question: "What is BridgRoute?",
        ans: "An intelligent routing engine that selects the fastest, most cost-efficient bank rail for transactions, with automatic failover.",
      },
      {
        question: "Does it work for both payouts and collections?",
        ans: "Yes — it optimises both.",
      },
    ],
  },
  {
    id: "10",
    heading: "BridgRecon – Automated Reconciliation",
    questions: [
      {
        question: "What is BridgRecon?",
        ans: "Matches incoming and outgoing transactions in real time, syncs with ERP systems, and flags anomalies instantly.",
      },
      {
        question: "Can I export reports?",
        ans: "Yes — available in CSV or Excel.",
      },
      {
        question: "Can reports be scheduled automatically?",
        ans: "Yes — enterprise clients can schedule automated report delivery via API or email.",
      },
    ],
  },
  {
    id: "11",
    heading: "BridgVault – Escrow & Pooled Accounts",
    questions: [
      {
        question: "What is BridgVault?",
        ans: "Provides RBI-compliant escrow and pooled account structures with sub-ledgers and transaction-level controls.",
      },
      {
        question: "Can escrow be multi-party?",
        ans: "Yes — suitable for marketplaces, gig platforms, and other multi-party settlements.",
      },
      {
        question: "What happens in a dispute?",
        ans: "Funds remain in escrow until resolution per agreed terms.",
      },
    ],
  },
  {
    id: "12",
    heading: "Product Limitations & Exclusions",
    questions: [
      {
        question: "Are there restricted industries?",
        ans: "Yes. We do not support certain high-risk categories such as gambling, adult content, unregulated forex, and cryptocurrency trading.",
      },
      {
        question: "Are all features available for all merchants?",
        ans: "Some features (e.g., T+0 settlements, certain API types) may be bank-dependent and subject to risk approval.",
      },
    ],
  },
  {
    id: "13",
    heading: "Account Management",
    questions: [
      {
        question: "Can I add multiple users?",
        ans: "Yes — with role-based access controls.",
      },
      {
        question: "Can I white-label bridg.money’s services?",
        ans: "Yes — available for eligible partners.",
      },
    ],
  },
  {
    id: "14",
    heading: "Technical & Operational Policies",
    questions: [
      {
        question: "What happens if my account is inactive?",
        ans: "If dormant for a long period, re-verification may be required.",
      },
      {
        question: "What happens if a bank is down?",
        ans: "Transactions are rerouted automatically using BridgRoute.",
      },
    ],
  },
  {
    id: "15",
    heading: "Disputes, Chargebacks & Support",
    questions: [
      {
        question: "How are disputes handled?",
        ans: "Via our published grievance redressal process.",
      },
      {
        question: "Do you assist in chargeback resolution?",
        ans: "Yes — in coordination with the merchant.",
      },
      {
        question: "Is support available 24x7?",
        ans: "Email support is 24x7; phone support during business hours.",
      },
    ],
  },
  {
    id: "16",
    heading: "Reporting & Analytics",
    questions: [
      {
        question: "Do you provide dashboards?",
        ans: "Yes — with real-time transaction data and analytics.",
      },
      {
        question: "Can I request custom reports?",
        ans: "Yes — for enterprise clients.",
      },
      {
        question: "Do you have real-time analytics APIs?",
        ans: "Yes — available for enterprise integrations.",
      },
    ],
  },
  {
    id: "17",
    heading: "Sandbox & Testing",
    questions: [
      {
        question: "Do you offer a sandbox?",
        ans: "Yes — with test credentials after initial setup.",
      },
      {
        question: "How long does it take to go live?",
        ans: "Plugin integration can be same-day; full API integration may take a few days based on complexity.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="contaier px-7 md:px-10 pt-25">
      <div className="lg:30 xl:px-40 pb-10">
        <h1 className="font-semibold pl-3 text-center text-3xl md:text-4xl lg:text-5xl py-4">
          Frequently Asked <span className="text-[#A5EB14]">Questions</span>
        </h1>
        <p className="text-center text-lg lg:px-20">
          Unified answers for onboarding, collections, payouts, reconciliation,
          escrow, and routing—built for compliance and scale.
        </p>
      </div>
      <section className="relative">
        <SidebarHighlight />
      </section>
    </div>
  );
};

export default FAQ;

export function SidebarHighlight() {
  const [activeId, setActiveId] = useState(headings[0].id);
  const itemRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50%  0px -50% 0px" }
    );

    headings.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
      <div
        className="w-65 sticky top-25 h-screen hidden lg:block overflow-y-auto"
        id="sidebar"
      >
        <ul className="relative space-y-2">
          {headings.map((sec) => {
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
                  className={`pl-5 py-2 block rounded transition-colors ${
                    isActive ? "text-[#96DC03]" : "text-gray-500"
                  }`}
                >
                  {sec.heading}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex-1 space-y-7 md:px-5 xl:pl-10">
        {headings.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-25">
            <h2 className="text-xl font-[500] text-gray-600 mb-6">{sec.heading}</h2>
            {sec.questions?.map((q, i) => (
              <details
                key={i}
                className="group mb-5 py-5 p-3 shadow-[0px_1px_4px_0px_#19213D0F] border-l-6 rounded-sm border-[#F1F2F9] open:border-[#A5EB14] open:bg-[#FBFFF4] transition-all duration-500"
              >
                <summary className="cursor-pointer font-[500] flex gap-2 items-center list-none">
                  <svg
                    className="w-4 h-4 text-gray-500 transform transition-transform duration-300 group-open:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {q.question}
                </summary>

                <div className="answer mt-1 text-gray-700 pl-6">{q.ans}</div>
              </details>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
