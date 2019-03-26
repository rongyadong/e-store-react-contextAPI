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
    detailProduct
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

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }
