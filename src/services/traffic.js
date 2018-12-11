var HEAD = 0

module.exports = {
  getBestLocation: (buyers, query) => {
    var { timestamp, device: reqDevice, state: reqState } = query
    var reqDate = new Date(timestamp)
    var reqHour = reqDate.getUTCHours()
    var reqDay = reqDate.getUTCDay()

    /**
     * flatten buyers object to get all offers
     * filter them and get the ones matching the search criteria
     * sort them based on the most value offer
     */
    var bestOffers = _getAllOffers(buyers)
      .filter(
        ({ criteria: { device, state, hour, day } }) =>
          device.includes(reqDevice) &&
          state.includes(reqState) &&
          day.includes(reqDay) &&
          hour.includes(reqHour)
      )
      .sort(({ value: valueA }, { value: valueB }) => valueB - valueA)

    return bestOffers[HEAD].location
  }
}

/**
 * flatten buyers Object to get
 * all offers from all buyers
 *
 * @param {*} buyers
 * @returns [offers]
 */
var _getAllOffers = buyers => {
  var allOffers = []
  Object.values(buyers).forEach(buyer => {
    var { offers } = JSON.parse(buyer)
    allOffers.push(...offers)
  })
  return allOffers
}
