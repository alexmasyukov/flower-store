import React from "react"
import loadable from "@loadable/component"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import withRouterParams from "components/hoc/withRouterParams"
import withCity from "components/hoc/withCity"
// import { fetchBanner } from "api"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const Banner = loadable(() => import('components/Banner'), {
  fallback: fallback()
})

const mapMethodsToProps = (apiService, { city, id = 0 }) => {
  return {
    getImage: apiService.getImage,
    getBanner: apiService.getBanner(city.id, id)
  }
}

const BannerContainer = ({ banner, getImage, ...props }) => {
  const images = banner.images.map(img => getImage(img))



  return (
    <Banner {...banner} images={images} {...props}/>
  )
}

export default compose(
  withCity,
  withApiService(mapMethodsToProps),
  withData({
    getDataMethod: 'getBanner',
    dataPropName: 'banner',
    loadingText: 'banner'
  })
)(BannerContainer)