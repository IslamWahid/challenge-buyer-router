var getAllOffers = buyers => {
  var allOffers = []
  Object.values(buyers).forEach(buyer => {
    var { offers } = JSON.parse(buyer)
    allOffers.push(...offers)
  })
  return allOffers
}

var trafficService = {
  getBestLocation: (buyers, query) => {
    var { timestamp, device: reqDevice, state: reqState } = query
    var reqDate = new Date(timestamp)
    var reqHour = reqDate.getUTCHours()
    var reqDay = reqDate.getUTCDay()

    var bestOffers = getAllOffers(buyers)
      .filter(
        ({ criteria: { device, state, hour, day } }) =>
          device.includes(reqDevice) &&
          state.includes(reqState) &&
          day.includes(reqDay) &&
          hour.includes(reqHour)
      )
      .sort(({ value: valueA }, { value: valueB }) => valueB - valueA)

    return bestOffers[0].location
  }
}

module.exports = trafficService
