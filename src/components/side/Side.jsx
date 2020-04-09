import React from 'react';
import Tag from '../tag/Tag';
import { OVERVIEW_PAGE, SALES_PAGE } from '../../pages/pageNames';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';

export default function({ image, title, subtitle, tags, page, setPage }) {
	return (
		<div className="side section">
			<div className="product-info padded">
				<img src={image} alt={title} width="200" />
				<h2>{title}</h2>
				<h3>{subtitle}</h3>
			</div>

			<div className="tags padded">{tags.map((tag) => <Tag tag={tag} key={tag} />)}</div>

			<nav className="padded">
				<a
					href="#overview"
					className={page === OVERVIEW_PAGE ? 'on' : ''}
					onClick={() => setPage(OVERVIEW_PAGE)}
				>
					<HomeIcon /> Overview
				</a>
				<a href="#sales" className={page === SALES_PAGE ? 'on' : ''} onClick={() => setPage(SALES_PAGE)}>
					<BarChartIcon /> Sales
				</a>
			</nav>
		</div>
	);
}
