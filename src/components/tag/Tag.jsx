import React from 'react';
import './tag.css';

export default function Tag({ tag }) {
	return (
		<a className="tag" href={`#${tag}`}>
			{tag}
		</a>
	);
}
