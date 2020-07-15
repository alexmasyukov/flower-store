export const deliveryDateSelector = (state) => {
   return state.ui.delivery.date
}

export const deliveryTodaySelector = (state) => {
   return state.ui.delivery.today
}

export const deliveryModalVisibleSelector = (state) =>
   state.ui.delivery.modalVisible

export const deliveryModalCartQuestionSelector = (state) =>
   state.ui.delivery.modalCartQuestion
