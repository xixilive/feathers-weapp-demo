Page({
  onLoad() {
    wx.showNavigationBarLoading()
    App.feathers.service('weather/common')
      .find({query:{source: 'xw', weather_type: 'forecast_24h', province: '上海', city: '上海'}})
      .then(
        ({data:{forecast_24h}}) => this.setData({items: forecast_24h}),
        (err) => console.log(err)
      )
      .then(() => wx.hideNavigationBarLoading())
  },

  data: {
    items: []
  }
})