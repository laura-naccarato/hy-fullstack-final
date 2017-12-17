import React from 'react';

const TableHeaderRow = (props) => {
	return (
		<tr>
			{
				props.headers.map((header, idx) => {
					return <th key={`header-${idx}`}>{header}</th>
				})
			}
		</tr>
	)
}

export default TableHeaderRow