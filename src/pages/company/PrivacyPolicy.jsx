import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";

const PrivacyPolicy = () => {
  return (
    <div className="contaier px-7 md:px-10">
      <h1 className="font-bold md:pl-3 text-3xl md:text-4xl lg:text-5xl pt-5 pb-7 lg:pb-10">
        Privacy Policy
      </h1>
      <section>
        <SidebarHighlight />
      </section>
    </div>
  );
};


export default PrivacyPolicy;

const headings = [
  {
    id: "1",
    heading: "Introduction & Scope",
    desc: (
      <>
        <p className="mb-3">
          Bridg Financial Technologies Private Limited (“bridg.money”, “we”,
          “our”, or “us”) is committed to safeguarding the privacy and security
          of personal, financial, and business data. This Privacy Policy
          describes how we collect, process, use, disclose, and protect
          information in compliance with Indian regulations, including the
          Digital Personal Data Protection Act, 2023 (DPDP Act), the Information
          Technology Act, 2000, RBI Master Directions, PMLA Rules, FIU-IND
          guidelines, and global best practices. It applies to all visitors,
          customers, merchants, partners, and users of our website,
          applications, and services.
        </p>
      </>
    ),
  },
  {
    id: "2",
    heading: "Who We Are",
    desc: (
      <>
        <p className="mb-3">
          bridg.money is a Technology Service Provider (TSP) offering secure and
          scalable API-based financial infrastructure for payouts, collections,
          reconciliation, escrow/pooled accounts, and connected banking
          solutions. We work in close partnership with RBI-licensed banks, card
          networks, NPCI, and other regulated service providers to deliver
          compliant and reliable money movement infrastructure.
        </p>
      </>
    ),
  },
  {
    id: "3",
    heading: "Applicability & Consent",
    desc: (
      <>
        <p className="mb-3">
          By accessing or using our platform, services, or website, you consent
          to the collection and processing of your personal and business
          information as outlined in this policy. Where required by law, we seek
          explicit consent and provide clear notice at the point of data
          collection. You may withdraw consent at any time; however, certain
          services may not be available without required information. Consent
          withdrawal is always subject to applicable legal and regulatory
          requirements.
        </p>
      </>
    ),
  },
  {
    id: "4",
    heading: "Data We Collect",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Identity & KYC Information:</strong> Name, date of birth,
            PAN, Aadhaar, passport, voter ID, GSTIN, CIN, registered business
            details, shareholding patterns, beneficial ownership data, and
            address proofs.
          </li>
          <li className="mb-2">
            <strong> Business & Financial Data:</strong> Bank account numbers,
            UPI handles, virtual account identifiers, settlement instructions,
            and transaction history.
          </li>
          <li className="mb-2">
            <strong>AML & Screening Data:</strong> Results of sanctions checks,
            Politically Exposed Person (PEP) identification, adverse media
            scans, and internal blacklist/watchlist screenings.
          </li>
          <li className="mb-2">
            <strong>Technical Information:</strong> Device identifiers, IP
            address, operating system, browser type, cookies, geolocation (where
            permitted), and system usage logs.
          </li>
          <li className="mb-2">
            <strong>Communication Records:</strong> Emails, chat records,
            grievance submissions, call logs, and customer support tickets.
          </li>
          <li className="mb-3">
            <strong>Third-Party Data:</strong> Information shared by partner
            banks, verification agencies, payment networks, and fraud detection
            providers.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "5",
    heading: "Purpose of Collection & Use",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            To onboard merchants, partners, and customers in compliance with
            regulatory requirements.
          </li>
          <li className="mb-2">
            To perform due diligence, KYC, and AML checks before granting access
            to services.
          </li>
          <li className="mb-2">
            To process payments, settlements, collections, and payouts securely.
          </li>
          <li className="mb-2">
            To monitor transactions in real-time for fraud, suspicious activity,
            and risk management.
          </li>
          <li className="mb-2">
            To generate reports, statements, and records required by regulators
            (RBI, FIU-IND).
          </li>
          <li className="mb-2">
            To enhance service performance, improve user experience, and provide
            customer support.
          </li>
          <li className="mb-3">
            To send service-related communications and, with consent, relevant
            marketing material.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "6",
    heading: "AML & KYC Compliance",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Customer Due Diligence (CDD):</strong> We verify the
            identity of individuals and businesses through official documents,
            government databases, and third-party verification providers. For
            businesses, we also verify directors, partners, and beneficial
            owners.
          </li>
          <li className="mb-2">
            <strong>Enhanced Due Diligence (EDD):</strong> Customers identified
            as high-risk undergo stricter checks, including deeper financial
            scrutiny, source of funds verification, and frequent review cycles.
          </li>
          <li className="mb-2">
            <strong>Sanctions & Screening:</strong> Every customer and
            beneficial owner is screened against OFAC, UN, EU, RBI, and SEBI
            sanctions lists. We also check against adverse media and PEP lists.
          </li>
          <li className="mb-2">
            <strong>Transaction Monitoring:</strong> We use automated and manual
            monitoring systems to detect suspicious patterns such as unusual
            transaction sizes, frequency anomalies, or cross-border risks.
          </li>
          <li className="mb-2">
            <strong>Regulatory Reporting:</strong> We file Suspicious
            Transaction Reports (STRs), Cash Transaction Reports (CTRs), and
            other mandated reports to FIU-IND promptly, maintaining strict
            confidentiality.
          </li>
          <li className="mb-2">
            <strong>Record Keeping:</strong> In compliance with PMLA, we retain
            transaction records for 10 years and KYC/relationship records for 5
            years post account closure.
          </li>
          <li className="mb-3">
            <strong>Ongoing Compliance:</strong> Our AML program includes
            employee training, regular audits, maker-checker controls, and
            board-level oversight to ensure adherence to evolving regulations.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "7",
    heading: "Customer Acceptance Policy",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong> Permitted Customers:</strong> Businesses operating in
            lawful industries such as e-commerce, SaaS, education, healthcare,
            lending, gig economy, and financial services. These entities must
            provide complete KYC/KYB documentation.
          </li>
          <li className="mb-2">
            <strong> Restricted/High-Risk Customers:</strong> Entities engaged
            in cross-border remittances, gaming, or other higher-risk industries
            are subject to Enhanced Due Diligence and stricter monitoring.
          </li>
          <li className="mb-2">
            <strong> Prohibited Customers:</strong> bridg.money does not onboard
            entities involved in gambling, pornography, narcotics, arms and
            ammunition, money mules, shell companies, cryptocurrency exchanges
            (unless permitted under Indian law), and any activities restricted
            by RBI or other regulators.
          </li>
          <li className="mb-2">
            <strong> Risk Categorization:</strong> All customers are classified
            into Low, Medium, or High risk categories based on industry,
            geography, business model, transaction volume, and ownership.
            High-risk customers are reviewed more frequently.
          </li>
          <li className="mb-3">
            <strong>Transparency Requirement:</strong> Businesses must have
            clear ownership structures and lawful sources of funds. Anonymous or
            fictitious accounts are not permitted.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "8",
    heading: "Data Storage & Security",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            All data is encrypted both at rest and in transit using
            industry-standard protocols.
          </li>
          <li className="mb-2">
            Systems are hosted in data centers compliant with RBI’s data
            localization guidelines.
          </li>
          <li className="mb-2">
            Security controls include multi-factor authentication, access
            logging, firewalls, intrusion detection, and real-time monitoring.
          </li>
          <li className="mb-2">
            Incident response procedures are in place, with CERT-In aligned
            reporting within 6 hours of identifying a breach.
          </li>
          <li className="mb-3">
            We periodically undergo independent security audits and assessments
            (ISO 27001, PCI DSS compliance).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "9",
    heading: "Sharing & Disclosure",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            With partner banks, NBFCs, and regulated institutions for processing
            transactions.
          </li>
          <li className="mb-2">
            With KYC/AML verification agencies, fraud detection service
            providers, and auditors bound by confidentiality.
          </li>
          <li className="mb-2">
            With regulators, courts, and law enforcement agencies when legally
            required.
          </li>
          <li className="mb-2">
            With consultants or vendors under strict data processing agreements.
          </li>
        </ul>
        <p className="mb-3">
          We do not sell or misuse customer data under any circumstances.
        </p>
      </>
    ),
  },
  {
    id: "10",
    heading: "International Transfers",
    desc: (
      <>
        <p className="mb-3">
          Where necessary, data may be transferred outside India to service
          providers or affiliates. Such transfers are subject to strict
          contractual safeguards, including Standard Contractual Clauses (SCCs)
          or equivalent mechanisms, and always in compliance with Indian law,
          including government restrictions on cross-border transfers.
        </p>
      </>
    ),
  },
  {
    id: "11",
    heading: "Data Retention",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            Transaction Data: Retained for a minimum of 10 years.
          </li>
          <li className="mb-2">
            KYC & Onboarding Data: Retained for 5 years after termination of the
            business relationship.
          </li>
          <li className="mb-2">
            Other Data: Retained only as long as necessary to meet operational,
            legal, or regulatory obligations.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "12",
    heading: "Cookies & Analytics",
    desc: (
      <>
        <p className="pb-3">
          We use cookies, tracking pixels, and analytics tools (such as Google
          Analytics) to improve user experience, analyse traffic, and enhance
          platform security. Users can control cookie preferences through
          browser settings. Some cookies are essential for platform
          functionality and cannot be disabled.
        </p>
      </>
    ),
  },
  {
    id: "13",
    heading: "Children’s Data",
    desc: (
      <>
        <p className="mb-3">
          Our services are intended for businesses and adults. We do not
          knowingly collect data from children under 18. If we discover such
          data has been collected inadvertently, we delete it immediately unless
          retention is legally required. If parental consent is identified as
          necessary under law, we will ensure appropriate steps are taken.
        </p>
      </>
    ),
  },
  {
    id: "14",
    heading: "User Rights",
    desc: (
      <>
        <p className="mb-2">Users and customers have the right to:</p>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            Request access to personal and business data held by us.
          </li>
          <li className="mb-2">Correct inaccurate or incomplete data.</li>
          <li className="mb-2">
            Request deletion of data, subject to mandatory legal retention
            requirements.
          </li>
          <li className="mb-2">
            Withdraw consent for optional data processing, including marketing.
          </li>
          <li className="mb-2">
            Opt-out of marketing communications via unsubscribe links in emails
            or by contacting us directly.
          </li>
          <li className="mb-2">Request data portability where applicable.</li>
          <li className="mb-2">
            Nominate a representative to exercise rights in case of death or
            incapacity, as permitted under DPDP Act 2023.
          </li>
          <li className="mb-3">Raise grievances and seek resolution.</li>
        </ul>
      </>
    ),
  },
  {
    id: "15",
    heading: "Security Measures",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            Encryption protocols, secure storage, and access controls.
          </li>
          <li className="mb-2">
            Periodic penetration testing and vulnerability assessments.
          </li>
          <li className="mb-2">
            Independent audits and certifications (ISO 27001, PCI DSS).
          </li>
          <li className="mb-2">Employee training and awareness programs.</li>
          <li className="mb-2">
            Data breach protocols ensuring timely communication with affected
            parties and regulators.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "16",
    heading: "Grievance Redressal",
    desc: (
      <>
        <p className="mb-2">
          We maintain a structured grievance redressal mechanism in line with
          RBI and IT Act requirements.
        </p>
        <p className="font-bold">
          Grievance Officer / Data Protection Officer (DPO):
        </p>
        <ul className="mb-3">
          <li>
            <strong>Email:</strong>{" "}
            <a
              className="text-blue-600 underline"
              href="mailto:grievance@bridg.money"
            >
              grievance@bridg.money
            </a>
          </li>
          <li>
            <strong>Address:</strong> WorkFlo Ranka Junction, Property No. 224,
            3rd Floor, #80/3, Vijinapura Village, Old Madras Road, Hobli,
            Krishnarajapuram, Bengaluru, Karnataka 560016.
          </li>
        </ul>
        <p className="mb-3">
          Complaints are acknowledged within 48 hours and resolved within 30
          days.
        </p>
      </>
    ),
  },
  {
    id: "17",
    heading: "Third-Party Links",
    desc: (
      <>
        <p className="mb-3">
          Our platform may link to external sites. We are not responsible for
          their privacy practices and recommend users review their policies
          before engagement.
        </p>
      </>
    ),
  },
  {
    id: "18",
    heading: "Policy Updates",
    desc: (
      <>
        <p className="mb-3">
          We may revise this Privacy Policy from time to time to reflect legal,
          regulatory, or operational changes. Updated versions will always be
          published at{" "}
          <Link to="/privacy-policy" className="text-blue-600 underline">
            https://bridg.money/privacy-policy.
          </Link>{" "}
          Users are encouraged to review this page periodically.
        </p>
      </>
    ),
  },
];

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
      { rootMargin: "-35%  0px -65% 0px" }
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
        className="w-65 sticky top-30 h-screen hidden lg:block overflow-y-auto"
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
                  className={`pl-5 py-1.5 block rounded transition-colors ${
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

      <div className="flex-1 space-y-7 md:px-5 lg:pl-10 w-screen overflow-hidden">
        {headings.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-28">
            <h2 className="font-bold text-2xl mb-3">{sec.heading}</h2>
            <section>{sec.desc}</section>
          </section>
        ))}
      </div>
    </div>
  );
}
