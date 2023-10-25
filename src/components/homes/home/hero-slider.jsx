import React, { useState, useEffect } from "react";
import Image from "next/image";
import AngleArrow from "@/src/svg/angle-arrow";
import LineArrow from "@/src/svg/line-arrow";
import Link from "next/link";
import { EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoPopup from "@/src/modals/video-popup";

import shape_1 from "@assets/img/hero/shape-1.png";
import shape_2 from "@assets/img/hero/shape-2.png";
import shape_3 from "@assets/img/hero/shape-3.png";
import shape_4 from "@assets/img/hero/shape-4.png";
import shape_5 from "@assets/img/hero/shape-7.png";
import service_shape from "@assets/img/hero/shape-5.png";
import service_quote from "@assets/img/hero/quot.png";

// slider setting
const setting = {
	slidesPerView: 1,
	spaceBetween: 0,
	effect: "fade",
	autoplay: {
		delay: 5000,
	},
	// Navigation arrows
	navigation: {
		nextEl: ".hero-button-next-1",
		prevEl: ".hero-button-prev-1",
	},
};

const shapes = [
	{ id_cls: 1, img: shape_1 },
	{ id_cls: 2, img: shape_2 },
	{ id_cls: 3, img: shape_3 },
	{ id_cls: 4, img: shape_4 },
	{ id_cls: 7, img: shape_5 },
];

const HeroSlider = () => {
	const [isLoop, setIsLoop] = useState(false);
	const [heroData, setHeroData] = useState([]);
	const [isVideoOpen, setIsVideoOpen] = useState(false);

	useEffect(() => {
		fetch(
			"http://localhost:1337/api/landingpages?populate[HomePage][populate][heroImg][populate]=true&populate[HomePage][populate][heroImg][fields][0]=name&populate[HomePage][populate][heroImg][fields][1]=alternativeText&populate[HomePage][populate][heroImg][fields][2]=url&populate[HomePage][populate][Clickable][populate]=*"
		)
			.then((response) => response.json())
			.then((data) => {
				setHeroData(data.data[0].attributes.HomePage);
				setIsLoop(true);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	return (
		<div>
			<section className='tp-hero-area tp-hero-space pb-95'>
				<div className='tp-hero-wrapper p-relative'>
					<div className='hero-active-1 swiper-container'>
						<Swiper
							{...setting}
							loop={isLoop}
							modules={[Navigation, EffectFade]}>
							{heroData.map((item, i) => (
								<SwiperSlide key={i}>
									<div className='tp-hero-inner-1'>
										<div className='container'>
											<div className='tp-hero-shape'>
												{shapes.map((shape, index) => (
													<Image
														key={index}
														className={`shape-${shape.id_cls}`}
														src={shape.img}
														alt='theme-pure'
													/>
												))}
											</div>
											<div className='tp-hero-1'>
												<div
													className='tp-hero-bg tp-hero-overlay p-relative'
													style={{
														backgroundImage: `url(${
															process.env.NEXT_PUBLIC_API_URL +
															item.heroImg.data[0].attributes.url
														})`,
													}}></div>
												<div className='row'>
													<div className='col-lg-7'>
														<div className='tp-hero-content p-relative'>
															<div className='tp-hero-title-wrapper'>
																<span className='tp-section-title__pre p-relative'>
																	{item.shortTitle1}{" "}
																	<span className='title-pre-color'>
																		{item.shortTitle2}
																	</span>
																	<AngleArrow />
																</span>
																<h3 className='tp-hero-title'>
																	{item.heroTitle1} <LineArrow />
																	<span className='title-color'>
																		{item.heroTitle2}
																	</span>{" "}
																	<br />{" "}
																	<span className='title-text-transparent'>
																		{item.heroSupport}
																	</span>
																</h3>
																<div className='tp-hero-btn'>
																	<Link
																		className='tp-btn'
																		href='/about'>
																		Learn More{" "}
																		<i className='fa-regular fa-arrow-right-long'></i>
																	</Link>
																</div>
															</div>
															<div className='tp-hero-shape-animation'>
																<span></span>
															</div>
														</div>
													</div>
													<div className='col-lg-5'>
														<div className='tp-hero-play-btn'>
															<button
																className='popup-video'
																onClick={() => setIsVideoOpen(true)}>
																<i className='fa-sharp fa-solid fa-play'></i>
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className='tp-hero-bottom'>
										<div className='tp-hero-experince'>
											<span className='year'>
												{" "}
												{item.years}
												<br /> <i className='experince'>Years of Experience</i>
											</span>
										</div>
									</div>

									<div
										className='tp-hero-service'
										style={{
											backgroundImage: `url(/assets/img/hero/shape-6.png)`,
										}}>
										<div className='tp-hero-service-shape'>
											<Image
												src={service_shape}
												alt='theme-pure'
											/>
										</div>
										<p>{item.tagline}</p>
										<div className='tp-hero-service-quote'>
											<Image
												src={service_quote}
												alt='theme-pure'
											/>
										</div>
									</div>
								</SwiperSlide>
							))}
							<div className='tp-hero-nav d-none d-xxl-block'>
								<button
									type='button'
									className='hero-button-prev-1 tp-btn-hover-clear alt-color'>
									<i className='fa-regular fa-arrow-left'></i>
									<b></b>
								</button>
								<button
									type='button'
									className='hero-button-next-1 tp-btn-hover-clear alt-color'>
									<i className='fa-regular fa-arrow-right'></i>
									<b></b>
								</button>
							</div>
						</Swiper>
					</div>
				</div>
			</section>

			{/* video modal start */}
			<VideoPopup
				isVideoOpen={isVideoOpen}
				setIsVideoOpen={setIsVideoOpen}
				videoId={"dGcsHMXbSOA"}
			/>
			{/* video modal end */}
		</div>
	);
};

export default HeroSlider;
