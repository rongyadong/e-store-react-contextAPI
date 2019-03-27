import React from 'react'
import { Link } from 'react-router-dom'
import { ProductConsumer } from '../context'
import { ButtonContainer } from './../util/Button'

const Details = () => {
  return (
    <ProductConsumer>
      {value => {
        const {
          id,
          company,
          img,
          info,
          price,
          title,
          inCart
        } = value.detailProduct
        return (
          <div className="container py-5">
            <div className="row">
              <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                <h1>{title}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                <img src={img} alt="product img" className="img-fluid" />
              </div>
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                <h1>Model : {title}</h1>
                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                  made by : {company}
                </h4>
                <h4 className="text-blue">
                  <strong>
                    Price : $ <span style={{ color: '#f40' }}>{price}</span>
                  </strong>
                </h4>
                <p className="text-capitalize font-weight-bold mt-3 mb-0">
                  some info about product:
                </p>
                <p className="text-muted lead">{info}</p>
                <div>
                  <Link to="/">
                    <ButtonContainer>Back to products</ButtonContainer>
                  </Link>
                  <ButtonContainer
                    cart
                    disabled={inCart ? true : false}
                    onClick={() => {
                      value.addToCart(id)
                      value.openModal(id)
                    }}
                  >
                    {inCart ? 'inCart' : 'add to cart'}
                  </ButtonContainer>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </ProductConsumer>
  )
}

export default Details
