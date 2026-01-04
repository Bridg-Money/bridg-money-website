import HeroSvg from "../assets/svg/missionHero.svg";
import TrustedSvg from "../assets/icons/mission-trusted.svg";
import InnovationSvg from "../assets/icons/mission-innovation.svg";
import TransactionSvg from "../assets/icons/mission-transaction.svg";
import SuccessSvg from "../assets/icons/mission-success.svg";
import TickSvg from "../assets/icons/tick.svg";
import { TextFade } from "@/components/Animation";

const Mission = () => {
  const OurMission = [
    {
      icon: TransactionSvg,
      heading: "Speed Without Compromise",
      txt: "Fast transactions, instant onboarding, and quick settlement cycles",
    },
    {
      icon: TrustedSvg,
      heading: "Security You Can Trust",
      txt: "Bank-grade encryption and compliance-first systems to protect every transaction.",
    },
    {
      icon: InnovationSvg,
      heading: "Innovation at the Core",
      txt: "Future-ready APIs that adapt to your needs and scale with your business.",
    },
    {
      icon: SuccessSvg,
      heading: "Customer First",
      txt: "We measure success by the value we deliver to you.",
    },
  ];
  return (
    <>
      <section className=" bg-[#FFFCF5]">
        <div className="px-6 pt-25 py-20 sm:px-15 xl:px-25">
          <div className="grid lg:grid-cols-2 gap-x-10 gap-y-5">
            <div className="flex items-center col-span-1">
              <div>
                <h1
                  className="
                    relative px-7 before:content-[''] before:absolute before:left-[7px] before:top-1/2 before:-translate-y-1/2 before:w-[11px] before:h-[11px] before:rounded-full before:bg-[#CDFF66] 
                    after:content-[''] after:absolute after:right-[7px] after:top-1/2 after:-translate-y-1/2 after:w-[11px] after:h-[11px] after:rounded-full after:bg-[#CDFF66]
                    text-sm my-3 bg-[#1E1E1E] w-max rounded-2xl py-1 text-white"
                >
                  Mission
                </h1>
                <TextFade>
                  <h1 className="text-4xl lg:text-[53px] font-semibold leading-12 lg:leading-17 mb-3">
                    Powering the Future of{" "}
                    <span className="text-[#A5EB14]">Money</span> Movement
                  </h1>
                  <p className="my-3 lg:my-4 text-lg">
                    At bridg.money, our mission is to enable businesses to move
                    money seamlessly, securely, and at scale—bridging the gap
                    between traditional banking and modern financial technology.
                  </p>
                </TextFade>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img src={HeroSvg} alt="testimonal" className="h-90" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-15 lg:mt-20 mb-20 lg:mb-30 px-6 sm:px-15 xl:px-20">
        <div className="bg-[#0A0C33] grid lg:grid-cols-3 md:gap-x-15 gap-y-10 p-10 md:p-15 rounded-3xl">
          <div>
            <h2 className="text-5xl font-semibold text-[#A5EB14] mb-5">
              Our Mission
            </h2>
            <p className="mb-3 text-lg text-white">
              At <strong>bridg.money</strong>, we believe that moving money
              should be as simple as sending a text—no delays, no unnecessary
              complexity. Our mission is to bridge the gap between banks and
              businesses with a unified platform that delivers:
            </p>
          </div>
          <div className="col-span-2 grid md:grid-cols-2 gap-5">
            {OurMission.map((data, idx) => {
              return (
                <div key={idx} className="bg-[#1B1D41] rounded-2xl p-4">
                  <div className="p-3">
                    <img src={data.icon} className="h-6 w-6" />
                  </div>
                  <p className="text-white text-lg font-semibold mb-2">
                    {data.heading}
                  </p>
                  <p className="text-white mb-2">{data.txt}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-15 mb-20 lg:mb-30 px-6 sm:px-15 xl:px-30">
        <div className="grid lg:grid-cols-2 gap-y-10">
          <div className="flex items-center w-full md:px-5   lg:px-10">
            <img src="/assets/images/mission-why-sec.png" alt="Why We Exist" className="h-2/2" />
          </div>
          <div className="flex items-center">
            <div>
              <TextFade>
                <h2 className="text-5xl font-semibold mb-4">
                  <span className="text-[#A5EB14]">Why</span> We Exist
                </h2>
                <p className="text-lg mb-4">
                  We’re on a mission to remove the roadblocks in business money
                  movement—offering one unified platform that makes financial
                  transactions as simple as sending a message.
                </p>
              </TextFade>

              <ul>
                <TextFade>
                  <li className="flex items-start gap-4 text-lg mb-2">
                    <img src={TickSvg} alt="tick" className="h-6 mt-1" />
                    Fragmented systems slow innovation and create operational
                    friction.
                  </li>
                  <li className="flex items-start gap-4 text-lg mb-2">
                    <img src={TickSvg} alt="tick" className="h-6 mt-1" />
                    Complex compliance requirements make scaling harder than it
                    should be.
                  </li>
                  <li className="flex items-start gap-4 text-lg mb-5">
                    <img src={TickSvg} alt="tick" className="h-6 mt-1" />
                    Limited access to advanced banking infrastructure holds back
                    ambitious businesses.
                  </li>
                </TextFade>
              </ul>
              <TextFade>
                <p className="text-lg">
                  With bridg.money, these barriers disappear—so you can focus on
                  growth, not groundwork.
                </p>
              </TextFade>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mission;
