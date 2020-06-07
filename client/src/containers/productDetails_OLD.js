
//
// if (
//   product &&
//   product.sizes &&
//   bySizesFilterSelected &&
//   bySizesFilterSelected.length
// ) {
//     const found = product.sizes.findIndex(({ title }) => bySizesFilterSelected.includes(title))
//     // console.error('found', found)
//     if (found > 0) {
//         // setActiveSizeIndex(found)
//         activeSizeIndex = found
//     }
// }

//     // Устанавливаем первый размер, который был выбран в фильтре
//     // (берется первое найденное вхождение, размеры товаров уже
//     // должны быть остортированы по возрастанию (по человеческому
//     // восприятию) (на сервере это сортировка по productSizes title))
//     // СРАБОТАЕТ ТОЛЬКО ПРИ ПЕРВОМ РЕНДЕРЕ КОМПОНЕНТА (activeSizeIndex === undefined)
//     if (
//       bySizesFilterSelected &&
//       bySizesFilterSelected.length
//     ) {
//         const found = product.sizes.findIndex(({ title }) => bySizesFilterSelected.includes(title))
//         // console.error('found', found)
//         if (found > 0) {
//             setActiveSizeIndex(found)
//             // activeSizeIndex = found
//         }
//     }
// }




// function handleAddToCart{
//     const { product } = this.props
//
//     // todo вынеси это отдельными функциями для получения и внутри карточке
//     //  избавляемся от дублирования кода
//     const { activeSizeIndex } = this.state
//
//     // todo add it to new
//     //   activeAdditionalProducts: [],
//
//     const image = product.sizes[activeSizeIndex].image
//     const sizePrice = product.sizes[activeSizeIndex].price
//     const sizeTitle = product.sizes[activeSizeIndex].title
//
//
//     // todo вынеси это отдельной функцией,
//     //  чтобы ключи объекты были стандартизированы и прозрачны
//     const newProduct = {
//         id: product.id,
//         title: product.title,
//         image: image,
//         options: {
//             // grass: {
//             //    title: grassItem.title,
//             //    price: grassItem.price
//             // },
//             // box: {
//             //    title: boxItem.title,
//             //    price: boxItem.price
//             // }
//         },
//         size: sizeTitle,
//         price: sizePrice // + grassItem.price + boxItem.price
//     }
//     this.props.addToCart(newProduct)
// }


// static propTypes = {
//   products: propTypes.array.isRequired
// }

// static defaultProps = {
//     product: {}
// }



// const fallback = () => (
//    <div>Loading...</div>
// )

// const AdditionalProducts = loadable(() =>
//   import('containers/additionalProductsContainer'),
//    fallback: fallback()
// })


// handleAdditionalProductClick = ({ id, price }) => {
//    if (this.getAdditionalProductsIds().includes(id)) {
//       this.setState(prevState => ({
//          activeAdditionalProducts:
//             prevState.activeAdditionalProducts.filter(item => item.id !== id)
//       }))
//    } else {
//       const newItem = {
//          id,
//          price
//       }
//       this.setState(prevState => ({
//          activeAdditionalProducts:
//             [...prevState.activeAdditionalProducts, newItem]
//       }))
//    }
// }


// handleGrassButtonClick = (activeGrassIndex) => {
//    this.setState({
//       activeGrassIndex
//    })
// }

// handleBoxButtonClick = (activeBoxIndex) => {
//    this.setState({
//       activeBoxIndex
//    })
// }

// getTotalPriceAdditionalProducts = () => {
//    return this.state.activeAdditionalProducts.reduce(
//       (total, current) => {
//          if (Object.prototype.hasOwnProperty.call(current, 'price')) {
//             return total + current.price
//          } else {
//             return total
//          }
//       }, 0)
// }

// getAdditionalProductsIds = () => {
//    return this.state.activeAdditionalProducts.map(({ id }) => id)
// }

// renderGrassPluserButtons = (grasses, activeIndex, onClick) => (
//    <div className={styles.grassPluserButtons}>
//       {grasses.map((button, i) =>
//          <GrassPluserButton
//             key={i}
//             index={i}
//             title={button.title}
//             price={button.price}
//             active={activeIndex === i}
//             onClick={onClick}
//          />
//       )}
//    </div>
// )











// import React, { Component } from 'react'
// import { connect } from "react-redux"
// import { Redirect } from 'react-router-dom'
// import loadable from '@loadable/component'
//
// import SizeInformer from "components/Product/SizeInformer"
// import GrassPluserButton from "components/Product/GrassPluserButton"
// import SizeButton from "components/Product/SizeButton"
// import Details from 'components/Product/Details'
//
// import styles from './Product.module.sass'
// import PageLayout from "layouts/Page";
// import FloristSay from "components/Product/FloristSay";
//
// const fallback = () => (
//   <div>Loading...</div>
// )
//
// const DatePicker = loadable(() => import('components/Product/DatePicker'), fallback)
// const FlowersInstruction = loadable(() => import('components/Product/FlowersInstruction'), fallback)
// const DeliveryInfo = loadable(() => import('components/Product/DeliveryInfo'), fallback)
// const AdditionalProducts = loadable(() => import('components/Product/AdditionalProducts'), fallback)
//
//
// class Product extends Component {
//   constructor(props) {
//     super(props)
//     this.handleSizeButtonClick = this.handleSizeButtonClick.bind(this)
//     this.handleGrassPluserButtonClick = this.handleGrassPluserButtonClick.bind(this)
//   }
//
//   state = {
//     activeSizeIndex: 0,
//     activeGrassIndex: 0
//   }
//
//   handleSizeButtonClick = (itemIndex) => {
//     console.log(itemIndex)
//     this.setState({
//       activeSizeIndex: itemIndex
//     })
//   }
//
//   handleGrassPluserButtonClick = (itemIndex) => {
//     console.log(itemIndex)
//     this.setState({
//       activeGrassIndex: itemIndex
//     })
//   }
//
//   renderGrassPluserButtons = (grasses) => (
//     <div className={styles.grassPluserButtons}>
//       {
//         grasses.map((button, i) =>
//           <GrassPluserButton
//             key={i}
//             index={i}
//             title={button.name}
//             price={button.price}
//             active={this.state.activeGrassIndex === i}
//             onClick={this.handleGrassPluserButtonClick}
//           />
//         )
//       }
//     </div>
//   )
//
//
//   renderSizesButtons = (sizes) => {
//     return (
//       <div className={styles.sizesButtons}>
//         {
//           sizes.map((size, i) =>
//             <SizeButton
//               key={i}
//               sizeIndex={i}
//               title={size.title}
//               price={size.price}
//               active={this.state.activeSizeIndex === i}
//               onClick={this.handleSizeButtonClick}
//             />
//           )
//         }
//       </div>
//     )
//   }
//
//   renderFlowers = (flowers) => (
//     <ul className={styles.properties}>
//       {
//         flowers.map((flowerEntity, i) => {
//             const [name, count] = flowerEntity
//             return (
//               <li key={i}>
//                 {name}: {count}
//               </li>
//             )
//           }
//         )
//       }
//     </ul>
//   )
//
//   getAdditionalProducts(additionalProductsIds, allAdditionalProducts) {
//     return allAdditionalProducts.filter(item => additionalProductsIds.includes(item.id))
//   }
//
//   render() {
//     const { products, allAdditionalProducts, grass } = this.props
//
//     const product = products.find(item => item.slug === this.props.slug)
//     if (!product) {
//       return <Redirect to="/404"/>
//     }
//
//     const { florist, sizes, additionalProducts: additionalProductsIds } = product
//     // console.log(additionalProductsIds, allAdditionalProducts)
//
//     // console.log(this.getAdditionalProducts(additionalProductsIds, allAdditionalProducts))
//     const additionalProducts =
//       this.getAdditionalProducts(additionalProductsIds, allAdditionalProducts)
//
//     const activeSize = sizes[this.state.activeSizeIndex]
//     const activeGrass = grass[this.state.activeGrassIndex]
//     const totalPrice = activeSize.price + activeGrass.price
//
//     return (
//       <PageLayout>
//         <div className="container mt-3">
//           <div className="row">
//             <div className={`col-5 ${styles.photo}`}>
//               <div className={styles.photoSizeTitle}>
//                 «{activeSize.title}»
//               </div>
//               <img src={activeSize.image} alt=""/>
//
//               <FloristSay
//                 photo={florist.photo}
//                 name={florist.name}
//                 text={florist.text}
//               />
//             </div>
//             <div className={`col-7 ${styles.usn}`}>
//               <h1>{product.title}</h1>
//
//
//               {this.renderSizesButtons(product.sizes)}
//
//               <SizeInformer
//                 className={styles.sizeInformer}
//                 circle={activeSize.circle}
//               />
//
//               <div>
//                 Добавить зелени?
//                 {this.renderGrassPluserButtons(grass)}
//               </div>
//
//               <AdditionalProducts
//                 products={additionalProducts}
//               />
//
//               <br/>
//               <h1>{totalPrice} {`\u20BD`}</h1>
//
//
//               <p>Выберете дату доставки</p>
//               <DatePicker
//                 startDate={new Date()}
//               />
//
//               <p>Купить в один клик</p>
//
//
//
//
//
//               <Details>
//                 {
//                   activeSize.flowers && (
//                     <>
//                       Состав
//                       {this.renderFlowers(activeSize.flowers)}
//                     </>
//                   )
//                 }
//               </Details>
//               <FlowersInstruction/>
//               <DeliveryInfo/>
//
//
//               <div>
//                 <p>Поделится</p>
//               </div>
//
//
//               <div>
//                 Остались вопросы? Звоните!
//                 8 (914) 358-56-55
//                 WhatsApp / Viber / Telegram
//
//               </div>
//
//               {/*{new Array(200).fill('https://randomuser.me/api/portraits/women/').map((item, i) =>*/}
//                 {/*<img src={item + i + '.jpg'} alt=""/>*/}
//               {/*)}*/}
//
//             </div>
//           </div>
//         </div>
//       </PageLayout>
//     )
//   }
// }
//
// function mapStateToProps(state, ownProps) {
//   return {
//     products: state.catalog.products,
//     allAdditionalProducts: state.catalog.allAdditionalProducts,
//     grass: state.catalog.grass,
//     slug: ownProps.match.params.product
//   }
// }
//
// export default connect(
//   mapStateToProps
// )(Product)