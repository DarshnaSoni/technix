import VideoPopup from "@/src/modals/video-popup";
import AngleArrow from "@/src/svg/angle-arrow";
import LineArrowTwo from "@/src/svg/line-arrow-2";
import RightSymbol from "@/src/svg/right-symbol";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import support_shape from "@assets/img/about/home-3/shape-1.png";
import customImageLoader from "@/loader";

const SupportArea = () => {
	const [isVideoOpen, setIsVideoOpen] = useState(false);
	const [supportData, setSupportData] = useState(null);
	const [supportList, setSupportList] = useState([]);
	const [supportImages, setSupportImages] = useState([]);

	useEffect(() => {
		fetch(
			"http://localhost:1337/api/about-pages?populate[SupportSection][populate][Services][populate]=*&populate[SupportSection][populate][Button][populate]=*&populate[SupportSection][populate][Images][populate][Image][populate]=true&populate[SupportSection][populate][Images][populate][Image][fields][0]=name&populate[SupportSection][populate][Images][populate][Image][fields][1]=url"
		)
			.then((response) => response.json())
			.then((data) => {
				setSupportData(data.data[0].attributes.SupportSection[0]);
				setSupportList(data.data[0].attributes.SupportSection[0].Services);
				setSupportImages(data.data[0].attributes.SupportSection[0].Images);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	return (
		<>
			<section className='tp-support-breadcrumb fix pt-120 pb-210'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-6'>
							<div className='tp-fun-fact-title-wrapper support-breadcrumb'>
								<span className='tp-section-title__pre'>
									{supportData?.shortTitle1}{" "}
									<span className='title-pre-color'>
										{supportData?.shortTitle2}
									</span>
									<AngleArrow />
								</span>
								<h3 className='tp-section-title'>
									{supportData?.SupportTitle1 + " "}
									<span className='title-color'>
										{supportData?.SupportTitle2}
									</span>
									<span className='title-left-shape'>
										<LineArrowTwo />
									</span>
								</h3>
								<p>{supportData?.description}</p>
								<ul className='mb-65'>
									{supportList.map((list, i) => (
										<li key={i}>
											{" "}
											<span>
												{" "}
												<RightSymbol />
											</span>{" "}
											{list.Name}
										</li>
									))}
								</ul>
								<div className='tp-support-breadcrumb-btn mb-30'>
									<Link
										className='tp-btn'
										href='/service'>
										{supportData?.Button.Name}
									</Link>
								</div>
							</div>
						</div>
						<div className='col-lg-6'>
							<div className='tp-about-3-img p-relative fadeRight'>
								<Image
									src={supportImages[0]?.Image.data.attributes.url}
									loader={customImageLoader}
									width={380}
									height={400}
									alt='theme-pure'
								/>
								<Image
									className='shape-1'
									src={supportImages[1]?.Image.data.attributes.url}
									loader={customImageLoader}
									width={150}
									height={100}
									alt='theme-pure'
								/>
								<div className='shape-2 p-relative'>
									<Image
										src={supportImages[2]?.Image.data.attributes.url}
										loader={customImageLoader}
										width={400}
										height={250}
										alt='theme-pure'
									/>
									<div className='tp-video-play'>
										<a
											className='popup-video'
											onClick={() => setIsVideoOpen(true)}>
											<i className='fa-sharp fa-solid fa-play'></i>
										</a>
									</div>
								</div>
								<Image
									className='shape-3'
									src={support_shape}
									alt='theme-pure'
								/>
							</div>
						</div>
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
		</>
	);
};
export default SupportArea;
