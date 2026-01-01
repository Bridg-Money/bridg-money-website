import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import LogoDark from "../assets/logo/logo dark.svg";
import ArrowSvg from "../assets/icons/arrow.svg";
import BridgOnboardSvg from "../assets/svg/bridgonboard.svg";
import BridgConnectSvg from "../assets/svg/bridgconnect.svg";
import BridgVaultSvg from "../assets/svg/bridgvault.svg";
import BridgCollectSvg from "../assets/svg/bridgcollect.svg";
import BridgPaySvg from "../assets/svg/bridgpay.svg";
import BridgRouteSvg from "../assets/svg/bridgroute.svg";
import BridgReconSvg from "../assets/svg/bridgrecon.svg";
import SmallBusinessSvg from "../assets/svg/navbar/use case/small business.svg";
import StartUpSvg from "../assets/svg/navbar/use case/startup.svg";
import EnterpriseSvg from "../assets/svg/navbar/use case/enterprise.svg";
import SMESvg from "../assets/svg/navbar/use case/sme.svg";
import ECommerceSvg from "../assets/svg/navbar/use case/e-commerce.svg";
import SoftwareSvg from "../assets/svg/navbar/use case/software.svg";
import ManufacturesSvg from "../assets/svg/navbar/use case/manufactures.svg";
import RealEstateSvg from "../assets/svg/navbar/use case/real-estate.svg";
import HealthCareSvg from "../assets/svg/navbar/use case/healthcare.svg";
import HospitalSvg from "../assets/svg/navbar/use case/hospital.svg";
import ProfessionalServiceSvg from "../assets/svg/navbar/use case/professional service.svg";
import FreelancersSvg from "../assets/svg/navbar/use case/freelancers.svg";
import AboutUsSvg from "../assets/svg/aboutus.svg";
import ContactSvg from "../assets/svg/contact.svg";
import MissionSvg from "../assets/svg/mission.svg";
import FaqSvg from "../assets/svg/faq.svg";
import CareersSvg from "../assets/svg/careers.svg";
import SupportSvg from "../assets/svg/support.svg";
import BlogSvg from "../assets/svg/blog.svg";
import useScroll from "@/hook/useScroll";
import { Button } from "./Component";

const navbarMenus = [
  {
    title: "Products",
    type: "dropdown",
    cols: 3,
    w: "700px",
    lg: "800px",
    xl: "800px",
    items: [
      {
        icon: BridgPaySvg,
        heading: "BridgPay",
        text: "Instant Payouts",
        link: "/bridg-pay",
      },
      {
        icon: BridgCollectSvg,
        heading: "BridgCollect",
        text: "Multi-Channel Collections",
        link: "/bridg-collect",
      },
      {
        icon: BridgConnectSvg,
        heading: "BridgConnect",
        text: "Connected Banking",
        link: "/bridg-connect",
      },
      {
        icon: BridgOnboardSvg,
        heading: "BridgOnboard",
        text: "Merchant Onboarding",
        link: "",
      },
      {
        icon: BridgRouteSvg,
        heading: "BridgRoute",
        text: "Multi-Bank Smart Routing",
        link: "",
      },

      {
        icon: BridgReconSvg,
        heading: "BridgRecon",
        text: "Automated Reconciliation",
        link: "",
      },
      {
        icon: BridgVaultSvg,
        heading: "BridgVault",
        text: "Escrow & Pooled Accounts",
        link: "",
      },
    ],
  },
  {
    title: "Use Cases",
    type: "dropdown",
    cols: 4,
    w: "1100px",
    lg: "1100px",
    xl: "1200px",
    items: [
      {
        icon: SmallBusinessSvg,
        heading: "Small Businesses",
        text: "Simplify payouts, salaries, and collections with real-time visibility.",
        link: "/small-business",
      },
      {
        icon: StartUpSvg,
        heading: "Startups",
        text: "Scale faster with instant payouts and connected banking APIs.",
        link: "/startup",
      },
      {
        icon: SMESvg,
        heading: "SMEs",
        text: "Automate payments, streamline receivables, and cut manual errors.",
        link: "/sme",
      },
      {
        icon: EnterpriseSvg,
        heading: "Enterprise",
        text: "Handle high-volume flows with compliance-ready infrastructure.",
        link: "/enterprise",
      },
      {
        icon: ECommerceSvg,
        heading: "Retail & E-commerce",
        text: "Manage refunds, settlements, and COD in one dashboard.",
        link: "/retail-and-e-commerce",
      },
      {
        icon: SoftwareSvg,
        heading: "Software & Tech",
        text: "Embed payments, automate subscriptions, and partner payouts.",
        link: "/software-and-tech",
      },
      {
        icon: ManufacturesSvg,
        heading: "Manufacturers",
        text: "Simplify supplier payments and track receivables in real time.",
        link: "/manufacturers",
      },
      {
        icon: RealEstateSvg,
        heading: "Real Estate",
        text: "Collect instalments and release contractor payments seamlessly.",
        link: "/real-estate",
      },
      {
        icon: HealthCareSvg,
        heading: "Healthcare",
        text: "Streamline billing, collections, and staff/vendor payouts.",
        link: "/healthcare",
      },
      {
        icon: HospitalSvg,
        heading: "Hospitality",
        text: "Enable guest payments, instant refunds, and branch-wide tracking.",
        link: "/hospitality",
      },
      {
        icon: ProfessionalServiceSvg,
        heading: "Professional Services",
        text: "Automate retainers, payouts, and reconciliation.",
        link: "/professional-services",
      },
      {
        icon: FreelancersSvg,
        heading: "Consultants & Freelancers",
        text: "Get paid instantly and track earnings in real time.",
        link: "/consultant-and-freelancers",
      },
    ],
  },
  { title: "Integrations", type: "link", path: "" },
  {
    title: "Company",
    type: "dropdown",
    w: "600px",
    lg: "650px",
    xl: "700px",
    cols: 2,
    items: [
      {
        icon: AboutUsSvg,
        heading: "About Us",
        text: "Empowering businesses with secure, fast, and scalable fintech infrastructure solutions.",
        link: "/about",
      },
      {
        icon: MissionSvg,
        heading: "Mission",
        text: "Making digital finance simple, fast, and compliant for businesses of every size.",
        link: "/mission",
      },
      {
        icon: CareersSvg,
        heading: "Careers ",
        text: "Build the future of fintech with us. Innovate, grow, and make an impact.",
        link: "/careers",
      },
      {
        icon: ContactSvg,
        heading: "Contact Us",
        text: "Reach out to our team for inquiries, partnerships, or support — we're here to help you.",
        link: "/contact",
      },
    ],
  },
  {
    title: "Resources",
    type: "dropdown",
    cols: 1,
    w: "350px",
    lg: "350px",
    xl: "350px",
    items: [
      {
        icon: FaqSvg,
        heading: "FAQ",
        text: "Find quick answers to your questions about onboarding, payouts, and compliance.",
        link: "/faq",
      },
      {
        icon: SupportSvg,
        heading: "Support",
        text: "Need help? Our support team is available 24/7 to assist you at every step.",
        link: "",
      },
      {
        icon: BlogSvg,
        heading: "Blog",
        text: "Explore expert insights, product updates, and fintech trends shaping the industry.",
        link: "/blog",
      },
    ],
  },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const scrollNavigate = useScroll();
  const [desktopOpenIndex, setDesktopOpenIndex] = useState(null);

  const timeoutRef = useRef(null);
  const triggerRefs = useRef({});
  const dropdownRefs = useRef({});
  const [dropdownPos, setDropdownPos] = useState({
    left: 0,
    top: 0,
    width: 0,
    arrowLeft: 12,
  });

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleDropdownToggle = (title) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };
  const homeRoute = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const adjust = (index) => {
      const triggerEl = triggerRefs.current[index];
      if (!triggerEl) return;

      const navDef = navbarMenus[index] || {};
      const declaredWidth =
        typeof navDef.w === "string" && navDef.w.endsWith("px")
          ? parseInt(navDef.w, 10)
          : navDef.w
          ? parseInt(navDef.w, 10)
          : null;

      const triggerRect = triggerEl.getBoundingClientRect();
      const dropdownWidth =
        declaredWidth ||
        (dropdownRefs.current[index] &&
          dropdownRefs.current[index].offsetWidth) ||
        300;

      // center under trigger
      let leftCandidate =
        triggerRect.left + triggerRect.width / 2 - dropdownWidth / 2;
      const minGap = 8;
      const maxLeft = window.innerWidth - dropdownWidth - minGap;
      let left = Math.max(minGap, Math.min(leftCandidate, maxLeft));

      // position a little below the trigger
      const top = Math.max(triggerRect.bottom + 8, 8);

      const arrowLeft = Math.max(
        12,
        Math.min(
          triggerRect.left + triggerRect.width / 2 - left - 8,
          dropdownWidth - 24
        )
      );

      setDropdownPos({ left, top, width: dropdownWidth, arrowLeft });
    };

    // initial adjust + add resize/scroll listeners while open
    if (desktopOpenIndex !== null) {
      adjust(desktopOpenIndex);
      const onResize = () => adjust(desktopOpenIndex);
      const onScroll = () => adjust(desktopOpenIndex);
      window.addEventListener("resize", onResize);
      window.addEventListener("scroll", onScroll);

      // click outside: close
      const onDocClick = (e) => {
        const trig = triggerRefs.current[desktopOpenIndex];
        const drop = dropdownRefs.current[desktopOpenIndex];
        if (!trig || !drop) return;
        if (!(trig.contains(e.target) || drop.contains(e.target))) {
          setDesktopOpenIndex(null);
        }
      };
      document.addEventListener("mousedown", onDocClick);

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("mousedown", onDocClick);
      };
    }
  }, [desktopOpenIndex]);

  const handleNavigate = (path) => {
    if (!path) return;
    scrollNavigate(path);
    setDesktopOpenIndex(null);
    setOpenDropdown(null);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex justify-center w-screen fixed ${
        !isOpen ? "top-5" : "top-0"
      } z-50`}
    >
      <nav
        className={`transition-all w-6xl max-w-6xl duration-300 bg-white/80 backdrop-blur-md rounded-3xl
              py-1.5 ps-4 border border-[#4372FD1C] z-50`}
      >
        <div className="px-4">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src={homeRoute ? (isSticky ? LogoDark : LogoDark) : LogoDark}
                  alt="logo"
                  className="h-[50px]"
                />
              </Link>
            </div>

            <div className="flex lg:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-sm text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            <div className="hidden lg:flex items-center">
              <ul className="flex items-center gap-7">
                {navbarMenus.map((nav, index) =>
                  nav.type === "dropdown" ? (
                    <li
                      key={index}
                      className="relative"
                      onMouseEnter={() => {
                        clearTimeout(timeoutRef.current);
                        setDesktopOpenIndex(index);
                      }}
                      onMouseLeave={() => {
                        timeoutRef.current = setTimeout(
                          () => setDesktopOpenIndex(null),
                          200
                        );
                      }}
                    >
                      <button
                        ref={(el) => (triggerRefs.current[index] = el)}
                        onClick={() =>
                          setDesktopOpenIndex((cur) =>
                            cur === index ? null : index
                          )
                        }
                        className={`flex items-center gap-2 text-gray-700 rounded-none !bg-transparent font-medium text-md cursor-pointer`}
                      >
                        {nav.title}
                        <svg
                          className={`w-3 h-3 transition-transform duration-300 ${
                            desktopOpenIndex === index ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {desktopOpenIndex === index && (
                        <div
                          ref={(el) => (dropdownRefs.current[index] = el)}
                          className="z-100"
                          style={{
                            position: "fixed",
                            left: `${dropdownPos.left}px`,
                            top: `${dropdownPos.top}px`,
                            width: nav.w || nav.xl || "auto",
                            maxWidth: nav.xl || "90vw",
                          }}
                        >
                          <div className="relative bg-white shadow-lg rounded-lg p-6">
                            <div
                              style={{
                                position: "absolute",
                                top: -8,
                                left: `${dropdownPos.arrowLeft}px`,
                                width: 16,
                                height: 16,
                                transform: "rotate(45deg)",
                                background: "#ffffff",
                                boxShadow: "-1px -1px 1px rgba(0,0,0,0.06)",
                                zIndex: 1,
                              }}
                            />
                            <ul
                              className="text-gray-700 grid gap-4"
                              style={{
                                gridTemplateColumns: `repeat(${
                                  nav.cols || 1
                                }, minmax(0, 1fr))`,
                                width: "100%",
                              }}
                            >
                              {nav.items.map((item, i) => (
                                <li key={i}>
                                  <Link
                                    to={item.link || "#"}
                                    onClick={() => {
                                      if (item.link) handleNavigate(item.link);
                                      else setDesktopOpenIndex(null);
                                    }}
                                    className="p-3 flex items-start gap-4 hover:bg-gray-50 rounded-md"
                                  >
                                    {item?.icon && (
                                      <div className="p-2.5 bg-[#0A0C33] rounded-full flex-shrink-0">
                                        <img
                                          src={item.icon}
                                          alt={item.heading}
                                          className="w-5 h-5"
                                        />
                                      </div>
                                    )}
                                    <div>
                                      <div className="font-medium flex gap-2 group items-center transition duration-400">
                                        {item.heading}{" "}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {item.text}
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  ) : (
                    <li key={index}>
                      <Link
                        to={nav.path}
                        className={`text-md font-medium text-gray-700 `}
                      >
                        {nav.title}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="hidden lg:block">
              <Button
                text="Get Started"
                bgClr="#A5EB14"
                url="/contact"
                py="py-2"
                px="px-5.5"
              />
            </div>
          </div>
        </div>

        <div
          className={`fixed top-0 left-0 z-40 flex lg:hidden h-screen transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            onClick={toggleMenu}
            className="absolute inset-0 bg-black opacity-50"
          />

          <div
            className={`relative flex flex-col w-85 bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              onClick={toggleMenu}
              className="self-end p-4 focus:outline-none"
            >
              ✕
            </button>

            <nav className="flex flex-col gap-4 px-6 py-4 overflow-y-auto h-full max-w-[100vw]">
              {navbarMenus.map((nav, index) =>
                nav.type === "dropdown" ? (
                  <div key={index}>
                    <button
                      onClick={() => handleDropdownToggle(nav.title)}
                      className="flex justify-between w-full text-gray-700 text-md font-medium"
                    >
                      {nav.title}
                      <svg
                        className={`w-4 h-4 transform transition-transform ${
                          openDropdown === nav.title ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        openDropdown === nav.title
                          ? "mt-2"
                          : "max-h-0 overflow-hidden"
                      }`}
                    >
                      <div className="pl-2 flex flex-col gap-2 my-5 gap-y-5">
                        {nav.items.map((item, i) => (
                          <Link
                            key={i}
                            to={item.link || "#"}
                            onClick={() => {
                              if (item.link) handleNavigate(item.link);
                              else setDesktopOpenIndex(null);
                            }}
                            className="flex gap-3 items-start hover:text-[#A5EB14]"
                          >
                            {item.icon && (
                              <div className="p-2 bg-[#0A0C33] flex-shrink-0 rounded-full">
                                <img
                                  src={item.icon}
                                  alt={item.heading}
                                  className="w-4 h-4 object-contain"
                                />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-700">
                                {item.heading}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.text}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={nav.path}
                    className="text-gray-700 font-medium text-md hover:text-[#A5EB14]"
                  >
                    {nav.title}
                  </Link>
                )
              )}
              <button
                className="bg-[#A5EB14] cursor-pointer group text-[12px] flex rounded-3xl py-2 px-5 gap-3 justify-center items-center"
                onClick={() => scrollNavigate("/contact")}
              >
                Get Started
                <span className="translate-x-[-5px] group-hover:opacity-100 group-hover:translate-x-0 transition duration-300">
                  <img src={ArrowSvg} alt="arrow" />
                </span>
              </button>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
