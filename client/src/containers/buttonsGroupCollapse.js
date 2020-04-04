import { connect } from "react-redux"
import { getSelectedFilters } from "store/selectors/products"
import ButtonsGroupCollapse from "components/Filter/ButtonsGroupCollapse"
import { getFilters } from "store/selectors/filters"
import { resetFilter, setPriceRange, updateSelect } from "store/actions/selectedFiltersActions"


function mapStateToProps(state) {
   return {
      selectedFilters: getSelectedFilters(state),
      filters: getFilters(state)
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