import React from "react";
import { ArrowSvg } from "./Svg";
import { useNavigate } from "react-router";

export const TitleDecor = ({
  title = "",
  bgClr = "#1E1E1E",
  clr = "white",
}) => {
  return (
    <>
      <h1
        className="flex items-center gap-2 text-sm my-5 w-max rounded-2xl py-1.5 px-3"
        style={{ color: clr, background: bgClr }}
      >
        <span className="w-3 h-3 rounded-full bg-[#CDFF66]" />
        {title}
        <span className="w-3 h-3 rounded-full bg-[#CDFF66]" />
      </h1>
    </>
  );
};

export const Button = ({ text, clr, brClr, bgClr, arrClr, url, py, px }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`group ${
        brClr ? "border" : ""
      } cursor-pointer transition-all duration-300 rounded-3xl ${
        py || "py-2"
      } ${px || "px-6"} text-sm bg-center flex gap-3 items-center 
      hover:scale-103 hover:shadow-lg active:scale-95`}
      style={{
        color: clr,
        backgroundColor: bgClr,
        borderColor: brClr,
      }}
      onClick={() => navigate(url || "")}
    >
      <span className="relative overflow-hidden">
        <span className="block transition-transform duration-300 group-hover:translate-y-[-100%]">
          {text}
        </span>
        <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          {text}
        </span>
      </span>

      <span className="ml-1 [animation-duration:300ms] group-hover:[animation:arrowMove_0.4s_ease-in-out]  transition-transform duration-300">
        <ArrowSvg color={arrClr} />
      </span>
    </button>
  );
};
