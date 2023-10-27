import Link from "next/link";
import Image from "next/image";
import { Navigation } from "swiper";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import PlusIcon from "@/src/svg/plus-icon";
import AngleArrow from "@/src/svg/angle-arrow";
import team_shape_1 from "@assets/img/testimonial/home-3/shape-3.png";
import { SocialLinksTwo } from "@/src/common/social-links";
import customImageLoader from "@/loader";

const setting = {
	slidesPerView: 5,
	spaceBetween: 25,
	navigation: {
		nextEl: ".team-button-next-1",
		prevEl: ".team-button-prev-1",
	},
	breakpoints: {
		1400: {
			slidesPerView: 5,
		},
		1200: {
			slidesPerView: 4,
		},
		992: {
			slidesPerView: 3,
		},
		767: {
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

const TeamArea = () => {
	const [isLoop, setIsLoop] = useState(false);
	const [teamData, setTeamData] = useState();
	const [teamCards, setTeamCards] = useState([]);

	useEffect(() => {
		setIsLoop(true);
		fetch(
			"http://localhost:1337/api/about-pages?populate[TeamSection][populate][teamcards][populate][Image][populate]=true&populate[TeamSection][populate][teamcards][populate][Image][fields][0]=name&populate[TeamSection][populate][teamcards][populate][Image][fields][1]=url&populate[TeamSection][populate][teamcards][populate][Services][populate]=*&populate[TeamSection][populate][teamcards][populate][SocialLinks][populate]=*"
		)
			.then((response) => response.json())
			.then((data) => {
				setTeamData(data.data[0].attributes.TeamSection[0]);
				setTeamCards(data.data[0].attributes.TeamSection[0].teamcards);
			})
			.catch((error) => {
				console.error("Error fetching team data:", error);
			});
	}, []);

	return (
		<>
			<section className='tp-team-area p-relative pb-100'>
				<div className='tp-team-shape'>
					<Image
						src={team_shape_1}
						alt='theme-pure'
					/>
				</div>
				<div className='container'>
					<div className='row align-items-center'>
						<div className='col-lg-6'>
							<div className='tp-team-title-wrapper'>
								<span className='tp-section-title__pre'>
									{teamData?.shortTitle1}{" "}
									<span className='title-pre-color'>
										{teamData?.shortTitle2}
									</span>
									<AngleArrow />
								</span>
								<h3 className='tp-section-title'>
									{teamData?.TeamTitle1 + " "}
									<br />
									<span className='title-color'>{teamData?.TeamTitle2}</span>
								</h3>
							</div>
						</div>
						<div className='col-lg-6'>
							<div className='tp-team-nav d-flex justify-content-start justify-content-lg-end align-items-end mb-30'>
								<button
									type='button'
									className='team-button-prev-1 tp-btn-hover-clear alt-color'
									tabIndex='-1'
									aria-label='Previous slide'>
									<i className='fa-regular fa-arrow-left'></i>
									<b></b>
								</button>
								<button
									type='button'
									className='team-button-next-1 tp-btn-hover-clear alt-color'
									tabIndex='-1'
									aria-label='Next slide'>
									<i className='fa-regular fa-arrow-right'></i>
									<b></b>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className='container-fluid'>
					<div className='row'>
						<Swiper
							{...setting}
							loop={isLoop}
							modules={[Navigation]}
							className='team-active swiper-container'>
							{teamCards.map((item, i) => (
								<SwiperSlide key={i}>
									<div className='tp-team-wrapper p-relative'>
										<div className='tp-team-wrapper-thumb'>
											<Link href='/team-details'>
												<Image
													src={item.Image.data?.attributes.url}
													loader={customImageLoader}
													width={100}
													height={100}
													alt='theme-pure'
												/>
											</Link>
											{item.SocialLinks && item.SocialLinks.length > 0 && (
												<div className='tp-team-social-info'>
													<SocialLinksTwo social={item.SocialLinks} />
												</div>
											)}
										</div>
										<div className='tp-team-wrapper-content d-flex align-items-center justify-content-between'>
											<div className='tp-team-wrapper-content-text'>
												<h3 className='team-title'>
													<Link
														href={{
															pathname: "/team-details",
															query: { id: item.id },
														}}>
														{item.Name}
													</Link>
												</h3>
												<p>{item.jobTitle}</p>
											</div>
											{item.SocialLinks && item.SocialLinks.length > 0 && (
												<div className='tp-team-wrapper-icon'>
													<span className='tp-team-social'>
														<PlusIcon />
													</span>
												</div>
											)}
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</section>
		</>
	);
};

export default TeamArea;
