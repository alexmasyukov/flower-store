import React, { useEffect, useState } from 'react'
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import { Redirect } from "react-router-dom"

const mapMethodsToProps = (apiService) => ({
  logout: apiService.logout
})

const LogoutPage = compose(
  withRouterParams,
  withApiService(mapMethodsToProps)
)(Page)

function Page({ logout }) {
  useEffect(() => {
    logout()
  }, [])

  return (
    <Redirect to={'/login'}/>
  )
}

export default LogoutPage