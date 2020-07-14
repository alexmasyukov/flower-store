
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

