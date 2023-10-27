import React, { useEffect, useState } from "react";
import Image from "next/image";

import shape_1 from "@assets/img/support/shape-img.png";
import shape_2 from "@assets/img/support/shape-bg.png";
import AngleArrow from "@/src/svg/angle-arrow";
import LineArrowTwo from "@/src/svg/line-arrow-2";
import customImageLoader from "@/loader";

const FaqArea = () => {
	const [activeIndex, setActiveIndex] = useState(null);
	function handleClick(index) {
		setActiveIndex(index === activeIndex ? null : index);
	}
	const [faqData, setFaqData] = useState();
	const [faqCards, setFaqCards] = useState([]);

	useEffect(() => {
		fetch(
			"http://localhost:1337/api/landingpages?populate[FAQSection][populate][bgimg][populate]=*&populate[FAQSection][populate][bgimg][fields][0]=name&populate[FAQSection][populate][bgimg][fields][1]=url&populate[FAQSection][populate][FAQs][populate]=*"
		)
			.then((response) => response.json())
			.then((data) => {
				setFaqData(data.data[0].attributes.FAQSection[0]);
				setFaqCards(data.data[0].attributes.FAQSection[0].FAQs);
			})
			.catch((error) => {
				console.error("Data fetch error:", error);
			});
	}, []);
	return (
		<>
			<section className='tp-support-area tp-support-bg p-relative pb-110'>
				<div className='container container-large'>
					<div className='tp-support-shape'>
						<Image
							className='shape-1'
							src={faqData?.bgimg.data.attributes.url}
							loader={customImageLoader}
							width={600}
							height={600}
							alt='theme-pure'
						/>
						<Image
							className='shape-2'
							src={shape_2}
							alt='theme-pure'
						/>
					</div>
					<div className='row justify-content-center'>
						<div className='col-xxl-8 col-xl-10'>
							<div className='tp-support-title-wrapper text-center'>
								<span className='tp-section-title__pre'>
									{faqData?.shortTitle1}{" "}
									<span className='title-pre-color'>
										{faqData?.shortTitle2}
									</span>
									<AngleArrow />
								</span>
								<h3 className='tp-section-title'>
									{faqData?.FAQtitle1}{" "}
									<span className='title-color'>{faqData?.FAQtitle2}</span>
									<span className='title-center-shape'>
										<LineArrowTwo />
									</span>
								</h3>
							</div>

							<div className='tp-support-faq faq-style-1'>
								<div className='tp-faq-tab-content tp-accordion'>
									<div
										className='accordion'
										id='general_accordion'>
										{faqCards.map((item, i) => (
											<div
												key={i}
												className={`accordion-item`}>
												<h2
													className='accordion-header'
													id={`heading${item.accordianID}`}>
													<button
														className={`accordion-button ${
															item.collapsed ? "collapsed" : ""
														}`}
														type='button'
														data-bs-toggle='collapse'
														data-bs-target={`#collapse${item.accordianID}`}
														aria-controls={`collapse${item.accordianID}`}>
														{item.question}
													</button>
												</h2>
												<div
													id={`collapse${item.accordianID}`}
													className={`accordion-collapse collapse ${
														item.show ? "show" : ""
													}`}
													aria-labelledby={`heading${item.accordianID}`}
													data-bs-parent='#general_accordion'>
													<div className='accordion-body'>
														<p>{item.answer}</p>
													</div>
												</div>
											</div>
										))}
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

export default FaqArea;
