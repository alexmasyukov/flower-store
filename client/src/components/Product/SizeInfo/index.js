import React from 'react'
// import PropTypes from 'prop-types'

const SizeInfo = ({diameter, className}) => {
  return (
    <span className={className}>
      {diameter} см
    </span>
  )
}
//
// SizeInfo.propTypes = {
//   diameter: PropTypes.number.isRequired,
// }

export default SizeInfo