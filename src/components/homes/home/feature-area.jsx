import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import AngleArrow from "@/src/svg/angle-arrow";
import LineArrowFive from "@/src/svg/line-arrow-5";

import shape_1 from "@assets/img/feature/shape-1.png";
import shape_2 from "@assets/img/feature/shape-2.png";
import shape_3 from "@assets/img/feature/img-shape.png";
import customImageLoader from "@/loader";

const FeatureArea = ({ about }) => {
	const [featureData, setFeatureData] = useState([]);
	const [featureCards, setFeatureCards] = useState([]);

	useEffect(() => {
		fetch(
			"http://localhost:1337/api/landingpages?populate[FeaturedSection][populate][featurecards][populate][Image][populate]=true&populate[FeaturedSection][populate][featurecards][populate][Image][fields][0]=name&populate[FeaturedSection][populate][featurecards][populate][Image][fields][1]=url"
		)
			.then((response) => response.json())
			.then((data) => {
				setFeatureData(data.data[0].attributes.FeaturedSection[0]);
				setFeatureCards(
					data.data[0].attributes.FeaturedSection[0].featurecards
				);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);
	return (
		<>
			<section
				className={`tp-feature-area ${
					about ? "feature-breadcrumb pb-100" : ""
				}`}>
				{about ? null : (
					<div className='tp-feature-shape'>
						<Image
							src={shape_1}
							alt='theme-pure'
						/>
					</div>
				)}
				<div className='container container-large'>
					<div className='row align-items-center'>
						<div className='col-lg-6'>
							<div className='tp-feature-title-wrapper'>
								<span className='tp-section-title__pre'>
									{featureData.shortTitle1 + " "}
									<span className='title-pre-color'>
										{featureData.shortTitle2}
									</span>
									<AngleArrow />
								</span>
								<h3 className='tp-section-title'>
									{featureData.featuredTitle + " "}
									<span className='title-color'>{featureData.years}</span>
									<span className='title-right-shape'>
										<LineArrowFive />
									</span>
								</h3>
							</div>
						</div>
						<div className='col-lg-6'>
							<div className='tp-feature-wrapper p-relative'></div>
							<p>{featureData.Description}</p>
						</div>
					</div>
					<div className='row'>
						{featureCards.map((item, i) => (
							<div
								key={i}
								className='col-lg-4 col-md-6'>
								<div
									className='tp-feature-item-box p-relative wow fadeInUp'
									data-wow-duration='1s'
									data-wow-delay='.3s'>
									<div className='tp-feature-item p-relative mb-30'>
										<div className='tp-feature-item-shape'>
											<Image
												src={shape_2}
												alt='theme-pure'
											/>
										</div>
										<div className='tp-feature-item-wrapper'>
											<div className='tp-feature-item-thumb'>
												<div className='shape'>
													<Image
														src={shape_3}
														alt='theme-pure'
													/>
												</div>
												<Image
													src={item.Image?.data?.attributes.url}
													width={200}
													height={250}
													className='thumb'
													alt='theme-pure'
													loader={customImageLoader}
												/>
											</div>
											<div className='tp-feature-item-content'>
												<h3 className='feature-title'>
													<Link href='/about'>{item.Title}</Link>
													<span>
														<AngleArrow />
													</span>
												</h3>
												<p>{item.Description}</p>
											</div>
										</div>
									</div>
									<div className='tp-feature-item-btn'>
										<Link href='/about'>
											<i className='fa-regular fa-arrow-right'></i>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default FeatureArea;
