import React from 'react'
import { Link } from 'react-router-dom'
class UserCreate extends React.Component {
	constructor() {
		super();
		this.state = {
			Name: "",
			Email: "",
			Password: "",
			errors: {}
		}
		this.createUser = this.createUser.bind(this)
		this.updateField = this.updateField.bind(this)
	}
	createUser(e) {
		e.preventDefault();
		this.setState({
			errors: {}
		})
		const user = Object.assign({}, this.state);

		fetch('/api/signup', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user)
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.errors) {
					this.setState({
						errors: json.errors
					})
				} else {
					this.props.refresh();
					this.props.history.push(`/season`);
				}
			});
	}

	updateField(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}


	errorMsg(field) {
		if (typeof this.state.errors[field] !== 'undefined')
			return <div className="error-msg">{this.state.errors[field].message}</div>
	}

	render() {
		return <div className="home">
			<div className="form-input">
				<label>Name:</label>
				<input name="Name" className={typeof this.state.errors["Name"] !== 'undefined' ? "error" : ''} onChange={this.updateField} type="text" value={this.state.Name} />
			</div>
			<div className="form-input">
				<label>Email:</label>
				<input name="Email" className={typeof this.state.errors["Email"] !== 'undefined' ? "error" : ''} onChange={this.updateField} type="text" value={this.state.Email} />
			</div>
			<div className="form-input">
				<label>Passowrd:</label>
				<input name="Password" className={typeof this.state.errors["Password"] !== 'undefined' ? "error" : ''} onChange={this.updateField} type="password" value={this.state.Password} />
			</div>
			<div className="actions">
				<div className="login">
					<button className="btn btn-primary" onClick={this.createUser}>Create</button>
				</div>
			</div>
		</div>

	}
}
export default UserCreate 