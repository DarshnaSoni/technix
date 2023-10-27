import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import testimonial_shape_1 from "@assets/img/testimonial/home-3/shape-1.png";
import testimonial_shape_2 from "@assets/img/testimonial/home-3/shape-2.png";

import testimonial_img_1 from "@assets/img/testimonial/home-3/img-2.png";
import testimonial_img_2 from "@assets/img/testimonial/home-3/img-3.png";
import customImageLoader from "@/loader";

const TestimonialArea = () => {
	const setting_img = {
		gap: 0,
		pagination: false,
		arrows: false,
		type: "loop",
		perPage: 1,
		isNavigation: true,
	};

	const setting_text = {
		pagination: true,
		arrows: false,
		type: "loop",
		breakpoints: {
			576: {
				perPage: 1,
			},
		},
	};
	const setting_name = {
		pagination: false,
		type: "loop",
		arrows: false,
	};
	const mainRef = useRef(null);
	const thumbsRef = useRef(null);
	const nameRef = useRef(null);

	const [testimonialData, setTestimonialData] = useState([]);
	useEffect(() => {
		if (
			mainRef.current &&
			thumbsRef.current &&
			nameRef.current &&
			thumbsRef.current.splide &&
			mainRef.current.splide
		) {
			mainRef.current.sync(thumbsRef.current.splide);
			nameRef.current.sync(thumbsRef.current.splide);
			nameRef.current.sync(mainRef.current.splide);
		}

		fetch(
			"http://localhost:1337/api/about-pages?populate[TestimonialSection][populate][avatar][populate]=true&populate[TestimonialSection][populate][avatar][fields][0]=name&populate[TestimonialSection][populate][avatar][fields][1]=url"
		)
			.then((response) => response.json())
			.then((data) => {
				setTestimonialData(data.data[0].attributes.TestimonialSection);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	return (
		<>
			<section className='tp-testimonial-3-area pb-120'>
				<div className='tp-testimonial-3-large-box'></div>
				<div className='tp-testimonial-3-shape'>
					<Image
						className='shape-1'
						src={testimonial_shape_1}
						alt='theme-pure'
					/>
					<Image
						className='shape-2'
						src={testimonial_shape_2}
						alt='theme-pure'
					/>
				</div>
				<div className='container'>
					<div className='row'>
						<div className='col-xl-5 col-lg-4'>
							<div className='tp-testimonial-3-wrapper'>
								<div className='tp-testimonial-3-wrapper-thumb p-relative'>
									<Splide
										options={("#img-carousel", setting_img)}
										ref={mainRef}
										aria-label='The carousel with thumbnails. Selecting a thumbnail will change the Beautiful Gallery carousel.'
										className='testimonial-navigation-active splide z-index-1 border-0'>
										{testimonialData.map((item, i) => (
											<SplideSlide key={i}>
												<Image
													className='slide'
													src={item.avatar.data.attributes.url}
													width={100}
													height={100}
													loader={customImageLoader}
													alt='theme-pure'
												/>
											</SplideSlide>
										))}
									</Splide>
									<Image
										className='shape-1'
										src={testimonial_img_1}
										alt='theme-pure'
									/>
									<Image
										className='shape-2'
										src={testimonial_img_2}
										alt='theme-pure'
									/>
								</div>
							</div>
						</div>
						<div className='col-xl-7 col-lg-8'>
							<div className='tp-testimonial-3-content'>
								<Splide
									options={("#text-carousel", setting_text)}
									ref={thumbsRef}
									className='testimonial-3-active splide'>
									{testimonialData.map((text, index) => (
										<SplideSlide key={index}>
											<div className='tp-testimonial-3-slider-wrapper'>
												<p>{text.description}</p>
											</div>
										</SplideSlide>
									))}
								</Splide>
								<div className='tp-testimonial-3-descreiption text-start text-sm-end'>
									<Splide
										options={("#name-carousel", setting_name)}
										ref={nameRef}
										className='testimonial-3-active splide'>
										{testimonialData.map((text, index) => (
											<SplideSlide key={index}>
												<h4 className='testimonial-title'>{text.name}</h4>
												<p>{text.title}</p>
											</SplideSlide>
										))}
									</Splide>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default TestimonialArea;
