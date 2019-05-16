/**
 * A interface for the price list.
 */
"use strict";

var
  _ = require('lodash'),
  utils = require('../utils'),
  json_query = require('../../tpl/sal-pricelist-query.json');

/**
 * 供应链 -> 销售管理 -> 销售价目表 -> 查询
 * @param {K3CloudApiClient} client
 * @param {Object} filter
 */
module.exports.query = function (client, filter) {
  var data = _.cloneDeep(json_query);

  if (filter)
    data.FilterString = utils.filter2Str(filter);

  return client.executeBillQuery(data);
}