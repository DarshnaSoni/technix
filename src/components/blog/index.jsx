import Breadcrumb from "@/src/common/breadcrumb/breadcrumb";
import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import PostboxArea from "./postbox-area";
import FooterContact from "@/src/layout/footers/footer-contact";
import Footer from "@/src/layout/footers/footer";

const Blog = () => {
	return (
		<>
			<HeaderOne />
			<main>
				<Breadcrumb
					top_title='Blog Page'
					page_title='Blog'
				/>
				<PostboxArea />
				<FooterContact bg_style={true} />
			</main>
			<Footer />
		</>
	);
};

export default Blog;
