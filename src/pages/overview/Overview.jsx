import React from 'react';
import Review from '../../components/review/Review';

export default function({ product }) {
	const { details, reviews = [] } = product;

	return (
		<div className="overview page">
			<div className="details section padded">
				<h2>Details</h2>
				<p>{details}</p>
			</div>

			<div className="reviews section padded">
				<h2>Reviews</h2>
				{reviews.map((rev, idx) => <Review key={idx} data={rev} />)}
			</div>
		</div>
	);
}
