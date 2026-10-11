import React from 'react';
import { motion } from 'framer-motion';
import { menuData } from '../../data/menu';

const DishTrain = () => {
  // Collect all images from menuData
  const allImages = [];
  menuData.categories.forEach(cat => {
    cat.items.forEach(item => {
      if (item.image) {
        allImages.push({ name: item.name, image: item.image, slug: item.slug });
      }
    });
  });

  // Duplicate for seamless loop
  const trainItems = [...allImages, ...allImages];

  return (
    <div className="w-full overflow-hidden py-10 bg-foam border-y border-latte/30 relative">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-foam to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-foam to-transparent z-10 pointer-events-none" />
      
      <div className="flex gap-8 whitespace-nowrap">
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {trainItems.map((item, index) => (
            <div 
              key={`${item.slug}-${index}`}
              className="flex flex-col items-center justify-center gap-3 w-48 shrink-0 group"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-almond shadow-lg relative group-hover:border-caramel transition-colors duration-300">
                <motion.img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-ink font-bold text-sm truncate w-full text-center group-hover:text-caramel transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DishTrain;
