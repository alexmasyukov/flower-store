import { createSelector } from 'reselect'

const getFiltersEntities = (state) => state.entities.filters
const getResetHistory = (state) => state.ui.filtersResetHistory

export const getFilters = createSelector(
  [getFiltersEntities],
  (filterEntitis) => filterEntitis
)

export const getFiltersResetHistory = createSelector(
  [getResetHistory],
  (history) => history
)