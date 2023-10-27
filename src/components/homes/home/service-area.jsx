import Link from "next/link";
import Image from "next/image";
import Count from "@/src/common/count";
import React, { useEffect, useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

// svg icon
import AngleArrow from "@/src/svg/angle-arrow";
import LineArrowTwo from "@/src/svg/line-arrow-2";
import customImageLoader from "@/loader";

// fun fact shape
import fun_fact_shape_1 from "@assets/img/fun-fact/shape-1.png";
import fun_fact_shape_2 from "@assets/img/fun-fact/shape-2.png";
import fun_fact_shape_3 from "@assets/img/fun-fact/shape-3.png";
import fun_fact_shape_4 from "@assets/img/fun-fact/shape-4.png";
import fun_fact_shape_5 from "@assets/img/fun-fact/shadow.png";

import reload_img from "@assets/img/fun-fact/world.png";

const ServiceArea = () => {
	const [serviceData, setServiceData] = useState(null);
	const [counters, setCounters] = useState([]);
	const [serviceCards, setServiceCards] = useState([]);

	useEffect(() => {
		fetch(
			"http://localhost:1337/api/landingpages?populate[ServiceSection][populate][services][populate][Image][populate]=true&populate[ServiceSection][populate][services][populate][Image][fields][0]=name&populate[ServiceSection][populate][services][populate][Image][fields][1]=url&populate[ServiceSection][populate][counters][populate]=*&populate[ServiceSection][populate][Button][populate]=*"
		)
			.then((response) => response.json())
			.then((data) => {
				setServiceData(data.data[0].attributes.ServiceSection[0]);
				setCounters(data.data[0].attributes.ServiceSection[0].counters);
				setServiceCards(data.data[0].attributes.ServiceSection[0].services);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	const setting = {
		type: "loop",
		drag: "free",
		pagination: false,
		arrows: false,
		perPage: 5,
		gap: "30px",
		breakpoints: {
			1800: {
				perPage: 5,
			},
			1500: {
				perPage: 4,
			},
			1200: {
				perPage: 3,
			},
			800: {
				perPage: 2,
			},
			566: {
				perPage: 1,
			},
		},
	};
	const splideRef = useRef(null);

	const [reloadClassName, setReloadClassName] = useState(null);
	useEffect(() => {
		const reload = document.getElementById("reload");
		setReloadClassName(reload);
	}, []);

	const scrollRotate = () => {
		reloadClassName.style.transform = `rotate(${window.pageYOffset / 2}deg)`;
	};

	useEffect(() => {
		if (reloadClassName !== null) {
			window.addEventListener("scroll", scrollRotate);
		}
		return () => {
			window.removeEventListener("scroll", scrollRotate);
		};
	}, [reloadClassName]);

	return (
		<>
			<div className='tp-service-funfact-box'>
				<section className='tp-service-area pt-85 pb-50'>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-lg-12'>
								<div className='tp-service-title-wrapper text-center'>
									<span className='tp-section-title__pre'>
										{serviceData?.shortTitle1 + " "}
										<span className='title-pre-color'>
											{serviceData?.shortTitle2}
										</span>
										<AngleArrow />
									</span>
									<h3 className='tp-section-title'>
										{serviceData?.serviceTitle1}
										<span className='title-center-shape'>
											<LineArrowTwo />
										</span>
									</h3>
								</div>
							</div>

							<div className='tp-service-slider-wrapper'>
								<Splide
									options={setting}
									ref={splideRef}
									className='service-active splide'>
									{serviceCards.map((item, i) => (
										<SplideSlide key={i}>
											<div className='tp-service-wrapper p-relative mb-55'>
												<div className='tp-service-designation'>
													<p>{item.Alphabet}</p>
												</div>
												<h3 className='service-title'>{item.Title}</h3>
												<div className='tp-service-icon'>
													<Image
														src={item.Image.data.attributes.url}
														width={50}
														height={50}
														alt='theme-pure'
														loader={customImageLoader}
													/>
												</div>
												<p className='hide-text'>{item.Description}</p>
											</div>
										</SplideSlide>
									))}
								</Splide>
							</div>
						</div>
					</div>
				</section>

				<section className='tp-fun-fact-area pt-80 pb-65 p-relative'>
					<div className='container container-1400'>
						<div className='tp-fun-fact-shape'>
							<Image
								className='shape-1'
								src={fun_fact_shape_1}
								alt='theme-pure'
							/>
							<Image
								className='shape-2'
								src={fun_fact_shape_2}
								alt='theme-pure'
							/>
							<Image
								className='shape-3'
								src={fun_fact_shape_3}
								alt='theme-pure'
							/>
							<Image
								className='shape-4'
								src={fun_fact_shape_4}
								alt='theme-pure'
							/>
							<Image
								className='shadow'
								src={fun_fact_shape_5}
								alt='theme-pure'
							/>
						</div>

						<div className='row'>
							<div className='col-lg-2 col-md-4'>
								<div className='tp-fun-fact-wrapper-box'>
									{counters.map((item, i) => (
										<div
											key={i}
											className='tp-fun-fact-wrapper'>
											<h3 className='counter-title purecounter'>
												<span
													data-purecounter-duration='4'
													className='purecounter'>
													<Count
														number={item.count}
														text={item.icon}
													/>
												</span>
											</h3>
											<p>{item.info}</p>
										</div>
									))}
								</div>
							</div>
							<div className='col-lg-4 col-md-8'>
								<div className='tp-fun-fact-thumb p-relative'>
									<Image
										id='reload'
										src={reload_img}
										alt='scroll'
									/>
								</div>
							</div>

							<div className='col-lg-6 col-md-12'>
								<div className='tp-fun-fact-content'>
									<div className='tp-fun-fact-title-wrapper'>
										<span className='tp-section-title__pre'>
											{serviceData?.shortTitle1 + " "}
											<span className='title-pre-color'>
												{serviceData?.shortTitle2}
											</span>
											<AngleArrow />
										</span>
										<h3 className='tp-section-title'>
											{serviceData?.serviceTitle2}
											<span className='title-left-shape'>
												<LineArrowTwo />
											</span>
										</h3>
										<p>{serviceData?.Description}</p>

										<div className='tp-fun-fact-btn'>
											<Link
												className='tp-btn'
												href='../../contact'>
												{serviceData?.Button.Name}
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default ServiceArea;
