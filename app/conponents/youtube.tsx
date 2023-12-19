"use client"
import React from "react";
import {motion} from "framer-motion";

const Youtube = () => {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1, }}
    transition={{
      duration: 2,
      delay: 0,
    }}
    className=" flex flex-col lg:w-[70vh] lg:h-[40vh] mt-10">
        
        <iframe
      className="border-2 md:p-2 lg:flex-grow lg:w-[100%] max-sm:max-w-[42vh] shadow-lg"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/IAb6BbqlZog?si=Hl2Zrek0RVPrQj4r"
      
    ></iframe>
       
      
    </motion.div>
  );
};

export default Youtube;