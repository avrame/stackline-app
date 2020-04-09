import React, { useRef, useEffect, useState } from 'react';
import { LineChart, Line, XAxis } from 'recharts';
import './sales.css';

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

	function handleWindowResize() {
		setGraphWidth(getGraphWrapperWidth(graphWrapper));
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

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
							<th>Week Ending</th>
							<th>Retail Sales</th>
							<th>Wholesale Sales</th>
							<th>Units Sold</th>
							<th>Retailer Margin</th>
						</tr>
					</thead>
					<tbody>
						{sales.map((row, idx) => {
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
