import React from 'react'
import { Link, Route } from 'react-router-dom'
import Table from '../table/table'
import gameCreate from '../game/create'
class SeasonDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			Title: "",
			StartDate: "",
			EndDate: "",
			Games: []
		}
		this.tableValues = ['Name', 'Date']
		this.getSeasonByID = this.getSeasonByID.bind(this)

	}
	
	getSeasonByID(id) {
		fetch(`/api/seasons/${id}`, { credentials: 'include'}).then((resp) => resp.json())
			.then((json) => {
				this.setState(json)
			})
	}

	componentDidMount() {
		this.getSeasonByID(this.props.match.params.id)
	}

	render() {
		return <div className="season-detail">
			<h3>{this.state.Title}</h3>
			<p>Start Date:</p>
			{this.state.StartDate}
			<p>End Date:</p>
			{this.state.EndDate}
			<Link to={`/season/${this.state._id}/game/create`}>
				<button className="btn btn-default">Add Game</button>
			</Link>
			{this.state.Games.length > 0 &&
				<div className="games-list">
				<Table model={'game'} headerCols={this.tableValues} tableContents={this.state.Games} topUrl={this.props.match.url} />
				</div>
			}
		</div>

	}
}
export default SeasonDetail 