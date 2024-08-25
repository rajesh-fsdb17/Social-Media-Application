import { Avatar } from '@radix-ui/themes';
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiEdit,
  FiTrash
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import {  useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '@/store/atoms/UserAtom';

const StaggeredDropDown = () => {
  const [open, setOpen] = useState(false);
  const user = useRecoilValue(UserAtom)

  return (
    <div className="p-2 flex items-center justify-center ">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <Avatar
          src={user.user_image}
          radius='full'
          fallback="A"
          onClick={() => setOpen((pv) => !pv)}
        />
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-46 overflow-hidden z-50"
        >
          <Option setOpen={setOpen} Icon={FiEdit} text={`As ${user.user_name}`} />
          <Option setOpen={setOpen} Icon={FaGithub} text="Github" />
          <Option setOpen={setOpen} Icon={FiTrash} text="SignOut" />
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, Icon, setOpen }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(false);
    if (text === "Github") {
      window.location.href = "https://github.com/";
    } else if (text === "Signout") {
      localStorage.clear();
      navigate("/signin");
    }
    
  };

  return (
    <motion.li
      variants={itemVariants}
      onClick={handleClick}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
