import React from 'react'
import { Link } from 'react-router-dom'
class GameCreate extends React.Component {
	constructor() {
		super();
		this.state = {
			Name: "",
			Date: ""
		}
		this.createGame = this.createGame.bind(this)
		this.updateField = this.updateField.bind(this)
	}
	
	createGame(e) {
		e.preventDefault();

		const game = Object.assign({}, this.state)
		game.Season = this.props.match.params.id
		fetch('/api/games', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(game),
			headers: {
				'Content-Type': 'application/json',
			}
		})
			.then((res) => res.json())
			.then((json) => {
				this.props.history.push(`/season/${this.props.match.params.id}`);
			})
	}

	updateField(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	render() {
		return <div className="game-create">
			<div className="form-input">
				<label>Game Title</label>
				<input name="Name" onChange={this.updateField} type="text" value={this.state.Name} />
			</div>
			<div className="form-input">
				<label>Game Date</label>
				<input name="Date" onChange={this.updateField} type="date" value={this.state.Date} />
			</div>
			<button className="btn btn-primary" onClick={this.createGame}>create</button>
		</div>

	}
}
export default GameCreate 