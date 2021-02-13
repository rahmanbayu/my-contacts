const pageVariant = {
  visibel: { x: 0, transition: { type: "tween" } },
  hidden: { x: "-100vw" },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut",
      type: "tween",
    },
  },
};

export { pageVariant };
