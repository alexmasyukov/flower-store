import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Row } from "components/Bootstrap"
import Switcher from "components/common/Switcher"
import styles from "components/cmslite.module.sass"
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

    handleProductSortUp = (order) => () => {
        this.props.updateProductOrderUp(order)
          .then(res => {
              setTimeout(() => {
                  console.log(res)
                  // alert('update')
              }, 500)
          })
    }

    handleProductSortDown = (order) => () => {
        this.props.updateProductOrderDown(order)
          .then(res => {
              setTimeout(() => {
                  console.log(res)
                  // alert('update down')
              }, 500)
          })
    }


    render() {
        const { products } = this.state
        const { getImage, deleteProduct, city } = this.props

        return products.map((product, i) => (
          <Row key={product.id} className={cn(!product.public && styles.unpublic)}>
              <div className="col-md-2">
                  <img style={{ width: '100%' }}
                       src={getImage(product.sizes[0].images[0])}
                       alt=""/>
              </div>
              <div className="col-md-10 pl-1">
                  <Link to={`/${city}/products/${product.id}`}>
                      {product.title}</Link>

                  <div className=" mt-4">
                      <span className="mr-5">
                          <b>ID:</b> {product.id} &nbsp;|&nbsp;
                          <b>Order:</b> {product.order}
                      </span>
                      <span className={styles.mtitle}>Переместить </span>
                      <button
                        type="button"
                        disabled={i === 0}
                        onClick={this.handleProductSortUp(product.order)}>
                          Вверх
                      </button>
                      <button
                        type="button"
                        disabled={i === products.length - 1}
                        onClick={this.handleProductSortDown(product.order)}>
                          Вниз
                      </button>
                      |
                      <button
                        onClick={() => {
                            if (window.confirm("Удалить товар?"))
                                deleteProduct(product.id)
                                  .then(res => {
                                      console.log(res)
                                      if (res && 'status' in res && res.status === 'done') {
                                          this.props.history.go()
                                      } else {
                                          alert('Ошибка при удалении. Подробности в консоли')
                                      }
                                  })
                        }}>Удалить
                      </button>
                  </div>
                  <br/>

                  <Switcher
                    title="Опубликовано"
                    id={`public-${product.id}`}
                    isOn={product.public}
                    isLoading={product.public === ''}
                    onSwitch={() => this.handleProductPublicChange(product.id, !product.public)}/>

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
              <hr/>
          </Row>
        ))
    }
}

export default ProductsList