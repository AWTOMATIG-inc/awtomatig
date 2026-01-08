"use client";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function AnimatedButton({
  name = "button",
  icon,
  className = "",
  width = "w-[200px]",
  height = "h-14",
  textSize = "text-lg",
  iconSize,
}) {
  const letters = name.split("");
  const STAGGER = 0.02;
  const TEXT_DURATION = 0.2;
  const ICON_DELAY = letters.length * STAGGER;

  const showText = {
    initial: { y: 30, opacity: 0 },
    hover: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * STAGGER,
        duration: TEXT_DURATION,
        ease: "easeOut",
      },
    }),
  };

  const hideText = {
    initial: { y: 0, opacity: 1 },
    hover: (i) => ({
      y: -30,
      opacity: 0,
      transition: {
        delay: i * STAGGER,
        duration: TEXT_DURATION,
        ease: "easeOut",
      },
    }),
  };

  const iconVariant = {
    initial: { x: 0, y: 0, opacity: 1 },
    hover: {
      x: 50,
      y: -70,
      opacity: 1,
      transition: {
        delay: ICON_DELAY,
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };
  const iconVariant2 = {
    initial: { x: -50, y: 70, opacity: 1 },
    hover: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        delay: ICON_DELAY,
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={`animated-border-button rounded-full ${height}`}>
      <motion.div
        initial="initial"
        whileHover="hover"
        className={`relative inline-flex items-center justify-center cursor-pointer overflow-hidden ${width} ${height} ${className}`}
      >
        {/* DEFAULT TEXT */}
        <motion.div className="flex items-center gap-2 absolute">
          <div className={`text-lg flex gap-0.5 font-medium ${textSize}`}>
            {letters.map((char, i) => (
              <motion.span key={i} variants={hideText} custom={i}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          {icon && (
            <motion.span variants={iconVariant}>
              <Icon
                icon="meteor-icons:arrow-up-right"
                width="26"
                height="26"
                className={iconSize}
              />
            </motion.span>
          )}
        </motion.div>

        {/* HOVER TEXT */}
        <motion.div className="flex items-center gap-2 absolute">
          <div className={`text-lg flex gap-0.5 font-medium ${textSize}`}>
            {letters.map((char, i) => (
              <motion.span key={i} variants={showText} custom={i}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          {icon && (
            <motion.span variants={iconVariant2}>
              <Icon
                icon="meteor-icons:arrow-up-right"
                width="26"
                height="26"
                className={iconSize}
              />
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

// import { Icon } from "@iconify/react";
// import { motion } from "framer-motion";

// const AnimatedButton = () => {
//   const text = "Say hello";
//   return (
//     <motion.div
//       initial="initial"
//       whileHover="hover"
//       className="relative flex items-center justify-center px-8 py-4  overflow-hidden border-2 border-black rounded-full bg-white transition-colors duration-300  group h-10 cursor-pointer"
//     >
//       {/* First State: Just Text */}
//       <div className="flex items-center">
//         <div>
//           {text.split("").map((l, id) => (
//             <motion.span
//               variants={{
//                 initial: { y: 0 },
//                 hover: { y: -30 }, // Slide up
//               }}
//               transition={{
//                 duration: 1,
//                 delay: 0.5 + Number(id),
//                 ease: [0.6, 0.01, 0.05, 0.9],
//               }}
//               className="text-lg font-medium text-black group-hover:text-white"
//             >
//               {l}
//             </motion.span>
//           ))}
//         </div>
//         <Icon icon="lucide:arrow-up-right" className="text-2xl text-black " />
//       </div>
//     </motion.div>
//   );
// };

// export default AnimatedButton;
