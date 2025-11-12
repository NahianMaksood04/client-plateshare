import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ children }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.section>
    );
};

export default AnimatedSection;
