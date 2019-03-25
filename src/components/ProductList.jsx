import React, { Component } from 'react'
import Product from './Product'

class ProductList extends Component {
  state = {
    products: []
  }
  render() {
    return (
      <div>
        <h3>ProductList</h3>
        <Product />
      </div>
    )
  }
}

export default ProductList
