
import React from 'react'
import { Link } from 'react-router-dom'
class Login extends React.Component {
	constructor() {
		super()
		this.state = {
			Email: "",
			Password: ""
		}
		error = ''
		this.loginUser = this.loginUser.bind(this)
		this.updateField = this.updateField.bind(this)
	}
	loginUser(e) {
		e.preventDefault();
		const user = Object.assign({}, this.state);
		// 1. Collect all of the user data from the state
		// 2. POST it to the back end to check user's credentials.
		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(user),
		})
			.then((res) => {
				// 3. If the user is valid, log them in                   
				if (res.status !== 401) {
					this.props.refresh()
					this.props.history.push('/season'); this.props.history.push('/season');
				} else {
console.log('hello')
					this.error = 'There was a problem with your credentials. Please try again.'
					// 4. If the user is invalid, let them know and give them another shot to try again. another shot to try again.                            
					return
				}
			})
	}
	updateField(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	render() {
		return <div>
			<div className="login">
				<div onChange={this.updateField} className="form-input">
					<label>Email Address</label>
					<input name="Email" value={this.state.Email} type="email" />
				</div>
				<div onChange={this.updateField} className="form-input">
					<label>password</label>
					<input name="Password" value={this.state.Password} type="password" />
				</div>
				<button onClick={this.loginUser} className="btn btn-primary">Log In</button>
			</div>
			<Link to={'/login/create'}>Sign up</Link>
		</div>
	}
}
export default Login