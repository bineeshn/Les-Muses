import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

// design
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import {
    Container,
    CustomNavLink,
    CustomNavLinkList,
    ProfileCard,
} from "./Design";
// import { User1 } from "../hero/Hero";
import { menulists } from "../../utils/data";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenuOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeMenuOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", closeMenuOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Check if it's the home page
    const isHomePage = location.pathname === "/";

    return (
        <>
            <header
                className={
                    isHomePage
                        ? `header bg-primary scrolled`
                        : `header bg-primary shadow-s1 scrolled`
                }
            >
                <Container>
                    <nav className="p-2 flex justify-between items-center relative">
                        <div className="flex items-center gap-14">
                            <div className="font-bold text-gold">
                                {/* {isHomePage && !isScrolled ? (
                                    <img
                                        src="../images/common/header-logo.png"
                                        alt="LogoImg"
                                        className="h-11"
                                    />
                                ) : (
                                    <img
                                        src="../images/common/header-logo2.png"
                                        alt="LogoImg"
                                        className="h-11"
                                    />
                                )} */}
                                Les Muses
                            </div>
                            <div className="hidden lg:flex items-center justify-between gap-8">
                                {menulists.map((list) => (
                                    <li key={list.id} className="capitalize list-none">
                                        <CustomNavLinkList
                                            href={list.path}
                                            isActive={location.pathname === list.path}
                                            className={"text-white"}
                                        >
                                            {list.link}
                                        </CustomNavLinkList>
                                    </li>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-8 icons">
                            <div className="hidden lg:flex lg:items-center lg:gap-8">
                                {!isAuthenticated ? 
                                    <>
                                        <CustomNavLink
                                            href="/login"
                                            className={"bg-gold px-8 py-2 rounded-full text-primary shadow-md"}
                                        >
                                            Sign in
                                        </CustomNavLink>
                                        <CustomNavLink
                                            href="/register"
                                            className={"bg-gold px-8 py-2 rounded-full text-primary shadow-md"}
                                        >
                                            Join
                                        </CustomNavLink>
                                    </> :
                                    <CustomNavLink href="/">
                                        <ProfileCard>
                                            {user.name[0]}
                                        </ProfileCard>
                                    </CustomNavLink>
                                }
                            </div>
                            <div
                                className={`icon flex items-center justify-center gap-6 ${isScrolled || !isHomePage ? "text-primary" : "text-white"
                                    }`}
                            >
                                <button
                                    onClick={toggleMenu}
                                    className="lg:hidden w-10 h-10 flex justify-center items-center bg-black text-white focus:outline-none"
                                >
                                    {isOpen ? (
                                        <AiOutlineClose size={24} />
                                    ) : (
                                        <AiOutlineMenu size={24} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Responsive Menu if below 768px */}
                        <div
                            ref={menuRef}
                            className={`lg:flex lg:items-center lg:w-auto w-full p-5 absolute right-0 top-full menu-container ${isOpen ? "open" : "closed"
                                }`}
                        >
                            {menulists.map((list) => (
                                <li
                                    href={list.path}
                                    key={list.id}
                                    className="uppercase list-none"
                                >
                                    <CustomNavLink className="text-white">
                                        {list.link}
                                    </CustomNavLink>
                                </li>
                            ))}
                        </div>
                    </nav>
                </Container>
            </header>
        </>
    );
};
