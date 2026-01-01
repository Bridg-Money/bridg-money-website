import { memo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const useScroll = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollNavigate = (path, targetId = null) => {
    if (location.pathname === path) {
      if (targetId) {
        const targetSection = document.getElementById(targetId);
        console.log(targetSection);
        if (targetSection) {
          window?.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth",
          });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate(path, { state: { scrollTo: targetId } });
    }
  };

  return scrollNavigate;
};

export default useScroll;

export const ScrollHandler = memo(() => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const scrollToId =
      location.state?.scrollTo || location.hash?.replace("#", "");

    if (scrollToId) {
      setTimeout(() => {
        const targetSection = document.getElementById(scrollToId);
        if (targetSection) {
          window?.scrollTo({
            top: targetSection?.offsetTop,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  return null;
});
