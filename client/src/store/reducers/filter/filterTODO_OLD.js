// else {
//     // ЛОГИКА
//     // 1. Нажали кнопку фильтра, она установилась
//     // 2. Ее хотят отключить и нажимают на нее второй раз
//     // 3. Если на этом фильтре (группе кнопок) (filterKey)
//     //   есть multiply=false, то сначала вся группа будет
//     //   сброшена экшеном resetFilter, а затем ЭТА ЖЕ кнопка
//     //   будет повторно установлена (добавлена в selected)
//     //   Чтобы этого избежать, проверяем какая кнопка была
//     //   сброшена последней, если эта она, ничего не делаем
//     //   (подтверждаем сброс)
//
//     if ('multiply' in filterSettings
//       && filterSettings.multiply === false
//       && filtersResetHistory.lastFilterKey === filterKey
//       && filtersResetHistory.lastValue === value) {
//         newSelected = [...selected]
//     } else {
//         // добавляем кнопку в выделенные
//         newSelected = [...selected, value]
//     }
// }

// const foundIndex = selected.findIndex()
// console.log(!state.byAvailability)


// if ('multiply' in settings
//   && settings.multiply === false

// if ( && Array.isArray(state.byAvailability) && state.byAvailability.length > 1) {
//     availability =
// }

// todo Универсализировать код
//       const byAvailability = [...state.byAvailability, value]
//         .filter(({ extra: { type } }) => {
//             console.log(type, value.extra.type)
//             return type !== value.extra.type
//         })
//
// console.log('byAvailability', byAvailability)
//
//       return byAvailability.length >= 1 ? {
//           ...state,
//           byAvailability
//       } : getObjectWithoutKeys(state, [filterKey])
// }
//
// return {
//     ...state,
//     byAvailability: [...selected, value]
// }







// const foundButton = selected.find(({ extra: { type } }) => type === value.extra.type)
//
// console.log('foundButton', foundButton)
// if (foundButton) {
//     return getObjectWithoutKeys(state, [filterKey])
// }
//
// return {
//     ...state,
//     byAvailability: [value]
// }

// Удаляем текущую выделенную кнопку
// const byAvailability = state.byAvailability
//   .filter(({ extra: { type } }) => {
//       console.log(type, value.extra.type)
//       return type !== value.extra.type
//   })


// console.log('byAvailability', byAvailability)
//
//   // Если выделенных кнопок не осталось (все не активны)
//   // удаляем и ключ фильтра, чтобы не запустить функцию фильтрации
//   // const newState = byAvailability.length > 1 ? {
//   //     ...state,
//   //     byAvailability
//   // } : getObjectWithoutKeys(state, [filterKey])
//
// const newState = {
//       ...state,
//     byAvailability: [...byAvailability, value]
// }
//   console.log(newState)
//
//   return newState