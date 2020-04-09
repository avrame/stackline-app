import React from 'react';
import { SORT_ASC } from '../../constants';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export default function TableHeader({ title, prop, sortColumn, sortProp, sortDir }) {
	let sortArrow = null;
	if (sortProp === prop) {
		sortArrow = sortDir === SORT_ASC ? <ExpandMoreIcon /> : <ExpandLessIcon />;
	}

	return (
		<th onClick={() => sortColumn(prop)}>
			{title}
			{sortArrow}
		</th>
	);
}
