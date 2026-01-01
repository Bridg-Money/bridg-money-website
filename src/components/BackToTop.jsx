import { useState, useEffect, memo } from "react";

const BackToTop = memo(() => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6">
        {isVisible && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer"
          >
            <div className="bg-[#A5EB14] h-12 w-12 text-xl rounded-full p-2 flex justify-center items-center">
              ↑
            </div>
          </button>
        )}
      </div>
    </>
  );
});

export default BackToTop;
