import React from "react";
import { Link, useOutletContext, useParams } from "react-router";
import LinkedInSvg from "../../assets/icons/linkedin.svg";
import InstaSvg from "../../assets/icons/insta.svg";
import FbSvg from "../../assets/icons/fb.svg";
import XSvg from "../../assets/icons/x.svg";

const Blog = () => {
  const { slug } = useParams();
  const blogs = useOutletContext();
  const filteredBlog = blogs.filter((blg) => blg.url === slug);
  const blog = filteredBlog[0];

  return (
    <>
      <div className="grid lg:grid-cols-3 lg:gap-4 xl:gap-5 px-7 md:px-15 lg:px-10 xl:px-15 pt-15">
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-[#A4F200]">
            {blog.date}
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-[45px] lg:text-4xl xl:text-[45px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-12 xl:leading-14 mb-3">
            {blog.title}
          </h1>
        </div>
        <div className="lg:col-span-2 lg:px-8">
          <div className="pb-8">
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full rounded-3xl border"
            />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 px-7 md:px-15 lg:px-10 xl:px-15 pb-15">
        <div className="order-2 lg:order-1 lg:col-span-1">
          <div className="p-7 lg:px-5 shadow rounded-2xl sticky top-30">
            <Link to="">
              <img
                src="/assets/logo/logo-dark.svg"
                alt="footer logo"
                className="h-13 lg:h-13 xl:15 md:h-15 mb-2 cursor-pointer"
              />
            </Link>
            <p className="text">
              Collect. Payout. Reconcile. All-in-one fintech infrastructure
              built for modern merchants.
            </p>
            <div className="flex gap-5 mt-5">
              <img
                src={XSvg}
                alt="X"
                className="cursor-pointer hover:scale-125 transition"
              />
              <img
                src={FbSvg}
                alt="FaceBook"
                className="cursor-pointer hover:scale-125 transition"
              />
              <img
                src={InstaSvg}
                alt="Instagram"
                className="cursor-pointer hover:scale-125 transition"
              />
              <img
                src={LinkedInSvg}
                alt="LinkedIn"
                className="cursor-pointer hover:scale-125 transition"
              />
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-2 lg:px-8">
          {blog.section}
        </div>
      </div>
    </>
  );
};

export default Blog;
