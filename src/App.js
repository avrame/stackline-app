import React, { useState } from 'react';
import Overview from './pages/overview';
import Sales from './pages/sales';
import './App.css';

const OVERVIEW_PAGE = 'OVERVIEW_PAGE';
const SALES_PAGE = 'SALES_PAGE';

function App() {
	const [ page, setPage ] = useState(OVERVIEW_PAGE);

	let pageComponent;
	switch (page) {
		case OVERVIEW_PAGE:
			pageComponent = <Overview />;
			break;
		case SALES_PAGE:
			pageComponent = <Sales />;
			break;
		default:
			pageComponent = <Overview />;
	}

	return (
		<div className="App">
			<header>
				<img className="logo" src="logo-white.svg" alt="Stackline Logo" />
			</header>
			<div class="wrapper">
				<div className="side">
					<div className="product-info" />
					<div className="tags" />
					<nav>
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

export default App;
