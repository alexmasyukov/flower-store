import React, { Component } from 'react'
import Spinner from "components/UI/Spinner"
import { getDisplayName } from "utils"
import ErrorIndicator from "components/UI/ErrorIndicator"


const withData = WrappedComponent => {
    class withData extends Component {
        state = {
            data: null,
            loading: true,
            error: false
        }

        componentDidMount() {
            this.update()
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props.getData !== prevProps.getData) this.update()
        }

        handleDataUpdate = () => {
            this.update()
        }

        update = () => {
            this.setState({
                loading: true,
                error: false
            })

            this.props.getData()
              .then(data => {
                  this.setState({
                      loading: false,
                      data
                  })
              })
              .catch(() => {
                  this.setState({
                      loading: false,
                      error: true
                  })
              })
        }

        render() {
            const { data, loading, error } = this.state
            const { handleDataUpdate } = this

            if (loading) return <Spinner/>
            if (error) return <ErrorIndicator/>

            return <WrappedComponent {...this.props} updateData={handleDataUpdate} data={data}/>
        }
    }

    withData.displayName = `WithData(${getDisplayName(WrappedComponent)})`
    return withData
}


export default withData