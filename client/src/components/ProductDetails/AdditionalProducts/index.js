import React from 'react'
import cn from 'classnames'
import { Row } from "components/Bootstrap"
import styles from './AdditionalProducts.module.sass'
import RoubleSymbol from "components/UI/RoubleSymbol"

const AdditionalProducts = ({
                              products = [],
                              activeIds = [],
                              onSelect = () => {
                              }
                            }) => {
  return (
    <Row className={styles.additionalProducts}>
      {
        products.map(({ id, title = '', price, image }, idx) => {
          // console.log(id, activeIds)
          const active = activeIds.includes(id)
          return (
            <div
              key={id}
              className={cn('col-4', 'pr-1', idx > 0 && 'pl-1')}
              onClick={() => onSelect({
                id,
                price
              })}
            >
              <div className={cn(
                styles.product,
                active && styles.active
              )}>
                <img src={image} alt={title}/>
                <span className={styles.title}>{title}</span>
                <span className={styles.price}>{price} <RoubleSymbol/></span>
                {active && (
                  <div className={styles.added}>Добавлено</div>
                )}
              </div>
            </div>
          )
        })
      }
    </Row>
  )
}

export default AdditionalProducts