import React from 'react';
import { motion } from 'framer-motion';
import { getImage } from '../data/images';

const FloatingElements = () => {
  const elements = [
    { src: getImage('icedCoffee'), top: '15%', left: '5%', delay: 0 },
    { src: getImage('chocolatePastry'), top: '40%', right: '8%', delay: 1 },
    { src: getImage('latteArt'), top: '70%', left: '10%', delay: 2 },
    { src: getImage('paneerPanini'), top: '25%', right: '15%', delay: 0.5 },
    { src: getImage('blueberryCheesecake'), top: '80%', right: '12%', delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute w-24 h-24 rounded-full overflow-hidden border-4 border-foam shadow-xl opacity-80"
          style={{ top: el.top, left: el.left, right: el.right }}
          animate={{
            y: [-15, 15],
            rotate: [-5, 5],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: el.delay,
          }}
        >
          <img src={el.src} alt="" className="w-full h-full object-cover" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
