/**
 * A interface for the inventory.
 */
"use strict";

var
  _ = require('lodash'),
  utils = require('../utils'),
  json_query = require('../../tpl/stk-inventory-query.json');

/**
 * 供应链 -> 库存管理 -> 即时库存 -> 查询
 * @param {K3CloudApiClient} client
 * @param {Object} filter
 */
module.exports.query = function (client, filter) {
  var data = _.cloneDeep(json_query);
  if (filter)
    data.FilterString = utils.filter2Str(filter);

  return client.executeBillQuery(data);
}