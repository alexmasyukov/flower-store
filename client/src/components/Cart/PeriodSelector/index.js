import React, { Component } from 'react'
import styles from './PeriodSelector.module.sass'

const periods = [
   { period: null, price: 0 },
   { period: '09:00 - 21:00', price: 200 },
   { period: '21:00 - 09:00', price: 400 },
]

class PeriodSelector extends Component {
   render() {


      return (
         <div>
            <div className={styles.dates}>

            </div>
            <div className={styles.period_list}>
               С 09 до 21 - 200₽
               С 21 до 09 - 400₽
            </div>
         </div>
      )
   }
}

export default PeriodSelector