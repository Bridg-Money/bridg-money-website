import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ScrollHandler } from "../hook/useScroll";
import BackToTop from "./BackToTop";

const HomeLayout = () => {
  return (
    <main>
      <Navbar />
      <ScrollHandler />
      <section>
        <Outlet />
      </section>
      <Footer />
      <BackToTop />
    </main>
  );
};

export default HomeLayout;
