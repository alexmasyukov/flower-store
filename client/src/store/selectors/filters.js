import { createSelector } from 'reselect'

const getFiltersEntities = (state) => state.entities.filters

export const getFilters = createSelector(
  [getFiltersEntities],
  (filterEntitis) => filterEntitis
)