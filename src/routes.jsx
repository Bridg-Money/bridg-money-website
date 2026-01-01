import { Navigate } from "react-router";
import Home from "./pages/Home";
import HomeLayout from "./components/HomeLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Careers from "./pages/Careers";
import Mission from "./pages/Mission";
import BridgPay from "./pages/products/BridgPay";
import BridgConnect from "./pages/products/BridgConnect";
import BridgCollect from "./pages/products/BridgCollect";
import PrivacyPolicy from "./pages/company/PrivacyPolicy";
import TermsAndCondition from "./pages/Terms";
import TrustAndSecurity from "./pages/company/TrustAndSecurity";
import CorporatePolicies from "./pages/company/CorporatePolicies";
import GrievanceRedressalPolicy from "./pages/company/GrievanceRedressalPolicy";
import ResponsibleDisclosure from "./pages/company/ResponsibleDisclosure";
import SecureUsageGuidelines from "./pages/company/SecureUsageGuidelines";
import SmallBusiness from "./pages/use case/SmallBusiness";
import StartUp from "./pages/use case/StartUp";
import SME from "./pages/use case/SME";
import Enterprise from "./pages/use case/Enterprise";
import ECommerce from "./pages/use case/ECommerce";
import SoftwareAndTech from "./pages/use case/SoftwareAndTech";
import Manufacturer from "./pages/use case/Manufacturer";
import RealEstate from "./pages/use case/RealEstate";
import HealthCare from "./pages/use case/HealthCare";
import Hospitality from "./pages/use case/Hospitality";
import ProfessionalServices from "./pages/use case/ProfessionalServices";
import ConsultantAndFreelancers from "./pages/use case/ConsultantAndFreelancers";
import BlogHome from "./pages/resources/BlogHome";
import Blogs from "./pages/resources/Blogs";
import Blog from "./pages/resources/Blog";

export const routes = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Home /> },

      //products

      { path: "bridg-pay", element: <BridgPay /> },
      { path: "bridg-connect", element: <BridgConnect /> },
      { path: "bridg-collect", element: <BridgCollect /> },
      //products

      //use case
      { path: "small-business", element: <SmallBusiness /> },
      { path: "startup", element: <StartUp /> },
      { path: "sme", element: <SME /> },
      { path: "enterprise", element: <Enterprise /> },
      { path: "retail-and-e-commerce", element: <ECommerce /> },
      { path: "software-and-tech", element: <SoftwareAndTech /> },
      { path: "manufacturers", element: <Manufacturer /> },
      { path: "real-estate", element: <RealEstate /> },
      { path: "healthcare", element: <HealthCare /> },
      { path: "hospitality", element: <Hospitality /> },
      { path: "professional-services", element: <ProfessionalServices /> },
      {
        path: "consultant-and-freelancers",
        element: <ConsultantAndFreelancers />,
      },

      //use case

      //company

      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "careers", element: <Careers /> },
      { path: "mission", element: <Mission /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <TermsAndCondition /> },
      { path: "trust-and-security", element: <TrustAndSecurity /> },
      { path: "corporate-policies", element: <CorporatePolicies /> },
      {
        path: "grievance-redressal-policy",
        element: <GrievanceRedressalPolicy />,
      },
      { path: "responsible-disclosure", element: <ResponsibleDisclosure /> },
      { path: "security", element: <SecureUsageGuidelines /> },
      //company

      //resources
      { path: "faq", element: <FAQ /> },
      {
        path: "blog",
        element: <BlogHome />,
        children: [
          { index: true, element: <Blogs /> },
          { path: ":slug", element: <Blog /> },
        ],
      },
      //resources
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
];
