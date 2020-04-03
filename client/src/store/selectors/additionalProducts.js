import { createSelector } from "reselect"

// todo это не должно так использоваться в Cart
export const additionalProductsEntitiesSelector = state =>
  state.entities.additionalProducts

export const additionalProductsSelector = createSelector(
  additionalProductsEntitiesSelector,
  (entities) => entities.allIds.map(id => entities.byId[id])
)
