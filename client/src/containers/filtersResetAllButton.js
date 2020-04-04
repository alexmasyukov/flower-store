import * as actions from "store/actions/selectedFiltersActions"
import { connect } from "react-redux"
import ResetAllButton from "components/Filter/ResetAllButton"
import { getCountSelectedFilters } from "store/selectors/products"

const mapStateToProps = state => ({
  isShow: !!getCountSelectedFilters(state)
})

const mapDispatchToProps = dispatch => ({
  resetAllFilters: () => dispatch(actions.resetAllFilters())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetAllButton)