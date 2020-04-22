const users = function(app) {
  app.use('/users', {
    async find({query}) {
      return [
        Math.random() > 0.5 ? {...query, id: 'user_id'} : null
      ]
    },
  
    async create(data, params) {
      return {...data, id: 'user_id'}
    }
  })
}

module.exports = function(app) {
  app.configure(users)
}