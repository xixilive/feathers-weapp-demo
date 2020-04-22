const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication')
const WeappStrategy = require('@feathers-weapp/auth')
const {decipherer} = WeappStrategy

module.exports = app => {
  const authentication = new AuthenticationService(app)
  authentication.register('jwt', new JWTStrategy())

  const resolver = function(strategy) {
    const {configuration:{appId, appSecret}, app} = strategy
    const decrypt = decipherer(appId, appSecret)

    return {
      async decryptData(rawData, params) {
        return await decrypt(rawData)
      },
  
      async findEntity(authData, params) {
        const {openId, userInfo} = authData
        const [user] = await app.service('users').find({query: {openId, $limit: 1}, paginate: false})
        return user ? {...user, openId, userInfo} : null
      },
  
      async createEntity(authData, params) {
        const {openId, userInfo} = authData
        return await app.service('users').create({openId, userInfo})
      }
    }
  }

  authentication.register('weapp', new WeappStrategy(resolver))
  app.use('/authentication', authentication)
};
