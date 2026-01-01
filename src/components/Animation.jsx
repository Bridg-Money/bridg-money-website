import React, { memo, useEffect,useRef } from "react";
import { motion, useInView } from "motion/react";

export const AnimatedImage = memo(
  ({
    src,
    alt,
    height = "auto",
    width = "auto",
    duration = 0.2,
    once = true,
    amount = "all",
    className = "",
    style = {},
  }) => {
    return (
      <motion.img
        initial={{ opacity: 0.8 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: duration, ease: "easeInOut" }}
        viewport={{ once: once, amount: amount }}
        src={src}
        loading="lazy"
        height={height}
        width={width}
        className={className}
        alt={alt}
        style={style}
      />
    );
  }
);

export const TextFade = memo(
  ({ direction, children, staggerChildren = 0.05 }) => {
    const FADE_DOWN = {
      show: { opacity: 1, y: 0, transition: { type: "spring" } },
      hidden: { opacity: 0, y: direction === "down" ? -18 : 18 },
    };

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: "some" });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "show" : ""}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: staggerChildren,
            },
          },
        }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? (
            <motion.div variants={FADE_DOWN}>{child}</motion.div>
          ) : (
            child
          )
        )}
      </motion.div>
    );
  }
);

export const CardFade = memo(
  ({ direction, type = "fade", children, staggerChildren = 0.05 }) => {
    const FADE_DOWN = {
      show: { opacity: 1, y: 0, transition: { type: "spring" } },
      hidden: { opacity: 0, y: direction === "down" ? -18 : 18 },
    };

    const FADE = {
      show: { opacity: 1, transition: { type: "spring" } },
      hidden: { opacity: 0 },
    };

    const animationType = type === "fadeup" ? FADE_DOWN : FADE;

    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: "some" });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "show" : ""}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: staggerChildren,
            },
          },
        }}
      >
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child) ? (
            <motion.div key={index} variants={animationType}>
              {child}
            </motion.div>
          ) : (
            child
          )
        )}
      </motion.div>
    );
  }
);



