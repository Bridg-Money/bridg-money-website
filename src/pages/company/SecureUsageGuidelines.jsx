import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";

const SecureUsageGuidelines = () => {
  return (
    <div className="contaier px-7 md:px-10">
      <h1 className="font-bold  text-3xl md:text-4xl pt-5 pb-10">
        Secure Usage Guidelines
      </h1>
      <section>
        <SidebarHighlight />
      </section>
    </div>
  );
};

export default SecureUsageGuidelines;

const headings = [
  {
    id: "1",
    heading: "Purpose",
    desc: (
      <>
        <p className="mb-2">
          These guidelines establish mandatory security controls and best
          practices for all users, merchants, developers, and partners who
          access or integrate with the bridg.money platform. They are designed
          to protect the confidentiality, integrity, and availability of systems
          and data while ensuring compliance with Indian regulations and
          international standards.
        </p>
        <p className="mb-3">The purpose of this document is to:</p>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            Provide a clear framework of security responsibilities for
            bridg.money and its ecosystem participants.
          </li>
          <li className="mb-2">
            Minimise risks of fraud, data breaches, financial loss, and
            reputational harm.
          </li>
          <li className="mb-2">
            Align bridg.money operations with RBI Master Directions, PCI-DSS,
            ISO 27001, and the Digital Personal Data Protection Act (DPDP 2023).
          </li>
          <li className="mb-2">
            Support safe innovation by guiding developers and partners in secure
            coding, integration, and operational practices.
          </li>
          <li className="mb-2">
            Reinforce customer and regulator trust by demonstrating proactive
            governance and transparency.
          </li>
          <li className="mb-3">
            Serve as a reference document for internal teams, auditors,
            regulators, and bank partners evaluating our security posture.
          </li>
        </ul>
        <p className="mb-3">
          These guidelines supplement – not replace – contractual obligations
          and applicable laws or regulations.
        </p>
      </>
    ),
  },
  {
    id: "2",
    heading: "Scope",
    desc: (
      <>
        <p className="mb-2">
          These guidelines apply to all categories of systems, users, and data
          that interact with bridg.money. They ensure that every stakeholder
          follows a consistent security standard and that critical
          infrastructure remains resilient against threats.
        </p>
        <p className="mb-3 font-bold">Category – Included Assets</p>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Interfaces:</strong> bridg.money web dashboard, mobile
            applications, API endpoints, SDKs, command-line utilities, and any
            future client-facing tools.
          </li>
          <li className="mb-2">
            <strong>Actors:</strong> Merchants, employees, contractors, service
            providers, developers, auditors, consultants, and integrated
            third-party systems.
          </li>
          <li className="mb-2">
            <strong>Data:</strong> Any personal, financial, transactional, or
            business data processed, stored, or transmitted via bridg.money
            infrastructure, including KYC/AML information, reconciliation data,
            logs, and audit trails.
          </li>
          <li className="mb-2">
            <strong>Infrastructure:</strong> Core systems, servers, databases,
            cloud environments, monitoring tools, APIs, CI/CD pipelines, and
            backup/disaster recovery systems used to support bridg.money
            operations.
          </li>
        </ul>
        <p className="mb-3">
          The scope extends across production, sandbox, and test environments,
          and applies to both internal users and external partners. These
          guidelines are binding for all parties engaging with bridg.money’s
          technology stack.
        </p>
      </>
    ),
  },
  {
    id: "3",
    heading: " Key Definitions",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>2FA:</strong> Two-Factor Authentication (OTP / authenticator
            app).
          </li>
          <li className="mb-2">
            <strong>API Key:</strong> Credential issued to integrate
            programmatically with bridg.money.
          </li>
          <li className="mb-2">
            <strong>Sensitive Data:</strong> Personally identifiable information
            (PII), financial data, authentication secrets, and any data
            classified Confidential or above.
          </li>
          <li className="mb-2">
            <strong>RBAC:</strong> Role-Based Access Control.
          </li>
          <li className="mb-2">
            <strong>DPO:</strong> Data Protection Officer.
          </li>
          <li className="mb-3">
            <strong>CISO:</strong> Chief Information Security Officer,
            responsible for governance, audits, and regulatory liaison.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "4",
    heading: "Security Governance",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Risk Ownership:</strong> Each merchant is responsible for
            safeguarding its own credentials, infrastructure, and customer data.
          </li>
          <li className="mb-2">
            <strong>Shared Responsibility Model:</strong> bridg.money secures
            core platform infrastructure; users secure their endpoints and
            usage.
          </li>
          <li className="mb-2">
            <strong> Leadership Roles:</strong> The CISO and DPO oversee policy
            compliance, incident response, and regulator liaison.
          </li>
          <li className="mb-2">
            <strong>Annual Review:</strong> These guidelines are reviewed every
            12 months or upon major regulatory change.
          </li>
          <li className="mb-2">
            <strong>Board Oversight:</strong> The Board of Directors receives
            quarterly dashboards on compliance, fraud trends, and incident
            response statistics.
          </li>
          <li className="mb-2">
            <strong>Policy Enforcement:</strong> Violations may result in
            suspension, termination, regulatory reporting, or legal action.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "5",
    heading: "Acceptable Use Requirements",
    desc: (
      <>
        <div className="mb-3">
          <h6 className="font-bold mb-3">Accounts & Credentials</h6>
          <ul className="mb-3 list-disc pl-4 md:pl-10">
            <li className="mb-2">
              Create accounts with unique, verifiable business email IDs –
              shared or group IDs are prohibited.
            </li>
            <li className="mb-2">
              Passwords must be ≥ 12 characters with at least 1 uppercase, 1
              lowercase, 1 digit, and 1 symbol.
            </li>
            <li className="mb-2">
              Enable 2FA for every administrator and finance role.
            </li>
          </ul>
        </div>
        <div className="mb-3">
          <h6 className="font-bold mb-3">Device Security</h6>
          <ul className="mb-3 list-disc pl-4 md:pl-10">
            <li className="mb-2">
              Keep operating systems, browsers, firmware, and antivirus
              solutions fully patched.
            </li>
            <li className="mb-2">
              Use full-disk encryption on laptops and mobile devices.
            </li>
            <li className="mb-2">
              Restrict privileged access to bridg.money dashboards to
              company-managed devices.
            </li>
            <li className="mb-3">
              Ensure background verification and NDA compliance for all
              employees handling sensitive data.
            </li>
          </ul>
        </div>
        <div className="mb-3">
          <h6 className="font-bold mb-3">Network Security</h6>
          <ul className="mb-3 list-disc pl-4 md:pl-10">
            <li className="mb-2">
              Access the dashboard via private or corporate networks; avoid
              public Wi-Fi.
            </li>
            <li className="mb-2">
              Use VPN or zero-trust access solutions where feasible.
            </li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold mb-3">Environment Hygiene</h6>
          <ul className="mb-3 list-disc pl-4 md:pl-10">
            <li className="mb-2">
              Do not use production data in sandbox or test environments.
            </li>
            <li className="mb-2">
              Disable default or unused accounts and services promptly.
            </li>
            <li className="mb-2">
              Conduct quarterly reviews of environment segregation and security
              patches.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: "6",
    heading: "Authentication & Access Control",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>RBAC:</strong> Assign least-privilege roles (Viewer, Ops,
            Finance, Admin).
          </li>
          <li className="mb-2">
            <strong>Quarterly Access Review:</strong> Re-validate all privileged
            roles every 90 days.
          </li>
          <li className="mb-2">
            <strong>Session Timeout:</strong> Auto-logout after 15 minutes of
            inactivity.
          </li>
          <li className="mb-2">
            <strong>API Key Scope:</strong> Restrict by IP, environment
            (test/live), service (payouts, VAM, etc.).
          </li>
          <li className="mb-2">
            <strong>Key Rotation:</strong> Rotate or regenerate keys at least
            every 90 days or immediately after suspected compromise.
          </li>
          <li className="mb-2">
            <strong>Credential Storage:</strong> Never embed keys in client-side
            code; use secure server-side vaults.
          </li>
          <li className="mb-2">
            <strong>Password Hashing:</strong> bridg.money hashes all passwords
            with bcrypt (cost 12).
          </li>
          <li className="mb-2">
            <strong>Audit Trails:</strong> Maintain complete logs of
            authentication, privilege escalations, and API key
            issuance/revocation for ≥ 5 years.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "7",
    heading: "Secure Development & Integration",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Environment Separation:</strong> Use Bridg sandbox for
            development; never test with live data.
          </li>
          <li className="mb-2">
            <strong>Secrets Management:</strong> Store API keys, JWT secrets,
            and database passwords in encrypted secret stores (e.g., AWS Secrets
            Manager, HashiCorp Vault).
          </li>
          <li className="mb-2">
            <strong>Secure Coding Standard:</strong> Follow OWASP ASVS 4.0 and
            SEI-CERT guidelines.
          </li>
          <li className="mb-2">
            <strong>SAST/DAST & Dependency Scanning:</strong> Run static,
            dynamic, and <strong>software-composition analysis (SCA)</strong>{" "}
            scans; remediate CVEs before deployment.
          </li>
          <li className="mb-2">
            <strong>Webhook Validation:</strong> All webhooks are signed
            (HMAC-SHA256). Verify the signature header before processing events.
          </li>
          <li className="mb-2">
            <strong>Rate Limiting:</strong> Implement retry logic with
            exponential back-off; do not exceed published rate limits.
          </li>
          <li className="mb-2">
            <strong>DNS Hygiene:</strong> Honour bridg.money DNS TTLs (no
            aggressive caching) to ensure quick fail-over & certificate
            rotation.
          </li>
          <li className="mb-2">
            <strong>API Lifecycle & Versioning:</strong> bridg.money publishes a
            stable, date-based API version (e.g., 2025-08-01) with a 6-month
            deprecation window for breaking changes. Multiple versions are
            supported concurrently; upgrade guides are provided.
          </li>
          <li className="mb-3">
            <strong>Code Reviews:</strong> Enforce peer reviews, unit testing,
            and CI/CD pipeline checks before production deployment.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "8",
    heading: "Data Protection & Privacy",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Data Collection:</strong> Collect only data necessary for
            the stated business purpose or legal obligation (data minimisation).
          </li>
          <li className="mb-2">
            <strong> Data Classification & Encryption:</strong>
            <ul className="mb-3 list-disc pl-4 md:pl-10">
              <li className="mb-2">
                Public: Product documentation → Optional encryption.
              </li>
              <li className="mb-2">
                Internal: Configuration files → Transport encryption (TLS).
              </li>
              <li className="mb-2">
                Confidential: PII, KYC docs, transaction data → AES-256 at rest
                + TLS in transit.
              </li>
            </ul>
          </li>
          <li className="mb-2">
            <strong> Retention & Disposal:</strong>
            <ul className="mb-3 list-disc pl-4 md:pl-10">
              <li className="mb-2">
                Retain transactional & KYC data for 8 years (per RBI Master
                Directions) or longer if legally mandated.
              </li>
              <li className="mb-2">
                Dispose of data securely (crypto-shred or DoD wipe) once
                retention period lapses.
              </li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Data-Subject Rights:</strong> bridg.money honours rights to
            access, correction, deletion, portability, and consent withdrawal
            under India’s DPDP Act and (if applicable) GDPR.
          </li>
          <li className="mb-2">
            <strong>Cross-Border Transfers:</strong> Data remains within India
            unless explicit consent and adequate safeguards exist for permitted
            regions (EU SCCs, BCRs, or equivalent mechanisms).
          </li>
          <li className="mb-3">
            <strong>Third-Party Data Processing:</strong> Vendors handling
            personal or sensitive data must sign binding Data Processing
            Agreements (DPAs).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "9",
    heading: "Transaction Security",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            All API and dashboard traffic must use TLS 1.2+; bridg.money rejects
            plain HTTP.
          </li>
          <li className="mb-2">
            Validate beneficiary name and account number (penny-drop or bank
            API) for payouts over INR 50,000.
          </li>
          <li className="mb-2">
            Enable maker-checker workflows on corporate payouts.
          </li>
          <li className="mb-2">
            bridg.money reviews fraud and AML patterns daily.
          </li>
          <li className="mb-2">
            Merchants must configure transaction-level approval thresholds (₹
            amount & risk category).
          </li>
          <li className="mb-3">
            Suspicious transactions are escalated to AML teams within 1 hour.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "10",
    heading: "Monitoring, Logging & Alerting",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2 font-bold">
            <strong>Transaction Logs:</strong> Retain for a minimum of 5 years;
            export via BridgRecon or API.
          </li>
          <li className="mb-2">
            <strong>Security Logs:</strong> Retain for 8 years; stored in
            tamper-evident, WORM-compliant storage.
          </li>
          <li className="mb-2">
            <strong> Anomaly Detection:</strong> Configure alerts for unusual
            spikes, geo-location anomalies, or repeated failures.
          </li>
          <li className="mb-3">
            Logs are periodically reviewed by the compliance and risk team.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "11",
    heading: "Incident Response & Reporting",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2 font-bold">
            <strong>Contain:</strong> Suspend affected API keys/users.
            bridg.money acknowledges within 24 hours.
          </li>
          <li className="mb-2">
            <strong> Report:</strong> Email security@bridg.money with incident
            details; Bridg provides an IR reference number.
          </li>
          <li className="mb-2">
            <strong>Investigate:</strong> Cooperate with Bridg investigators;
            interim updates: Sev 1 – hourly, Sev 2 – 4-hourly, Sev 3 – daily.
          </li>
          <li className="mb-2">
            <strong>Eradicate:</strong> Patch systems, reset credentials;
            confirm closure & preventive steps.
          </li>
          <li className="mb-3">
            <strong>Post-mortem:</strong> Share learnings & remediation plan;
            Bridg delivers incident report within 10 days.
          </li>
        </ul>
        <p className="mb-3">
          <strong>Safe-Harbor:</strong> Good-faith security researchers
          following our Responsible Disclosure programme will not face legal
          action, provided they do not exploit data and report promptly.
        </p>
      </>
    ),
  },
  {
    id: "12",
    heading: "Business Continuity & Disaster Recovery",
    desc: (
      <div>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            RTO ≤ 1 hour and RPO ≤ 15 minutes for critical services.
          </li>
          <li className="mb-2">
            Annual DR test conducted every Q2; summary results available on
            request.
          </li>
          <li className="mb-2">
            Incident updates are posted on status.bridg.money with email/SMS
            alerts for Sev 1 outages.
          </li>
          <li className="mb-3">
            Critical vendor dependencies are included in DR planning.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "13",
    heading: "Compliance & Audits",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            Platform certified against PCI-DSS v4.0 and aligned with ISO 27001
            controls.
          </li>
          <li className="mb-2">
            Annual VAPT performed by CERT-IN empanelled partners.
          </li>
          <li className="mb-2">
            SOC 2 Type II attestation in progress (target completion Q1 2026).
          </li>
          <li className="mb-2">
            bridg.money operates a private bug-bounty programme (invite-only).
          </li>
          <li className="mb-2">
            RBI/Bank Audits: bridg.money cooperates with RBI inspections,
            statutory auditors, and partner bank compliance reviews.
          </li>
          <li className="mb-3">
            FIU Reporting: AML monitoring and suspicious activity reports
            (STR/CTR) are filed with FIU-IND as required.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "14",
    heading: "Prohibited Activities",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            Money laundering, terror financing, corruption, child exploitation.
          </li>
          <li className="mb-2">
            High-risk categories (gambling, crypto, adult content) without
            explicit written approval.
          </li>
          <li className="mb-2">
            Unauthorized penetration testing, scraping, or denial-of-service
            attacks.
          </li>
          <li className="mb-3">
            Activities that compromise confidentiality, integrity, or
            availability of Bridg systems.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "15",
    heading: "Third-Party Services & Plugins",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            Use only vetted plugins/extensions that comply with these
            guidelines.
          </li>
          <li className="mb-2">
            Merchants must perform vendor security assessments for any
            third-party code touching Bridg APIs.
          </li>
          <li className="mb-2">
            Users are responsible for security of any code executed on their
            infrastructure.
          </li>
          <li className="mb-3">
            bridg.money reviews third-party providers periodically for
            compliance with DPDP and RBI requirements.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "16",
    heading: "Updates to Guidelines",
    desc: (
      <>
        <p className="mb-5">
          This document may be revised to address new threats or regulations.
          The latest version is always available at{" "}
          <Link to="/security" className="text-blue-600 underline">
            www.bridg.money/security.
          </Link>{" "}
          Continued use constitutes acceptance of updates. API Deprecation
          Policy: Breaking API changes are communicated at least 6 months in
          advance. Clients have a rollback window of 72 hours after upgrade.
        </p>
      </>
    ),
  },
  {
    id: "17",
    heading: "Contact Information",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Security Incidents:</strong>{" "}
            <a
              href="emailto:security@bridg.money"
              className="text-blue-600 underline"
            >
              security@bridg.money
            </a>{" "}
            (24 × 7)
          </li>
          <li className="mb-2">
            <strong>General Support:</strong>{" "}
            <a
              href="emailto:hello@bridg.money"
              className="text-blue-600 underline"
            >
              hello@bridg.money
            </a>{" "}
            (09:00–18:00 IST, Mon–Fri)
          </li>
          <li className="mb-2">
            <strong>Phone Support:</strong>{" "}
            <a href="tel:+91 76765 12809" className="text-blue-600 underline">
              +91 76765 12809
            </a>{" "}
            (09:00–18:00 IST, Mon–Fri)
          </li>
          <li className="mb-3">
            <strong>Postal Address:</strong> Bridg Financial Technologies Pvt.
            Ltd., WorkFlo Ranka Junction, Property No. 224, 3rd Floor, #80/3,
            Vijinapura Village, Old Madras Road (OMR), KR Puram Hobli, Bengaluru
            - 560016, India
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "18",
    heading: "Quick Reference",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">Passwords ≥ 12 chars + 2FA</li>
          <li className="mb-2">
            Never share or hard-code API keys; rotate every 90 days.
          </li>
          <li className="mb-2">HTTPS only; verify webhook signatures.</li>
          <li className="mb-2">
            Monitor logs daily; investigate anomalies promptly.
          </li>
          <li className="mb-2">
            Report incidents to{" "}
            <a
              href="emailto:security@bridg.money"
              className="text-blue-600 underline"
            >
              security@bridg.money
            </a>{" "}
            within 24 hours.
          </li>
          <li className="mb-2">
            Follow API deprecation notices; migrate within 6 months to avoid
            disruption.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "19",
    heading: "Policy Governance",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Document ID:</strong> SG-001
          </li>
          <li className="mb-2">
            <strong>Owner:</strong> Chief Information Security Officer (CISO)
          </li>
          <li className="mb-2">
            <strong>Approval Authority:</strong> Board of Directors
          </li>
          <li className="mb-2">
            <strong>Versioning Scheme:</strong> Semantic (major.minor.patch).
            Operational changes increment minor; textual fixes increment patch.
          </li>
          <li className="mb-2">
            <strong>Distribution:</strong> Confluence (HTML) & Signed PDF
            (SHA-256 checksum).
          </li>
          <li className="mb-2">
            <strong>Next Review Due:</strong> 01 September 2026
          </li>
          <li className="mb-2">
            <strong>Supersedes:</strong> All prior Secure Usage Guidelines
          </li>
          <li className="mb-2">
            <strong>Change Log:</strong> Stored in Git; diff summary available
            on request.
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
    <>
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
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
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

        <div className="flex-1 space-y-10 md:px-5 lg:pl-10 w-screen overflow-hidden">
          {headings.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-28">
              <h2 className="text-2xl font-bold mb-3">{sec.heading}</h2>
              <section>{sec.desc}</section>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
