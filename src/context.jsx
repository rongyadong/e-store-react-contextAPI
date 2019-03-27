import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()
//Provider
//Consumer

class ProductProvider extends Component {
  state = {
    detailProduct,
    products: [],
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
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
        this.addTotals()
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
    let cart = [...this.state.cart]
    const selectedProduct = cart.find(item => item.id === id)
    const index = cart.indexOf(selectedProduct)
    const product = cart[index]

    product.count = product.count + 1
    product.total = product.count * product.price

    this.setState({ cart: [...cart] }, () => {
      this.addTotals()
    })
  }

  decrement = id => {
    let cart = [...this.state.cart]
    const selectedProduct = cart.find(item => item.id === id)
    const index = cart.indexOf(selectedProduct)
    const product = cart[index]

    product.count = product.count - 1

    if (product.count === 0) {
      this.removeItem(id)
    } else {
      product.total = product.count * product.price

      this.setState({ cart: [...cart] }, () => {
        this.addTotals()
      })
    }
  }

  removeItem = id => {
    let products = [...this.state.products]
    let cart = [...this.state.cart]

    cart = cart.filter(item => item.id !== id)
    const index = products.indexOf(this.getItem(id))
    let product = products[index]
    product.inCart = false
    product.count = 0
    product.total = 0

    this.setState(
      {
        cart: [...cart],
        products: [...products]
      },
      () => {
        this.addTotals()
      }
    )
  }

  clearCart = () => {
    this.setState({ cart: [] }, () => {
      this.loadProducts()
      this.addTotals()
    })
  }

  addTotals = () => {
    let subTotal = 0
    this.state.cart.map(item => (subTotal += item.total))
    const tax = parseFloat((subTotal * 0.09).toFixed(2))
    const total = subTotal + tax

    this.setState({
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total
    })
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
