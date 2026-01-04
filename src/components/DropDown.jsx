import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ button, children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setOpen(!open)}>{button}</div>

      {open && (
        <div
          className="
           absolute mt-2 bg-white p-4 rounded-2xl shadow-lg z-10 
           min-w-170 xl:min-w-185.5 max-w-[90vw]
            left-1/2 -translate-x-1/3 lg:-left-full lg:translate-x-0
          "
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
