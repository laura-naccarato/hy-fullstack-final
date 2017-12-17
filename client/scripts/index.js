import React from 'react'
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Login from './components/login/login'
import UserCreate from './components/login/create'
import SeasonSelect from './components/season/select'
import SeasonCreate from './components/season/create'
import SeasonDetail from './components/season/detail'
import ProductList from './components/product/list'
import ProductCreate from './components/product/create'
import ProductEdit from './components/product/edit'
import gameCreate from './components/game/create'
import gameEdit from './components/game/edit'
import VerifyLogin from './components/login/verifyLogin'

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
		};
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.refresh = this.refresh.bind(this);
	}
	login() {
		this.setState({
			loggedIn: true,
		});
	}
	refresh() {
		fetch('/api/me', {
			method: 'GET',
			credentials: 'include'
		})
			.then((res) => res.json())
			.then((user) => {
				if (user._id) {
					this.setState({
						user: user,
					});
					this.login();
				}
			});
	}

	logout() {
		fetch('/api/logout', {
			method: 'GET',
			credentials: 'include',
		})
			.then(() => {
				this.setState({
					loggedIn: false,
					user: null,
				});
			});
	}

	componentDidMount() {
		this.refresh();
	}

	render() {
		return <div>
			<Router>
				<div className="inventory-app">
					{this.state.loggedIn &&
						<div className='sidebar'>
							<ul>
								<li><Link to="/season">Season Overview</Link></li>
								<li><Link to="/products">Products</Link></li>
							</ul>
							<div className="logout">
								<button onClick={this.logout} className="btn btn-primary">Log Out</button>
							</div>
						</div>
					}
					<div className="content">
						<Switch>
							<Route exact path='/' render={(props) => (<Login refresh={this.refresh} {...props} />)} />
							<Route exact path='/login/create' render={(props) => (<UserCreate refresh={this.refresh} {...props} />)} />
							<Route exact path='/products' component={ProductList} />
							<Route path='/products/create' component={ProductCreate} />
							<Route path='/products/:id' component={ProductEdit} />
							<Route exact path='/season' component={SeasonSelect} />
							<Route exact path={`/season/create`} component={SeasonCreate} />

							<Route exact path={`/season/:id`} component={SeasonDetail} />
							<Route exact path={`/season/:id/game/create`} component={gameCreate} />
							<Route exact path={`/game/:gameid`} component={gameEdit} />
						</Switch>
					</div>
				</div>
			</Router>
		</div>
	}
}
render(<App />, document.getElementById('app'));