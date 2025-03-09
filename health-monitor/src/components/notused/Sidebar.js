import React, { useState } from 'react';
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag, FaThList } from "react-icons/fa";
import { NavLink, Route, Routes } from 'react-router-dom';
import SecurityPage from './SecurityPage'; // Import the SecurityPage component
import '../../style/Sidebar.css'
const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

        const menuItem = [
            // {
            //     path: "/",
            //     name: "Dashboard",
            //     icon: <FaTh />
            // },
            
            {
                path: "/About",
                name: "About",
                icon: <FaUserAlt />
            },
            {
                path: "/View",
                name: "View",
                icon: <FaRegChartBar />
            },
            {
                path: "/Edit",
                name: "Edit",
                icon: <FaCommentAlt />
            },
            {
                path: "/Security",
                name: "Security",
                icon: <FaShoppingBag />
            },
            
        ];

    return (
        <div className="container">
            <div style={{ width: isOpen ? "210px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">My Profile</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
               
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            {/* Use Routes to render SecurityPage */}
            <Routes>
                <Route path="/Security" element={<SecurityPage />} />
            </Routes>
            {/* Main content */}
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
