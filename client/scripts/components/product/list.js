import React from 'react'
import Table from "../table/table"
import { Link } from 'react-router-dom'
class ProductList extends React.Component {
	constructor() {
		super();
		this.state = {
			products: [],
			modalIsOpen: false,
			showDiscontinued: false
		}
		this.showCreateForm = this.showCreateForm.bind(this)
		this.hideCreateForm = this.hideCreateForm.bind(this)
		this.updateField = this.updateField.bind(this)
		this.tableValues = ['Name', 'Cost', 'Price', 'Stock', 'Royalties', 'IsShirt', 'Size', 'Cut', 'Discontinued']
	}

	getProducts() {
		fetch('/api/products', { credentials: 'include',})
			.then((resp) => resp.json())
			.then((json) => {
				this.setState({
					products: json
				})
			})
	}

	showCreateForm() {
		this.setState({
			modalIsOpen: true
		})
	}
	hideCreateForm() {
		this.setState({
			modalIsOpen: false
		})
	}

	updateField(e) {
		var value = e.target.type == 'checkbox' ? e.target.value == 'on' : e.target.value
		this.setState({
			[e.target.name]: value
		})
	}

	createProduct(e) {
		e.preventDefault();

		const product = Object.assign({}, this.state)
		fetch('/api/products', {
			method: 'POST',
			body: JSON.stringify(product),
			headers: {
				'Content-Type': 'application/json',
			}
		})
			.then((res) => {
				this.props.history.push('/products');
			});
	}

	componentDidMount() {
		this.getProducts()
	}

	render() {
		return <div className="products">
			<div className="products-table">
				<div className="action-row">
					<div className="actions">
						<Link to={'/products/create'}>
							<button className="btn btn-primary">Create Product</button>
						</Link>
				</div>
			</div>
			<div className="table-component">
					<Table model={'products'} headerCols={this.tableValues} tableContents={this.state.products} />
			</div>
		</div>
		</div >
	}
}

export default ProductList