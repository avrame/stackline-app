import React from 'react';
import './review.css';

export default function Review({ data }) {
	return (
		<article className="review">
			<h1>
				<b>{data.customer}</b> says:
			</h1>
			<h2 className="score">{data.score} out of 5</h2>
			<p className="review">{data.review}</p>
		</article>
	);
}
