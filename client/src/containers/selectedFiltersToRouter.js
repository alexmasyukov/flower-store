import React from "react"
import { connect } from "react-redux"
import { getSelectedFilters } from "store/selectors/products"
import { useLocation } from "react-router-dom"
import { setManyFilters } from "store/actions/selectedFiltersActions"
// import { resetFilter, setPriceRange, updateSelect } from "store/actions/selectedFiltersActions"
// import { history } from 'store/configureStore'
// import { useLocation } from "react-router-dom"

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const SelectedFiltersToRouter = ({ selectedFilters, setManyFilters }) => {
    let query = useQuery()

    // window.history.pushState('1', 'Title', `?${filterKey}=${value}&param2=2`)
    // let location = useLocation()
    // history.push(`${location.pathname}?filter=dfsf`)
    // console.log('selectedFilters 2', selectedFilters)

    const filters = Object.entries(selectedFilters)
      .map(([filterKey, items]) => {
          switch (filterKey) {
              case 'byAvailability':
                  return items
                    .map(({ extra }) => `byAvailability=${extra.type}`)
                    .join('&')
              default:
                  return items
                    .map(value => `${filterKey}=${value}`)
                    .join('&')
          }
      })
      .join('&')

    if (Object.keys(selectedFilters).length > 0) {
        window.history.pushState('1', 'Title', `?${filters}`)
    } else {
        window.history.pushState('1', 'Title', '?')
    }


    if (Object.keys(selectedFilters).length === 0) {
        // const filterSelectedItemsFromRouter = query.getAll()
        const routerFilterKeys = Array.from(new Set(Array.from(query.keys())))
        if (routerFilterKeys.length === 0) return null
        const newFitlterState = routerFilterKeys.reduce((result, current) => {
            return {
                ...result,
                [current]: query.getAll(current)
            }
        }, {})
        console.log('newFitlterState', newFitlterState)
        // console.log(setManyFilters)
        setManyFilters(newFitlterState)
        // const t =
        // for (const key of ) {
        //     console.log('key', key)
        // }
    }
    console.log('selectedFilters', selectedFilters)
    //
    // // console.log('selectedFilters', selectedFilters)
    // console.log('filterSelectedItemsFromRouter', filterSelectedItemsFromRouter)
    // console.log('filterSelectedItems', filterSelectedItems)
    // const test = {
    //     [filterKey]: filterSelectedItemsFromRouter
    // }


    return null
}

const mapStateToProps = (state) => ({
    selectedFilters: getSelectedFilters(state)
})

const mapDispatchToProps = ({
    setManyFilters
})

const SelectedFiltersToRouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedFiltersToRouter)

export default SelectedFiltersToRouterContainer