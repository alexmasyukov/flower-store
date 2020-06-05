import { connect } from "react-redux"
import { getSelectedFilters } from "store/selectors/products"
import ButtonsGroupCollapse from "components/Filter/ButtonsGroupCollapse"
import { getFilters, getFiltersResetHistory } from "store/selectors/filters"
import { resetFilter, setPriceRange, updateSelect } from "store/actions/selectedFiltersActions"


function mapStateToProps(state) {
    // console.log('state', state)
    // console.log('getFilters', getFilters(state))
    // console.log('getFilters', getSelectedFilters(state))
    return {
        selectedFilters: getSelectedFilters(state),
        filters: getFilters(state),
        filtersResetHistory: getFiltersResetHistory(state)
    }
}

const mapDispatchToProps = {
    updateSelect,
    setPriceRange,
    resetFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonsGroupCollapse)