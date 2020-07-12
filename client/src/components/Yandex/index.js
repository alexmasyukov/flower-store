// import React from 'react'
// import { Map, withYMaps, YMaps } from 'react-yandex-maps'
//
// const Yandex = () => {
//   const LengthPrinter = React.useMemo(() => {
//     return ({ ymaps, route }) => {
//       let routeLength = null
//
//       // React.useEffect(() => {
//         let canceled = false
//
//         if (ymaps && ymaps.route) {
//           ymaps.route(route).then(route => {
//             if (!canceled) {
//               routeLength = route.getHumanLength().replace('&#160;', ' ')
//             }
//           })
//         }
//
//         return () => (canceled = true)
//       }, [ymaps, ...route])
//
//       return routeLength ? (
//         <p>
//           The route from <strong>{route[0]}</strong> to{' '}
//           <strong>{route[1]}</strong> is <strong>{routeLength}</strong> long
//         </p>
//       ) : (
//         <p>Loading route...</p>
//       )
//     }
//   }, [])
//   const ConnectedLengthPrinter = React.useMemo(() => {
//     return withYMaps(LengthPrinter, true, ['route'])
//   }, [LengthPrinter])
//
//   return (
//     <YMaps query={{ lang: 'en_RU' }}>
//       <ConnectedLengthPrinter route={['Moscow, Russia', 'Berlin, Germany']}/>
//     </YMaps>
//   )
// }
//
// // const Yandex = () => (
// //   <YMaps>
// //     <div>My awesome application with maps!</div>
// //
// //     <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
// //   </YMaps>
// // )
//
// export default Yandex