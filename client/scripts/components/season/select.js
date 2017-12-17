import React from 'react'
import { Link } from 'react-router-dom'
class SeasonSelect extends React.Component {
	constructor() {
		super();
		this.state = {
			seasons: []
		}
	}

	getSeasons() {
		fetch('/api/seasons', { credentials: 'include' })
			.then((resp) => resp.json())
			.then((json) => {
				this.setState({
					seasons: json
				})
			})
	}

	componentDidMount() {
		this.getSeasons()
	}

	render() {
		const { match } = this.props;
		return <div className="season-select">
			{this.state.seasons.length > 0 ?
				<div className="season-list">
					<p>Please select a season, or <Link to={`${match.url}/create`}>create a new season</Link>.</p>
					{this.state.seasons.map((season) => {
						return <Link key={season._id} className="block-link" to={`${match.url}/${season._id}`}>{season.Title}</Link>
					})}
				</div> :
				<div>
					<p>There are currently no seasons. Please <Link to={`${match.url}/create`}>create a season</Link></p>
				</div>}
		</div>

	}
}
export default SeasonSelect 