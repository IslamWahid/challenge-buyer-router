var criteriaModel = require('../models/criteria')

module.exports = {
  saveCriteria: (offers, cb) => {
    var criteriaSetsObj = _getCriteriaSets(offers)
    var commandsArr = _getRedisCommands(criteriaSetsObj)
    criteriaModel.save(commandsArr, cb)
  },

  getBestLocation: (query, cb) => {
    var interSets = _getInterSets(query)
    criteriaModel.intersect(interSets, cb)
  }
}

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

function _getRedisCommands (object) {
  var commandArr = []
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      commandArr.push([key, ...object[key]])
    }
  }
  return commandArr
}

function _getInterSets (query) {
  var { timestamp, device, state } = query
  var date = new Date(timestamp)
  var hour = date.getUTCHours()
  var day = date.getUTCDay()
  return [`device:${device}`, `hour:${hour}`, `day:${day}`, `state:${state}`]
}
