import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";

const GrievanceRedressalPolicy = () => {
  return (
    <div className="contaier px-7 md:px-10">
      <h1 className="font-bold md:pl-3 text-3xl md:text-4xl pt-5 pb-10">
        Grievance Redressal Policy
      </h1>
      <section>
        <SidebarHighlight />
      </section>
    </div>
  );
};

export default GrievanceRedressalPolicy;

const headings = [
  {
    id: "1",
    heading: "Purpose & Scope",
    desc: (
      <div>
        <p className="mb-5">
          This Policy describes how Bridg Financial Technologies Pvt. Ltd.
          (“bridg.money”, “we”, “our” or “us”) receives, investigates, and
          resolves grievances related to its products, services, personnel,
          partners, or platform. It applies to prospective / on‑boarded
          merchants, end‑customers, website visitors, suppliers, contractors,
          employees, and the general public.
        </p>
        <p className="mb-5">The framework is designed to meet or exceed:</p>

        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            RBI Integrated Ombudsman Scheme 2021 & Payment Aggregator / Gateway
            Directions
          </li>
          <li className="mb-2">
            Information Technology Act 2000 & Intermediary Rules 2021 (15‑day
            disposal rule)
          </li>
          <li className="mb-2">Consumer Protection (E‑commerce) Rules 2020</li>
          <li className="mb-2">
            Industry best practice in grievance redressal adopted by regulated
            entities
          </li>
          <li className="mb-2">
            Industry best practice adopted by Razorpay, Cashfree, Paytm, etc
          </li>
          <li className="mb-2">
            Internal Bridg policies including BridgCollect (virtual accounts &
            UPI collections), BridgVerify / BridgOnboard (KYC/KYB & merchant
            onboarding tools), BridgPay and BridgRoute APIs
          </li>
        </ul>
        <p className="mb-3">
          <strong>Zero Fees</strong> – bridg.money does not charge any fee at
          any stage of the grievance process.
        </p>
      </div>
    ),
  },
  {
    id: "2",
    heading: "Governance & Oversight",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            The Board of Directors approves this Policy and reviews grievance
            dashboards quarterly.
          </li>
          <li className="mb-2">
            A Nodal & Compliance Officer is appointed to oversee implementation
            and ensure regulatory filings.
          </li>
          <li className="mb-2">
            The Board is responsible for ensuring adequate resources,
            independence, and authority for the grievance function.
          </li>
        </ul>
        <p className="font-bold mb-3">Nodal & Compliance Officer:</p>
        <p>Ms. Priya Sharma</p>
        <p>Senior Compliance Manager</p>
        <p>
          Email:{" "}
          <a
            href="mailto:compliance@bridg.money"
            className="text-blue-600 underline"
          >
            compliance@bridg.money
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+91 76765 12809" className="text-blue-600 underline">
            +91 76765 12809
          </a>
        </p>
        <p>
          Address: WorkFlo Ranka Junction, Property No. 224, 3rd Floor, #80/3
          Old Madras Road, Bengaluru 560016, India
        </p>
      </>
    ),
  },
  {
    id: "3",
    heading: "Key Definitions",
    desc: (
      <>
        <p className="mb-2">
          <strong>Complaint / Grievance:</strong> Written or verbal expression
          of dissatisfaction about any bridg.money product, service, process,
          employee, or partner.
        </p>
        <p className="mb-2">
          <strong>Complainant:</strong> Person or entity lodging the grievance.
        </p>
        <p className="mb-2">
          <strong>Dispute / Chargeback:</strong> Challenge raised against a
          transaction by a cardholder / customer through their issuing bank.
        </p>
        <p className="mb-3">
          <strong>Working Day:</strong> Monday–Friday, 10 a.m.–6 p.m. IST
          (excluding Indian public holidays).
        </p>
      </>
    ),
  },
  {
    id: "4",
    heading: "Typical Grievance Categories",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">Failed or delayed payout / settlement</li>
          <li className="mb-2">Unauthorised or duplicate debit</li>
          <li className="mb-2">KYC / onboarding dispute</li>
          <li className="mb-2">Data‑privacy or confidentiality breach</li>
          <li className="mb-2">
            Chargeback, refund, or failed‑transaction issue
          </li>
          <li className="mb-2">
            Misconduct by bridg.money personnel or partners
          </li>
          <li className="mb-2">Policy or process non‑compliance</li>
        </ul>
      </>
    ),
  },
  {
    id: "5",
    heading: "How to Lodge a Complaint",
    desc: (
      <>
        <ul className="mb-3">
          <li className="mb-2">
            <strong>Web Form:</strong>{" "}
            <Link className="text-blue-600 underline" to="/support">
              https://www.bridg.money/support
            </Link>{" "}
            — auto‑generates a ticket & reference ID
          </li>
          <li className="mb-2">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@bridg.money"
              className="text-blue-600 underline"
            >
              support@bridg.money
            </a>
          </li>
          <li className="mb-2">
            <strong>Phone:</strong>{" "}
            <a href="tel:+91 76765 12809" className="text-blue-600 underline">
              +91 76765 12809
            </a>{" "}
            (10 a.m.–6 p.m., Mon–Fri)
          </li>
          <li className="mb-2">
            <strong>Post / Courier:</strong> Grievance Desk, Bridg Financial
            Technologies Pvt. Ltd., WorkFlo Ranka Junction, Property No. 224,
            3rd Floor, #80/3 Old Madras Road, Bengaluru 560016, India
          </li>
          <li className="mb-2">
            <strong>In‑Person:</strong> By prior appointment at the corporate
            office
          </li>
          <li className="mb-2">
            <strong>Acknowledgement:</strong> Reference ID emailed within 24–48
            hours.
          </li>
          <li className="mb-2">
            <strong>Track Status:</strong> Self‑service portal:
            <Link className="text-blue-600 underline" to="/support/status">
              https://www.bridg.money/support/status
            </Link>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "6",
    heading: "Escalation Matrix & Timelines",
    desc: (
      <div className="pl-4">
        <div className="mb-3">
          <p className="font-bold mb-2">L1 – Customer Success</p>
          <p className="mb-1">
            Email:{" "}
            <a
              href="mailto:support@bridg.money"
              className="text-blue-600 underline"
            >
              support@bridg.money
            </a>
          </p>
          <p className="mb-1">First Response: ≤ 2 working days</p>
          <p className="mb-1">Resolution SLA: ≤ 10 working days</p>
        </div>
        <div className="mb-3">
          <p className="font-bold mb-2">L2 – Grievance Officer</p>
          <p className="mb-1">
            Email:{" "}
            <a
              href="mailto:grievance@bridg.money"
              className="text-blue-600 underline"
            >
              grievance@bridg.money
            </a>
          </p>
          <p className="mb-1">First Response: ≤ 3 working days</p>
          <p className="mb-1">
            Resolution SLA: ≤ 15 calendar days (IT Act cap)
          </p>
        </div>
        <div className="mb-3">
          <p className="font-bold mb-2">L3 – Nodal & Compliance Officer</p>
          <p className="mb-1">
            Email:{" "}
            <a
              href="mailto:compliance@bridg.money"
              className="text-blue-600 underline"
            >
              compliance@bridg.money
            </a>
          </p>
          <p className="mb-1">First Response: ≤ 5 working days</p>
          <p className="mb-1">Resolution SLA: ≤ 30 working days</p>
        </div>
        <div className="mb-3">
          <p className="font-bold mb-2">L4 – RBI Integrated Ombudsman</p>
          <p className="mb-1">
            Portal:{" "}
            <a
              href="https://cms.rbi.org.in"
              className="text-blue-600 underline"
            >
              https://cms.rbi.org.in
            </a>{" "}
            or toll‑free 14448
          </p>
          <p className="mb-1">Resolution as per RBI timelines</p>
          <p className="mb-1">
            If additional time is required, an interim update with reasons and
            expected closure date will be provided. For IT Act matters, total
            disposal will never exceed 15 calendar days. At each escalation
            stage, the complainant will be informed of next‑level options if
            resolution is unsatisfactory.
          </p>
          <p className="mb-1">
            Ombudsman Eligibility: Escalate after 30 calendar days of first
            filing and within 1 year + 30 days of that filing.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "7",
    heading: "Dispute, Chargeback, Refund & Failed‑Transaction Handling",
    desc: (
      <>
        <p className="mb-1">
          <strong>Chargebacks:</strong> bridg.money notifies merchants of
          disputes and assists in gathering evidence. If the merchant accepts or
          fails to contest within network timelines, the amount is permanently
          debited.
        </p>
        <p className="mb-1">
          <strong>Refunds:</strong> Merchants may initiate refunds routed back
          through bridg.money’s escrow account; typical bank credit timeline is
          5–7 working days (may vary by network).
        </p>
        <p className="mb-1">
          <strong>Failed Transactions:</strong> Reversals are processed within
          the RBI‑prescribed TAT for the relevant payment mode. Refunds and
          reversals also comply with NPCI / Visa / Mastercard / RuPay timelines.
          Compensation is paid to customers where delays exceed TAT.
        </p>
        <p className="mb-1">
          <strong>Compensation:</strong> Legitimate monetary losses from
          unauthorised debits or operational errors are reversed or compensated,
          in line with RBI’s electronic‑transaction liability framework.
        </p>
        <p className="mb-3">
          <strong>Merchant Responsibility:</strong> Merchants remain responsible
          for resolving disputes relating to goods/services; bridg.money
          facilitates financial redressal only.
        </p>
      </>
    ),
  },
  {
    id: "8",
    heading: "Fraud Alerts & Law‑Enforcement Cooperation",
    desc: (
      <div>
        <p className="mb-3">
          Upon receiving alerts from Law‑Enforcement Agencies (LEA) via NCRP
          portal or other authorised channels, bridg.money will:
        </p>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">Freeze or monitor suspected transactions.</li>
          <li className="mb-2">
            Assist LEA with evidence, subject to legal and privacy requirements.
          </li>
          <li className="mb-2">
            Adhere to directions for fund recovery or merchant suspension.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "9",
    heading: "Accessibility & Language Support",
    desc: (
      <>
        <p className="mb-3">
          Support is available in English, Hindi, and Kannada. Alternative
          formats (large‑print / screen‑reader‑friendly) are provided upon
          request.
        </p>
      </>
    ),
  },
  {
    id: "10",
    heading: "Record‑Keeping & Review",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4  md:pl-10">
          <li className="mb-2">
            Grievance records are retained for ≥ 5 years post‑closure.
          </li>
          <li className="mb-2">
            Quarterly dashboards & root‑cause analyses are reviewed by senior
            management and the Board.
          </li>
          <li className="mb-2">
            Annual policy review, or earlier if mandated by law/regulator.
          </li>
          <li className="mb-3">
            Public disclosure: Aggregate grievance statistics (volume,
            resolution, TAT) will be published annually on our website.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "11",
    heading: "Confidentiality & Data Protection",
    desc: (
      <>
        <p className="mb-2">
          Personal data is processed as per our Privacy Policy and protected by
          technical/organisational safeguards. Exceptions to confidentiality
          apply only when disclosure is
        </p>
        <p className="mb-1">(a) compelled by law.</p>
        <p className="mb-1">(b) in the public interest, or </p>
        <p className="mb-1">(c) essential to protect bridg.money’s rights.</p>
      </>
    ),
  },
  {
    id: "12",
    heading: "Regulatory Reporting & Public Disclosure",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4  md:pl-10">
          <li className="mb-2">
            Nodal Officer details and this Policy are displayed prominently on{" "}
            <Link to="/" className="text-blue-600 underline">
              https://www.bridg.money.
            </Link>
          </li>
          <li className="mb-2">
            bridg.money submits periodic grievance reports to RBI and any other
            regulators, as required.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "13",
    heading: "Policy Updates",
    desc: (
      <>
        <p className="mb-3">
          Material amendments are posted on the website 15 days before they take
          effect.
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
            <h2 className="text-2xl font-bold mb-3">{sec.heading}</h2>
            <section>{sec.desc}</section>
          </section>
        ))}
      </div>
    </div>
  );
}
