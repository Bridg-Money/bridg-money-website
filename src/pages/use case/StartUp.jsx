import { TextFade } from "@/components/Animation";
import { Button, TitleDecor } from "@/components/Component";
import React from "react";
import { SlidingCard } from "./components/SlidingCard";

const StartUp = () => {
  const cards = [
    {
      id: 1,
      heading: "Quick Onboarding",
      desc: "Get started fast with lightweight KYB.",
    },
    {
      id: 2,
      heading: "Collect Funds Easily",
      desc: "Generate invoices or payment links → receive funds instantly.",
    },
    {
      id: 3,
      heading: "Automate Payouts",
      desc: "Disburse payroll, freelancer, or vendor payments instantly.",
    },
    {
      id: 4,
      heading: "Stay in Control",
      desc: "Track every transaction and balance with connected banking APIs.",
    },
  ];

  const benefits = [
    {
      id: 1,
      heading: "Get Started Fas",
      desc: "Quick setup, perfect for lean teams.",
    },
    {
      id: 2,
      heading: "Support Gig Workers",
      desc: " Instant payouts to freelancers and vendors.",
    },
    {
      id: 3,
      heading: "Handle Any Payment Type",
      desc: "Smooth subscription and one-time collections.",
    },
    {
      id: 4,
      heading: "Better Growth Decisions",
      desc: "Real-time fund visibility for smarter planning.",
    },
  ];

  return (
    <>
      <section className=" bg-[linear-gradient(270deg,rgba(11,11,11,0)_0%,#0B0B0B_100%),url('/assets/images/useCase/hero-section/startup.webp')] bg-cover h-screen bg-center flex items-center">
        <div className="px-6 pt-30 py-20 sm:px-15 xl:px-25">
          <div className="grid lg:grid-cols-2 gap-x-10 gap-y-5">
            <div className="flex items-center">
              <div>
                <TitleDecor title="Startups" clr="black" bgClr="white" />
                <TextFade>
                  <h1 className="text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3">
                    Scale Faster with Seamless Payment Infrastructure
                  </h1>
                  <p className="my-3 lg:my-4 text-lg text-white">
                    Startups thrive on speed and agility, but banking operations
                    often slow them down. Whether paying freelancers, handling
                    subscriptions, or managing collections, inefficiencies can
                    hinder growth.
                  </p>
                  <Button text="Get Started" bgClr="#A5EB14" url="/contact" />
                </TextFade>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FCF9F0] px-8 md:px-30 py-15">
        <div className="grid lg:grid-cols-2 gap-x-10 gap-y-5">
          <div className="flex items-center">
            <div>
              <TextFade>
                <h1 className="text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3">
                  Instant Payouts.
                  <br /> Seamless Collections.
                  <br /> Real-Time Visibility.
                </h1>
              </TextFade>
            </div>
          </div>
          <div className="flex items-center">
            <p className="my-3 lg:my-4 text-lg">
              bridg.money helps startups focus on scaling, not banking hurdles.
              With payouts, disburse salaries, reimbursements, or vendor
              payments instantly. With collections, accept recurring or one-time
              payments. With connected banking, get real-time oversight to
              extend your runway and plan growth better.
            </p>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]">
        <div className="grid lg:grid-cols-2 gap-10 relative">
          <div className="lg:sticky top-40 h-fit">
            <TextFade>
              <h2 className="text-4xl sm:text-5xl font-semibold mb-2">
                How it works
              </h2>
              <p className="text-lg mb-5">
                Here’s a simple step-by-step view of how bridg.money powers your
                financial operations.
              </p>
            </TextFade>
          </div>
          <SlidingCard cards={cards} />
        </div>
      </section>

      <section className="px-8 md:px-20 py-15 ">
        <div className="grid lg:grid-cols-2 gap-5 gap-y-10 relative">
          <div className="sm:px-15 flex items-center">
            <div className="relative p-2.5">
              <img src="/assets/images/useCase/benefit/startup.webp" className="rounded-3xl" />
              <div className="bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-3xl sm:text-4xl mb-2">Benefits</h2>
            <p className="mb-10 text-lg">
              Unlock faster payments, automated reconciliation, and real-time
              visibility tailored to your business needs.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {benefits.map((benefit) => (
                <div>
                  <div className="h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" />
                  <h2 className="text-xl font-semibold mb-2">{benefit.heading}</h2>
                  <p>{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-20 my-10 md:my-15 flex justify-center">
        <div className="bg-[url('/assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end">
          <div className="absolute inset-0 bg-[#0A0C3326] z-0" />
          <div className="row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2">
            <TextFade direction="up">
              <h1 className="text-lg text-white md:text-5xl font-semibold mb-3">
                Ready to Bridg the Gap?
              </h1>
              <p className="text-lg text-white mb-4">
                Join thousands of businesses using bridg.money to streamline
                their financial operations. Start accepting payments and
                managing payouts in minutes.
              </p>
            </TextFade>
          </div>

          <div className="flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1">
            <Button
              text="Book a Demo"
              clr="#ffffff"
              brClr="#ffffff"
              arrClr="#ffffff"
              url="/contact"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default StartUp;
