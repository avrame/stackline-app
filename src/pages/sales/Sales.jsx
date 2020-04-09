import React, { useRef, useEffect, useState } from 'react';
import { LineChart, Line, XAxis } from 'recharts';
import TableHeader from './TableHeader';
import { SORT_ASC, SORT_DESC } from '../../constants';
import './sales.css';

const DEFAULT_SORT_DIR = SORT_DESC;

const usdFormat = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	roundingType: 'compactRounding',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});
const usDateTimeFormat = new Intl.DateTimeFormat('en-US');

const renderCustomAxisTick = ({ x, y, payload }) => {
	const month = new Date(payload.value).toLocaleString('default', { month: 'short' });
	return (
		<text className="svg-text" x={x - 14} y={y + 16}>
			{month}
		</text>
	);
};

function getGraphWrapperWidth(graphWrapper) {
	return graphWrapper.current ? graphWrapper.current.getBoundingClientRect().width - 80 : 720;
}

export default function({ sales }) {
	const graphWrapper = useRef(null);
	const initGraphWidth = getGraphWrapperWidth(graphWrapper);
	const [ graphWidth, setGraphWidth ] = useState(initGraphWidth);
	const [ sortProp, setSortProp ] = useState('weekEnding');
	const [ sortDir, setSortDir ] = useState(DEFAULT_SORT_DIR);

	function handleWindowResize() {
		setGraphWidth(getGraphWrapperWidth(graphWrapper));
	}

	function sortColumn(prop) {
		// If the prop that is clicked is already sorted, toggle the direction
		// Otherwise, set it to the default sort direction
		if (prop === sortProp) {
			if (sortDir === SORT_ASC) {
				setSortDir(SORT_DESC);
			} else {
				setSortDir(SORT_ASC);
			}
		} else {
			setSortDir(DEFAULT_SORT_DIR);
		}
		setSortProp(prop);
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	// Sort the sales
	const sortedSales = sales.sort((a, b) => {
		if (sortProp === 'weekEnding') {
			const diff = new Date(b.weekEnding) - new Date(a.weekEnding);
			if (sortDir === SORT_ASC) {
				return diff;
			} else {
				return -diff;
			}
		} else {
			const diff = b[sortProp] - a[sortProp];
			if (sortDir === SORT_ASC) {
				return diff;
			} else {
				return -diff;
			}
		}
	});

	return (
		<div className="sales page">
			<div className="section padded" ref={graphWrapper}>
				<h2>Retail Sales</h2>
				<LineChart data={sales} width={graphWidth} height={300}>
					<Line type="monotone" dataKey="retailSales" stroke="#259ff9" dot={false} strokeWidth={4} />
					<Line type="monotone" dataKey="wholesaleSales" stroke="#999" dot={false} strokeWidth={4} />
					<XAxis
						dataKey="weekEnding"
						tick={renderCustomAxisTick}
						type="category"
						interval="preserveStartEnd"
						tickLine={false}
					/>
				</LineChart>
			</div>

			<div className="section padded">
				<table className="sales-table">
					<thead>
						<tr>
							<TableHeader
								title="Week Ending"
								prop="weekEnding"
								sortProp={sortProp}
								sortColumn={sortColumn}
								sortDir={sortDir}
							/>
							<TableHeader
								title="Retail Sales"
								prop="retailSales"
								sortProp={sortProp}
								sortColumn={sortColumn}
								sortDir={sortDir}
							/>
							<TableHeader
								title="Wholesale Sales"
								prop="wholesaleSales"
								sortProp={sortProp}
								sortColumn={sortColumn}
								sortDir={sortDir}
							/>
							<TableHeader
								title="Units Sold"
								prop="unitsSold"
								sortProp={sortProp}
								sortColumn={sortColumn}
								sortDir={sortDir}
							/>
							<TableHeader
								title="Retailer Margin"
								prop="retailerMargin"
								sortProp={sortProp}
								sortColumn={sortColumn}
								sortDir={sortDir}
							/>
						</tr>
					</thead>
					<tbody>
						{sortedSales.map((row, idx) => {
							return (
								<tr key={idx}>
									<td>{usDateTimeFormat.format(new Date(row.weekEnding))}</td>
									<td>{usdFormat.format(row.retailSales)}</td>
									<td>{usdFormat.format(row.wholesaleSales)}</td>
									<td>{row.unitsSold}</td>
									<td>{usdFormat.format(row.retailerMargin)}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
