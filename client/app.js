const {setup, http, Logger} = require('@feathers-weapp/client')
setup('https://wis.qq.com/', {
  onLaunch(){
    http.logger = new Logger(console)
  }
})