import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setProducts } from './store/actions/actionCreators';
import Overview from './pages/overview/Overview';
import Sales from './pages/sales/Sales';
import Side from './components/side/Side';
import { OVERVIEW_PAGE, SALES_PAGE } from './pages/pageNames';
import { getProducts } from './api.js';
import './App.css';

const PRODUCT_ID = 'B007TIE0GQ';

function App({ products, setProducts }) {
	const [ page, setPage ] = useState(OVERVIEW_PAGE);

	const product = products.find((prod) => prod.id === PRODUCT_ID) || {};

	const { image, title, subtitle, tags = [], sales = [] } = product;

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
			pageComponent = <Sales sales={sales} />;
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
				<Side image={image} title={title} subtitle={subtitle} tags={tags} page={page} setPage={setPage} />
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
