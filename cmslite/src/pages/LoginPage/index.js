import React, { useState } from 'react'
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import { Redirect } from "react-router-dom"
import { CITIES } from "constants/common"

const mapMethodsToProps = (apiService) => ({
  login: apiService.login
})

const LoginPage = compose(
  withRouterParams,
  withApiService(mapMethodsToProps)
)(Page)

function Page({ login }) {
  const [isError, setIsError] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [city, setCity] = useState(CITIES.CHITA.ENG)

  const handleLoginClick = async () => {
    try {
      const a = await login('test66', '1234')
      console.log(a)
      if ('status' in a && a.status === 'done') {
        setIsError(false)
        setIsLogin(true)
      }
    } catch (e) {
      setIsError(true)
      setIsLogin(false)
    }
  }

  if (isLogin) {
    return (
      <Redirect to={`/${city}`}/>
    )
  }

  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">@</span>
        </div>
        <input type="text" className="form-control" placeholder="Username" aria-label="Username"
               aria-describedby="basic-addon1"/>
        {isError && <div>Ошибка</div>}

        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value={CITIES.CHITA.ENG}>{CITIES.CHITA.RUS}</option>
          <option value={CITIES.MOSCOW.ENG}>{CITIES.MOSCOW.RUS}</option>
        </select>

        <button onClick={handleLoginClick}>Войти</button>
      </div>
    </div>
  )
}

export default LoginPage