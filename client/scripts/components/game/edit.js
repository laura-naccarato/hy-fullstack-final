import React from 'react'
import { Link } from 'react-router-dom'
class GameEdit extends React.Component {
	constructor() {
		super();
		this.state = {
			Name: "",
			Date: ""
		}
		this.editGame = this.editGame.bind(this)
		this.updateField = this.updateField.bind(this)
	}
	editGame() {
		const game = Object.assign({}, this.state)
		fetch(`/api/games/${this.props.match.params.gameid}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(game)
		}).then(() => this.props.history.goBack())
	}

	updateField(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	getGame() {
		fetch(`/api/games/${this.props.match.params.gameid}`, { credentials: 'include' }).then((res) => res.json()).then((json) => {
			this.setState(json[0])
		})
	}

	componentDidMount() {
		this.getGame()
	}

	render() {
		return <div className="game-edit">
			<div className="form-input">
				<label>Game Title</label>
				<input name="Name" onChange={this.updateField} type="text" value={this.state.Name} />
			</div>
			<div className="form-input">
				<label>Game Date</label>
				<input name="Date" onChange={this.updateField} type="date" value={this.state.Date} />
			</div>
			<button className="btn btn-primary" onClick={this.editGame}>edit</button>
		</div>

	}
}
export default GameEdit 