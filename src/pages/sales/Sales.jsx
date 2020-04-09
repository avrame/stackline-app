import React from 'react';
import './sales.css';

const usdFormat = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	roundingType: 'compactRounding',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});
const usDateTimeFormat = new Intl.DateTimeFormat('en-US');

export default function({ sales }) {
	return (
		<div className="sales page">
			<div className="section padded">
				<h2>Retail Sales</h2>
				<p>Graph goes here</p>
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
