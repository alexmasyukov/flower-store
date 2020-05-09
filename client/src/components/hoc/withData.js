import React, { Component } from 'react'
import Spinner from "components/UI/Spinner"
import { getDisplayName } from "utils"
import ErrorIndicator from "components/UI/ErrorIndicator"


const withData = ({
                      getDataMethod = 'getData',
                      dataPropName = 'data',
                      loadingText = 'Loading...'
                  }) => WrappedComponent => {
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
            if (this.props[getDataMethod] !== prevProps[getDataMethod]) this.update()
        }

        handleDataUpdate = () => {
            this.update()
        }

        update = () => {
            this.setState({
                loading: true,
                error: false
            })
            // console.log(this.props)
            this.props[getDataMethod]()
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
            const dynamicProps = {
                [dataPropName]: data
            }

            if (loading) return <Spinner text={loadingText}/>
            if (error) return <ErrorIndicator/>

            return <WrappedComponent {...this.props} handleUpdateData={handleDataUpdate} {...dynamicProps}/>
        }
    }

    withData.displayName = `WithData(${getDisplayName(WrappedComponent)})`
    return withData
}


export default withData