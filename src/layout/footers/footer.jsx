import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import user from "@assets/img/footer/user.png";
import EmailAeroplan from "@/src/svg/email-aeroplan";
import SocialLinks, { CopyRight } from "@/src/common/social-links";
import customImageLoader from "@/loader";

const footer_content = {
	info: (
		<>
			The world’s first and largest digital market for crypto collectibles and
			non-fungible (NFTs). Buy
		</>
	),
	map: "https://www.google.com/maps/search/86+Road+Broklyn+Street,+600+New+York,+USA/@40.6897806,-74.0278086,12z/data=!3m1!4b1",
	address: (
		<>
			86 Road Broklyn Street, 600 <br /> New York, USA
		</>
	),
	mail_2: "needhelp@company.com",
	mail_phone: (
		<>
			{" "}
			Needhelp@company.com <br /> +92 666 888 0000
		</>
	),

	service_links: [
		"Parking permission",
		"Fire Service Noc",
		"Report a Parking Violation",
		"Residential Parking",
		"Vendor Registration",
		"City Board Applications",
	],
};
const { info, map, address, mail_2, mail_phone, service_links } =
	footer_content;

const Footer = () => {
	const [footerData, setFooterData] = useState();
	const [footerService, setFooterService] = useState([]);
	const [footerContact, setFooterContact] = useState([]);

	useEffect(() => {
		fetch(
			"http://localhost:1337/api/footer?populate[Logo][populate]=true&populate[Logo][fields][0]=name&populate[Logo][fields][1]=url&populate[moreDetails][populate][Image][populate]=true&populate[moreDetails][populate][Image][fields][0]=name&populate[moreDetails][populate][Image][fields][1]=url&populate[moreDetails][populate][Services][populate]=*"
		)
			.then((response) => response.json())
			.then((data) => {
				setFooterData(data.data.attributes);
				setFooterService(data.data.attributes.moreDetails[0].Services);
				setFooterContact(data.data.attributes.moreDetails[1].Services);
			})
			.catch((error) => console.error("Error fetching data: ", error));
	}, []);

	return (
		<>
			<footer className='tp-footer-area p-relative'>
				<div
					className='tp-footer-bg'
					style={{
						backgroundImage: `url(/assets/img/footer/footer-bg.jpg)`,
					}}></div>
				<div
					className='tp-footer-top-shape'
					style={{
						backgroundImage: `url(/assets/img/footer/footer-top-bg.png)`,
					}}></div>

				<div className='container container-large'>
					<div className='tp-footer-main-area'>
						<div className='row'>
							<div className='col-xl-3 col-lg-4 col-md-6'>
								<div className='tp-footer-widget tp-footer-col-1'>
									<div className='tp-footer-logo'>
										<a href='index.html'>
											{" "}
											<Image
												src={footerData?.Logo.data.attributes.url}
												alt='theme-pure'
												loader={customImageLoader}
												width={200}
												height={50}
											/>
										</a>
									</div>
									<div className='tp-footer-widget-content'>
										<div className='tp-footer-info'>
											<p>{footerData?.description}</p>
											<div className='tp-footer-main-location'>
												<a
													target='_blank'
													href={map}>
													{" "}
													<i className='fa-sharp fa-light fa-location-dot'></i>
													{footerData?.address}
												</a>
											</div>
											<div className='tp-footer-main-mail'>
												<a href={`mailto:${mail_2}`}>
													<i className='fa-light fa-message-dots'></i>
													{footerData?.mail}
													<br />
													{footerData?.phonenumber}
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='col-xl-3 col-lg-4 col-md-6'>
								<div className='tp-footer-widget tp-footer-col-2'>
									<h3 className='tp-footer-widget-title'>
										{footerData?.moreDetails[0].Title}
									</h3>
									<div className='tp-footer-widget-content'>
										<ul>
											{footerService.map((link, i) => (
												<li key={i}>
													<Link href='#'>{link?.Name}</Link>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<div className='col-xl-3 col-lg-4 col-md-6'>
								<div className='tp-footer-widget tp-footer-col-3'>
									<h3 className='tp-footer-widget-title'>
										{footerData?.moreDetails[1].Title}
									</h3>
									<div className='tp-footer-widget-content'>
										<div className='tp-footer-author d-flex'>
											<div className='tp-footer-author-thumb'>
												<Image
													src={
														footerData?.moreDetails[1].Image?.data.attributes
															.url
													}
													alt='theme-pure'
													loader={customImageLoader}
													width={70}
													height={70}
												/>
											</div>
											<div className='tp-footer-author-content'>
												<span>
													Chat With Expert <br /> Active Now
												</span>
											</div>
										</div>
										<ul>
											{footerContact.map((link, i) => (
												<li key={i}>
													<Link href='#'>{link?.Name}</Link>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<div className='col-xl-3 col-lg-5 col-md-6'>
								<div className='tp-footer-widget tp-footer-col-4'>
									<h3 className='tp-footer-widget-title'>Newsletter</h3>
									<div className='tp-footer-from'>
										<div className='tp-footer-text-email p-relative'>
											<input
												type='text'
												placeholder='Enter Email Address'
											/>
											<span>
												<EmailAeroplan />
											</span>
										</div>
										<div className='tp-footer-form-check'>
											<input
												className='form-check-input'
												id='flexCheckChecked'
												type='checkbox'
											/>
											<label
												className='form-check-label'
												htmlFor='flexCheckChecked'>
												I agree to all your terms and policies
											</label>
										</div>
										<div className='tp-footer-widget-social'>
											<SocialLinks />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='tp-footer-copyright-area p-relative'>
						<div className='row'>
							<div className='col-md-12 col-lg-6'>
								<div className='tp-footer-copyright-inner'>
									<p>
										<CopyRight />{" "}
									</p>
								</div>
							</div>
							<div className='col-md-12 col-lg-6'>
								<div className='tp-footer-copyright-inner text-lg-end'>
									<Link href='#'>Terms and conditions</Link>
									<Link
										className='ml-50'
										href='#'>
										{" "}
										Privacy policy
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
