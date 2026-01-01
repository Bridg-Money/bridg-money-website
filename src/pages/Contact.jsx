import React, { useState } from "react";
import { ArrowSvg } from "../components/Svg";
import EmailSvg from "../assets/icons/email.svg";
import PhoneSvg from "../assets/icons/phone.svg";
import { toast } from "sonner";

const formspreeKey = "xpwlnpyo";

const ErrMsg = ({ error }) => {
  return (
    <>
      {error && (
        <p className="pl-3 text-sm pb-0 text-red-700">
          <small>{error}</small>
        </p>
      )}
    </>
  );
};

const validateField = (name, value) => {
  const trimmedValue = String(value ?? "").trim();
  switch (name) {
    case "name":
      return !trimmedValue ? "Name is required" : "";
    case "email":
      return !trimmedValue ? "Email is required" : "";
    case "phone":
      return !trimmedValue ? "Phone no is required" : "";
    case "companyName":
      return !trimmedValue ? "Company Name is required" : "";
    case "interestedProducts":
      return !trimmedValue ? "Interested Products is required" : "";
    default:
      return "";
  }
};

const Contact = () => {
  const defaultValue = {
    name: "",
    email: "",
    phone: "",
    companyName: "",
    interestedProducts: "",
  };
  const [user, setUser] = useState(defaultValue);
  const [error, setError] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validValue = value;
    if (name === "phone") {
      validValue = value.replace(/[^0-9]/g, "").slice(0, 12);
    } else if (name === "email") {
      validValue = value
        .replace(/[^a-zA-Z0-9@._%+-]/g, "")
        .replace(/(@.*)@/g, "$1")
        .slice(0, 100);
    }
    const error = validateField(name, value);

    setError((prev) => ({
      ...prev,
      [name]: error,
    }));
    setUser((prev) => ({
      ...prev,
      [name]: validValue,
    }));
  };

  const validate = () => {
    const newErrors = Object.entries(user).reduce((acc, [key, value]) => {
      const error = validateField(key, value);
      if (error) acc[key] = error;
      return acc;
    }, {});

    setError(newErrors);
    const proceed = Object.values(newErrors).length === 0;
    return proceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setProcessing(true);
    if (validate()) {
      const res = await fetch(`https://formspree.io/f/${formspreeKey}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        toast.success("Thanks! Your message has been sent.");
        setUser(defaultValue);
      } else {
        toast.error("Oops! Something went wrong.");
      }
    }
    setProcessing(false);
  };

  return (
    <div>
      <section className="px-7 md:px-15 lg:px-22 xl:px-30 pt-30 pb-15">
        <div className="grid lg:grid-cols-2 gap-y-10">
          <div className="lg:pr-10 xl:pr-20 order-2 lg:order-1">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={user?.name}
                  className={`rounded-2xl py-1 px-4 mt-2 outline-0 bg-[#1E1E1E05] w-full border ${
                    error.name ? "border-red-700" : "border-[#1E1E1E14]"
                  }`}
                  onChange={handleChange}
                  maxLength={100}
                />
                <ErrMsg error={error?.name} />
              </div>
              <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={user?.email}
                  className={`rounded-2xl py-1 px-4 mt-2 outline-0 bg-[#1E1E1E05] w-full border ${
                    error.email ? "border-red-700" : "border-[#1E1E1E14]"
                  }`}
                  onChange={handleChange}
                  maxLength={100}
                />
                <ErrMsg error={error?.email} />
              </div>
              <div className="mb-2">
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={user?.companyName}
                  className={`rounded-2xl py-1 px-4 mt-2 outline-0 bg-[#1E1E1E05] w-full border ${
                    error.companyName ? "border-red-700" : "border-[#1E1E1E14]"
                  }`}
                  onChange={handleChange}
                  maxLength={150}
                />
                <ErrMsg error={error?.companyName} />
              </div>
              <div className="mb-2">
                <label htmlFor="phone">Phone No</label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={user?.phone}
                  className={`rounded-2xl py-1 px-4 mt-2 outline-0 bg-[#1E1E1E05] w-full border ${
                    error.phone ? "border-red-700" : "border-[#1E1E1E14]"
                  }`}
                  onChange={handleChange}
                  maxLength={12}
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
                <ErrMsg error={error?.phone} />
              </div>
              <div className="mb-2">
                <label htmlFor="products">Interested Products</label>
                <div className="relative">
                  <select
                    id="products"
                    name="interestedProducts"
                    value={user?.interestedProducts}
                    className={`rounded-2xl appearance-none py-1.5 px-4 mt-2 outline-0 bg-[#1E1E1E05] w-full border ${
                      error.interestedProducts
                        ? "border-red-700"
                        : "border-[#1E1E1E14]"
                    }`}
                    onChange={handleChange}
                  >
                    <option value="">select</option>
                    <option value="BridgPay – Instant Payouts">
                      BridgPay – Instant Payouts
                    </option>
                    <option value="BridgCollect – Multi-Channel Collections">
                      BridgCollect – Multi-Channel Collections
                    </option>
                    <option value="BridgConnect – Connected Banking">
                      BridgConnect – Connected Banking
                    </option>
                  </select>
                  <span className="absolute inset-y-1 h-full right-3 flex items-center pointer-events-none">
                    ▼
                  </span>
                </div>
                <ErrMsg error={error?.interestedProducts} />
              </div>
              <input type="hidden" name="_subject" value="New Contact from bridg.money"/>

    <input type="hidden" name="source" value="bridg.money"/>

    <input type="hidden" name="_captcha" value="false"/>
              <button
                type="submit"
                disabled={processing}
                className="cursor-pointer bg-[#A5EB14] group text-sm rounded-3xl py-2 mt-5 px-5 flex gap-3 items-center"
              >
                Contact Us
                <span className="translate-x-[-5px] group-hover:opacity-100 group-hover:translate-x-0 transition duration-300">
                  <ArrowSvg />
                </span>
              </button>
            </form>
          </div>
          <div className="order-1 lg:order-2 flex items-center">
            <div>
              <h1
                className="
                          relative px-7 before:content-[''] before:absolute before:left-[7px] before:top-1/2 before:-translate-y-1/2 before:w-[11px] before:h-[11px] before:rounded-full before:bg-[#CDFF66] 
                          after:content-[''] after:absolute after:right-[7px] after:top-1/2 after:-translate-y-1/2 after:w-[11px] after:h-[11px] after:rounded-full after:bg-[#CDFF66]
                          text-sm mb-5 bg-[#1E1E1E] w-max rounded-2xl py-1 text-white"
              >
                Contact Us
              </h1>
              <h1 className="text-[38px] md:text-5xl xl:text-6xl font-semibold leading-12 md:leading-16 mb-3">
                Let’s Power Your <span className="text-[#A5EB14]">Fintech</span>{" "}
                Journey
              </h1>
              <button className="border pointer-events-none text-sm border-black rounded-3xl py-2 px-5 flex gap-3 items-center">
                Book a Demo <ArrowSvg />
              </button>
              <div className="flex flex-wrap gap-5 lg:gap-10 my-8 items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0A0C33] rounded-full p-2.5 flex items-center justify-center">
                    <img
                      src={EmailSvg}
                      alt="Phone no"
                      className="h-[11px] object-contain"
                    />
                  </div>
                  <a href="mailto:hello@bridg.money">hello@bridg.money</a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-[#0A0C33] rounded-full p-2.5 flex items-center justify-center">
                    <img
                      src={PhoneSvg}
                      alt="Phone no"
                      className="h-[12px] object-contain"
                    />
                  </div>
                  <a href="tel:+91 75756 12809">+91 75756 12809</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
