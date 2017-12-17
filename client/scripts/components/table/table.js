
import React from 'react';
import TableHeaderRow from './tableHeaderRow'
import Tablerow from './tablerow'

const Table = (props) => {
	return (
		<table className="table table-responsive table-striped table-bordered">
			<thead>
				<TableHeaderRow headers={props.headerCols} />
			</thead>
			<tbody>
				{props.tableContents.map((content) => {
					return <Tablerow modelMode={'edit'} key={content._id} headers={props.headerCols} trContent={content} topUrl={props.topUrl} model={props.model}/>
				})}
			</tbody>
		</table>
	)
}

export default Table