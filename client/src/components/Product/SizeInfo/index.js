import React from 'react'
import PropTypes from 'prop-types'

const SizeInfo = ({circle, className}) => {
  return (
    <span className={className}>
      {circle} см
    </span>
  )
}

SizeInfo.propTypes = {
  circle: PropTypes.number.isRequired,
}

export default SizeInfo