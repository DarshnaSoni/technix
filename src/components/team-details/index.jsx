import Breadcrumb from "@/src/common/breadcrumb/breadcrumb";
import HeaderOne from "@/src/layout/headers/header";
import React, { useEffect, useState } from "react";
import TeamDetailsArea from "./team-details-area";
import Footer from "@/src/layout/footers/footer";

const TeamDetails = () => {
	const [breadcrumbData, setBreadcrumbData] = useState(null);

	useEffect(() => {
		fetch(
			"http://localhost:1337/api/team-pages?populate[Breadcrumbs][populate][Image][populate]=true&populate[Breadcrumbs][populate][Image][fields][0]=name&populate[Breadcrumbs][populate][Image][fields][1]=url"
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
				<TeamDetailsArea />
			</main>
			<Footer />
		</>
	);
};

export default TeamDetails;
