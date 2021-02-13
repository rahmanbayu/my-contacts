import { motion } from "framer-motion";
import React from "react";
import { pageVariant } from "../../variants";

function NotFound(props) {
  return (
    <motion.div variants={pageVariant} exit="exit" animate="visibel" initial="hidden" className="flex items-center justify-center w-full h-screen bg-gray-200">
      <div className="text-gray-400 font-medium text-xl">404 Not Found.</div>
    </motion.div>
  );
}

export default NotFound;
