import React, { Component } from 'react'
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import { compose } from "utils"
import { Link } from "react-router-dom"

const Switcher = ({
                      title = '[title]',
                      id = '[id]',
                      isOn = false,
                      isLoading = false,
                      onSwitch
                  }) => (
  <label style={{
      opacity: isLoading ? 0.3 : 1,
      display: 'block',
      marginBottom: 10
  }}>
      <input
        className="mr-1"
        type="checkbox"
        checked={isOn}
        onChange={onSwitch}/>
      {isLoading ? 'Загрузка...' : title}
  </label>
)


class ItemsList extends Component {
    state = {
        data: this.props.data
    }

    handlePublicChange = (id, boolValue) => {
        this.setState(({ data }) => data.map(product =>
          product.public = product.id === id ? '' : product.public
        ))

        this.props.updatePublicProduct(id, boolValue)
          .then(res => {
              setTimeout(() => {
                  this.setState(({ data }) => data.map(product =>
                    product.public = product.id === id ? res.public : product.public
                  ))
              }, 500)
          })
    }


    handlePublicSizeChange = (productId, sizeId, boolValue) => {
        this.setState(({ data }) => data.map(product => {
            if (product.id === productId) {
                const sizes = product.sizes.map(size =>
                  size.public = size.id === sizeId ? '' : size.public
                )

                return {
                    ...product,
                    sizes
                }
            }
            return product
        }))

        this.props.updatePublicProductSize(sizeId, boolValue)
          .then(res => {
              setTimeout(() => {
                  this.setState(({ data }) => data.map(product => {
                      if (product.id === productId) {
                          const sizes = product.sizes.map(size =>
                            size.public = size.id === sizeId ? res.public : size.public
                          )

                          return {
                              ...product,
                              sizes
                          }
                      }
                      return product
                  }))
              }, 500)
          })
    }

    render() {
        const { data } = this.state

        const products = data.map(product => (
          <div key={product.id}
               className="col-md-12">
              <div className="row">
                  <div className="col-md-2">
                      <img style={{ width: '100%' }}
                           src={product.sizes[0].images[0]}
                           alt=""/>
                  </div>
                  <div className="col-md-10 pl-1">
                      <Link to={`/cmslite/products/${product.id}`}>
                          {product.title}</Link>
                      <br/><br/>
                      <Switcher
                        title="Опубликовано"
                        id={`public-${product.id}`}
                        isOn={product.public}
                        isLoading={product.public === ''}
                        onSwitch={() => this.handlePublicChange(product.id, !product.public)}/>
                      <br/>

                      {product.sizes.map(size =>
                        <Switcher
                          key={size.id}
                          title={size.title}
                          isOn={size.public}
                          isLoading={size.public === ''}
                          onSwitch={() => this.handlePublicSizeChange(product.id, size.id, !size.public)}/>
                      )}
                  </div>
              </div>
          </div>
        ))

        return (
          <div className="row">
              {products}
          </div>
        )
    }
}


const mapMethodsToProps = (apiService) => ({
    getData: apiService.getAllProducts(true),
    updatePublicProduct: apiService.updatePublicProduct,
    updatePublicProductSize: apiService.updatePublicProductSize
})


export default compose(
  withApiService(mapMethodsToProps),
  withData
)(ItemsList)