import Link from "next/link";
import Image from "next/image";
import NavMenu from "./nav-menu";
import LangLogo from "@assets/img/logo/logo-lang.png";
import useSticky from "@/src/hooks/use-sticky";
import HamburgerBtn from "@/src/svg/hamburger-btn";
import React, { useEffect, useRef, useState } from "react";
import HomeIcon from "@/src/svg/home-icon";
import Sidebar from "@/src/modals/sidebar";
import Logo from "@assets/img/logo/logo.png";

const HeaderOne = () => {
	const { sticky } = useSticky();
	const langToggleRef = useRef(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const [isLangListOpen, setIsLangListOpen] = useState(false);
	useEffect(() => {
		if (langToggleRef.current) {
			const handleClickOutside = (e) => {
				if (langToggleRef.current.contains(e.target)) {
					setIsLangListOpen(!isLangListOpen);
				} else {
					setIsLangListOpen(false);
				}
			};
			window.addEventListener("click", handleClickOutside);
			return () => {
				window.removeEventListener("click", handleClickOutside);
			};
		}
	}, [isLangListOpen, langToggleRef]);

	return (
		<>
			<header className='tp-header-area tp-header-height p-relative'>
				<div className='tp-header-top tp-header-space d-none d-xl-block'>
					<div className='container-fluid'>
						<div className='row align-items-center'>
							<div className='col-xxl-6 col-xl-8'>
								<div className='tp-header-top-info'>
									<ul>
										<li>
											<a
												href='https://www.google.com/maps/@36.0758266,-79.4558848,17z'
												target='_blank'>
												<span>
													<i className='fa-sharp fa-solid fa-location-dot'></i>
												</span>
												734 H, Bryan Burlington, NC 27215
											</a>
										</li>
										<li>
											<a href='mailto:technix@support.com'>
												<span>
													<i className='fa-solid fa-envelope'></i>
												</span>
												technix@support.com
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div className='col-xxl-6 col-xl-4'>
								<div className='tp-header-top-right d-flex justify-content-end align-items-center'>
									<div className='header-call'>
										<a href='tel:01310-069824'>
											<i className='fa-solid fa-phone'></i> +88 01310-069824
										</a>
									</div>
									<div className='header-social d-xxl-block d-none'>
										<Link href='#'>
											<i className='fa-brands fa-facebook'></i> Facebook
										</Link>
										<Link href='#'>
											<i className='fa-brands fa-twitter'></i> Skype
										</Link>
										<Link href='#'>
											<i className='fa-brands fa-linkedin'></i> Linkedin
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					id='header-sticky'
					className={`tp-header-bottom header__sticky p-relative ${
						sticky && "tp-header-sticky"
					}`}>
					<div className='tp-header-bottom-space p-relative'>
						<div className='container-fluid gx-0'>
							<div className='row gx-0 align-items-center'>
								<div className='col-xxl-3 col-xl-3'>
									<div className='tp-header-main-left d-flex align-items-center p-relative'>
										<div
											className='tp-header-hamburger-btn offcanvas-open-btn'
											style={{
												backgroundImage: `url(/assets/img/icon/header-hamburger-shape.png)`,
											}}
											onClick={() => setSidebarOpen(true)}>
											<button className='hamburger-btn'>
												<span>
													{" "}
													<HamburgerBtn />
												</span>
											</button>
										</div>
										<div className='tp-header-logo'>
											<Link href='/'>
												<Image
													src={Logo}
													alt='theme-pure'
												/>
											</Link>
										</div>
									</div>
								</div>
								<div className='col-xxl-6 col-xl-6 d-none d-xl-block'>
									<div className='tp-main-menu-area counter d-flex align-items-center'>
										<div className='tp-main-menu menu-icon'>
											<span className='header-icon'>
												<HomeIcon />
											</span>
											<nav id='tp-mobile-menu'>
												<NavMenu />
											</nav>
										</div>
									</div>
								</div>
								<div className='col-xxl-3 col-xl-3'>
									<div className='tp-header-main-right d-flex align-items-center justify-content-xl-end'>
										<div className='tp-header-btn d-none d-xl-block pl-40'>
											<Link
												className='tp-btn'
												href='/contact'>
												Get Started Today
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			<Sidebar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
			/>
		</>
	);
};

export default HeaderOne;
