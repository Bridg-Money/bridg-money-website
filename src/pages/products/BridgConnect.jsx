import React, { useEffect, useRef, useState } from "react";
import { TextFade } from "@/components/Animation";
import { Button, TitleDecor } from "@/components/Component";
import HeroSvg from "../../assets/svg/bridgConnect/hero.svg";
import TickSvg from "../../assets/icons/tick.svg";
import ConnectAccountSvg from "../../assets/svg/bridgConnect/Connect Your Account.svg";
import SecureAccessSvg from "../../assets/svg/bridgConnect/Authorize Secure Access.svg";
import ConnectedBankingSvg from "../../assets/svg/bridgConnect/Get Connected Banking.svg";
import AccountToAccountTransferSvg from "../../assets/svg/bridgConnect/account to account transfer.svg";
import ManageBankAccountSvg from "../../assets/svg/bridgConnect/manage bank account.svg";
import BusinessIcon from "../../assets/svg/bridgConnect/icons/Businesses & Startups.svg";
import FinanceTeamIcon from "../../assets/svg/bridgConnect/icons/Finance Teams.svg";
import PlatformAndFintechsIcon from "../../assets/svg/bridgConnect/icons/Platforms & Fintechs.svg";
import CTADecorSvg from "../../assets/svg/cta decor.svg";
import { motion, useScroll, useTransform } from "motion/react";

const BridgConnect = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [progress, setProgress] = useState(0);
  const featureRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: featureRef,
    offset: ["start start", "end end"],
  });

  const features = [
    {
      id: 1,
      img: AccountToAccountTransferSvg,
      heading: "Seamless Account-to-Account Transfers",
      align: "left",
      text: (
        <p className="text-xl">
          Send money instantly to vendors, contractors, or employees—directly
          into their bank accounts. Whether it’s IMPS, NEFT, RTGS, or UPI.
        </p>
      ),
    },
  ];

  const howItWorks = [
    {
      id: 1,
      heading: "Connect Your Account",
      txt: "Easily link your business current account with BridgConnect in just a few clicks.",
      img: ConnectAccountSvg,
    },
    {
      id: 2,
      heading: "Authorize Secure Access",
      txt: "Confirm and approve the connection to enable safe, real-time sync of your banking data.",
      img: SecureAccessSvg,
    },
    {
      id: 3,
      heading: "Get Connected Banking",
      txt: "View balances across multiple banks, track cashflows, and experience seamless money movement from a single dashboard.",
      img: ConnectedBankingSvg,
    },
  ];

  const buildForYourTeam = [
    {
      id: 1,
      icon: BusinessIcon,
      heading: "Businesses & Startups",
      txt: "Manage all your accounts and payments from one place.",
    },
    {
      id: 2,
      icon: FinanceTeamIcon,
      heading: "Finance Teams",
      txt: "Automate reconciliation, gain visibility, and save hours of manual work.",
    },
    {
      id: 3,
      icon: PlatformAndFintechsIcon,
      heading: "Platforms & Fintechs",
      txt: "Integrate APIs for collections, payouts, and connected banking at scale.",
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

  const activeStep = howItWorks[activeIndex];

  return (
    <>
      <section className="px-6 pt-30 py-10 sm:px-15 xl:px-25">
        <div className="grid lg:grid-cols-2 xl:gap-x-5 gap-y-5">
          <div>
            <TitleDecor title="BridgConnect" />
            <h1 className="text-4xl lg:text-5xl xl:text-5xl font-semibold leading-12 lg:leading-14">
              One Dashboard. Every Bank Account. Total Control.
            </h1>
            <p className="my-3 lg:my-4 lg:pr-5 text-xl">
              Link all your current accounts with{" "}
              <span className="font-[600]">BridgConnect</span> and simplify the
              way you handle money. Monitor cashflow in real time, initiate
              payments, track bills and invoices automatically, and close
              reconciliations without hassle. Take charge of your finances with
              a single, seamless platform.
            </p>
            <Button text="Get Started" bgClr="#A5EB14" />
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
        <div className="bg-[#0A0C3306] px-3 md:px-10 py-10 md:py-15 rounded-2xl">
          <TextFade>
            <h2 className="text-center text-3xl lg:text-5xl pb-5 lg:pb-15 font-semibold">
              How it Works
            </h2>
          </TextFade>
          <div className="grid lg:grid-cols-2 xl:gap-x-5 gap-y-5">
            <div className="flex justify-center items-center px-5">
              <div className="pe-10">
                <TitleDecor title={`Step ${activeStep.id}`} />
                <h2 className="text-4xl font-semibold mb-3">
                  {activeStep.heading}
                </h2>
                <p className="text-xl mb-15">{activeStep.txt}</p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img
                src={activeStep.img}
                alt={activeStep.heading}
                className="h-80 w-80"
              />
            </div>
          </div>

          <div className="px-5 grid lg:grid-cols-3 py-10 gap-10 justify-center">
            {howItWorks.map((work, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="transition-all border h-1 bg-gray-200 duration-500 my-8 cursor-pointer relative"
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                      <div
                        className="h-1 bg-black transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                  <p className="pt-5">{`0${work.id}`}</p>
                  <p className="pb-5">{work.heading}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-7 lg:px-25">
        <div className="grid lg:grid-cols-2 gap-15">
          <div className="flex items-center">
            <div>
              <h2 className=" text-4xl lg:text-5xl font-semibold mb-3">
                Manage All Your Accounts in One Place
              </h2>
              <p className="text-xl mb-5">
                Stop juggling multiple internet banking logins and passwords.
                With BridgConnect, you can:
              </p>
              <ul>
                <li className="flex gap-2 text-lg mb-3">
                  <img src={TickSvg} alt="tick" className="h-6 w-6" />
                  View balances across all your business accounts instantly
                </li>
                <li className="flex gap-2 text-lg mb-3">
                  <img src={TickSvg} alt="tick" className="h-6 w-6" />
                  Pay vendors and manage disbursements with ease
                </li>
                <li className="flex gap-2 text-lg mb-3">
                  <img src={TickSvg} alt="tick" className="h-6 w-6" />
                  Track customer payments and reconcile faster
                </li>
              </ul>
              <p className="text-xl">
                All from a secure, unified dashboard built for businesses.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={ManageBankAccountSvg}
              className="w-full lg:w-4/5"
              alt="Manage All Your Accounts in One Place"
            />
          </div>
        </div>
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

      <section className="px-7 lg:px-15">
        <div className="bg-[url('./assets/svg/bridgConnect/bankSupport.jpg')] bg-fixed bg-no-repeat bg-cover relative bg-center text-white rounded-2xl py-15 grid grid-cols-2 grid-rows-2 lg:grid-rows-3 p-5">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.3)] z-0" />
          <div className="row-start-3 col-span-2 lg:col-span-1 z-1">
            <h2 className="text-4xl font-semibold">All major banks supported</h2>
            <p className="text-lg">
              Your business doesn’t have to switch banks to go digital. With
              <strong>BridgConnect</strong>, securely link accounts from all
              major banks and manage them effortlessly in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="my-20 px-10 md:px-15">
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-5">
          Built for Businesses
        </h2>
        <p className="text-xl text-center mb-5">
          From small businesses to enterprises, <strong>BridgConnect</strong>{" "}
          adapts to the way you bank.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
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
            <h1 className="text-center text-3xl md:text-5xl leading-12 lg:leading-14 font-semibold mb-5">
              One Dashboard for All Your Banking & Payments.
            </h1>
          </TextFade>
          <div className="flex justify-center">
            <Button text="Get Started" bgClr="#A5EB14" />
          </div>
        </div>
      </section>
    </>
  );
};

export default BridgConnect;

const FeaturesCard = ({ feature, idx, range, progress, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <section
      className={`px-1 my-10 md:px-10 sticky`}
      style={{ top: `${idx * 40 + 100}px` }}
    >
      <motion.div className="bg-[#F9F9FA] py-15 rounded-2xl" style={{ scale }}>
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
