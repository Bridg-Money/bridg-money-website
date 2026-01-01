import { Button, TitleDecor } from "@/components/Component";
import React from "react";
import { useOutletContext } from "react-router";

const Blogs = () => {
  const blogs = useOutletContext();
  return (
    <>
      <section className="container-xxl px-7 pt-25 py-4">
        <div className="flex justify-center">
          <TitleDecor title="Our Blogs" />
        </div>
        <div className="flex justify-center">
          <div className="md:w-3/4 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold mb-3">
              Find our all blogs from here
            </h1>
            <p className="text-lg">
              our blogs are written from very research research and well known
              writers writers so that we can provide you the best blogs and
              articles articles for you to read them all along
            </p>
          </div>
        </div>
      </section>
      <section className="container-xxl py-5 px-7 md:px-15">
        {blogs.map((blog) => (
          <div key={blog.id} className="grid gap-5 mb-5 lg:grid-cols-2">
            <div className="my-3 flex items-center">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full rounded-3xl border"
              />
            </div>
            <div className="flex items-center">
              <div>
                <h2 className="mb-2 text-gray-400">{blog.date}</h2>
                <h1 className="text-3xl font-semibold leading-9.5 mb-3">
                  {blog.title}
                </h1>
                <p className="mb-3">{blog.subText}</p>
                <Button
                  text="Read Blog"
                  brClr="black"
                  clr="black"
                  url={blog.url}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Blogs;
