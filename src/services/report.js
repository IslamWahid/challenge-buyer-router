var eventModel = require('../models/event')
module.exports = {
  generateReport: (query, cb) => {
    eventModel.aggregate(_getAggregation(query), cb)
  }
}

function _getAggregation ({
  zoneId,
  adId,
  type,
  device,
  minDate,
  maxDate,
  groupBy = 'type',
  sortBy = 'date',
  sortType = -1
}) {
  return [
    {
      $match: {
        ...(zoneId ? { zoneId } : {}),
        ...(type ? { type } : {}),
        ...(adId ? { adId } : {}),
        ...(device ? { device } : {}),
        ...(minDate || maxDate
          ? {
            date: {
              ...(minDate ? { $gte: minDate } : {}),
              ...(maxDate ? { $lte: maxDate } : {})
            }
          }
          : {})
      }
    },
    { $sort: _getSortOjb(sortBy, sortType) },
    {
      $group: {
        _id: `$${groupBy}`,
        events: { $push: '$$ROOT' },
        count: { $sum: 1 }
      }
    }
  ]
}

function _getSortOjb (sortBy, sortType) {
  var sortObj = {}
  sortObj[sortBy] = parseInt(sortType)
  return sortObj
}
