import React, { useEffect, useRef, useState } from "react";
import icon from "@assets/img/icon/icon-1.png";
import Image from "next/image";
import Slider from "react-slick";

const setting = {
	speed: 3000,
	autoplay: true,
	autoplaySpeed: 0,
	cssEase: "linear",
	slidesToShow: 1,
	slidesToScroll: 1,
	variableWidth: true,
	infinite: true,
	initialSlide: 1,
	arrows: false,
	buttons: false,
	pauseOnFocus: false,
	pauseOnHover: true,
};

const SliderArea = () => {
	const sliderRef = useRef(null);
	const [sliderData, setSliderData] = useState([]);

	useEffect(() => {
		fetch(
			"http://localhost:1337/api/landingpages?populate[SliderSection][populate][sliders][populate]=*"
		)
			.then((response) => response.json())
			.then((data) => {
				setSliderData(data.data[0].attributes.SliderSection[0].sliders);
			})
			.catch((error) => {
				console.error("Data fetch error:", error);
			});
	}, []);
	return (
		<>
			<section className='tp-text-slider-area fix pt-100 pb-100'>
				<div className='container-fluid gx-0'>
					<div className='row gx-0'>
						<div className='col-lg-12'>
							<div className='tp-text-slider'>
								<Slider
									{...setting}
									ref={sliderRef}
									className='tp-text-active'>
									{sliderData.map((item, i) => (
										<div
											key={i}
											className='tp-text-item'>
											<div className='tp-text-slider-wrapper'>
												<div className='tp-text-slider-item d-flex align-items-center'>
													<Image
														src={icon}
														alt='theme-pure'
													/>
													<h3 className='text-title'>
														{item.Slidertitle1 + " "}
														<span>{item.SliderTitle2}</span>
													</h3>
												</div>
											</div>
										</div>
									))}
								</Slider>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default SliderArea;
