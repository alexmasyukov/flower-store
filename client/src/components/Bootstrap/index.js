import React from "react"
import cn from 'classnames'

export const Row = ({children, className}) => {
  return (
    <div className={cn('row', className && className)}>
      {children}
    </div>
  )
}