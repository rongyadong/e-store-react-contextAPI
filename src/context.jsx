import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()
//Provider
//Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  }

  getItem = id => {
    const product = this.state.products.find(item => item.id === id)
    return product
  }

  handleDetail = id => {
    const product = this.getItem(id)
    this.setState({ detailProduct: product })
  }

  addToCart = id => {
    let products = [...this.state.products]
    const index = products.indexOf(this.getItem(id))
    const product = products[index]
    product.inCart = true
    product.count = 1
    const price = product.price
    product.total = price
    this.setState(
      {
        products,
        cart: [...this.state.cart, product]
      },
      () => {
        console.log(this.state)
      }
    )
  }

  openModal = id => {
    const product = this.getItem(id)
    this.setState({
      modalProduct: product,
      modalOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      modalOpen: false
    })
  }

  //cut the relationship between data.js and contextAPI
  loadProducts = () => {
    let products = []
    storeProducts.forEach(item => {
      const singleItem = { ...item }
      products = [...products, singleItem]
    })

    this.setState({ products })
  }

  componentDidMount() {
    this.loadProducts()
  }

  //Cart related functions
  increment = id => {
    console.log('this is increment method')
  }

  decrement = id => {
    console.log('this is decrement method')
  }

  removeItem = id => {
    console.log('this is remove method')
  }

  clearCart = () => {
    console.log('this is clear method')
  }

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }
