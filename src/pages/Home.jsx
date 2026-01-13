import DevFirstApiPlatformImg from "../assets/svg/developer-first-api-platform.svg";
import TickSvg from "../assets/icons/tick.svg";
import BridgPayImg from "../assets/svg/home/smiley-businesswoman.webp";
import BridgCollectImg from "../assets/svg/home/happy-businessman.webp";
import BridgConnectImg from "../assets/svg/home/image-photography-with-natural.webp";
import TestimonalSvg from "../assets/svg/client-container.svg";
import DurationSvg from "../assets/icons/duration.svg";
import CodeSvg from "../assets/icons/code.svg";
import SlaSvg from "../assets/icons/sla.svg";
import GradeSvg from "../assets/icons/grade.svg";
import HeroImg from "../assets/svg/hero-svg.svg";
import React, { useEffect, useState } from "react";
import { TextFade } from "../components/Animation";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { Button, TitleDecor } from "@/components/Component";
import QuotesDecor from "../assets/svg/home/quotes.svg";
import VerticalCarousel from "@/components/Carousel";
import GreenTick from "../assets/icons/green-tick.svg";
import XMark from "../assets/icons/x-mark.svg";
import BridgOnboardSvg from "../assets/svg/bridgonboard.svg";
import BridgConnectSvg from "../assets/svg/bridgconnect.svg";
import BridgCollectSvg from "../assets/svg/bridgcollect.svg";
import BridgPaySvg from "../assets/svg/bridgpay.svg";
import BridgRouteSvg from "../assets/svg/bridgroute.svg";
import BridgReconSvg from "../assets/svg/bridgrecon.svg";
import NeftSvg from "../assets/icons/hero-section/neft.svg";
import TransactionSvg from "../assets/icons/hero-section/transaction.svg";
import ApiSvg from "../assets/icons/hero-section/api.svg";
import RoutingSvg from "../assets/icons/hero-section/routing.svg";
import RefundsSvg from "../assets/icons/hero-section/refunds.svg";
import SupportSvg from "../assets/icons/hero-section/support.svg";
import { useScreen } from "@/hook/useScreen";
import MetaData from "@/components/Meta";

const products = [
  {
    id: 1,
    img: BridgPayImg,
    title: "BridgPay",
    heading: "Instant Business Payouts",
    text: "Send money instantly to bank accounts, UPI IDs, or cards — 24/7.",
    lists: [
      "Multiple payout options in one place",
      "Smart retries for higher success rates",
      "Real-time tracking & downloadable reports",
    ],
  },
  {
    id: 2,
    img: BridgCollectImg,
    title: "BridgCollect",
    heading: "Unified Payment Collections",
    text: "Accept customer payments through all major channels with one integration.",
    lists: [
      "UPI, VPA, virtual accounts, cards",
      "Instant payment tracking & auto reconciliation",
      "Faster settlements to improve cash flow",
    ],
  },
  {
    id: 3,
    img: BridgConnectImg,
    title: "BridgConnect",
    heading: "All Banks, One Dashboard",
    text: "Manage multiple bank accounts from a single view.",
    lists: [
      "Real-time balances & transactions",
      "Instant fund transfers between accounts",
      "Easy data export for accounting",
    ],
  },
];

const Home = () => {
  const allInOneInfrastructure = [
    {
      icon: BridgPaySvg,
      header: "BridgPay",
      text: "Instant payouts via NEFT, RTGS, IMPS, UPI, and cards, with smart retries & tracking.",
    },
    {
      icon: BridgCollectSvg,
      header: "BridgCollect",
      text: "Multi-channel collections: Virtual Accounts (VA), UPI/VPA, QR, POS, and cards, with instant confirmation and auto-settlement.",
    },
    {
      icon: BridgConnectSvg,
      header: "BridgConnect",
      text: "Real-time balances, statements, and payments directly from a merchant’s own account.",
    },
    {
      icon: BridgOnboardSvg,
      header: "BridgOnboard",
      text: "API-first onboarding with automated document verification and instant activation.",
    },
    {
      icon: BridgRouteSvg,
      header: "BridgRoute",
      text: "Dynamic bank selection with automatic failover.",
    },
    {
      icon: BridgReconSvg,
      header: "BridgRecon",
      text: "Automated transaction matching, ERP sync, and anomaly detection.",
    },
    // {
    //   icon: BridgVaultSvg,
    //   header: "BridgVault",
    //   text: "RBI-compliant structures with sub-ledgers and transaction-level controls.",
    // },
  ];

  const ApiIntegrationFeatures = [
    {
      icon: DurationSvg,
      header: "5 min",
      txt: "Setup time",
    },
    {
      icon: GradeSvg,
      header: "Bank Grade",
      txt: "Security",
    },
    {
      icon: SlaSvg,
      header: "99.9%",
      txt: "Uptime SLA",
    },
    {
      icon: CodeSvg,
      header: "REST/ GraphQL",
      txt: "API Types",
    },
  ];

  const testimonals = [
    {
      id: 1,
      img: "/assets/images/testimonals/1.jpg",
      name: "Priya Sharma",
      desc: "bridg.money transformed our payment infrastructure. What used to take weeks now happens in minutes.",
    },
    {
      id: 2,
      img: "/assets/images/testimonals/2.jpg",
      name: "Raj Patel",
      desc: "The API documentation is incredible, and their support team helped us integrate in just 2 days.",
    },
    {
      id: 3,
      img: "/assets/images/testimonals/3.jpg",
      name: "Amit Kumar",
      desc: "99.9% uptime isn't just a promise - they deliver. Our business depends on reliability.",
    },
  ];

  const featureTableData = [
    {
      feature: "Setup Time",
      bridg: "5 minutes",
      others: "2-4 weeks",
    },
    {
      feature: "API Documentation",
      bridg: "Interactive & Complete",
      others: "Basic & Outdated",
    },
    {
      feature: "Uptime SLA",
      bridg: "99.9%",
      others: "95-99%",
    },
    {
      feature: "Settlement Time",
      bridg: "Instant",
      others: "T+1 to T+3",
    },
    {
      feature: "Support Response",
      bridg: "< 2 hours",
      others: "24-48 hours",
    },
    {
      feature: "Pricing Model",
      bridg: "Transparent",
      others: "Hidden fees",
    },
  ];

  const { isXs, isSm } = useScreen();

  const heroSecData = [
    {
      img: RefundsSvg,
      text: "Refunds Auto-Processed in Seconds",
      x: -200,
      y: 50,
      sx: -110,
      sy: -10,
      xx: -90,
      xy: -10,
      opacity: 1,
      rotate: -7,
      z: true,
    },
    {
      img: ApiSvg,
      text: "API Uptime: 99.98%",
      x: -195,
      y: -40,
      sx: -100,
      sy: -115,
      xx: -100,
      xy: -110,
      opacity: 1,
      rotate: 10,
      z: false,
    },
    {
      img: NeftSvg,
      text: "Instant NEFT / IMPS / UPI Payouts",
      x: 230,
      y: -40,
      sx: 120,
      sy: -120,
      xx: 100,
      xy: -110,
      opacity: 1,
      rotate: -10,
      z: false,
    },
    {
      img: SupportSvg,
      text: "24/7 Merchant Support Portal",
      x: 200,
      y: 50,
      sx: 120,
      sy: -10,
      xx: 105,
      xy: -0,
      opacity: 1,
      rotate: 8,
      z: true,
    },
    {
      img: TransactionSvg,
      text: "+18% Weekly Transaction Growth",
      x: 180,
      y: -150,
      sx: 115,
      sy: -210,
      xx: 100,
      xy: -200,
      opacity: 1,
      rotate: 8,
      z: false,
    },
    {
      img: RoutingSvg,
      text: "Smart Multi-Bank Routing Enabled",
      x: -180,
      y: -150,
      sx: -115,
      sy: -210,
      xx: -100,
      xy: -190,
      opacity: 1,
      rotate: -6,
      z: false,
    },
  ];

  return (
    <>
      <MetaData
        metas={{
          title: "bridg.money | Fast & Secure Digital Payments in India",
          desc: "Trusted digital payment platform for fast UPI, QR, and seamless digital transactions across India. Built on RBI-compliant infrastructure.",
          ogTitle: "bridg.money – Fast & Secure Digital Payments in India",
          ogDesc:
            "Power your business with fast, secure UPI and QR payments using bridg.money’s RBI-compliant fintech infrastructure.",
        }}
      />
      <div className="md:flex justify-center">
        <div className="max-w-[1350px]">
          <section className="relative z-0  flex flex-col justify-between overflow-hidden">
            <div className="pt-30 lg:pt-30 lg:px-20 xl:px-30">
              <div className="px-7 flex flex-col h-full">
                <div className="flex md:justify-center items-center pr-2.5 gap-3 p-0.5">
                  <span className="bg-[#A5EB14] rounded-2xl p-0.5 px-4 text-xs">
                    Top Rated
                  </span>

                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 text-yellow-400 star-animate"
                        initial={{ opacity: 0.4, scale: 0.9 }}
                        animate={{
                          opacity: [0.4, 1, 0.4],
                          scale: [0.9, 1.15, 0.9],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.25,
                          ease: "easeInOut",
                        }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                </div>

                <StaggerHeadline />

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-lg md:text-center md:px-30"
                >
                  Your trusted Technology Service Provider for secure, scalable,
                  and compliant financial infrastructure.
                </motion.p>

                <div className="flex flex-wrap md:justify-center gap-4 pb-40 md:pb-20 mt-5">
                  <Button text="Get Started" bgClr="#A5EB14" url="/contact" />
                </div>
              </div>
            </div>
            <div className="flex justify-center relative h-50 sm:h-80">
              <div className="rounded-full flex justify-center w-screen h-[450px] md:w-[800px] md:h-[800px] items-center bg-rotate overflow-hidden animate-rotate-slow">
                <div
                  className="p-4 flex items-center justify-center rounded-full z-10 w-[350px] h-[350px] md:w-[650px] md:h-[650px]"
                  style={{
                    animation: "bg-rotate-slow 40s linear infinite",
                  }}
                >
                  <div
                    className="rounded-full z-10 w-[280px] h-[280px] md:w-[480px] md:h-[480px]"
                    style={{
                      animation: "bg-rotate-slower 60s linear infinite",
                    }}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 flex flex-col items-center">
                <img
                  src={HeroImg}
                  alt="hero img"
                  className="relative h-[70vw] sm:h-auto z-40"
                />
                {heroSecData.map((data, idx) => {
                  const rx = isXs ? data.xx : isSm ? data.sx : data.x;
                  const ry = isXs ? data?.xy : isSm ? data.sy : data.y;
                  const controls = useAnimation();

                  useEffect(() => {
                    controls
                      .start({
                        x: rx,
                        y: ry,
                        rotate: data.rotate,
                        opacity: 1,
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                          delay: idx * 0.15,
                        },
                      })
                      .then(() => {
                        controls.start({
                          y: [ry, ry - 3, ry],
                          transition: {
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut",
                            delay: idx * 0.15,
                          },
                        });
                      });
                  }, []);
                  return (
                    <motion.div
                      initial={{ x: 0, opacity: 0 }}
                      animate={controls}
                      viewport={{ once: true }}
                      className={`rounded-xl w-max flex gap-2 items-center absolute top-2/3 left-1/2 -translate-x-1/2 border-2 border-[#EBEBEB99] px-3 sm:px-4 py-2 md:py-3 shadow-[-6px_37px_50px_0px_#0000000D] bg-white ${
                        data.z ? "z-40" : "z-30"
                      }`}
                      key={idx}
                    >
                      <img
                        src={data.img}
                        className="h-3.5 md:h-auto"
                        alt={data.text}
                      />
                      <p className="text-[9px] sm:text-xs">{data.text}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="products" className="p-6 md:p-10 xl:p-15 ">
            <div className="flex justify-center my-5">
              <TitleDecor title="Products" />
            </div>
            <TextFade direction="up">
              <h2 className="text-center text-3xl md:text-4xl lg:text-6xl font-semibold mb-4">
                <span className="text-[#A5EB14]">Solutions</span> built for
                modern Business
              </h2>
              <p className="text-center lg:px-30 xl:px-50 mb-10 text-lg">
                From onboarding to payouts, our comprehensive suite of financial
                APIs provides everything you need to build world-class fintech
                products with proven industry applications.
              </p>
            </TextFade>

            <Products products={products} />
          </section>

          <section className="px-6 md:px-15 lg:px-10 py-10 bg-[#FBFBFB] xl:px-20 mt-0 my-20">
            <div className="flex justify-center">
              <TitleDecor title="Products" />
            </div>
            <h2 className="text-center text-3xl md:text-4xl lg:text-6xl font-semibold mb-5">
              One <span className="text-[#A5EB14]">Platform.</span> Every
              Transaction.
            </h2>
            <div className="grid md:grid-cols-3 px-10 md:px-20 my-10">
              {allInOneInfrastructure.map((card, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-0 text-center overflow-hidden group hover:shadow-[0px_0px_10px_0px_#A5EB1440] cursor-pointer hover:bg-[#F7FFE6] border border-gray-100 min-h-60 transition-all duration-300 relative p-5"
                  >
                    <div className="flex justify-center mb-4 md:mb-3 group-hover:-rotate-45 transition-all">
                      <img
                        src={card.icon}
                        className="h-10 w-10 border border-[#D8D8D8] p-2 rounded-md shadow"
                        alt={card.header}
                      />
                    </div>
                    <h3 className="text-[1.32rem] font-medium">
                      {card.header}
                    </h3>

                    <p className="text-gray-600 transition-opacity duration-700">
                      {card.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="my-20">
            <TextFade direction="up">
              <h2 className="text-2xl xl:text-3xl text-center font-bold">
                Secure and compliant
              </h2>
            </TextFade>
            <div className="flex justify-center my-10 gap-5 md:gap-10">
              <img
                src="/assets/images/rbi.png"
                alt="RBI"
                className="h-15 hover:scale-125 transition-all duration-500"
              />
              <img
                src="/assets/images/pci.png"
                alt="PCI"
                className="h-15 hover:scale-125 transition-all duration-500"
              />
              <img
                src="/assets/images/iso.png"
                alt="ISO"
                className="h-15 hover:scale-125 transition-all duration-500"
              />
              <img
                src="/assets/images/aicpa-soc.png"
                alt="AICPA SOC"
                className="h-15 hover:scale-125 transition-all duration-500"
              />
            </div>
          </section>

          <section className="bg-[#FCF9F0]">
            <div className="grid md:grid-cols-2 py-15 gap-y-10 px-5 lg:px-10 xl:px-15">
              <div className="px-3 md:px-5 xl:px-10">
                <TextFade direction="up">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-14 sm:leading-16 lg:leading-20 font-bold mb-2">
                    {"< Developer-First "}
                    <br />
                    <span className="text-[#A5EB14]">API Platform</span>
                    {" >"}
                  </h2>
                  <p className="text-lg">
                    All bridg.money products are 100% API-first, modular, and
                    developer-friendly
                  </p>
                </TextFade>
                <div className="grid grid-cols-2 items-center my-5 md:gap-4 gap-3">
                  {ApiIntegrationFeatures.map((data, idx) => (
                    <div key={idx} className="flex gap-2 lg:gap-3 items-center">
                      <div className="w-10 h-10 bg-black rounded-full flex-shrink-0 flex justify-center items-center">
                        <img
                          src={data?.icon}
                          alt={data?.txt}
                          className="h-[20px] w-[20px] object-contain"
                        />
                      </div>
                      <div>
                        <p className="break-word">{data?.header}</p>
                        <p className="text-sm">{data?.txt}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 mt-10">
                  <Button text="View Documentation" bgClr="#A5EB14" />
                  <Button text="Try Sandbox" brClr="black" />
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src={DevFirstApiPlatformImg}
                  className="w-100 hover:scale-105 transition-all duration-500"
                  alt="Developer-First API Platform"
                />
              </div>
            </div>
          </section>

          <section className="my-20 px-6 md:px-40">
            <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              <span className="text-[#A5EB14]">Why</span> Choose bridg.money?
            </h2>
            <p className="text-xl text-center">
              See how we compare to traditional payment processors and other
              fintech solutions
            </p>
            <div className="border border-gray-300 overflow-auto rounded-2xl my-13">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="text-left text-lg p-7 text-gray-500 border-r border-gray-300">
                      Feature
                    </th>
                    <th className="text-left text-lg p-7 text-[#9AE303] border-r border-gray-300 bg-[#FBFFF5]">
                      bridg.money
                    </th>
                    <th className="text-left text-lg p-7 text-gray-500">
                      Others
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {featureTableData.map((row, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="p-7 border-r border-gray-300">
                        {row.feature}
                      </td>
                      <td className="p-7 text-[#9AE303] border-r border-gray-300 bg-[#FBFFF5]">
                        <div className="flex gap-3 items-center">
                          <img src={GreenTick} className="h-6 w-6" />
                          {row.bridg}
                        </div>
                      </td>
                      <td className="p-7 gap-3">
                        <div className="flex gap-3 items-center">
                          <img src={XMark} className="h-3 w-3" />
                          {row.others}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="my-20 px-7 lg:px-25 bg-[#FBFFF5]">
            <div className="grid md:grid-cols-2 items-center gap-y-10 py-15">
              <div>
                <img
                  src={QuotesDecor}
                  alt="quotes decor"
                  className="mb-3 h-15 w-15"
                />
                <h2 className="text-3xl md:text-4xl md:pe-30 leading-16 lg:text-5xl font-semibold mb-4">
                  What Our Customers Say
                </h2>
                <p className="text-xl">
                  See how we compare to traditional payment processors and other
                  fintech solutions
                </p>
              </div>
              <div className="pl-4 md:pl-10">
                <VerticalCarousel items={testimonals}>
                  {(item, isActive) => (
                    <div
                      className={`flex gap-5 items-center rounded-2xl border-0 border-l-6 bg-white p-5 transition-all duration-300
                ${
                  isActive
                    ? "shadow-xl scale-105 -translate-x-2 z-10 border-[#A5EB14]"
                    : "border-[#EFEFEF] opacity-70"
                }
                `}
                    >
                      <img
                        src={item.img}
                        loading="lazy"
                        className="rounded-full h-13 w-13 object-cover"
                      />
                      <div>
                        <h2 className="text-lg font-bold mb-1">{item.name}</h2>
                        <p className="text-sm">{item.desc}</p>
                      </div>
                    </div>
                  )}
                </VerticalCarousel>
              </div>
            </div>
          </section>

          <section className="my-15 lg:my-20 px-6">
            <div className="flex justify-center my-3">
              <img src={TestimonalSvg} alt="testimonal" className="h-13.75" />
            </div>
            <TextFade direction="up">
              <h2 className="text-3xl text-center md:text-4xl font-semibold mb-3">
                Still have questions?
              </h2>
              <p className="text-center text-lg mb-4">
                Can’t find the answer you’re looking for? Please contact us to
                our friendly team.
              </p>
            </TextFade>
            <div className="flex justify-center">
              <Button text="Contact Us" bgClr="#A5EB14" url="/contact" />
            </div>
          </section>

          <section className="px-6 sm:px-20 my-10 md:my-15 flex justify-center">
            <div className="bg-[url('/assets/images/ctaHome.jpg')] overflow-hidden bg-fixed bg-no-repeat bg-cover bg-center rounded-3xl relative p-6 py-12 md:p-12 md:py-15 grid grid-cols-1 md:grid-cols-2 items-end w-full">
              <div className="absolute inset-0 bg-[#0A0C3326] z-0 rounded-3xl" />
              <div className="relative z-10 md:col-start-2 flex flex-col justify-end">
                <TextFade direction="up">
                  <h2 className="text-3xl text-white md:text-5xl font-semibold mb-3">
                    Ready to Bridg the Gap?
                  </h2>
                  <p className="text-lg text-white mb-6 max-w-lg">
                    Join thousands of businesses using bridg.money to streamline
                    their financial operations. Start accepting payments and
                    managing payouts in minutes.
                  </p>
                </TextFade>

                <div className="flex justify-start md:justify-end">
                  <Button
                    text="Book a Demo"
                    clr="#ffffff"
                    brClr="#ffffff"
                    arrClr="#ffffff"
                    url="/contact"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;

const Products = ({ products }) => {
  return (
    <div className="lg:px-10 relative">
      {products.map((data, idx) => {
        return (
          <div
            key={data.id}
            className="grid items-center gap-10 lg:grid-cols-2 px-2 md:px-6 py-5 sticky top-30 bg-white"
          >
            <div
              className={`flex items-center justify-center py-3 ${
                idx % 2 !== 0 ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <div className="overflow-hidden w-full rounded-3xl">
                <img
                  src={data?.img}
                  alt="products-img"
                  className="h-80 w-full object-cover object-center transition-all duration-300 hover:scale-115"
                />
              </div>
            </div>
            <div className={`${idx % 2 !== 0 ? "lg:order-1" : "lg:order-2"}`}>
              <TextFade>
                <p className="text-[#A5EB14] text-xl font-semibold py-0.5 mb-3">
                  {data?.title}
                </p>
                <h2 className="text-3xl text-[#0A0C33] font-bold mb-3">
                  {data?.heading}
                </h2>
                <p className="mb-4 text-lg text-[#4D4D4D]">{data?.text}</p>
                <ul className="space-y-2">
                  {data?.lists.map((list, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-lg gap-3 text-[#4D4D4D] my-3"
                    >
                      <img src={TickSvg} className="h-6" />
                      <p>{list}</p>
                    </li>
                  ))}
                </ul>
              </TextFade>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const StaggerHeadline = () => {
  const words = ["Fast", "Reliable", "Secure", "Easy"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };

  const letter = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.2 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <h1 className="text-dark md:text-center text-[42px] lg:text-6xl my-4 leading-[3.2rem] lg:leading-16 font-semibold">
      Need to Move Money,{" "}
      <span className="inline-block relative">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="inline-flex"
          >
            {words[index].split("").map((char, i) => (
              <motion.span key={i} variants={letter} className="text-gray-400">
                {char}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>
      <br />
      Just <span className="text-[#A5EB14]">Bridg</span> It.
    </h1>
  );
};
