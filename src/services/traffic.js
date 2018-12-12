var criteriaModel = require('../models/criteria')

module.exports = {
  saveCriteria: (offers, cb) => {
    var criteriaSetsObj = _getCriteriaSets(offers)
    var commandsArr = _getRedisCmdParams(criteriaSetsObj)
    criteriaModel.save(commandsArr, cb)
  },

  getBestLocation: (query, cb) => {
    var interSets = _getInterSets(query)
    criteriaModel.intersect(interSets, cb)
  }
}

/**
 * extract the unique criteria sets
 * from the offers array
 *
 * @param {*} offers
 * @returns {*} criteriaSetsObj
 */
function _getCriteriaSets (offers) {
  var criteriaSets = {}
  offers.forEach(({ criteria, value: score, location }) => {
    for (var key in criteria) {
      criteria[key].forEach(criteriaVal => {
        if (Array.isArray(criteriaSets[`${key}:${criteriaVal}`])) {
          criteriaSets[`${key}:${criteriaVal}`].push(score, location)
        } else {
          criteriaSets[`${key}:${criteriaVal}`] = [score, location]
        }
      })
    }
  })
  return criteriaSets
}

/**
 * get the redis command params array
 * from criteriaSets Object
 *
 * @param {*} object
 * @returns [{string}] commands
 */
function _getRedisCmdParams (object) {
  var commandArr = []
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      commandArr.push([key, ...object[key]])
    }
  }
  return commandArr
}
/**
 * get Intersecting Sets from query object
 *
 * @param {*} query
 * @returns {string}
 */
function _getInterSets (query) {
  var { timestamp, device, state } = query
  var date = new Date(timestamp)
  var hour = date.getUTCHours()
  var day = date.getUTCDay()
  return [`device:${device}`, `hour:${hour}`, `day:${day}`, `state:${state}`]
}
