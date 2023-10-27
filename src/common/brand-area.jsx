import Image from "next/image";
import { Navigation } from "swiper";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import customImageLoader from "@/loader";
import { auto } from "@popperjs/core";

const setting = {
	slidesPerView: 5,
	autoplay: {
		delay: 100,
	},
	autoplay: true,
	breakpoints: {
		1200: {
			slidesPerView: 5,
		},
		992: {
			slidesPerView: 4,
		},
		768: {
			slidesPerView: 3,
		},
		576: {
			slidesPerView: 2,
		},
		0: {
			slidesPerView: 1,
		},
	},
};

const BrandArea = ({ service }) => {
	const [isLoop, setIsLoop] = useState(false);
	const [brandImages, setBrandImages] = useState([]);

	useEffect(() => {
		setIsLoop(true);
		fetch(
			"http://localhost:1337/api/about-pages?populate[BrandsSection][populate][Image][populate]=true&populate[BrandsSection][populate][Image][fields][0]=name&populate[BrandsSection][populate][Image][fields][1]=url"
		)
			.then((response) => response.json())
			.then((data) => {
				setBrandImages(data.data[0].attributes.BrandsSection);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	return (
		<>
			<div
				className={`tp-brand-3-area p-relative ${
					service ? "breadcrumb-brand" : ""
				} pt-65 pb-60`}>
				<div className='tp-brand-3-right-color'></div>
				<div className='container'>
					<div className='row'>
						<div className='col-xl-12'>
							<div className='tp-brand-3-wrapper'>
								<Swiper
									{...setting}
									loop={isLoop}
									modules={Navigation}
									className='brand-3-active swiper-container'>
									{brandImages.map((item, i) => (
										<SwiperSlide key={i}>
											<div className='tp-brand-3-thumb'>
												<Image
													src={item.Image.data.attributes.url}
													loader={customImageLoader}
													alt='theme-pure'
													width={200}
													height={42}
												/>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BrandArea;
