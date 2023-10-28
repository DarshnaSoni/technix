import customImageLoader from "@/loader";
import AngleArrow from "@/src/svg/angle-arrow";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ServiceArea = () => {
	const [services, setServices] = useState([]);
	const [serviceCards, setServiceCards] = useState([]);

	useEffect(() => {
		fetch(
			"http://localhost:1337/api/services?populate[ServicesSection][populate][services][populate][Image][populate]=true&populate[ServicesSection][populate][services][populate][Image][fields][0]=name&populate[ServicesSection][populate][services][populate][Image][fields][1]=url"
		)
			.then((response) => response.json())
			.then((data) => {
				setServices(data.data[0].attributes.ServicesSection[0]);
				setServiceCards(data.data[0].attributes.ServicesSection[0].services);
			})
			.catch((error) => {
				console.error("Error fetching service data:", error);
			});
	}, []);
	return (
		<>
			<section className='tp-service-breadcrumb-area p-relative pt-120'>
				<div className='container'>
					<div className='row align-items-center'>
						<div className='col-lg-6'>
							<div className='tp-service-breadcrumb-title-wrapper'>
								<span className='tp-section-title__pre'>
									{services.shortTitle1}{" "}
									<span className='title-pre-color'>
										{services.shortTitle2}
									</span>
									<AngleArrow />
								</span>
								<h3 className='tp-section-title'>
									{services.TechTitle1} <br />
									<span className='title-color'>
										{services.TechTitle2}
									</span>{" "}
								</h3>
							</div>
						</div>
						<div className='col-lg-6'>
							<div className='tp-service-breadcrumb-title-wrapper justify-content-start justify-content-xl-end d-flex'>
								<p>{services.description}</p>
							</div>
						</div>
					</div>
					<div className='row'>
						{serviceCards.map((item, i) => (
							<div
								key={i}
								className='col-xl-3 col-lg-4 col-md-6'>
								<div className='tp-service-3-content breadcrumb-item mb-30'>
									<div className='tp-service-3-content-thumb'>
										<Image
											src={item.Image.data.attributes.url}
											width={100}
											height={100}
											loader={customImageLoader}
											alt='theme-pure'
										/>
									</div>
									<h4 className='tp-service-breadcrumb-title'>
										<Link href='/service-details'>{item.Title}</Link>
									</h4>
									<p>{item.Description}</p>
								</div>
							</div>
						))}
					</div>
					<div className='row justify-content-center'>
						<div className='col-xl-8 text-center'>
							<div className='tp-about-call fadeUp'>
								<a href={`tel:${services.phonenumber}`}>
									<p>
										<i className='fa-solid fa-phone'></i>
										{services.ContactTagline}
										<span>{services.phonenumber}</span>
									</p>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ServiceArea;
