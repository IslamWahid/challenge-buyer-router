var getAllOffers = buyers => {
  var allOffers = []
  buyers.forEach(({ offers }) => {
    allOffers.push(...offers)
  })
  return allOffers
}

var trafficService = {
  getBestLocation: (buyers, query) => {
    var { timestamp, device: reqDevice, state: reqState } = query
    var reqDate = new Date(timestamp)
    var reqHour = reqDate.getHours()
    var reqDay = reqDate.getDay()

    var bestOffers = getAllOffers(buyers)
      .filter(
        ({ criteria: { device, state, hour, day } }) =>
          reqDevice === device &&
          reqState === state &&
          reqDay === day &&
          hour.includes(reqHour)
      )
      .sort(({ value: valueA }, { value: valueB }) => valueA > valueB)

    return bestOffers[0]
  }
}

module.exports = trafficService
