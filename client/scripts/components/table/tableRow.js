import React from 'react';
import { Link } from 'react-router-dom'
const TableRow = (props) => {
	console.log(props.model)
	return (
		<tr>
			{props.headers.map((header, idx) => {
				var isBool = typeof props.trContent[header] == 'boolean'
				return <td className={isBool ? props.trContent[header] ? 'boolean green-check' : 'boolean red-x' : ''} key={`row-${idx}`}>{isBool ? props.trContent[header] ? <i className="fa fa-check"></i> : <i className="fa fa-times"></i> : (header == "Title" || header == "Name") ? <Link to={{ pathname: `/${props.model}/${props.trContent._id}`, state: {modelMode: props.modelMode}}}> {props.trContent[header]} </Link> : props.trContent[header] }</td>
			})}        
		</tr>
	)
}

export default TableRow