import React from 'react'
import { Link } from 'react-router-dom'
class ProductEdit extends React.Component {
	constructor() {
		super();
		this.state = {
			Name: "",
			Date: "",
			Cost: "",
			Price: "",
			Royalties: "",
			Stock: "",
			IsShirt: false,
			Discontinued: false
		}
		this.editProduct = this.editProduct.bind(this)
		this.updateField = this.updateField.bind(this)
	}
	editProduct() {
		const product = Object.assign({}, this.state)
		fetch(`/api/products/${this.props.match.params.id}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(product)
		}).then(() => this.props.history.goBack())
	}

	updateField(e) {
		var val = e.target.value;
		if (val == 'on')
			val = true
		if (val == 'off')
			val = false

		this.setState({
			[e.target.name]: val,
		});
	}

	getProduct() {
		fetch(`/api/products/${this.props.match.params.id}`, { credentials: 'include' }).then((res) => res.json()).then((json) => {
			this.setState(json[0])
		})
	}

	componentDidMount() {
		this.getProduct()
	}

	render() {
		return <div className="product-create">
			<div className="form-input">
				<label>Product Name</label>
				<input name="Name" onChange={this.updateField} type="text" value={this.state.Name} />
			</div>
			<div className="form-input">
				<label>Product Cost</label>
				<input step="any" type='number' name='Cost' onChange={this.updateField} value={this.state.Cost} />
			</div>
			<div className="form-input">
				<label>Product Price</label>
				<input step="any" type='number' name="Price" onChange={this.updateField} value={this.state.Price} />
			</div>
			<div className="form-input">
				<label>Product Royalties</label>
				<input step="any" type='number' name="Royalties" onChange={this.updateField} value={this.state.Royalties} />
			</div>
			<div className="form-input">
				<label>In Stock</label>
				<input name="Stock" onChange={this.updateField} type="number" value={this.state.Stock} />
			</div>
			<div className="form-input">
				<label>Is this product a shirt?</label>
				<input name="IsShirt" onChange={this.updateField} type="checkbox" checked={this.state.IsShirt} />
			</div>
			{this.state.IsShirt ? <div>
				<div className="form-input">
					<label>shirt size</label>
					<select onChange={this.updateField} name="Size">
						<option value="XS">XS</option>
						<option value="S">S</option>
						<option value="M">M</option>
						<option value="L">L</option>
						<option value="Xl">Xl</option>
						<option value="XXL">XXL</option>
						<option value="XXXL">XXXL</option>
					</select>
				</div>
				<div className="form-input">
					<label>shirt cut</label>
					<select onChange={this.updateField} name="Cut">
						<option value="child">Child</option>
						<option value="relaxed">Relaxed</option>
						<option value="fitted">Fitted</option>
					</select>
				</div>
			</div> : null}
			<div className="form-input">
				<label>Product Is Discontinued</label>
				<input name="Discontinued" onChange={this.updateField} type="checkbox" checked={this.state.Discontinued} />
			</div>
			<button className="btn btn-primary" onClick={this.editProduct}>edit</button>
		</div>

	}
}
export default ProductEdit 