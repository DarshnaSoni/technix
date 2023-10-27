import React, { useEffect, useState } from "react";
import HeaderOne from "@/src/layout/headers/header";
import Breadcrumb from "@/src/common/breadcrumb/breadcrumb";
import FeatureArea from "../homes/home/feature-area";
import SupportArea from "./support-area";
import VideoArea from "../../common/video-area";
import TestimonialFeature from "./feature-testimonial";
import TestimonialArea from "@/src/common/testimonial-area";
import BrandArea from "@/src/common/brand-area";
import TeamArea from "@/src/common/team-area";
import BlogArea from "@/src/common/blog-area";
import Footer from "@/src/layout/footers/footer";

const About = () => {
	const [breadcrumbData, setBreadcrumbData] = useState(null);

	useEffect(() => {
		fetch(
			"http://localhost:1337/api/about-pages?populate[Breadcrumbs][populate][Image][populate]=true&populate[Breadcrumbs][populate][Image][fields][0]=name&populate[Breadcrumbs][populate][Image][fields][1]=url"
		)
			.then((response) => response.json())
			.then((data) => {
				setBreadcrumbData(data.data[0].attributes.Breadcrumbs[0]);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);
	return (
		<>
			<HeaderOne />
			<main>
				<Breadcrumb
					top_title={breadcrumbData?.TopTitle}
					page_title={breadcrumbData?.PageTitle}
					img={breadcrumbData?.Image.data.attributes.url}
				/>
				<FeatureArea about={true} />
				<SupportArea />
				<VideoArea />
				<TestimonialFeature />
				<TestimonialArea />
				<BrandArea />
				<TeamArea />
				<BlogArea />
			</main>
			<Footer />
		</>
	);
};

export default About;
