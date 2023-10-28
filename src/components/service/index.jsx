import React, { useEffect, useState } from "react";
import HeaderOne from "@/src/layout/headers/header";
import Breadcrumb from "@/src/common/breadcrumb/breadcrumb";
import ServiceArea from "./service-area";
import VideoArea from "@/src/common/video-area";
import IndustryArea from "@/src/common/industry-area";
import BrandArea from "@/src/common/brand-area";
import BlogArea from "@/src/common/blog-area";
import Footer from "@/src/layout/footers/footer";

const Sevice = () => {
	const [breadcrumbData, setBreadcrumbData] = useState(null);

	useEffect(() => {
		fetch(
			"http://localhost:1337/api/services?populate[Breadcrumbs][populate][Image][populate]=true&populate[Breadcrumbs][populate][Image][fields][0]=name&populate[Breadcrumbs][populate][Image][fields][1]=url"
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
				<ServiceArea />
				<VideoArea service={true} />
				<IndustryArea service={true} />
				<BrandArea service={true} />
				<BlogArea service={true} />
			</main>
			<Footer />
		</>
	);
};

export default Sevice;
