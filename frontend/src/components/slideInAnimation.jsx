import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-hook-inview'


const SlideRight = ({ children, customClass }) => {

    return (
        <motion.div
            className={customClass}
            initial={{ x: -100, opacity: 0, filter: "blur(10px)" }}
            whileInView={{
                x: 0, opacity: 1, filter: "blur(0px)"
            }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "tween", duration: 1.5, ease: "easeInOut" }}>

            {children}
        </motion.div >
    )
}

const SlideLeft = ({ children, customClass }) => {
    // const [ref, inView] = useInView({ threshold: 0.3 })
    // const [hasAnimated, setHasAnimated] = React.useState(false)


    return (
        <motion.div
            className={customClass}
            initial={{ x: 100, opacity: 0, filter: "blur(10px)" }}
            whileInView={{
                x: 0, opacity: 1, filter: "blur(0px)"
            }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "tween", duration: 1.5, ease: "easeInOut" }}>

            {children}
        </motion.div >
    )
}

export { SlideLeft, SlideRight }