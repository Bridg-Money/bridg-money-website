import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

const TrustAndSecurity = () => {
  return (
    <div className="contaier px-7 md:px-10">
      <h1 className="font-bold md:pl-3 text-3xl md:text-4xl lg:text-5xl pt-5 pb-7 lg:pb-10">
        Trust & Security
      </h1>
      <section>
        <SidebarHighlight />
      </section>
    </div>
  );
};

export default TrustAndSecurity;

const headings = [
  {
    id: "1",
    heading: "Why Trust bridg.money?",
    desc: (
      <>
        <p className="mb-2">
          At bridg.money, security, compliance, and reliability are the
          foundations of our platform. As a Technology Service Provider (TSP)
          working exclusively with RBI-licensed banks and regulated financial
          institutions, we are committed to safeguarding sensitive financial
          data and ensuring that all money movement on our platform adheres to
          the highest legal and technical standards.
        </p>
        <p className="mb-3">
          Our mission is to ensure that your data and transactions remain
          secure, compliant, and always available. We combine strong governance,
          advanced technology, and continuous oversight to provide a platform
          trusted by merchants, banks, and regulators alike.
        </p>
      </>
    ),
  },
  {
    id: "2",
    heading: "Security Practices",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>End-to-End Encryption:</strong> All data is encrypted using
            AES-256 standards when stored and protected with TLS 1.3 during
            transmission.
          </li>
          <li className="mb-2">
            <strong>No Sensitive Storage:</strong> We do not store card CVV,
            PIN, Aadhaar biometrics, or other sensitive data beyond what is
            strictly necessary for compliance with RBI and AML guidelines.
          </li>
          <li className="mb-2">
            <strong>Future PCI-DSS Readiness:</strong> While bridg.money does
            not currently process or store cardholder data directly, our
            infrastructure is designed to adopt PCI DSS controls if required in
            future collaborations with banks or card networks.
          </li>
          <li className="mb-2">
            <strong>Role-Based Access Control (RBAC):</strong> All employee
            access is controlled by multi-factor authentication (MFA) and
            governed by the principle of least privilege.
          </li>
          <li className="mb-2">
            <strong>Continuous Security Monitoring:</strong> 24×7 monitoring
            detects anomalies, intrusion attempts, or fraudulent activity in
            real time.
          </li>
          <li className="mb-2">
            <strong>Regular Security Testing:</strong> Periodic vulnerability
            assessments and penetration tests (VAPT) are conducted by CERT-IN
            empanelled third-party auditors.
          </li>
          <li className="mb-2">
            <strong>Independent Audits:</strong> Annual audits are performed to
            align with industry-recognised frameworks such as ISO/IEC 27001.
          </li>
          <li className="mb-3">
            <strong>Employee Practices:</strong> All employees undergo
            background verification, sign NDAs, and complete mandatory security
            awareness training.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "3",
    heading: "Compliance & Regulatory Alignment",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>RBI TSP & Payment Regulations:</strong> bridg.money operates
            strictly within the framework of the Payment & Settlement Systems
            Act, PMLA, and RBI Master Directions.
          </li>
          <li className="mb-2">
            <strong>KYC/KYB Compliance:</strong> Our merchant onboarding
            (BridgOnboard & BridgVerify) ensures that all entities on the
            platform are verified in compliance with RBI AML/KYC requirements.
          </li>
          <li className="mb-2">
            <strong>Data Protection Laws:</strong> We comply with the Digital
            Personal Data Protection (DPDP) Act 2023 and ensure fair and lawful
            processing of personal data.
          </li>
          <li className="mb-2">
            <strong>Escrow & Pooled Account Structures:</strong> All merchant
            and customer funds are managed through escrow and pooled account
            arrangements that follow RBI-prescribed safeguards.
          </li>
          <li className="mb-2">
            <strong> Reporting & Audit Trails:</strong> Automated
            reconciliation, STR/CTR filings, and regulatory reporting ensure
            transparency and accountability.
          </li>
          <li className="mb-2">
            <strong>Regulatory Cooperation:</strong> We work closely with banks,
            FIU-IND, and regulators to ensure continuous alignment with evolving
            compliance expectations.
          </li>
          <li className="mb-3">
            <strong>Vendor Risk Management:</strong> All critical third-party
            vendors (e.g., KYC providers, cloud services, SMS gateways) are
            assessed for compliance with security and data protection
            requirements before onboarding.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "4",
    heading: "Infrastructure Reliability",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>High Availability:</strong> Our systems are designed with
            redundancy and disaster recovery measures to ensure uptime and
            resilience.
          </li>
          <li className="mb-2">
            <strong>Multi-Bank Routing (BridgRoute):</strong> Transactions are
            intelligently routed across partner banks for better uptime and
            efficiency, reducing reliance on any single banking partner.
          </li>
          <li className="mb-2">
            <strong>Disaster Recovery Protocols:</strong> Data is backed up
            regularly, and recovery processes are tested to meet operational
            continuity standards.
          </li>
          <li className="mb-2">
            <strong>API Scalability:</strong> bridg.money APIs are designed to
            process large transaction volumes efficiently, without compromising
            security.
          </li>
          <li className="mb-3">
            <strong> Business Continuity:</strong> RTO ≤ 1 hour and RPO ≤ 15
            minutes for critical services; quarterly DR drills validate
            readiness.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "5",
    heading: "Data Privacy & Rights",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Data Minimisation:</strong> We collect only the information
            necessary to provide services and meet regulatory obligations.
          </li>
          <li className="mb-2">
            <strong>No Sale of Data:</strong> bridg.money does not sell or rent
            personal data to advertisers or third parties.
          </li>
          <li className="mb-2">
            <strong>Privacy by Design:</strong> Every feature we build
            incorporates privacy and data protection principles from inception.
          </li>
          <li className="mb-2">
            <strong>Merchant Control:</strong> Merchants have rights to access,
            correct,port, or request deletion of their data subject to
            applicable laws and retention requirements.
          </li>
          <li className="mb-3">
            <strong>Cross-Border Safeguards:</strong> International transfers,
            if required, are protected through Standard Contractual Clauses
            (SCCs) or equivalent safeguards.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "6",
    heading: "Incident Management & Response",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Breach Notification:</strong> In the event of a security
            breach that poses a risk to users, bridg.money will notify affected
            users and regulators as required under the DPDP Act, RBI guidelines,
            and other applicable laws.
          </li>
          <li className="mb-2">
            <strong>Dedicated Response Team:</strong> A specialised incident
            response team ensures that any issue is investigated and remediated
            promptly.
          </li>
          <li className="mb-2">
            <strong>Responsible Disclosure:</strong> We encourage ethical
            security researchers to responsibly disclose vulnerabilities to us
            at{" "}
            <a
              href="emailto:security@bridg.money"
              className="underline text-blue-600"
            >
              security@bridg.money
            </a>
          </li>
          <li className="mb-3">
            <strong>Incident Response SLAs:</strong> Critical incidents
            acknowledged within 24 hours; root cause analysis and closure report
            within 10 days.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "7",
    heading: "Certifications & Assurance",
    desc: (
      <>
        <p className="pb-2">
          We follow industry-leading practices and only claim certifications
          that we have formally achieved. Current compliance measures include:
        </p>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            ISO/IEC 27001 (under audit process) – Information Security
            Management System.
          </li>
          <li className="mb-2">
            Regular third-party VAPT reports available to banking partners upon
            request.
          </li>
        </ul>
        <p className="pb-3">
          We do not claim PCI DSS, SOC 2, or other certifications until formally
          obtained. However, our infrastructure and policies are designed to
          adopt these frameworks as business and regulatory needs evolve.
        </p>
      </>
    ),
  },
  {
    id: "8",
    heading: "Contact Us",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Security Team:</strong>{" "}
            <a
              href="emailto:security@bridg.money"
              className="underline text-blue-600"
            >
              security@bridg.money
            </a>
          </li>
          <li className="mb-2">
            <strong>Grievance Officer / Nodal & Compliance Officer:</strong> Ms.
            Priya Sharma
          </li>
          <li className="mb-2">
            <strong>Registered Office:</strong> Bridg Financial Technologies
            Pvt. Ltd., WorkFlo Ranka Junction, Property No. 224, 3rd Floor,
            #80/3, Old Madras Road, Bengaluru 560016, India
          </li>
          <li className="mb-3">
            <strong>Phone:</strong>{" "}
            <a href="tel:+91 76765 12809" className="underline text-blue-600">
              +91 76765 12809
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "9",
    heading: "Optional Website Enhancements ",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Visual Compliance Badges:</strong> RBI TSP alignment, ISO
            27001 (in progress).
          </li>
          <li className="mb-2">
            <strong>Trust by Numbers:</strong>Highlight uptime percentage,
            number of merchants onboarded, and transactions processed securely.
          </li>
          <li className="mb-2">
            <strong>Dedicated FAQ Section:</strong> Answer common security
            questions clearly (e.g., “Where is my data stored?” “How does escrow
            work?”).
          </li>
          <li className="mb-2">
            <strong>Annual Transparency Report:</strong> Share statistics on
            uptime, security incidents, and compliance audits.
          </li>
          <li className="mb-3">
            <strong>Certification Roadmap:</strong> Communicate future
            compliance milestones (e.g., SOC 2, PCI DSS if required, ISO 22301
            for business continuity).
          </li>
        </ul>
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
