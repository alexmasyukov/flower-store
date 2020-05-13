import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Row } from "components/Bootstrap"
import Switcher from "components/CmsLite/common/Switcher"
import styles from "components/CmsLite/cmslite.module.sass"
import cn from "classnames"


class ProductsList extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        this.setState({
            products: this.props.products
        })
    }


    handleProductPublicChange = (id, boolValue) => {
        this.setState(({ products }) => products.map(product =>
          product.public = product.id === id ? '' : product.public
        ))

        this.props.updateProductPublic(id, boolValue)
          .then(res => {
              setTimeout(() => {
                  this.setState(({ products }) => products.map(product =>
                    product.public = product.id === id ? res.result.public : product.public
                  ))
              }, 500)
          })
    }

    updatePropInProductSizeOfProduct = (product, productSizeId, propName = '', value = '') => {
        const sizes = product.sizes.map(size =>
          size[propName] = size.id === productSizeId ? value : size[propName]
        )

        return {
            ...product,
            sizes
        }
    }


    handlePruductSizePublicChange = (productId, sizeId, boolValue) => {
        this.setState(({ products }) => products.map(product =>
          product.id === productId ?
            this.updatePropInProductSizeOfProduct(product, sizeId, 'public') : product
        ))

        this.props.updateProductSizePublic(sizeId, boolValue)
          .then(res => {
              setTimeout(() => {
                  this.setState(({ products }) => products.map(product =>
                    product.id === productId ?
                      this.updatePropInProductSizeOfProduct(product, sizeId, 'public', res.result.public) : product
                  ))
              }, 500)
          })
    }

    handleProductSizeFastChange = (productId, sizeId, boolValue) => {
        this.setState(({ products }) => products.map(product =>
          product.id === productId ?
            this.updatePropInProductSizeOfProduct(product, sizeId, 'fast') : product
        ))

        this.props.updateProductSizeFast(sizeId, boolValue)
          .then(res => {
              setTimeout(() => {
                  this.setState(({ products }) => products.map(product =>
                    product.id === productId ?
                      this.updatePropInProductSizeOfProduct(product, sizeId, 'fast', res.result.fast) : product
                  ))
              }, 500)
          })
    }


    render() {
        const { products } = this.state
        const { getImage } = this.props

        const productsRender = products.map(product => (
          <div key={product.id} className="col-md-12 mb-4">
              <div className={cn('row', !product.public && styles.unpublic)}>
                  <div className="col-md-2">
                      <img style={{ width: '100%' }}
                           src={getImage(product.sizes[0].images[0])}
                           alt=""/>
                  </div>
                  <div className="col-md-10 pl-1">
                      <Link to={`/cmslite/products/${product.id}`}>
                          {product.title}</Link>

                      <span className={styles.listLabel}>
                          <b>ID:</b> {product.id}
                      </span>
                      <br/>

                      <Switcher
                        title="Опубликовано"
                        id={`public-${product.id}`}
                        isOn={product.public}
                        isLoading={product.public === ''}
                        onSwitch={() => this.handleProductPublicChange(product.id, !product.public)}/>
                      <br/>

                      {product.sizes.map(size =>
                        <Row key={size.id}>
                            <div className="col-md-2">
                                <Switcher
                                  title={size.title}
                                  isOn={size.public}
                                  isLoading={size.public === ''}
                                  onSwitch={() => this.handlePruductSizePublicChange(product.id, size.id, !size.public)}/>
                            </div>
                            <div className="col-md-4">
                                <Switcher
                                  title="Готовый букет"
                                  isOn={size.fast}
                                  isLoading={size.fast === ''}
                                  onSwitch={() => this.handleProductSizeFastChange(product.id, size.id, !size.fast)}/>
                            </div>
                        </Row>
                      )}
                  </div>
              </div>
          </div>
        ))

        return (
          <div className="row">
              <Link to="/cmslite/product-add">Добавить букет</Link>
              <br/><br/>
              {productsRender}
          </div>
        )
    }
}

export default ProductsList