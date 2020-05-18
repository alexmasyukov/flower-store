import React  from 'react'
import { getDisplayName } from "utils"
import { useParams, useHistory } from "react-router-dom"


const withRouterParams = WrappedComponent => {
    const Hoc = (props) => {
        // todo fix it id не используется в большинстве случаев,
        //  и в итоге затирает переданные
        let { id } = useParams()
        let history = useHistory()

        return <WrappedComponent {...props} id={id} history={history}/>
    }

    Hoc.displayName = `withRouterParams(${getDisplayName(WrappedComponent)})`
    return Hoc
}


export default withRouterParams