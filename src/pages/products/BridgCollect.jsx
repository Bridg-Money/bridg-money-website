import React from "react";
import { motion } from "motion/react";
import { TextFade } from "@/components/Animation";
import { Button, TitleDecor } from "@/components/Component";
import HeroSvg from "../../assets/svg/bridgCollect/hero.svg";
import CTADecorSvg from "../../assets/svg/cta decor.svg";
import CreateInvoiceSvg from "../../assets/svg/bridgCollect/Create Invoice.svg";
import TrackInvoiceAndPaymentSvg from "../../assets/svg/bridgCollect/Track invoices and payments.svg";
import GetPaidFasterSvg from "../../assets/svg/bridgCollect/Get paid faster.svg";
import AccountingIntegrationSvg from "../../assets/svg/bridgCollect/accounting Integration.svg";
import BusinessOwnerIcon from "../../assets/svg/bridgPay/icons/business owners.svg";
import FinanceTeamIcon from "../../assets/svg/bridgPay/icons/finance teams.svg";
import OparationManagersIcon from "../../assets/svg/bridgPay/icons/operation managers.svg";
import ProductTeamsIcon from "../../assets/svg/bridgPay/icons/product teams.svg";
import SmarterPaymentLinkSvg from "../../assets/svg/bridgCollect/collect smarter with payment links.svg";
import PaymentOptionSvg from "../../assets/svg/bridgCollect/Payment Options.svg";
import BankSettlementSvg from "../../assets/svg/bridgCollect/Bank Settlements.svg";
import ReconcileSvg from "../../assets/svg/bridgCollect/Reconcile.svg";
import EInvoicingSvg from "../../assets/svg/bridgCollect/e-invoicing.svg";
import InstantSettlementSvg from "../../assets/svg/bridgCollect/instant settlements.svg";
import PaymentWithFullControlImg from "../../assets/images/online-payment-with-full-control-bridg-collect.jpg";
import VerticalCarousel from "@/components/Carousel";
import fullControlSvg1 from "../../assets/svg/bridgCollect/icons/1.svg";
import fullControlSvg2 from "../../assets/svg/bridgCollect/icons/2.svg";
import fullControlSvg3 from "../../assets/svg/bridgCollect/icons/3.svg";
import fullControlSvg4 from "../../assets/svg/bridgCollect/icons/4.svg";
import fullControlSvg5 from "../../assets/svg/bridgCollect/icons/5.svg";
import fullControlSvg6 from "../../assets/svg/bridgCollect/icons/6.svg";

const BridgCollect = () => {
  const features = [
    {
      id: 1,
      img: PaymentOptionSvg,
      heading: "Flexible Payment Options",
      cols: 2,
      bg: "#F9F9FF",
      text: (
        <p className="text-lg">
          Let your customers pay the way they prefer—via UPI, bank transfers, or
          credit cards. Even split payments or settle against credit notes with
          ease.
        </p>
      ),
    },
    {
      id: 2,
      icon: BankSettlementSvg,
      heading: "Direct Bank Settlements",
      cols: 1,
      bg: "#E9FFF3",
      text: (
        <p className="text-lg">
          Every online payment is settled automatically into your bank account,
          ensuring accuracy and eliminating manual intervention.
        </p>
      ),
    },
    {
      id: 3,
      icon: ReconcileSvg,
      heading: "Reconcile Without the Effort",
      cols: 1,
      bg: "#FFFBF6",
      text: (
        <p className="text-lg">
          Automate reconciliation across all payments by syncing directly with
          tools like Tally and Zoho Books—cutting down on manual work and saving
          valuable time.
        </p>
      ),
    },
    {
      id: 4,
      img: EInvoicingSvg,
      heading: "Smart e-Invoicing",
      cols: 2,
      bg: "#FAFAFA",
      text: (
        <p className="text-lg">
          Save time with built-in GST e-invoicing. Auto-generate e-way bills
          with accurate details and share them effortlessly to keep your supply
          chain moving.
        </p>
      ),
    },
    {
      id: 5,
      img: InstantSettlementSvg,
      heading: "Instant Settlement",
      center: true,
      cols: 2,
      bg: "#FFF7F7",
      text: (
        <p className="text-lg">
          Boost your cashflow with immediate access to online customer payments
          with Open’s instant settlement option. This means you get cash-like
          access to all your customer payments - even if the customers pay using
          credit cards or net banking.
        </p>
      ),
    },
  ];

  const howItWorks = [
    {
      id: 1,
      heading: "Create invoice",
      txt: "Create and send customised invoices with GST split-up and payment link via email, SMS and WhatsApp.",
      icon: CreateInvoiceSvg,
    },
    {
      id: 2,
      heading: "Track invoices and payments",
      txt: "Track the status of payments on the Dashboard and send auto-payment reminders to customers.",
      icon: TrackInvoiceAndPaymentSvg,
    },
    {
      id: 3,
      heading: "Get paid faster",
      txt: "Accept and receive payments online, directly to your connected bank account, with an automated settlement process.",
      icon: GetPaidFasterSvg,
    },
  ];

  const buildForYourTeam = [
    {
      id: 1,
      icon: BusinessOwnerIcon,
      heading: "Business Owners",
      txt: "Gain full visibility into approvals and payments while staying focused on growth",
    },
    {
      id: 2,
      icon: FinanceTeamIcon,
      heading: "Finance Teams",
      txt: "Automate payouts and reconciliation to cut down on manual effort and errors",
    },
    {
      id: 3,
      icon: OparationManagersIcon,
      heading: "Operations Managers",
      txt: "Plan cashflow better and keep vendor and payroll disbursements on track",
    },
    {
      id: 4,
      icon: ProductTeamsIcon,
      heading: "Product Teams",
      txt: "Embed BridgPay APIs into your app or platform to power seamless transactions",
    },
  ];

  const PaymentWithFullControl = [
    {
      id: 1,
      icon: fullControlSvg1,
      text: " Generate and manage estimates, challans, sales orders, and invoices from one platform",
    },
    {
      id: 2,
      icon: fullControlSvg2,
      text: " Record and reconcile cash payments, partial payments, and credit notes with ease",
    },
    {
      id: 3,
      icon: fullControlSvg3,
      text: " Stay on top of due and overdue invoices with smart tracking and automated reminders",
    },
    {
      id: 4,
      icon: fullControlSvg4,
      text: " Enable automatic reconciliation by syncing payments directly with your accounting software",
    },
    {
      id: 5,
      icon: fullControlSvg5,
      text: " Share invoices with secure payment links for quick online collections",
    },
    {
      id: 6,
      icon: fullControlSvg6,
      text: " Receive funds directly into your connected bank account with seamless settlement",
    },
  ];

  return (
    <>
      <section className="px-6 pt-30 py-10 sm:px-15 xl:px-25">
        <div className="grid lg:grid-cols-2 xl:gap-x-5 gap-y-5">
          <div>
            <TitleDecor title="BridgCollect" />
            <h1 className="text-4xl lg:text-5xl xl:text-5xl font-semibold leading-12 lg:leading-14">
              Simplify Collections. Accelerate Cashflows.
            </h1>
            <p className="my-3 lg:my-4 lg:pr-5 text-xl">
              Generate GST-ready invoices, share them with built-in payment
              links, and let customers pay via UPI, bank transfers, cards, or
              netbanking. Stay on top with automated reminders, real-time
              tracking, and seamless settlements—all from one platform.
            </p>
            <Button text="Get Started" bgClr="#A5EB14" url="/contact" />
          </div>
          <div className="flex justify-center items-center px-5">
            <img
              src={HeroSvg}
              alt="bridgpay"
              className="drop-shadow-[0px_4px_100px_#0A0C330D] scale-95 hover:scale-100 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      <section className="my-15">
        <div className="bg-[url('./assets/images/how-it-works-bridg-collect.jpg')] overflow-hidden bg-fixed bg-no-repeat bg-cover px-3 md:px-10 py-10 md:py-25 rounded-2xl relative z-[-2]">
          <div className="absolute inset-0 bg-[#FFFFFFBF] z-[-1]" />
          <TextFade>
            <h2 className="text-center text-3xl lg:text-5xl pb-5 lg:pb-15 font-semibold z-1">
              How it Works
            </h2>
          </TextFade>
          <div className="grid lg:grid-cols-3 xl:gap-x-5 z-10 px-5 gap-y-5 pb-10">
            {howItWorks.map((works) => (
              <div
                className="bg-white p-5 text-center rounded-3xl border border-[linear-gradient(180deg, #9F9F9F 0%, #FFFFFF 100%)]"
                key={works.id}
              >
                <div className="flex justify-center my-3">
                  <img src={works.icon} className="h-10 w-10" />
                </div>
                <h2 className="text-xl font-semibold my-3">{works.heading}</h2>
                <p>{works.txt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-7 lg:px-25">
        <div className="grid gap-10 justify-center md:grid-cols-3">
          {features.map((feature, idx) => {
            const isLast = idx === features.length - 1;
            return (
              <div
                key={feature.id}
                className={`p-7 rounded-3xl w-full hover:shadow-lg ${
                  feature.cols === 2
                    ? "lg:col-span-2 grid gap-6 md:grid-cols-2"
                    : ""
                } ${isLast ? "md:col-start-2" : ""} `}
                style={{ backgroundColor: feature.bg }}
              >
                <div>
                  {feature.icon ? (
                    <div className="flex justify-center my-3">
                      <img src={feature.icon} className="h-15 w-15" />
                    </div>
                  ) : null}
                  <h2 className="text-2xl font-semibold my-3">{feature.heading}</h2>
                  {feature.text}
                </div>
                <div className="flex lg:justify-end">
                  <img src={feature.img} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="my-10 px-7 lg:px-25">
        <div className="grid md:grid-cols-3 md:gap-15">
          <div>
            <TitleDecor title="Feature" />
            <h2 className="text-4xl font-semibold mb-5">
              Accept Payments Online With Full Control
            </h2>
            <img
              src={PaymentWithFullControlImg}
              className="h-50 rounded-2xl object-center object-cover"
              alt="Accept Payments Online With Full Control"
            />
          </div>
          <div className="md:col-span-2 mt-10">
            <VerticalCarousel items={PaymentWithFullControl}>
              {(item, isActive) => (
                <div
                  key={item.id}
                  className={`ticker-card border hover:shadow-xl border-gray-200 rounded-lg p-4 flex gap-5 items-center flex-shrink-0 bg-white transition-all duration-300
      `}
                >
                  <div className="flex-shrink-0 flex justify-center items-center bg-[#EEEFFF] rounded-md p-3">
                    <img src={item.icon} className="h-5 w-5" />
                  </div>
                  <p className="text-lg m-0">{item.text}</p>
                </div>
              )}
            </VerticalCarousel>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0C33] py-15 lg:py-20 px-5 my-20">
        <TextFade>
          <h2 className="text-center xl:px-50 text-white text-[33px] md:text-4xl lg:text-5xl xl:leading-16 font-semibold leading-12">
            Collect Smarter with Payment Links
          </h2>
        </TextFade>
        <div className="flex justify-center py-10">
          <motion.img
            src={SmarterPaymentLinkSvg}
            alt="connected banking"
            initial={{ scale: 0.9, opacity: 0.8 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </div>
        <TextFade>
          <p className="text-xl xl:px-50 text-center text-white pb-8">
            Send invoices with built-in payment links and let customers pay you
            instantly—anytime, anywhere. With just a few clicks, payments can be
            made through bank transfers, UPI, credit cards, or other online
            methods, all settling directly into your connected bank account. No
            delays, no manual follow-ups—just faster payments with automated
            settlement.
          </p>
          <div className="flex justify-center">
            <Button bgClr="#A5EB14" text="Get Started" url="/contact" />
          </div>
        </TextFade>
      </section>

      <section className="relative flex flex-col justify-center">
        <section className="px-1 my-10 md:px-10">
          <motion.div className="bg-[#F9F9FA] py-15 rounded-2xl">
            <div className="grid px-6 lg:px-15 lg:grid-cols-2 xl:gap-x-10 gap-y-5">
              <div className={`px-5 flex justify-center`}>
                <img
                  src={AccountingIntegrationSvg}
                  className="h-70 lg:h-90 z-0 drop-shadow-[0px_4px_100px_#0A0C330D]"
                  alt="Real-Time Accounting Integration"
                />
              </div>
              <div className={`flex flex-col justify-center lg:pe-5`}>
                <TitleDecor title="Features" />
                <h2 className="text-4xl md:text-5xl font-semibold mb-5 leading-12 md:leading-14">
                  Real-Time Accounting Integration
                </h2>
                <p className="text-xl">
                  BridgCollect connects seamlessly with leading accounting tools
                  like Tally and Zoho Books. Every transaction is automatically
                  recorded, invoices are updated instantly, and your books stay
                  accurate without manual intervention.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </section>

      <section className="my-20 px-10 md:px-15">
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-5">
          Build For Your Team
        </h2>
        <div className="grid md:grid-cols-2 gap-4 my-15">
          {buildForYourTeam.map((team) => (
            <div
              className="hover:shadow-xl border rounded-2xl p-5"
              key={team.id}
            >
              <img
                src={team.icon}
                className="py-3 h-15 w-15"
                alt={team.heading}
              />
              <h6 className="text-xl font-semibold mb-2">{team.heading}</h6>
              <p className="text-lg mb-3">{team.txt}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 sm:px-20 my-10 md:my-15 flex justify-center">
        <div className="w-5xl px-5 rounded-2xl md:px-40 border border-[#A5EB14] py-17 bg-[#F9FFED] relative">
          <img
            src={CTADecorSvg}
            className="absolute object-cover z-0 pointer-events-none w-full h-full top-0 left-0 bottom-0 right-0"
          />
          <TextFade direction="up">
            <h1 className="text-center text-3xl md:text-5xl leading-12 lg:leading-14 font-semibold mb-5">
              Start Accepting Online Payments, Today!
            </h1>
          </TextFade>
          <div className="flex justify-center">
            <Button text="Get Started" bgClr="#A5EB14" url="/contact" />
          </div>
        </div>
      </section>
    </>
  );
};

export default BridgCollect;
