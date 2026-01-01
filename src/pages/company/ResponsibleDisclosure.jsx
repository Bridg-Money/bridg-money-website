import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";

const ResponsibleDisclosure = () => {
  return (
    <div className="contaier px-7 md:px-10">
      <h1 className="font-bold  text-3xl md:text-4xl pt-5 pb-10">
        Responsible Disclosure & Vulnerability Reporting Policy
      </h1>
      <section>
        <SidebarHighlight />
      </section>
    </div>
  );
};

export default ResponsibleDisclosure;

const headings = [
  {
    id: "1",
    heading: "Overview",
    desc: (
      <>
        <p className="mb-5">
          Responsible Disclosure is bridg.money’s public invitation to discover
          and privately report vulnerabilities before they can be exploited. As
          a Technology Service Provider (TSP) bridging banks and businesses, we
          rely on a robust security posture to safeguard every payment flow. By
          following this policy, you are authorised to conduct certain security
          research on specified assets without fear of legal action, provided
          you act in good faith and comply with the rules below.
        </p>
      </>
    ),
  },
  {
    id: "2",
    heading: "Definitions",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Researcher:</strong> Any individual or entity performing
            security testing under this policy.
          </li>
          <li className="mb-2">
            <strong>In-scope asset:</strong> A domain, sub-domain, API,
            application or environment explicitly listed in Scope of Testing.
          </li>
          <li className="mb-2">
            <strong>Vulnerability:</strong> A weakness that could compromise
            confidentiality, integrity or availability.
          </li>
          <li className="mb-2">
            <strong>Coordinated Disclosure:</strong> The process of privately
            reporting a vulnerability, allowing bridg.money time to remediate
            before public release.
          </li>
          <li className="mb-3">
            <strong>Safe-Harbour:</strong> Legal protection granted by
            bridg.money for authorised research activities performed in good
            faith
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "3",
    heading: "Scope of Testing",
    desc: (
      <>
        <p className="font-bold mb-3">Environment / Asset:</p>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">Merchant Dashboard (Production)</li>
          <li className="mb-2">
            Public APIs (BridgPay, BridgCollect, BridgRoute, BridgVault,
            BridgRecon)
          </li>
          <li className="mb-2">
            BridgVerify & BridgOnboard modules (KYC/KYB & onboarding tools)
          </li>
          <li className="mb-2">Sandbox partner portal (test integrations)</li>
          <li className="mb-2">
            Corporate website (
            <Link to="/" className="text-blue-600 underline">
              www.bridg.money
            </Link>
            , trust & security pages)
          </li>
          <li className="mb-2">Future mobile apps (when launched)</li>
          <li className="mb-3">
            New public-facing assets automatically enter scope upon launch
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "4",
    heading: "Eligibility & Safe-Harbour",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Who may participate?</strong> Any individual except (a)
            current bridg.money employees or contractors, or (b) residents of
            OFAC-sanctioned jurisdictions. Teams may collaborate but must
            designate a single payout recipient.
          </li>
          <li className="mb-2">
            <strong>Legal authorisation:</strong> Activities that comply fully
            with this policy are expressly authorised. bridg.money will not
            initiate civil or criminal action, nor escalate to law enforcement.
          </li>
          <li className="mb-2">
            <strong>Good faith requirement:</strong> Cease testing and report
            immediately if you access personal data or service disruption
            occurs. Do not retain, copy or share sensitive data.
          </li>
          <li className="mb-2">
            <strong>Compliance with law:</strong> Safe-harbour applies only to
            activity that adheres to applicable cyber-security and
            data-protection laws, including the Information Technology Act 2000
            (as amended) and related rules.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "5",
    heading: "Rules of Engagement",
    desc: (
      <>
        <p className="font-bold mb-3">Allowed:</p>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            Manual probing and targeted fuzzing of in-scope assets
          </li>
          <li className="mb-2">Testing your own accounts / test data</li>
          <li className="mb-2">Rate-limited automated scans ≤ 10 req/s</li>
          <li className="mb-2">
            Exploiting LFI, SSRF, IDOR, authentication bypass
          </li>
          <li className="mb-3">Sub-domain takeover confirmation</li>
        </ul>
        <p className="font-bold mb-3">Not Allowed:</p>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">Volumetric DoS / DDoS attacks</li>
          <li className="mb-2">
            Social engineering (phishing, vishing, smishing)
          </li>
          <li className="mb-2">
            Physical intrusion into offices or data centres
          </li>
          <li className="mb-2">Spam or brute-force credential stuffing</li>
          <li className="mb-3">
            Actions that modify or delete data without consent
          </li>
        </ul>
        <p className="mb-3">
          <strong>Tip:</strong> Include the header X-Researcher-Handle in test
          traffic to avoid being blocked by our fraud rules.
        </p>
      </>
    ),
  },
  {
    id: "6",
    heading: "Reporting Procedure",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            Send an encrypted email to{" "}
            <a href="emailto:security@bridg.money">security@bridg.money</a> (PGP
            fingerprint: E95E 1C83 39F0 D14A BD01 3B78 650B 00F4 2C2B 65D9).
          </li>
          <li className="mb-2">
            <strong>Subject line:</strong> [VULN] — .
          </li>
          <li className="mb-2">
            <strong>Body must include:</strong>
            <ul className="mb-2 list-disc pl-4 md:pl-10">
              <li className="mb-2">Asset/endpoint (URL, IP)</li>
              <li className="mb-2">
                Step-by-step PoC with requests, responses, screenshots or video
              </li>
              <li className="mb-2">Impact analysis</li>
              <li className="mb-2">Severity suggestion (CVSS v3.1)</li>
              <li className="mb-2">Proposed remediation (optional)</li>
            </ul>
          </li>
          <li className="mb-2">
            bridg.money responds within 3 business days and assigns a tracking
            ID.
          </li>
          <li className="mb-2">
            Public disclosure is permitted 30 days after a fix, or sooner with
            written approval.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "7",
    heading: "Assessment & SLAs",
    desc: (
      <>
        <ul className="mb-2 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Acknowledgement:</strong> ≤ 3 business days (automated
            receipt + analyst confirmation)
          </li>
          <li className="mb-2">
            <strong>Triage & Severity Assignment:</strong> ≤ 5 business days
            (CVSS 3.1 + business context)
          </li>
          <li className="mb-2">
            <strong>Remediation – Critical / High:</strong> ≤ 15 business days
            (compensating controls may be deployed first)
          </li>
          <li className="mb-2">
            <strong>Remediation – Medium / Low:</strong> ≤ 45 business days
            (part of scheduled release cycle)
          </li>
          <li className="mb-2">
            <strong>Status Updates to Researcher:</strong> Every 10 days until
            closure
          </li>
          <li className="mb-3">
            <strong>Duplicate reports:</strong> credit goes to the first valid
            submission; later duplicates are closed as informative.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "8",
    heading: "Reward Framework",
    desc: (
      <>
        <p className="mb-3">
          bridg.money offers competitive, severity-based rewards benchmarked
          against leading fintech programmes. Exact amounts are confidential;
          ranges below are indicative.
        </p>
        <ul className="mb-2 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Critical:</strong> Unauthenticated RCE, full account
            takeover, unrestricted SQLi → Hall of Fame, top-tier monetary
            reward, invite to private programmes
          </li>
          <li className="mb-2">
            <strong>High:</strong> Authentication bypass, serious SSRF, vertical
            privilege escalation → Hall of Fame, substantial monetary reward
          </li>
          <li className="mb-2">
            <strong>Medium:</strong> Reflected/DOM XSS, limited IDOR,
            misconfigured S3 bucket → Swag pack + discretionary monetary reward
          </li>
          <li className="mb-2">
            <strong>Low:</strong> Clickjacking, missing security headers,
            rate-limit gaps → Public thanks, possible swag
          </li>
        </ul>
        <p className="mb-3">
          Rewards are issued within 30 days of fix deployment via INR bank
          transfer or USD-pegged stable-coin. Tax withholding follows Indian
          regulations.
        </p>
      </>
    ),
  },
  {
    id: "9",
    heading: "Out-of-Scope / Non-Qualifying Issues",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            Informational findings without exploitable impact
          </li>
          <li className="mb-2">
            Attacks requiring outdated browsers or rooted devices
          </li>
          <li className="mb-2">
            Banner disclosure, server-version leaks, descriptive 404 pages
          </li>
          <li className="mb-2">Self-XSS, SPF/DMARC misconfigurations alone</li>
          <li className="mb-2">
            TLS/SSL cipher issues mandated by regulatory compliance
          </li>
          <li className="mb-2">
            Testing of partner-bank infrastructure or third-party rails without
            consent
          </li>
          <li className="mb-2">www ↔ non-www redirect preferences</li>
        </ul>
      </>
    ),
  },
  {
    id: "10",
    heading: "Hall of Fame",
    desc: (
      <>
        <p className="mb-3">
          Researchers who submit valid, first‑to‑report vulnerabilities may be
          listed (with consent) on our public Wall of Appreciation, including
          severity, vulnerability title and CVE (if issued). Anonymous credit
          available on request.
        </p>
      </>
    ),
  },
  {
    id: "11",
    heading: "Confidentiality & Data Use",
    desc: (
      <>
        <p className="mb-3">
          All submissions are treated as confidential. bridg.money handles
          vulnerability information in alignment with the Digital Personal Data
          Protection Act 2023 (DPDP 2023) and relevant RBI privacy circulars. We
          will not share your report outside our remediation team without
          permission, and request that you keep details private until
          coordinated disclosure timelines are met.
        </p>
      </>
    ),
  },
  {
    id: "12",
    heading: "Policy Lifecycle",
    desc: (
      <>
        <p className="pb-5">
          This policy is Version 1.0. This document is informational and does
          not create contractual rights or obligations. bridg.money may modify
          the policy at any time at its sole discretion. This policy is governed
          by the laws of India, and disputes shall be subject to the exclusive
          jurisdiction of the courts in Bengaluru, Karnataka. Future updates
          will be posted at{" "}
          <Link to="responsible-disclosure" className="text-blue-600 underline">
            https://www.bridg.money/responsible-disclosure
          </Link>{" "}
          with a 14‑day notice for material changes.
        </p>
      </>
    ),
  },
  {
    id: "13",
    heading: "Contact",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>Security Team:</strong>{" "}
            <a
              href="emailto:security@bridg.money"
              className="text-blue-600 underline"
            >
              security@bridg.money
            </a>
          </li>
          <li className="mb-2">
            <strong>Emergency phone (24 x 7):</strong> +91 76765 12809
          </li>
          <li className="mb-2">
            <strong>Postal address (legal notices):</strong> Bridg Financial
            Technologies Pvt Ltd, WorkFlo Ranka Junction, #80/3 Old Madras Road,
            Bengaluru 560016, India
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "14",
    heading: "Quick Summary",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            <strong>In‑scope:</strong> Prod dashboard, public APIs, sandbox
            partner portal, corporate site
          </li>
          <li className="mb-2">
            <strong>Report to:</strong>{" "}
            <a
              href="emailto:security@bridg.money"
              className="text-blue-600 underline"
            >
              security@bridg.money
            </a>{" "}
            (PGP) — Acknowledge ≤ 3 days
          </li>
          <li className="mb-2">
            <strong>Rewards:</strong> Severity‑based, competitive, paid within
            30 days post‑fix
          </li>
          <li className="mb-2">
            <strong>Forbidden tests:</strong> Phishing, DoS, physical intrusion,
            data destruction
          </li>
          <li className="mb-2">
            <strong>Safe‑harbour:</strong> Full legal protection when acting in
            good faith
          </li>
        </ul>
        <p className="mb-3">
          Thank you for partnering with us to keep bridg.money secure.
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
      <div className="flex mb-10">
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
