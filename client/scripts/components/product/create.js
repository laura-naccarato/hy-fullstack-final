import React from 'react'
import { Link } from 'react-router-dom'
class ProductCreate extends React.Component {
	constructor() {
		super();
		this.state = {
			product: {
				Name: "",
				Date: "",
				Cost: "",
				Price: "",
				Royalties: "",
				Stock: "",
				IsShirt: false,
				Discontinued: false
			},
			errors: {}
		}
		this.createProduct = this.createProduct.bind(this)
		this.updateField = this.updateField.bind(this)
	}
	createProduct(e) {
		e.preventDefault();
		this.setState({
			errors: {}
		})
		const product = Object.assign({}, this.state.product)
		fetch('/api/products', {
			method: 'POST',
			body: JSON.stringify(product),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			}
		})
			.then((res) => res.json()).then((json) => {
				if (json.errors) {
					this.setState({
						errors: json.errors
					})
				} else {
					this.props.history.push(`/products`);
				}
			});
	}

	updateField(e) {
		var val = e.target.value;
		if (val == 'on')
			val = true
		if (val == 'off')
			val = false
		this.state.product[e.target.name] = val;
		this.forceUpdate()
	}

	errorMsg(field) {
		if (typeof this.state.errors[field] !== 'undefined')
			return <div className="error-msg">{this.state.errors[field].message}</div>
	}

	render() {
		return <div className="product-create">
			<div className="form-input">
				<label>Product Name</label>
				<input className={typeof this.state.errors["Name"] !== 'undefined' ? "error" : ''} name="Name" onChange={this.updateField} type="text" value={this.state.product.Name} />
				{this.errorMsg("Name")}
			</div>
			<div className="form-input">
				<label>Product Cost</label>
				<input step="any" className={typeof this.state.errors["Cost"] !== 'undefined' ? "error" : ''} type='number' name='Cost' onChange={this.updateField} value={this.state.product.Cost} />
				{this.errorMsg("Cost")}
			</div>
			<div className="form-input">
				<label>Product Price</label>
				<input step="any" className={typeof this.state.errors["Price"] !== 'undefined' ? "error" : ''} type='number' name="Price" onChange={this.updateField} value={this.state.product.Price} />
				{this.errorMsg("Price")}
			</div>
			<div className="form-input">
				<label>Product Royalties</label>
				<input step="any" type='number' name="Royalties" onChange={this.updateField} value={this.state.product.Royalties} />
			</div>
			<div className="form-input">
				<label>In Stock</label>
				<input name="Stock" onChange={this.updateField} type="number" value={this.state.product.Stock} />
			</div>
			<div className="form-input">
				<label>Is this product a shirt?</label>
				<input name="IsShirt" onClick={this.updateField} type="checkbox" checked={this.state.product.IsShirt} />
			</div>
			{this.state.product.IsShirt ? <div>
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
				<input name="Discontinued" onChange={this.updateField} type="checkbox" checked={this.state.product.Discontinued} />
			</div>
			<button className="btn btn-primary" onClick={this.createProduct}>Create</button>
		</div>

	}
}
export default ProductCreate 