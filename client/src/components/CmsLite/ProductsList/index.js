import React, { Component } from 'react'
import withApiService from "components/hoc/withApiService"

class CMS_ProductsList extends Component {
    state = {
        products: []
    }

    renderProducts = () => {
        const products = this.state.products.map(p => {
            return (
                <li>
                    dfdf
                    {p.name}
                </li>
            )
        })

        return <ul>{products}</ul>
    }

    render() {
        return (
            <div>
                {this.renderProducts()}
            </div>
        )
    }
}

const mapMethodsToProps = (apiService) => {
    console.log(apiService)
    return {
        getData: apiService.getAllProducts(),
        // todo now
        // getImageUrl: swapiService.getStarshipImage
    }
}

export default withApiService(mapMethodsToProps)(CMS_ProductsList)