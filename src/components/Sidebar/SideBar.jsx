import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <FaUser />,
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <MdMessage />,
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: <BiAnalyse />,
  },
  {
    path: "/file-manager",
    name: "File Manager",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/order",
    name: "Order",
    icon: <BsCartCheck />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <AiFillHeart />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "80px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 20,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  NGF Connect
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;

// import React, { useState } from 'react';
// import { CaretLeft, CaretDown, HouseSimple, User, FileText, CalendarBlank, ChartBar, Gear, Info, SignOut } from 'phosphor-react';
// import '../../styles/sidebar.css';

// const SideBar = () => {
//   const [isSidebarActive, setIsSidebarActive] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);

//   const toggleSidebar = () => {
//     setIsSidebarActive(!isSidebarActive);
//   };

//   const handleMenuClick = (index) => {
//     setActiveMenu(activeMenu === index ? null : index);
//   };

//   return (
//     <div className="container">
//       <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
//         <div className="menu-btn" onClick={toggleSidebar}>
//           <CaretLeft weight="bold" />
//         </div>
//         <div className="head">
//           <div className="user-img">
//             <img src="user.jpg" alt="User" />
//           </div>
//           <div className="user-details">
//             <p className="title">web developer</p>
//             <p className="name">John Doe</p>
//           </div>
//         </div>
//         <div className="nav">
//           <div className="menu">
//             <p className="title">Main</p>
//             <ul>
//               <li className={activeMenu === 0 ? 'active' : ''} onClick={() => handleMenuClick(0)}>
//                 <a href="#">
//                   <HouseSimple weight="bold" className="icon" />
//                   <span className="text">Dashboard</span>
//                 </a>
//               </li>
//               <li className={activeMenu === 1 ? 'active' : ''} onClick={() => handleMenuClick(1)}>
//                 <a href="#">
//                   <User weight="bold" className="icon" />
//                   <span className="text">Audience</span>
//                   <CaretDown weight="bold" className="arrow" />
//                 </a>
//                 {activeMenu === 1 && (
//                   <ul className="sub-menu">
//                     <li><a href="#"><span className="text">Users</span></a></li>
//                     <li><a href="#"><span className="text">Subscribers</span></a></li>
//                   </ul>
//                 )}
//               </li>
//               <li className={activeMenu === 2 ? 'active' : ''} onClick={() => handleMenuClick(2)}>
//                 <a href="#">
//                   <FileText weight="bold" className="icon" />
//                   <span className="text">Posts</span>
//                 </a>
//               </li>
//               <li className={activeMenu === 3 ? 'active' : ''} onClick={() => handleMenuClick(3)}>
//                 <a href="#">
//                   <CalendarBlank weight="bold" className="icon" />
//                   <span className="text">Schedules</span>
//                 </a>
//               </li>
//               <li className={activeMenu === 4 ? 'active' : ''} onClick={() => handleMenuClick(4)}>
//                 <a href="#">
//                   <ChartBar weight="bold" className="icon" />
//                   <span className="text">Income</span>
//                   <CaretDown weight="bold" className="arrow" />
//                 </a>
//                 {activeMenu === 4 && (
//                   <ul className="sub-menu">
//                     <li><a href="#"><span className="text">Earnings</span></a></li>
//                     <li><a href="#"><span className="text">Funds</span></a></li>
//                     <li><a href="#"><span className="text">Declines</span></a></li>
//                     <li><a href="#"><span className="text">Payouts</span></a></li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </div>
//           <div className="menu">
//             <p className="title">Settings</p>
//             <ul>
//               <li className={activeMenu === 5 ? 'active' : ''} onClick={() => handleMenuClick(5)}>
//                 <a href="#">
//                   <Gear weight="bold" className="icon" />
//                   <span className="text">Settings</span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="menu">
//           <p className="title">Account</p>
//           <ul>
//             <li className={activeMenu === 6 ? 'active' : ''} onClick={() => handleMenuClick(6)}>
//               <a href="#">
//                 <Info weight="bold" className="icon" />
//                 <span className="text">Help</span>
//               </a>
//             </li>
//             <li className={activeMenu === 7 ? 'active' : ''} onClick={() => handleMenuClick(7)}>
//               <a href="#">
//                 <SignOut weight="bold" className="icon" />
//                 <span className="text">Logout</span>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="credits">
//         <h1>
//           Fully Responsive <br />
//           Sidebar by OSC
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default SideBar;
