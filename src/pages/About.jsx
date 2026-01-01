import TestimonalSvg from "../assets/svg/client container.svg";
import ModularAndScalableApiSvg from "../assets/icons/modular and scalable api.svg";
import SecuritySvg from "../assets/icons/security.svg";
import BackendEcoSystemSvg from "../assets/icons/backend ecosystem.svg";
import RbiComplaintInfrastructureSvg from "../assets/icons/rbi complaint infrastructure.svg";
import MultiBankNetworkSvg from "../assets/icons/multi bank network.svg";
import OpenLinkSvg from "../assets/icons/open link.svg";

const About = () => {
  const WhyBridgMoney = [
    { icon: ModularAndScalableApiSvg, txt: "Modular & scalable APIs" },
    {
      icon: RbiComplaintInfrastructureSvg,
      txt: "RBI-compliant infrastructure",
    },
    { icon: SecuritySvg, txt: "Industry-grade uptime & security" },
    { icon: BackendEcoSystemSvg, txt: "Multi-bank backend ecosystem" },
  ];
  return (
    <>
      <section className=" bg-[#FFFCF5]">
        <div className="px-6 pt-25 py-10 lg:pb-15 sm:px-15 xl:px-30">
          <div className="grid lg:grid-cols-3 gap-y-5">
            <div className="col-span-2">
              <h1
                className="
                    relative px-7 before:content-[''] before:absolute before:left-[7px] before:top-1/2 before:-translate-y-1/2 before:w-[11px] before:h-[11px] before:rounded-full before:bg-[#CDFF66] 
                    after:content-[''] after:absolute after:right-[7px] after:top-1/2 after:-translate-y-1/2 after:w-[11px] after:h-[11px] after:rounded-full after:bg-[#CDFF66]
                    text-sm my-3 bg-[#1E1E1E] w-max rounded-2xl py-1 text-white"
              >
                About Us
              </h1>
              <h1 className="text-[#A5EB14] text-4xl lg:text-5xl font-semibold leading-12 lg:leading-16">
                bridg.money
              </h1>
              <h1 className="text-4xl lg:text-5xl font-semibold leading-12 lg:leading-16">
                The Backbone of Modern Fintech Operations
              </h1>
              <p className="my-3 lg:my-4 xl:pr-50 text-lg">
                bridg.money is a next-gen Technology Service Provider (TSP)
                powering India’s financial infrastructure.We enable startups,
                fintechs, and enterprises to move money compliantly and
                efficiently with plug-and play APIs.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <img src={TestimonalSvg} alt="testimonal" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap gap-5 my-10 lg:my-5">
            <div className="bg-[#0A0C33] lg:min-w-[390px] rounded-2xl flex justify-between items-center gap-5 p-3">
              <h1 className=" text-white text-2xl xl:text-3xl p-6 xl:p-7">
                Modular APIs
              </h1>
              <div className="flex flex-col">
                <button className="pointer-events-none text-[#ACE238] text-sm border border-[#ACE238] rounded-2xl py-0.5 mb-3 sm:mb-2 px-2">
                  Composable
                </button>
                <button className="pointer-events-none text-[#ACE238] text-sm border border-[#ACE238] rounded-2xl py-0.5 px-2">
                  Plug-and-Play
                </button>
              </div>
            </div>
            <div className="bg-[#0A0C33] rounded-2xl flex justify-between gap-1 p-2">
              <h1 className=" text-white text-2xl xl:text-3xl p-6 xl:p-7">
                Multi-bank network
              </h1>
              <div className="bg-[#A5EB14] rounded-xl flex items-center px-3 py-2">
                <img
                  src={MultiBankNetworkSvg}
                  className="h-[35px] lg:h-[50px]"
                  alt="Multi-bank network"
                />
              </div>
            </div>
            <div className="bg-white border flex justify-between gap-2 p-2 rounded-2xl">
              <h1 className="text-2xl xl:text-3xl p-6 xl:p-7">
                Scalable and reliable infrastructure
              </h1>
              <div className="bg-[#0A0C33] h-max w-max p-3 rounded-full">
                <img src={OpenLinkSvg} alt="Multi-bank network" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-15 lg:mt-20 mb-20 lg:mb-30 px-6 sm:px-15 xl:px-30">
        <h1 className="text-center text-3xl md:text-5xl font-semibold mb-4">
          Why <span className="text-[#A5EB14]">bridg.money</span>
        </h1>
        <p className="text-center text-lg">
          We’re not just a payment layer. We’re your end-to-end fintech stack.
        </p>
        <WhySection about={WhyBridgMoney} />
      </section>
    </>
  );
};

export default About;

const WhySection = ({ about }) => {
  return (
    <div className="grid md:grid-cols-2 lg:px-7 gap-5 my-7">
      {about.map((data, idx) => (
        <div
          key={idx}
          className="flex gap-4 bg-[#A5EB141A] items-center hover:bg-[#A5EB14] px-5 py-10 lg:py-13 rounded-2xl"
        >
          <div className="bg-[#A5EB14] rounded-full p-3">
            <img
              src={data?.icon}
              alt={data.txt}
              className="h-[20px] lg:h-[25px] object-contain"
            />
          </div>
          <p>{data.txt}</p>
        </div>
      ))}
    </div>
  );
};
