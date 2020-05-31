// import { createSelector } from "reselect"

export const activeProductSelector = (state) =>
  state.ui.activeProduct

// todo OLD DELETE IT
// const grassEntitiesSelector = (state) =>
//   state.entities.grass
//
// export const grassSelector = createSelector(
//   grassEntitiesSelector,
//   (entities) => entities.allIds.map(id => entities.byId[id])
// )
// TODO OLD