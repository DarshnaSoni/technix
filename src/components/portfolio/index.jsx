import Breadcrumb from "@/src/common/breadcrumb/breadcrumb";
import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import PortfolioArea from "./portfolio-area";
import FooterContact from "@/src/layout/footers/footer-contact";
import Footer from "@/src/layout/footers/footer";

const Portfolio = () => {
	return (
		<>
			<HeaderOne />
			<main>
				<Breadcrumb
					top_title='IT Advisor'
					page_title='Portfolio'
				/>
				<PortfolioArea />
				<FooterContact bg_style={true} />
			</main>
			<Footer />
		</>
	);
};

export default Portfolio;
