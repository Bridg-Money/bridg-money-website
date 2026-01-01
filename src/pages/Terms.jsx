import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

const TermsAndCondition = () => {
  return (
    <div className="contaier px-7 md:px-10">
      <h1 className="font-bold md:pl-3 text-3xl md:text-4xl pt-5 pb-10">
        Terms & Conditions
      </h1>
      <section>
        <SidebarHighlight />
      </section>
    </div>
  );
};

export default TermsAndCondition;

const headings = [
  {
    id: "1",
    heading: "Acceptance of Terms",
    desc: (
      <p className="mb-3">
        By accessing or using <strong>bridg.money</strong> (the “Platform”), you
        confirm that you have read, understood, and agree to be bound by these
        Website Terms & Conditions (the “Terms”). If you do not agree, you must
        immediately cease all use of the Platform.
      </p>
    ),
  },
  {
    id: "2",
    heading: "Eligibility & Authority",
    desc: (
      <div>
        <p className="mb-3">
          You represent that you (a) are at least 18 years old; (b) have full
          legal capacity to enter into a binding contract; and (c) are accessing
          the Platform on behalf of yourself or an entity you are duly
          authorised to represent. If you are acting for a business, “you” and
          “your” include that entity.
        </p>
      </div>
    ),
  },
  {
    id: "3",
    heading: "Definitions",
    desc: (
      <div className="overflow-x-auto">
        <p className="mb-3">
          <strong>
            "bridg.money,” “we,” “our,” and “us” refer to Bridg Financial
            Technologies Private Limited
          </strong>
          , an Indian company incorporated under the Companies Act 2013, having
          its registered office at WorkFlo Ranka
        </p>
        <p className="mb-5">
          Property No. 224, 3rd Floor, #80/3, Vijinapur Village, Old Madras
          Road, KR Puram Hobli, Bangalore – 560016.
        </p>
        <p className="mb-3">
          <strong>“Services”</strong> means all products, tools, APIs,
          dashboards, content, documentation, and support made available via the
          Platform, including BridgPay (Payouts), BridgCollect (Collections),
          BridgRecon (Reconciliation), BridgVault (Account Infrastructure &
          Escrow), BridgRoute (Routing Engine), BridgVerify/ Onboard (KYC/KYB),
          and ancillary solutions.
        </p>
        <p className="mb-5">
          <strong>“User”</strong> means any natural or legal person who visits,
          browses, registers, or uses the Platform.
        </p>
        <p className="mb-3">
          Other capitalised terms shall have meanings assigned in context.
        </p>
      </div>
    ),
  },
  {
    id: "4",
    heading: "Scope of Services",
    desc: (
      <div>
        <p className="mb-3">
          bridg.money acts as a{" "}
          <strong>Technology Service Provider (TSP).</strong> We are{" "}
          <strong>not a bank, NBFC, or payment aggregator.</strong> All
          underlying banking and settlement services are powered by partner
          financial institutions regulated by the Reserve Bank of India (“RBI”).
          Our Services facilitate, but do not independently execute, money
          movement. You acknowledge that transactions are ultimately processed
          by partner banks / payment networks and are subject to their terms.
        </p>
      </div>
    ),
  },
  {
    id: "5",
    heading: "Account Registration & Security",
    desc: (
      <div>
        <ul className="mb-3 list-disc pl-3 md:pl-10">
          <li className="mb-2">
            To access merchant‑specific modules, you must create an account,
            complete KYC/KYB, and accept any product‑specific agreements.
          </li>
          <li className="mb-2">
            You agree to provide accurate, complete information and keep it
            updated. We may suspend or terminate access if details are false,
            incomplete, or unverifiable.
          </li>
          <li className="mb-2">
            You are solely responsible for safeguarding credentials (username,
            password, API keys, tokens, certificates). All activity under your
            account is deemed authorised by you unless reported otherwise in
            writing.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "6",
    heading: "Compliance, KYC & AML",
    desc: (
      <div>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            We follow RBI/SEBI/UIDAI and related guidelines on client due
            diligence, anti‑money laundering (“AML”), and combating financing of
            terrorism (“CFT”).
          </li>
          <li className="mb-2">
            You must cooperate in supplying information, documents, or consents
            requested for compliance reviews.
          </li>
          <li className="mb-2">
            We may verify details with third‑party service providers or
            government databases.
          </li>
          <li className="mb-3">
            Failure to comply or suspicious activity may result in suspension,
            reporting to authorities, or termination without liability.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "7",
    heading: "Your Obligations",
    desc: (
      <div className="overflow-x-auto">
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            Use the Platform only for lawful business purposes and in accordance
            with applicable laws (including RBI Master Directions on IT-FS 2023,
            IT Act 2000, PCI DSS, and the Digital Personal Data Protection Act
            2023).
          </li>
          <li className="mb-2">
            Obtain and maintain all licences, registrations, and approvals
            required for your operations.
          </li>
          <li className="mb-2">
            Promptly notify us of any unauthorised access, security breach, or
            suspicious transaction within 6 hours of discovery (CERT-In
            timeline).
          </li>
          <li className="mb-2">
            Not impersonate another person, infringe intellectual property, or
            upload malicious code.
          </li>
          <li className="mb-3">
            Pay all fees, charges, taxes, and other amounts due in a timely
            manner.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "8",
    heading: "Acceptable‑Use Policy & Prohibited Activities ",
    desc: (
      <div>
        <p className="mb-3">You shall not:</p>
        <ul className="mb-3 list-disc pl-4  md:pl-10">
          <li className="mb-2">
            Use the Platform for illegal, fraudulent, or high-risk
            products/services including, but not limited to: drugs, gambling &
            betting, virtual currencies, deep-web/tor services, pornography,
            weapons, multi-level marketing, fantasy gaming, deepfakes, or any
            activity prohibited by RBI or partner-bank policies.
          </li>
          <li className="mb-2">
            Reverse-engineer, decompile, or attempt to derive source code.
          </li>
          <li className="mb-2">
            Interfere with or disrupt servers, networks, or security controls.
          </li>
          <li className="mb-2">
            Resell, lease, or provide the Services to third parties except as
            expressly permitted.
          </li>
          <li className="mb-3">
            Exceed fair-use thresholds or API rate limits set by bridg.money.
          </li>
        </ul>
        <p className="mb-3">
          We may update this policy at any time; continued use constitutes
          acceptance of updates.
        </p>
      </div>
    ),
  },
  {
    id: "9",
    heading: "Fees, Taxes & Settlement",
    desc: (
      <ul className="mb-3 list-disc pl-4  md:pl-10">
        <li className="mb-2">
          Pricing models (per-transaction, subscription, or bespoke) are set
          forth in executed order forms or merchant agreements.
        </li>
        <li className="mb-2">
          All fees are exclusive of GST and other applicable taxes. You are
          responsible for reporting and remitting taxes.
        </li>
        <li className="mb-2">
          Settlement timelines are subject to partner-bank clearing cycles and
          applicable regulations.
        </li>
      </ul>
    ),
  },
  {
    id: "10",
    heading: "Intellectual Property & API Licence",
    desc: (
      <div>
        <ul className="mb-3 list-disc pl-4  md:pl-10">
          <li className="mb-2">
            All software, APIs, dashboards, text, graphics, and other content on
            the Platform (collectively, “IP”) are owned by bridg.money or its
            licensors. You receive a limited, revocable, non-exclusive,
            non-transferable licence to use the IP solely to access the
            Services.
          </li>
          <li className="mb-2">
            <strong>API Keys.</strong> API keys are confidential, personal to
            you, and must not be shared, sublicensed, or hard-coded in
            open-source repositories. We may revoke keys to enforce compliance,
            mitigate security risks, or address excessive usage.
          </li>
          <li className="mb-2">
            <strong>Rate Limits.</strong> We may impose rate limits per IP
            address, account, or endpoint. Automated calls beyond limits may be
            blocked.
          </li>
          <li className="mb-2">
            You shall not create derivative works, scrape, or build competing
            services using our APIs without written consent.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "11",
    heading: "Confidentiality",
    desc: (
      <div>
        <ul className="mb-3 list-disc pl-4  md:pl-10">
          <li className="mb-2">
            “Confidential Information” means non-public information disclosed by
            either party (“Discloser”) to the other (“Recipient”) that is
            designated confidential or that a reasonable person would understand
            to be confidential
          </li>
          <li className="mb-2">
            Recipient shall (i) use Confidential Information solely to perform
            obligations under these Terms; (ii) not disclose it to third parties
            except to employees, affiliates, or advisors on a need-to-know basis
            who are bound by similar obligations; and (iii) protect it with at
            least the same degree of care it uses for its own confidential data
            (and no less than reasonable care).
          </li>
          <li className="mb-2">
            Exclusions: information that is (i) publicly available without
            breach; (ii) rightfully received from a third party without duty of
            confidentiality; (iii) independently developed without use of
            Confidential Information; or (iv) required to be disclosed by law or
            court order (with prompt notice to Discloser, where lawful).
          </li>
          <li className="mb-2">
            Obligations survive <strong>3 years</strong> post-termination,
            except trade secrets (indefinitely).
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "12",
    heading: "Data Privacy, Security & Retention",
    desc: (
      <div>
        <ul className="mb-3 list-disc pl-4  md:pl-10">
          <li className="mb-2">
            We process personal data in accordance with our{" "}
            <strong>Privacy Policy</strong> and industry standards (ISO 27001,
            PCI DSS v4). You agree to adopt equivalent safeguards.
          </li>
          <li className="mb-2">
            <strong>Retention.</strong> Transaction & KYC records are retained
            for a minimum of <strong>5 years</strong> from the date of creation
            or longer if required by RBI/SEBI/ED. Non-regulatory data may be
            deleted upon your written request, subject to legal holds.
          </li>
          <li className="mb-3">
            <strong>Security-Incident Notification.</strong> Each party shall
            notify the other of any actual or suspected data breach or security
            incident within <strong>6 hours</strong> of becoming aware (per
            CERT-In Directive 2022). Notifications shall include nature of
            incident, data affected, mitigation steps, and further actions
            required.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "13",
    heading: "Service Levels & Availability",
    desc: (
      <div>
        <ul className="mb-3 list-disc pl-4  md:pl-10">
          <li className="mb-2">
            We target <strong>99.5 % monthly API uptime,</strong> excluding (i)
            scheduled maintenance (with at least 24‑hour prior notice via
            dashboard/email) and (ii) force‑majeure events.
          </li>
          <li className="mb-3">
            Your sole remedy for failure to meet service levels is a
            service-credit (not cash) equal to a pro-rated portion of fees for
            the affected period, provided you submit a written claim within 30
            days.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "14",
    heading: "Representations & Warranties",
    desc: (
      <div>
        <p className="mb-3">
          Each party represents and warrants that: (a) it has full power and
          authority to enter into these Terms; (b) its execution does not
          violate any other agreement; (c) it will comply with all applicable
          laws and regulations; and (d) it will not knowingly infringe the
          intellectual‑property rights of any third party.
        </p>
      </div>
    ),
  },
  {
    id: "15",
    heading: "Disclaimer of Warranties",
    desc: (
      <div>
        <p className="mb-3">
          The Platform and Services are provided <strong>“as is”</strong> and{" "}
          <strong>“as available.”</strong> To the fullest extent permitted by
          law, we disclaim all warranties—express, implied, statutory—including
          merchantability, fitness for a particular purpose, accuracy,
          uninterrupted availability, and non-infringement.
        </p>
      </div>
    ),
  },
  {
    id: "16",
    heading: "Limitation of Liability",
    desc: (
      <div>
        <p className="mb-3">
          To the maximum extent permitted by law, bridg.money, its directors,
          officers, employees, or affiliates shall{" "}
          <strong>not be liable</strong> for (a) any indirect, incidental,
          special, consequential, punitive, or exemplary damages; (b) loss of
          profits, revenues, goodwill, or data; or (c) damages exceeding the{" "}
          <strong>
            aggregate fees paid by you to bridg.money in the 12 months preceding
            the claim,
          </strong>{" "}
          arising out of or related to the Platform or these Terms, regardless
          of the legal theory and even if advised of the possibility of such
          damages.
        </p>
      </div>
    ),
  },
  {
    id: "17",
    heading: "Indemnification",
    desc: (
      <div>
        <p className="mb-3">
          You agree to defend, indemnify, and hold harmless bridg.money and its
          affiliates from any claims, damages, liabilities, costs, and expenses
          (including reasonable attorneys’ fees) arising from (a) your use of
          the Platform; (b) violation of these Terms or applicable law; or (c)
          infringement of any third-party right.
        </p>
      </div>
    ),
  },
  {
    id: "18",
    heading: "Audit & Compliance Assistance",
    desc: (
      <div>
        <p className="mb-3">
          We, our banking partners, auditors, or regulators may, upon reasonable
          notice, audit your use of the Services (on‑site or remote) to verify
          compliance with these Terms, RBI guidelines, and partner‑bank
          requirements. You shall cooperate, provide access to records, and
          implement corrective actions at your cost.
        </p>
      </div>
    ),
  },
  {
    id: "19",
    heading: "Suspension & Termination",
    desc: (
      <div>
        <p className="mb-3">
          We may suspend or terminate your access with or without notice if we
          believe you have breached these Terms, violated law, or pose
          security/AML risk. Upon termination, rights granted under these Terms
          cease immediately. Sections regarding IP, Confidentiality, Indemnity,
          Liability, and Dispute Resolution survive termination.
        </p>
      </div>
    ),
  },
  {
    id: "20",
    heading: "Modifications to Platform or Terms",
    desc: (
      <div>
        <p className="mb-3">
          We may modify, suspend, or discontinue any part of the Platform and/or
          update these Terms at any time. Revised Terms will be posted with an
          updated “Last updated” date. Continued use constitutes acceptance.
        </p>
      </div>
    ),
  },
  {
    id: "21",
    heading: "Export‑Control & Sanctions Compliance",
    desc: (
      <div>
        <p className="mb-3">
          You shall not use the Platform if (a) you are located in, or a citizen
          of, a country subject to Indian Government or UN sanctions, or (b) you
          are on any sanctions or prohibited‑persons list. You agree to comply
          with all export‑control laws and trade‑embargo regulations
        </p>
      </div>
    ),
  },
  {
    id: "22",
    heading: "Feedback Licence",
    desc: (
      <div>
        <p className="mb-3">
          If you provide suggestions, ideas, or feedback regarding the Platform
          (“Feedback”), you grant bridg.money an irrevocable, sublicensable,
          worldwide licence to use, modify, and incorporate such Feedback
          without obligation or restriction.
        </p>
      </div>
    ),
  },
  {
    id: "23",
    heading: "Governing Law & Dispute Resolution",
    desc: (
      <div>
        <p className="mb-3">
          These Terms shall be governed by and construed in accordance with the
          laws of India without regard to conflict‑of‑laws rules. Any disputes
          shall be subject to the exclusive jurisdiction of the competent courts
          in <strong>Bangalore, Karnataka.</strong> bridg.money may, at its
          discretion, opt for binding arbitration under the Arbitration &
          Conciliation Act  1996, seated in Bangalore, with proceedings in
          English. The arbitral tribunal shall comprise a sole arbitrator
          appointed by bridg.money.
        </p>
      </div>
    ),
  },
  {
    id: "24",
    heading: "Notices & Electronic Signature",
    desc: (
      <div>
        <ul className="mb-3 list-disc pl-4  md:pl-10">
          <li className="mb-2">
            All notices shall be deemed delivered when (i) sent by email to your
            registered email address, or (ii) posted conspicuously on your
            dashboard. Notices to bridg.money must be sent to{" "}
            <a
              href="emailto:legal@bridg.money"
              className="underline text-blue-600"
            >
              legal@bridg.money
            </a>
          </li>
          <li className="mb-2">
            By clicking “I agree,” API‑key generation, or continuing to use the
            Platform, you adopt an electronic signature that is binding under
            the Information Technology Act 2000.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "25",
    heading: "Miscellaneous",
    desc: (
      <div>
        <ul className="mb-3 list-disc pl-4  md:pl-10">
          <li className="mb-2">
            <strong>Entire Agreement:</strong> These Terms constitute the entire
            agreement between you and bridg.money for website usage and
            supersede all prior understandings.
          </li>
          <li className="mb-2">
            <strong>Severability:</strong> If any provision is held
            unenforceable, the remaining provisions shall remain in effect.
          </li>
          <li className="mb-2">
            <strong>Waiver:</strong> Failure to enforce any right does not
            constitute a waiver
          </li>
          <li className="mb-2">
            <strong>Assignment:</strong> You may not assign or transfer rights
            without prior written consent. bridg.money may assign its rights and
            obligations to an affiliate or successor.
          </li>
          <li className="mb-2">
            <strong>Force Majeure:</strong> bridg.money is not liable for delay
            or failure caused by events beyond reasonable control (e.g., natural
            disaster, war, strikes, internet outages, government action).
          </li>
          <li className="mb-3">
            <strong>Survival:</strong> Sections relating to Confidentiality,
            Intellectual Property, Data Privacy, Fees, Limitation of Liability,
            Indemnity, Dispute Resolution, and Miscellaneous shall survive
            termination.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "26",
    heading: "Grievance Redressal & Contact",
    desc: (
      <div>
        <p className="mb-5">
          If you have questions, complaints, or require support, please contact:
        </p>
        <p className="mb-3 ps-3 md:ps-10">
          <strong>Grievance Officer</strong>\ Ms. Priya Menon (Designated
          Grievance Officer)\ Bridg Financial Technologies Private Limited\
          WorkFlo Ranka Junction, Property No. 224, 3rd Floor, #80/3, Old Madras
          Road, KR Puram Hobli, Bangalore – 560016, India\{" "}
          <strong>Email:</strong> security@bridg.money\{" "}
          <strong>Alternate Email:</strong> hello@bridg.money\{" "}
          <strong>Phone:</strong> +91 75756 12809\ Office Hours: 10:00 a.m. –
          6:00 p.m. IST, Monday – Friday (excluding Indian public holidays)
        </p>
        <p className="mb-3">
          We will acknowledge receipt of grievances within 48 hours and
          endeavour to resolve queries within 30 days, consistent with RBI and
          IT Act 2000 guidelines
        </p>
      </div>
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
            <h2 className="text-2xl font-bold mb-3">
              {sec.heading}
            </h2>
            <section>{sec.desc}</section>
          </section>
        ))}
      </div>
    </div>
  );
}
