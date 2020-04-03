const getRouter = state => state.router
const getRouterUrl = state => getRouter(state)

export const slugFromUrlSelector = state => {
  const { location } = getRouter(state)
  const { pathname } = location
  const idRegExp = /\/([a-z0-9]*)[\/]*$/
  return pathname.match(idRegExp)[1]
}


// todo здесь явно делаю плохо, смотри в reselect
//  Восстанови уже нормальный сон и рабочее время
