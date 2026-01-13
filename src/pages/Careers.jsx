import ImpactSvg from "../assets/icons/careers-impact.svg";
import InnovationSvg from "../assets/icons/careers-innovation.svg";
import CollabrativeSvg from "../assets/icons/careers-collabrative.svg";
import SpeedSvg from "../assets/icons/careers-speed.svg";
import ObsessionSvg from "../assets/icons/careers-obsession.svg";
import TrustSvg from "../assets/icons/careers-trust.svg";
import { TextFade } from "@/components/Animation";
import JobIcon from "../assets/svg/careers.svg";
import MetaData from "@/components/Meta";

const Careers = () => {
  const WhyWork = [
    {
      icon: ImpactSvg,
      heading: "Impact That Matters",
      txt: "Your work directly powers businesses, startups, and fintechs across India.",
    },
    {
      icon: InnovationSvg,
      heading: "Innovation-First Culture",
      txt: "We embrace creativity, challenge the status quo, and build solutions ahead of the curve.",
    },
    {
      icon: CollabrativeSvg,
      heading: "Collaborative Growth",
      txt: "We believe in growing together—personally, professionally, and as a team.",
    },
  ];

  const OurValues = [
    {
      icon: SpeedSvg,
      heading: "Speed with Precision",
      txt: "Move fast, but never cut corners.",
    },
    {
      icon: ObsessionSvg,
      heading: "Customer Obsession",
      txt: "We measure success by our customers’ success",
    },
    {
      icon: TrustSvg,
      heading: "Transparency & Trust",
      txt: "Integrity is non-negotiable in everything we do.",
    },
  ];

  const jobs = [
    {
      id: 1,
      role: "Product Manager",
      desc: "Own the roadmap for features that enhance money movement—partner with engineering, design, and customers.",
      location: "Remote / Full Time",
      link: "",
    },
    {
      id: 2,
      role: "Backend Developer (Node.js)",
      desc: "Own the roadmap for features that enhance money movement—partner with engineering, design, and customers.",
      location: "Remote / Full Time",
      link: "",
    },
    {
      id: 3,
      role: "UI/UX Designer",
      desc: "Own the roadmap for features that enhance money movement—partner with engineering, design, and customers.",
      location: "Remote / Full Time",
      link: "",
    },
  ];
  return (
    <>
      <MetaData
        metas={{
          title: "Careers at Bridg Money | Build the Future of Money Movement",
          desc: "Explore careers at Bridg Money and help build the future of money movement. Join a team solving complex financial challenges with fast, secure, and scalable technology.",
          ogTitle: "Careers at Bridg Money",
          ogDesc:
            "Join Bridg Money and help transform how businesses move money. Work on impactful fintech products with a team driven by innovation and scale.",
        }}
      />

      <section className="bg-[linear-gradient(#0A0C33CC,#0A0C33CC),url('./assets/images/careersHero.jpg')] bg-cover bg-center">
        <div className="px-6 pt-30 py-20 sm:px-15 xl:px-25">
          <div className="grid lg:grid-cols-2 gap-x-10 gap-y-5">
            <div className="flex items-center col-span-1">
              <div>
                <h1
                  className="
                    relative px-7 before:content-[''] before:absolute before:left-[7px] before:top-1/2 before:-translate-y-1/2 before:w-[11px] before:h-[11px] before:rounded-full before:bg-[#CDFF66] 
                    after:content-[''] after:absolute after:right-[7px] after:top-1/2 after:-translate-y-1/2 after:w-[11px] after:h-[11px] after:rounded-full after:bg-[#CDFF66]
                    text-sm my-3 text-[#1E1E1E] w-max rounded-2xl py-1 bg-white"
                >
                  Careers
                </h1>
                <TextFade>
                  <h1 className="text-4xl lg:text-[53px] font-semibold leading-12 text-white lg:leading-16 mb-3">
                    Build the Future of Money Movement at{" "}
                    <span className="text-[#A5EB14]">Bridg Money</span>
                  </h1>
                  <p className="my-3 lg:my-4 text-lg text-white">
                    we’re on a mission to transform the way businesses move
                    money—making it faster, smarter, and more secure. Our team
                    thrives on solving complex financial challenges with simple,
                    powerful technology.
                  </p>
                </TextFade>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#FFFCF5]">
        <div className="px-6 sm:px-15 py-20 xl:px-20">
          <h2 className="text-5xl font-semibold mb-3">
            Why <span className="text-[#A5EB14]">Work</span> With Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
            {WhyWork.map((data, idx) => {
              return (
                <div key={idx} className="p-3 border rounded-2xl">
                  <div className="p-2">
                    <img src={data.icon} className="h-10 w-10" />
                  </div>
                  <p className="font-semibold text-lg mb-2">{data.heading}</p>
                  <p className="mb-2">{data.txt}</p>
                </div>
              );
            })}
          </div>
          <h2 className="text-5xl font-semibold mt-10 mb-3">
            Our <span className="text-[#A5EB14]">Values</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
            {OurValues.map((data, idx) => {
              return (
                <div key={idx} className="p-3 border rounded-2xl">
                  <div className="p-2">
                    <img src={data.icon} className="h-10 w-10" />
                  </div>
                  <p className="font-semibold text-lg mb-2">{data.heading}</p>
                  <p className="mb-2">{data.txt}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-15 mb-20 lg:mb-30 px-6 sm:px-15 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-y-10 lg:gap-x-15">
          <div className="w-full">
            <h2 className="text-5xl font-semibold mb-4">
              Open <span className="text-[#A5EB14]">Roles</span>
            </h2>
            <p className="text-lg mb-4">
              We’re always looking for passionate problem-solvers, tech
              innovators, and fintech enthusiasts. If you don’t see a role that
              matches you today, drop us your resume—we’ll connect when the
              right opportunity comes along.
            </p>
          </div>
          <div className="">
            {jobs.map((data, idx) => {
              return (
                <div key={idx} className="p-6 mb-5 bg-[#F6FDE8] rounded-2xl">
                  <div className="flex gap-3 items-center mb-2">
                    <div className="bg-[#0A0C33] p-3 rounded-full">
                      <img src={JobIcon} className="h-5 w-5" />
                    </div>
                    <p>{data.role}</p>
                  </div>
                  <p className="mb-3">{data.desc}</p>
                  <p>Location</p>
                  <p className="text-[#1E1E1E]">{data.location}</p>
                  <div className="flex justify-end">
                    <button className="rounded-3xl border border-gray-200 py-1 px-5">
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;
