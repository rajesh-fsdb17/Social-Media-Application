import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'

export const SlideTabsExample = () => {
    return (
        
            <SlideTabs />
     
    );
};

const SlideTabs = () => {
    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    return (
        <ul
            onMouseLeave={() => {
                setPosition((pv) => ({
                    ...pv,
                    opacity: 0,
                }));
            }}
            className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
        >
            <Tab setPosition={setPosition} to="/posts">Posts</Tab>
            <Tab setPosition={setPosition} to="/profile">Profile</Tab>

            <Cursor position={position} />
        </ul>
    );
};

const Tab = ({ children, setPosition ,to}) => {
    const ref = useRef(null);

    return (
        <li
            ref={ref}
            onMouseEnter={() => {
                if (!ref?.current) return;

                const { width } = ref.current.getBoundingClientRect();

                setPosition({
                    left: ref.current.offsetLeft,
                    width,
                    opacity: 1,
                });
            }}
            className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-1 md:text-base"
        >
            <Link to={to} >
                {children}
            </Link>
        </li>
    );
};

const Cursor = ({ position }) => {
    return (
        <motion.li
            animate={{
                ...position,
            }}
            className="absolute z-0 h-7 rounded-full bg-black md:h-8"
        />
    );
};
