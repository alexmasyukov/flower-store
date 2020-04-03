import React from 'react'
import { Link, withRouter } from "react-router-dom"

const CollectionButton = ({ className, title, ...props }) => {
   console.log(props)

   return (
      <div className={className}>
         {/*<p onClick={() => props.history.push('/catalog', { collection: title })}>{title}</p>*/}
         <Link to={`/catalog/?collection=${title}`}>{title}</Link>
      </div>
   )
}

export default withRouter(CollectionButton)