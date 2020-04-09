import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setProducts } from './store/actions/actionCreators';
import Overview from './pages/overview/Overview';
import Sales from './pages/sales/Sales';
import Tag from './components/tag/Tag';
import { getProducts } from './api.js';
import './App.css';

const OVERVIEW_PAGE = 'OVERVIEW_PAGE';
const SALES_PAGE = 'SALES_PAGE';

const PRODUCT_ID = 'B007TIE0GQ';

function App({ products, setProducts }) {
	const [ page, setPage ] = useState(OVERVIEW_PAGE);

	const product = products.find((prod) => prod.id === PRODUCT_ID) || {};
	const { image, title, subtitle, tags = [] } = product;

	useEffect(
		() => {
			async function getAndStoreProducts() {
				const productsFromServer = await getProducts();
				setProducts(productsFromServer);
			}

			getAndStoreProducts();
		},
		[ setProducts ]
	);

	let pageComponent;
	switch (page) {
		case OVERVIEW_PAGE:
			pageComponent = <Overview product={product} />;
			break;
		case SALES_PAGE:
			pageComponent = <Sales product={product} />;
			break;
		default:
			pageComponent = <Overview product={product} />;
	}

	return (
		<div className="App">
			<header>
				<img className="logo" src="logo-white.svg" alt="Stackline Logo" />
			</header>
			<div className="wrapper">
				<div className="side section">
					<div className="product-info padded">
						<img src={image} alt={title} width="200" />
						<h2>{title}</h2>
						<h3>{subtitle}</h3>
					</div>

					<div className="tags padded">{tags.map((tag) => <Tag tag={tag} />)}</div>

					<nav className="padded">
						<a href="#overview" onClick={() => setPage(OVERVIEW_PAGE)}>
							Overview
						</a>
						<a href="#sales" onClick={() => setPage(SALES_PAGE)}>
							Sales
						</a>
					</nav>
				</div>

				{pageComponent}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	};
};

const mapDispatchToProps = { setProducts };

export default connect(mapStateToProps, mapDispatchToProps)(App);
