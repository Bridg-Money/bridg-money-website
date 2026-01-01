import React from "react";
import { ArrowSvg } from "./Svg";
import { useNavigate } from "react-router";

const Button = ({ text, clr, brClr, bgClr, arrClr, url, py, px }) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className={`group ${
          brClr ? `border` : ""
        } cursor-pointer transition duration-400 rounded-3xl ${py || "py-2"} ${
          px || "px-6"
        } text-sm bg-center flex gap-3 items-center`}
        style={{
          color: clr,
          backgroundColor: bgClr,
          borderColor: brClr,
        }}
        onClick={() => navigate(url || "")}
      >
        {text}
        <span className="[animation-duration:300ms] group-hover:[animation:arrowMove_0.4s_ease-in-out]">
          <ArrowSvg color={arrClr} />
        </span>
      </button>
    </>
  );
};

export default Button;
