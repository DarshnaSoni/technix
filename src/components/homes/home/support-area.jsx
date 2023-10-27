import Count from "@/src/common/count";
import React, { useEffect, useState } from "react";

const SupportArea = () => {
	const [supportData, setSupportData] = useState(null);

	useEffect(() => {
		fetch(
			"http://localhost:1337/api/landingpages?populate[SupportSection][populate][support][populate]=*"
		)
			.then((response) => response.json())
			.then((data) => {
				setSupportData(data.data[0].attributes.SupportSection[0].support);
			})
			.catch((error) => {
				console.error("Data fetch error:", error);
			});
	}, []);
	return (
		<>
			<section className='tp-support-feature-area pb-100'>
				<div className='container container-large'>
					<div className='row'>
						{supportData?.map((item, i) => (
							<div
								key={i}
								className='col-lg-4'>
								<div className='tp-support-feature-item d-flex p-relative fadeRight'>
									<div className='tp-support-feature-counter'>
										<div className='tp-support-feature-thumb'>
											<img
												src='/assets/img/brand/shape-2.png'
												alt='theme-pure'
											/>
										</div>
										<h3 className='support-feature-title'>
											<span
												data-purecounter-duration='4'
												className='purecounter'>
												<Count
													number={item.count}
													text={item.symbol}
												/>
											</span>
										</h3>
									</div>
									<div className='tp-support-feature-content'>
										<h4 className='tp-support-feature-content-title'>
											{item.title}
										</h4>
										<p>{item.info}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default SupportArea;
