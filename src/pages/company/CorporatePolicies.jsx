import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

const CorporatePolicies = () => {
  return (
    <div className="contaier px-7 md:px-10">
      <h1 className="font-bold md:pl-3 text-3xl md:text-4xl lg:text-5xl pt-5 pb-7 lg:pb-10">
        Corporate Policies
      </h1>
      <section>
        <SidebarHighlight />
      </section>
    </div>
  );
};

export default CorporatePolicies;

const headings = [
  {
    id: "1",
    heading: "Code of Conduct",
    desc: (
      <>
        <p className="mb-3">
          bridg.money expects all employees, contractors, and partners to uphold
          integrity, fairness, and professionalism in every action. The Code of
          Conduct establishes principles of workplace ethics, anti-bribery
          commitments, conflict of interest disclosure, and compliance with
          applicable laws and regulations. It promotes transparency,
          accountability, and trust across all levels of the organisation.
          Breaches of the Code may result in disciplinary action, up to and
          including termination. Detailed version available in the Employee
          Handbook.
        </p>
      </>
    ),
  },
  {
    id: "2",
    heading: "POSH (Prevention of Sexual Harassment) Policy",
    desc: (
      <>
        <p className="mb-2">
          We are committed to a safe, inclusive, and respectful workplace.
          bridg.money strictly prohibits any form of sexual harassment in
          compliance with the POSH Act 2013. An Internal Complaints Committee
          (ICC) comprising trained members ensures that complaints are received,
          investigated, and resolved confidentially, fairly, and within
          statutory timelines. The policy also mandates awareness programmes and
          training to foster a culture of respect.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook
        </p>
      </>
    ),
  },
  {
    id: "3",
    heading: "IT & Email Usage Policy",
    desc: (
      <>
        <p className="mb-2">
          Company IT assets, networks, and email systems must be used
          responsibly and only for authorised business purposes. Misuse,
          unauthorised access, sharing of credentials, or installing unapproved
          software is strictly prohibited. This policy sets requirements for
          password hygiene, secure use of corporate email, monitoring protocols,
          and outlines penalties for misuse. It ensures IT resources are
          utilised to enhance productivity while safeguarding organisational
          security.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook.
        </p>
      </>
    ),
  },
  {
    id: "4",
    heading: "Confidentiality & Data Protection Policy",
    desc: (
      <>
        <p className="mb-2">
          Employees and partners must protect proprietary, customer, and
          personal data entrusted to bridg.money. Confidential information may
          not be disclosed without explicit authorisation. Data protection
          measures align with the DPDP Act 2023, RBI IT & Outsourcing
          Guidelines, and global best practices. The policy covers handling of
          sensitive data, NDA obligations, classification protocols, and
          penalties for breach. Maintaining confidentiality is central to client
          trust and regulatory compliance.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook.
        </p>
      </>
    ),
  },
  {
    id: "5",
    heading: "Leave & Attendance Policy",
    desc: (
      <>
        <p className="mb-2">
          Our leave and attendance framework ensures transparency, fairness, and
          compliance with applicable labour laws. Employees are entitled to
          specified categories of leave, including casual, sick, and earned
          leave, subject to company rules. Attendance is tracked through
          approved systems, and employees are expected to maintain punctuality.
          Leave encashment and carry-forward are not applicable. This policy
          balances employee welfare with operational needs.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook.
        </p>
      </>
    ),
  },
  {
    id: "6",
    heading: "Whistleblower / Vigil Mechanism Policy",
    desc: (
      <>
        <p className="mb-2">
          bridg.money provides a secure, confidential channel for employees,
          partners, and stakeholders to report unethical behaviour, fraud,
          financial irregularities, or misconduct without fear of retaliation.
          All reports are reviewed by the Vigil Committee and escalated to the
          Board, where required. The policy ensures protection for
          whistleblowers, investigation protocols, and compliance with Section
          177 of the Companies Act. It reinforces our zero-tolerance stance
          towards corruption or malpractice.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook.
        </p>
      </>
    ),
  },
  {
    id: "7",
    heading: "Equal Opportunity & Diversity Policy",
    desc: (
      <>
        <p className="mb-2">
          We are an equal opportunity employer and value diversity and
          inclusion. Recruitment, promotions, and workplace practices are free
          from discrimination on the basis of gender, age, religion, caste,
          disability, or sexual orientation. The policy ensures fair treatment,
          encourages diversity in hiring, and provides for grievance mechanisms
          in case of discrimination. This reflects our belief that diverse teams
          foster innovation, collaboration, and organisational growth.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook.
        </p>
      </>
    ),
  },
  {
    id: "8",
    heading: "Employee Disciplinary & Termination Policy",
    desc: (
      <>
        <p className="mb-2">
          Defines expected standards of conduct and outlines procedures for
          addressing misconduct, performance issues, or breaches of company
          policy. It describes processes for verbal/written warnings,
          suspension, and termination, ensuring fairness, proportionality, and
          compliance with Indian labour laws. This policy protects employee
          rights while maintaining discipline and operational integrity within
          the organisation.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook.
        </p>
      </>
    ),
  },
  {
    id: "9",
    heading: "Remote Work & BYOD Policy",
    desc: (
      <>
        <p className="mb-2">
          Outlines expectations for employees working remotely or using personal
          devices for work. The policy establishes requirements for secure VPN
          use, encryption, approved tools, and responsibility for protecting
          company data while offsite. It ensures productivity, security, and
          accountability in hybrid work models while balancing flexibility for
          employees.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook.
        </p>
      </>
    ),
  },
  {
    id: "10",
    heading: "Terms & Conditions",
    desc: (
      <>
        <p className="mb-2">
          Defines the legal agreement governing the use of bridg.money’s
          platform, products, and services. Covers rights and obligations of
          users and the company, limitations of liability, intellectual property
          protections, and dispute resolution mechanisms. It forms the legal
          foundation of customer relationships and ensures transparent, fair
          dealings.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook.
        </p>
      </>
    ),
  },
  {
    id: "11",
    heading: "Cookie Policy",
    desc: (
      <>
        <p className="mb-2">
          Explains how bridg.money uses cookies, tracking tools, and analytics
          to enhance user experience, improve services, and comply with legal
          requirements. It provides transparency on the categories of cookies
          used (essential, performance, analytics), retention timelines, and
          options for users to manage preferences. This ensures compliance with
          DPDP Act and IT Act disclosure norms.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook.
        </p>
      </>
    ),
  },
  {
    id: "12",
    heading: "AML, KYC & Customer Acceptance Policy",
    desc: (
      <>
        <p className="mb-2">
          Sets out how bridg.money complies with RBI Master Directions, PMLA
          2002, and FIU-IND guidelines. Defines customer due diligence (CDD),
          enhanced due diligence (EDD), restricted and prohibited businesses,
          transaction monitoring, and reporting obligations. It explains our
          approach to customer onboarding, ongoing monitoring, suspicious
          transaction reporting, and risk categorisation. This policy
          demonstrates our commitment to preventing money laundering and
          ensuring strong governance in customer acceptance.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook.
        </p>
      </>
    ),
  },
  {
    id: "13",
    heading: "Vendor & Third-Party Risk Management Policy",
    desc: (
      <>
        <p className="mb-2">
          bridg.money assesses all critical vendors and third-party service
          providers (e.g., cloud services, KYC partners, SMS gateways) for
          compliance with data security, confidentiality, and regulatory
          requirements before onboarding. Vendors must undergo due diligence,
          contractual review, and periodic monitoring. The policy ensures that
          third-party risks are identified, assessed, and mitigated, reducing
          vulnerabilities in the extended supply chain.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook.
        </p>
      </>
    ),
  },
  {
    id: "14",
    heading: "Business Continuity & Disaster Recovery (BCP/DR) Policy",
    desc: (
      <>
        <p className="mb-2">
          We maintain robust continuity and recovery protocols to minimise
          disruption of services. Critical systems have redundancy, and recovery
          time objectives (RTO ≤ 1 hour, RPO ≤ 15 minutes) are tested through
          quarterly drills. This policy includes incident communication, backup
          management, crisis management planning, and regular testing. It
          ensures resilience during outages or unforeseen events and
          demonstrates preparedness to regulators and partners.
        </p>
        <p className="mb-3">
          Detailed version available in the Employee Handbook.
        </p>
      </>
    ),
  },
  {
    id: "15",
    heading: "Governance & Oversight",
    desc: (
      <>
        <ul className="mb-3 list-disc pl-4 md:pl-10">
          <li className="mb-2">
            All policies are reviewed annually or earlier if mandated by law or
            regulator.
          </li>
          <li className="mb-2">
            The Board of Directors approves material updates and ensures
            oversight of compliance.
          </li>
          <li className="mb-2">
            Nodal & Compliance Officer ensures implementation, monitoring, and
            reporting across all teams.
          </li>
          <li className="mb-2">
            Training and awareness programmes are conducted to familiarise
            employees with their responsibilities under these policies.
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
