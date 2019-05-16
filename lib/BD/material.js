/**
 * A interface for the material.
 */
"use strict";

var
  _ = require('lodash'),
  utils = require('../utils'),
  json_query = require('../../tpl/bd-material-query.json');

/**
 * 基础管理 -> 基础资料 -> 物料 -> 查询
 * @param {K3CloudApiClient} client
 * @param {Object} filter
 */
module.exports.query = function (client, filter) {
  var data = _.cloneDeep(json_query);

  if (filter)
    data.FilterString = utils.filter2Str(filter);

  return client.executeBillQuery(data);
}