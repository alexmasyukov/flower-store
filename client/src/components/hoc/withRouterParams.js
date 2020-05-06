import React  from 'react'
import { getDisplayName } from "utils"
import { useParams } from "react-router-dom"


const withRouterParams = WrappedComponent => {
    const Hoc = (props) => {
        let { id } = useParams()

        return <WrappedComponent {...props} id={id}/>
    }

    Hoc.displayName = `withRouterParams(${getDisplayName(WrappedComponent)})`
    return Hoc
}


export default withRouterParams