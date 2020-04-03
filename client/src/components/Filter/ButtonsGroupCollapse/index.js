import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Button from "components/Filter/Button"
import { FILTER_COMPONENTS_TYPES } from "constants/filterComponentsTypes"
import styles from './ButtonsGroupCollapse.module.sass'
import ColorButton from "components/Filter/ColorButton"
import InputPriceRange from "components/Filter/InputPriceRange"


class ButtonsGroupCollapse extends Component {
  static defaultProps = {
    filterType: '[filterType]',
    title: '[title]',
    children: [],
    filterKey: '[filterKey]',
    isOpened: true,
    filters: {},
    selectedFilters: {},
    updateSelect: f => f,
    resetFilter: f => f
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.array,
    filterKey: PropTypes.string.isRequired,
    openedDefault: PropTypes.bool,
    filters: PropTypes.object.isRequired,
    selectedFilters: PropTypes.object.isRequired,
    updateSelect: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired
  }

  state = {
    isOpened: this.props.isOpened
  }

  renderFilterButtonGroupByType = (filterItems, filterSelectedItems) => {
    const {
      filters,
      selectedFilters,
      setPriceRange,
      filterKey,
      filterType,
      updateSelect
    } = this.props

    switch (filterType) {
      case FILTER_COMPONENTS_TYPES.RANGE: {
        const { bySizesPrice: [minInitial, maxInitial] } = filters
        const { bySizesPrice: [minCurrent, maxCurrent] = [minInitial, maxInitial] } = selectedFilters

        return (
          <InputPriceRange
            initial={{ min: minInitial, max: maxInitial }}
            current={{ min: minCurrent, max: maxCurrent }}
            onChangeComplete={({ min, max }) => setPriceRange(min, max)}
          />
        )
      }

      case FILTER_COMPONENTS_TYPES.ITEMS:
        return filterItems.map((title, i) => (
          <Button
            key={i}
            title={title}
            onClick={() => updateSelect(filterKey, title)}
            active={filterSelectedItems.includes(title)}
          />
        ))

      case FILTER_COMPONENTS_TYPES.COLORS_BUTTONS:
        return filterItems.map((button, i) =>
          <ColorButton
            key={i}
            color={button.color}
            active={filterSelectedItems.includes(button.title)}
            title={button.title}
            onClick={() => updateSelect(filterKey, button.title)}
          />
        )

      default:
        return
    }
  }

  render() {
    const {
      filterKey,
      title,
      filters,
      selectedFilters,
      resetFilter
    } = this.props

    const { isOpened } = this.state
    const { [filterKey]: filterItems = [] } = filters
    const { [filterKey]: filterSelectedItems = [] } = selectedFilters
    // const isSet = !!filterSelectedItems.length

    return (
      <div className={cn(styles[filterKey])}>
        <p>
        <span
          onClick={() => this.setState(prevState =>
            ({ isOpened: !prevState.isOpened })
          )}
          className={styles.group}
        >
          {title}
          {!isOpened && <span> &bull;</span>}
        </span>

          {/*{isSet && (*/}
            {/*<span*/}
              {/*onClick={() => resetFilter(filterKey)}*/}
              {/*className={styles.reset}*/}
            {/*>Сбросить</span>*/}
          {/*)}*/}
        </p>

        {isOpened && (
          <ul>
            {this.renderFilterButtonGroupByType(filterItems, filterSelectedItems)}
          </ul>
        )}
      </div>
    )
  }
}

export default ButtonsGroupCollapse