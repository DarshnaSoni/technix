import Link from "next/link";
import Image from "next/image";
import { Navigation } from "swiper";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import AngleArrow from "@/src/svg/angle-arrow";
import customImageLoader from "@/loader";

import LineArrowTwo from "@/src/svg/line-arrow-2";
import shape_1 from "@assets/img/about/shape-1.png";

const setting = {
	slidesPerView: 3,
	spaceBetween: 82,
	navigation: {
		nextEl: ".about-button-next-1",
		prevEl: ".about-button-prev-1",
	},
	breakpoints: {
		1860: {},
		1800: {
			spaceBetween: 40,
		},
		1701: {},
		1600: {},
		1560: {},
		1400: {
			spaceBetween: 60,
		},
		1200: {
			spaceBetween: 30,
			slidesPerView: 2,
		},
		992: {
			spaceBetween: 60,
			slidesPerView: 2,
		},
		767: {
			slidesPerView: 2,
		},
		576: {
			slidesPerView: 2,
		},
		0: {
			slidesPerView: 1,
		},
	},
};

const AboutArea = () => {
	const [isLoop, setIsLoop] = useState(false);
	const [aboutData, setAboutData] = useState([]);
	const [aboutCards, setAboutCards] = useState();
	useEffect(() => {
		fetch(
			"http://localhost:1337/api/landingpages?populate[AboutSection][populate][cards][populate][Image][populate]=true&populate[AboutSection][populate][cards][populate][Image][fields][0]=name&populate[AboutSection][populate][cards][populate][Image][fields][1]=alternativeText&populate[AboutSection][populate][cards][populate][Image][fields][2]=url&populate[AboutSection][populate][Aboutimg][populate]=true&populate[AboutSection][populate][Aboutimg][fields][0]=name&populate[AboutSection][populate][Aboutimg][fields][1]=alternativeText&populate[AboutSection][populate][Aboutimg][fields][2]=url"
		)
			.then((response) => response.json())
			.then((data) => {
				setAboutData(data.data[0].attributes.AboutSection[0]);
				setAboutCards(data.data[0].attributes.AboutSection[0].cards);
				setIsLoop(true);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	return (
		<>
			<section className='tp-about-area pb-45 box-plr p-relative'>
				<div className='tp-about-shape d-none d-xl-block'>
					<Image
						className='shape-1'
						src={shape_1}
						alt='theme-pure'
					/>
				</div>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-xl-4 col-lg-12'>
							<div className='tp-about-wrapper-thumb text-center text-xl-start fadeLeft'>
								{aboutData.Aboutimg && aboutData.Aboutimg.data && (
									<Image
										src={aboutData.Aboutimg?.data?.attributes.url}
										width={500}
										height={600}
										alt={"IMAGE"}
										loader={customImageLoader}
									/>
								)}
							</div>
						</div>
						<div className='col-xl-8 col-lg-10'>
							<div className='tp-about-wrapper pl-50'>
								<div className='row'>
									<div className='col-lg-8'>
										<div className='tp-about-title-wrapper p-relative'>
											<span className='tp-section-title__pre'>
												{aboutData.shortTitle1}{" "}
												<span className='title-pre-color'>
													{aboutData.shortTitle2}
												</span>
												<AngleArrow />
											</span>
											<h3 className='tp-section-title'>
												{aboutData.AboutTitle}
												<span className='title-left-shape'>
													<LineArrowTwo />
												</span>
											</h3>
										</div>
									</div>

									<div className='col-lg-4'>
										<div className='tp-about-nav d-none d-md-block p-relative'>
											<button
												type='button'
												className='about-button-prev-1'>
												<i className='fa-regular fa-arrow-left'></i>
											</button>
											<button
												type='button'
												className='about-button-next-1'>
												<i className='fa-regular fa-arrow-right'></i>
											</button>
										</div>
									</div>
								</div>

								<div className='tp-about-item-wrapper'>
									<Swiper
										{...setting}
										modules={[Navigation]}
										loop={isLoop}
										className='about-active swiper-container'>
										{aboutCards &&
											aboutCards.map((item, i) => (
												<SwiperSlide
													key={i}
													className='tp-about-item mb-30'>
													<div className='tp-about-item-thumb'>
														<Image
															src={item.Image.data.attributes.url}
															alt='theme-pure'
															width={100}
															height={100}
															loader={customImageLoader}
														/>
													</div>
													<div className='tp-about-item-content'>
														<h4 className='about-title'>{item.Title}</h4>
														<p>{item.Description}</p>
														<div className='tp-about-item-btn'>
															<Link href='/about'>
																<i className='fa-regular fa-arrow-right'></i>
															</Link>
														</div>
													</div>
												</SwiperSlide>
											))}
									</Swiper>

									<div className='tp-about-call'>
										<a href={`tel:${aboutData.phonenumber}`}>
											<p>
												<i className='fa-solid fa-phone'></i>
												{aboutData.aboutLine}
												<span>{aboutData.phonenumber}</span>
											</p>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AboutArea;
