import Breadcrumb from "@/src/common/breadcrumb/breadcrumb";
import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import ContactArea from "./contact-area";
import GoogleMap from "./google-map";
import FooterContact from "@/src/layout/footers/footer-contact";
import Footer from "@/src/layout/footers/footer";

const Contact = () => {
	return (
		<>
			<HeaderOne />
			<main>
				<Breadcrumb
					top_title='Contact Us'
					page_title='Contact Us'
				/>
				<ContactArea />
				<GoogleMap />
				<FooterContact contact_style={true} />
			</main>
			<Footer />
		</>
	);
};

export default Contact;
