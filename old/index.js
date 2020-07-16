// handleInputChange = (statePath) => (e) => {
//   const target = e.target
//   const value = target.type === 'checkbox' ? target.checked : target.value

//   this.setState(prevState => {
//     const path = statePath.split('.')

//     const newState = path.reduce((state, item, i, arr) => {
//       if (typeof item !== 'object' && i === arr.length - 1) {
//         state[item] = value
//         return state
//       }
//       return state[item]
//     }, prevState)

//     return {
//       ...newState
//     }
//   })
// }



// handleSetStateKeyValue = (stepName, keyValue) => {
//   this.setState(prev => ({
//     [stepName]: {
//       ...prev[stepName],
//       ...keyValue
//     }
//   }))
// }


// const { resolve } = require("path");

// const run = (cb) => new Promise(resolve => cb(resolve))


// const a = (x, y) => cb => {
//     const res = x + y
//     cb(res)
// }

// run(a(5, 5))
//     .then((res) => run(a(res, 5)))
//     .then((res) => run(a(res, 5)))
//     .then((res) => run(a(res, 5)))
//     .then((res) => run(a(res, 5)))
//     .then((res) => run(a(res, 5)))
//     .then((res) => console.log(res))


// cb((res) => console.log(res))




// run(a(5, 5))
//     .then(() => {
//         console.log('Resolved after 2 seconds')
//         return run(1500);
//     })
    // .then(() => {
    //     console.log('Resolved after 1.5 seconds');
    //     return run(1500);
    // }).then(() => {
    //     console.log('Resolved after 3 seconds');
    //     return run(1000);
    // }).catch(() => {
    //     console.log('Caught an error.');
    // }).then(() => {
    //     console.log('Done.');
    // });


// function range(start = 0, end = 1) {
//   return Array.from({ length: end - start + 1 }, (v, k) => k + start)
// }

// const TimesGroup = ({ start = 9, end = 15, reverse = false, children }) => {
//   let from = start,
//       to = end
//
//   if (reverse) {
//     from = end
//     to = start
//   }
//   // console.log(range(from, to))
//
//   return range(from, to)
//     .reduce((acc, current, idx, arr) => {
//       const next = arr[idx + 1]
//       if (!next) return acc
//       return [...acc, [current, next]]
//     }, [])
//     .reverse()
//     .map(([first, second]) => children(first, second))
// }



// import React from "react"


// const fixSizes = {}
// const fixSizes = sizes.map(size => {
//     size.flowers = [16, 18, 17]//product.flowers,
//     size.flowers_counts = [2, 8, 5]//product.flowers,
//     size.fast = Math.random() >= 0.5
//     return size
// })
//
// product.bouquetType = Math.random() >= 0.5 ? 28 : 29


// const t = () => {
//   return (
    {/*<>*/}
      {/*<label>*/}
      {/*<Input*/}
      {/*type="checkbox"*/}
      {/*checked={orderEnhancers.photoWithRecipient}*/}
      {/*onChange={this.handleInputChange('orderEnhancers.photoWithRecipient')}/>*/}
      {/*Сделать фото с получателем*/}
      {/*</label>*/}

      {/*<label>*/}
      {/*<Input*/}
      {/*type="checkbox"*/}
      {/*checked={orderEnhancers.isSurprice}*/}
      {/*onChange={this.handleInputChange('orderEnhancers.isSurprice')}/>*/}
      {/*Сюрприз, не звонить перед вручением*/}
      {/*</label>*/}

      {/*<label>*/}
      {/*<Input*/}
      {/*type="checkbox"*/}
      {/*checked={orderEnhancers.anonymousCustomer}*/}
      {/*onChange={this.handleInputChange('orderEnhancers.anonymousCustomer')}/>*/}
      {/*Анонимный заказ*/}
      {/*<InfoPopover title="Анонимный заказ" text="Мы не передадим получателю никаких данных о вас."/>*/}
      {/*</label>*/}
    // </>
  // )
// }

