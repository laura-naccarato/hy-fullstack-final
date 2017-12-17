import React from 'react'

class SeasonCreate extends React.Component {
	constructor() {
		super();
		this.state = {
			Title: "",
			StartDate: "",
			EndDate: ""
		}
		this.createSeason = this.createSeason.bind(this)
		this.updateField = this.updateField.bind(this)
	}
	createSeason(e) {
		e.preventDefault();

		const season = Object.assign({}, this.state)

		fetch('/api/seasons', {
			method: 'POST',
			body: JSON.stringify(season),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			}
		})
			.then((res) => {
				this.props.history.push('/season');
			});
	}

	updateField(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	render() {
		return <div className="season-create">
			<div className="form-input">
				<label>Season Title</label>
				<input name="Title" onChange={this.updateField} type="text" value={this.state.Title} />
			</div>
			<div className="form-input">
				<label>Season Start Date</label>
				<input name="StartDate" onChange={this.updateField} type="date" value={this.state.StartDate} />
			</div>
			<div className="form-input">
				<label>Season End Date</label>
				<input name="EndDate" onChange={this.updateField} type="date" value={this.state.EndDate} />
			</div>
			<button onClick={this.createSeason}>Create</button>
		</div>

	}
}
export default SeasonCreate 