import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

const ScrollCounterFramer = ({ value = 1000 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // 👈 trigger every time in view

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      // reset to 0 before starting again
      count.set(0);

      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });

      const unsubscribe = rounded.on("change", (latest) => {
        setDisplay(latest);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, value, count, rounded]);

  return (
    <motion.h2 ref={ref}>
      {display}
    </motion.h2>
  );
};

export default ScrollCounterFramer;

///// single time
// import React, { useEffect, useState, useRef } from "react";
// import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

// const ScrollCounterFramer = ({ value = 1000 }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true }); // runs only first time it comes into view

//   const count = useMotionValue(0);
//   const rounded = useTransform(count, (latest) => Math.round(latest));
//   const [display, setDisplay] = useState(0);

//   useEffect(() => {
//     if (isInView) {
//       const controls = animate(count, value, {
//         duration: 2,
//         ease: "easeOut",
//       });

//       const unsubscribe = rounded.on("change", (latest) => {
//         setDisplay(latest);
//       });

//       return () => {
//         controls.stop();
//         unsubscribe();
//       };
//     }
//   }, [isInView, value, count, rounded]);

//   return (
//     <motion.h2 ref={ref}>
//       {display}
//     </motion.h2>
//   );
// };

// export default ScrollCounterFramer;
