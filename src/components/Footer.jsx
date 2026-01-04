import LinkedInSvg from "../assets/icons/linkedin.svg";
import InstaSvg from "../assets/icons/insta.svg";
import FbSvg from "../assets/icons/fb.svg";
import XSvg from "../assets/icons/x.svg";
import useScroll from "@/hook/useScroll";

const Footer = () => {
  const scrollNavigate = useScroll();

  return (
    <footer className="bg-[#0A0C33] pb-5 pt-8 text-white">
      <section className="px-7 md:px-12 lg:px-15">
        <div className="grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-y-10 py-15">
          <div className="pe-10">
            <button onClick={() => scrollNavigate("/")}>
              <img
                src="/assets/logo/logo.svg"
                alt="footer logo"
                className="h-15 mb-2 cursor-pointer"
              />
            </button>
            <p className="text-gray-200">
              Collect. Payout. Reconcile. All-in-one fintech infrastructure
              built for modern merchants.
            </p>
            <div className="my-3">
              <p className="text-[#A5EB14] text-lg font-bold">Let's Talk</p>
              <p className="text-gray-200 mt-2">Connect with us</p>
              <p className="text-gray-200">
                <a href="emailto:hello@bridg.money">hello@bridg.money</a>
              </p>
            </div>
            <div className="flex gap-5 mt-5">
              <a href="https://x.com/bridgmoney38481" target="_blank">
                <img
                  src={XSvg}
                  alt="X"
                  className="cursor-pointer hover:scale-125 transition"
                />
              </a>
              <img
                src={FbSvg}
                alt="FaceBook"
                className="cursor-pointer hover:scale-125 transition"
              />
              <a href="https://www.instagram.com/bridg.money" target="_blank">
                <img
                  src={InstaSvg}
                  alt="Instagram"
                  className="cursor-pointer hover:scale-125 transition"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/bridg-financial-technologies-private-limited/"
                target="_blank"
              >
                <img
                  src={LinkedInSvg}
                  alt="LinkedIn"
                  className="cursor-pointer hover:scale-125 transition"
                />
              </a>
            </div>
          </div>
          <div className="grid md:col-span-2 gap-4 xl:col-span-2 md:grid-cols-3 lg:grid-cols-3">
            <div className="grid sm:grid-cols-2 col-span-2">
              <div>
                <div className="mb-3">
                  <h6 className="text-[#A5EB14] mb-3 text-lg font-bold">
                    Get Started
                  </h6>
                  <p className="mb-2 text-gray-200">Login</p>
                  <p className="mb-2 text-gray-200">SignUp</p>
                </div>
                <h6 className="text-[#A5EB14] mb-3 text-lg font-bold">
                  Product
                </h6>
                <ul>
                  <li
                    role="button"
                    onClick={() => scrollNavigate("/bridg-pay")}
                    className="text-gray-200 cursor-pointer mb-2"
                  >
                    BridgPay
                  </li>
                  <li className="mb-2 text-gray-200">BridgOnboard</li>
                  <li className="mb-2 text-gray-200">BridgVerify</li>
                  <li className="mb-2 text-gray-200">BridgCollect</li>
                  <li className="mb-2 text-gray-200">BridgRoute</li>
                  <li className="mb-2 text-gray-200">BridgRecon</li>
                </ul>
              </div>
              <ul>
                <h6 className="text-[#A5EB14] mb-3 text-lg font-bold">
                  Use Cases
                </h6>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/small-business")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Small Businesses
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/startup")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Startups
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/sme")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  SME's
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/enterprise")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Enterprise
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/retail-and-e-commerce")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Retail & Ecommerce
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/software-and-tech")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Software and Tech
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/manufacturers")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Manufacturers
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/real-estate")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Real Estate
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/healthcare")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Healthcare
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/hospitality")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Hospitality
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/professional-services")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Professional Services
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/consultant-and-freelancers")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Consultants and Freelancers
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-[#A5EB14] mb-3 text-lg font-bold">Company</h6>
              <ul>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/about")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  About Us
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/careers")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Careers
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/privacy-policy")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Privacy Policy
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/terms")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Terms & Conditions
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/grievance-redressal-policy")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Grievance Policy
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/responsible-disclosure")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Responsible Disclosure
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/security")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Secure Usage Guidelines
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/trust-and-security")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Trust & Security
                </li>
                <li
                  role="button"
                  onClick={() => scrollNavigate("/corporate-policies")}
                  className="text-gray-200 cursor-pointer mb-2"
                >
                  Corporate Policies
                </li>
              </ul>
              <div className="my-3">
                <h6 className="text-[#A5EB14] mb-3 text-lg font-bold">
                  Resources
                </h6>
                <ul>
                  <li
                    role="button"
                    onClick={() => scrollNavigate("/faq")}
                    className="text-gray-200 cursor-pointer mb-2"
                  >
                    FAQ
                  </li>
                  <li
                    role="button"
                    onClick={() => scrollNavigate("/blog")}
                    className="text-gray-200 cursor-pointer mb-2"
                  >
                    Blog
                  </li>
                  <p className="mb-2 text-gray-200">Help Centre</p>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-400 py-5 text-sm">
            © {new Date().getFullYear()} Bridg Financial Technologies Pvt. Ltd.
            All rights reserved.
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
