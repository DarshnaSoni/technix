import Breadcrumb from "@/src/common/breadcrumb/breadcrumb";
import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import BlogDetailsPostbox from "./blog-details-postbox";
import Footer from "@/src/layout/footers/footer";

const BlogDetails = () => {
	return (
		<>
			<HeaderOne />
			<main>
				<Breadcrumb
					top_title='Blog Details'
					page_title='Blog Details'
				/>
				<BlogDetailsPostbox />
			</main>
			<Footer />
		</>
	);
};

export default BlogDetails;
