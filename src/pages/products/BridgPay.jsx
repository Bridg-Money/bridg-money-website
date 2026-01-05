import React, { useEffect, useRef, useState } from "react";
import { TextFade } from "@/components/Animation";
import { Button, TitleDecor } from "@/components/Component";
import HeroSvg from "../../assets/svg/bridgPay/hero.svg";
import HowItWorksSvg from "../../assets/svg/bridgPay/how-it-works.svg";
import ConnectedBankingSvg from "../../assets/svg/bridgPay/connected-banking.svg";
import BulkPaymentSvg from "../../assets/svg/bridgPay/bulk-payment.svg";
import SmartBillPaymentSvg from "../../assets/svg/bridgPay/smart-bill-payment.svg";
import VendorPaymentSvg from "../../assets/svg/bridgPay/vendor-payment.svg";
import BusinessOwnerIcon from "../../assets/svg/bridgPay/icons/business-owners.svg";
import FinanceTeamIcon from "../../assets/svg/bridgPay/icons/finance-teams.svg";
import OparationManagersIcon from "../../assets/svg/bridgPay/icons/operation-managers.svg";
import ProductTeamsIcon from "../../assets/svg/bridgPay/icons/product-teams.svg";
import CTADecorSvg from "../../assets/svg/cta-decor.svg";
import { motion, useScroll, useTransform } from "motion/react";
import MetaData from "@/components/Meta";

const BridgPay = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: featureRef,
    offset: ["start start", "end end"],
  });

  const features = [
    {
      id: 1,
      img: BulkPaymentSvg,
      heading: "Bulk Payments Made Easy",
      align: "left",
      bg: "#FFFCF5",
      clr: "black",
      text: (
        <p className="text-xl">
          Handle payouts and payroll in minutes with a simple CSV file upload.
          Our bank-tested system ensures accuracy while reducing your workload
          by up to 75%.
        </p>
      ),
    },
    {
      id: 2,
      img: SmartBillPaymentSvg,
      heading: "Smart Bill Payments & Reconciliation",
      align: "right",
      bg: "#0A0C33",
      clr: "white",
      text: (
        <>
          <p className="text-xl mb-3">
            Simplify vendor payouts while keeping your books accurate.
          </p>
          <p className="text-xl">
            Sync Tally, Zoho Books, or any major accounting tool and
            automatically reconcile bills with transactions on BridgPay.
          </p>
        </>
      ),
    },
    {
      id: 3,
      img: VendorPaymentSvg,
      heading: "Stay Ahead of Vendor Payments",
      align: "left",
      bg: "#FFFCF5",
      clr: "black",
      text: (
        <p className="text-xl">
          Monitor pending payouts and account balances with ease. Our dashboard
          ensures you never miss a due date and helps optimize cashflow
          management.
        </p>
      ),
    },
  ];

  const howItWorks = [
    {
      id: 1,
      heading: "Add Bills Swiftly",
      txt: "Create, upload, or import vendor invoices from Tally, Zoho Books, or Microsoft Dynamics 365",
    },
    {
      id: 1,
      heading: "Pay Vendors",
      txt: "You can directly pay your vendor from the bank of your choice via OPEN",
    },
    {
      id: 1,
      heading: "Reconcile Payments",
      txt: "Vendor payment reconciliation happens automatically on both OPEN as well as your accounting tool",
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

  useEffect(() => {
    let progressValue = 0;
    let interval = setInterval(() => {
      progressValue += 2;
      setProgress(progressValue);

      if (progressValue >= 100) {
        clearInterval(interval);
        setProgress(0);
        setActiveIndex((prev) =>
          prev === howItWorks.length - 1 ? 0 : prev + 1
        );
      }
    }, 100);

    return () => clearInterval(interval);
  }, [activeIndex, howItWorks.length]);

  return (
    <>
      <MetaData
        metas={{
          title:
            "BridgPay | Instant Payouts, Bulk Payments & Vendor Disbursements",
          desc: "BridgPay helps businesses automate payouts, payroll, and vendor payments via IMPS, UPI, NEFT, and RTGS. Run bulk payments, reconcile automatically, and manage cashflows in one platform.",
          ogTitle: "BridgPay – Fast, Reliable Business Payouts at Scale",
          ogDesc:
            "Send instant payouts, manage bulk vendor payments, and automate reconciliation with BridgPay. Built for speed, accuracy, and scalable business operations.",
        }}
      />

      <section className="px-6 pt-30 py-10 sm:px-15 xl:px-25">
        <div className="grid lg:grid-cols-2 xl:gap-x-5 gap-y-5">
          <div>
            <TitleDecor title="BridgPay" />
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold leading-12 lg:leading-16 xl:leading-18">
              Fast-Track Your Business Payouts with{" "}
              <span className="text-[#A5EB14]">BridgPay</span>
            </h1>
            <p className="my-3 lg:my-4 lg:pr-5 text-xl">
              Manage vendor disbursements seamlessly: Generate invoices,
              schedule payments, and track settlements in one unified flow —
              cutting down manual effort and ensuring error-free
              reconciliations.
            </p>
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

      <section className="my-15 px-3 md:px-10">
        <div className="bg-[#0A0C3306] py-10 md:py-15 rounded-2xl">
          <TextFade>
            <h2 className="text-center text-3xl lg:text-5xl pb-5 lg:pb-15 font-semibold">
              How it Works
            </h2>
          </TextFade>
          <div className="grid lg:grid-cols-2 xl:gap-x-5 gap-y-5">
            <div className="flex justify-center items-center px-5">
              <img
                src={HowItWorksSvg}
                alt="how it works"
                className="drop-shadow-[0px_4px_100px_#0A0C330D]"
              />
            </div>
            <div className="px-5 flex flex-col justify-center">
              {howItWorks.map((work, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`
              overflow-hidden transition-all border duration-500 rounded-lg shadow-[0px_0px_25px_0px_#00000008]
              flex flex-col my-3 cursor-pointer relative
               p-5
            `}
                  >
                    <h3
                      className={`text-[1.32rem] font-medium ${
                        isActive ? "mb-3" : ""
                      }`}
                    >
                      {work.heading}
                    </h3>

                    {isActive && (
                      <p className="text-gray-600 transition-opacity text-lg duration-700 mb-3">
                        {work.txt}
                      </p>
                    )}

                    {isActive && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                        <div
                          className="h-1 bg-black transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0C33] py-15 lg:py-20 px-5 my-30">
        <TextFade>
          <h2 className="text-center xl:px-50 text-white text-[33px] md:text-4xl lg:text-5xl xl:leading-16 font-semibold leading-12">
            Smart Banking Connections for Instant Transfers with{" "}
            <span className="text-[#A5EB14]">Connected Banking</span>
          </h2>
        </TextFade>
        <div className="flex justify-center py-10">
          <motion.img
            src={ConnectedBankingSvg}
            alt="connected banking"
            initial={{ scale: 0.9, opacity: 0.8 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </div>
        <TextFade>
          <p className="text-xl xl:px-50 text-center text-white pb-8">
            Integrate your accounts with BridgPay to automate bulk payments. Pay
            vendors and run payroll in real time using IMPS, UPI, NEFT, or RTGS.
          </p>
          <div className="flex justify-center">
            <Button text="Get Started" bgClr="#A5EB14" />
          </div>
        </TextFade>
      </section>

      <section
        ref={featureRef}
        className="relative flex flex-col justify-center"
      >
        {features.map((feature, idx) => {
          const targetScale = 1 - (features.length - idx) * 0.05;
          return (
            <FeaturesCard
              key={feature.id}
              idx={idx}
              feature={feature}
              range={[idx * 0.33, 1]}
              targetScale={targetScale}
              progress={scrollYProgress}
            />
          );
        })}
      </section>

      <section className="my-20 px-10 md:px-15">
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-5">
          Build For Your Team
        </h2>
        <div className="grid md:grid-cols-2 gap-4 my-10">
          {buildForYourTeam.map((team) => (
            <div
              className="hover:shadow-[0px_4px_100px_#0A0C330D] border rounded-3xl p-5"
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
        <div className="w-5xl px-5 rounded-2xl border border-[#A5EB14] py-17 bg-[#F9FFED] relative">
          <img
            src={CTADecorSvg}
            className="absolute object-cover z-0 pointer-events-none w-full h-full top-0 left-0 bottom-0 right-0"
          />
          <TextFade direction="up">
            <h1 className="text-center text-3xl md:text-5xl font-semibold mb-5">
              Ready to <span className="text-[#A5EB14]">Bridg</span> the Gap?
            </h1>
            <p className="text-center text-xl leading-8 mb-4 px-5 md:px-20 lg:px-30 xl:px-40">
              Join thousands of businesses using bridg.money to streamline their
              financial operations. Start accepting payments and managing
              payouts in minutes.
            </p>
          </TextFade>
          <div className="flex justify-center">
            <Button text="Book Demo" brClr="black" />
          </div>
        </div>
      </section>
    </>
  );
};

export default BridgPay;

const FeaturesCard = ({ feature, idx, range, progress, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <section
      className={`px-1 my-10 md:px-10 sticky`}
      style={{ top: `${idx * 40 + 100}px` }}
    >
      <motion.div
        className="py-15 rounded-2xl border"
        style={{ scale, backgroundColor: feature.bg, color: feature.clr }}
      >
        <div className="grid px-6 lg:px-15 lg:grid-cols-2 xl:gap-x-10 gap-y-5">
          <div
            className={`flex flex-col justify-center lg:pe-5 ${
              feature.align === "left" ? "order-1" : "order-2"
            }`}
          >
            <TitleDecor title="Features" />
            <h2 className="text-4xl md:text-5xl font-semibold mb-5 leading-12 md:leading-14">
              {feature.heading}
            </h2>
            <>{feature.text}</>
          </div>

          <div
            className={`px-5 flex justify-center ${
              feature.align === "left" ? "order-2" : "order-1"
            }`}
          >
            <img
              src={feature.img}
              className="h-70 lg:h-90 z-0 drop-shadow-[0px_4px_100px_#0A0C330D]"
              alt={feature.heading}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
