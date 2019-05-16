/**
 * A interface for the OutStock.
 */
"use strict";

var
  _ = require('lodash'),
  utils = require('../utils'),
  json_save = require('../../tpl/sal-outstock-save.json');

var OutStockBill = function () {
  this.data = _.cloneDeep(json_save);
  this.entitySchema = this.data.Model.FEntity[0];
  this.data.Model.FEntity = [];
  this.data.Model.FDate = utils.date2Str(new Date(), 'yyyy-MM-dd hh:mm:ss');
}

OutStockBill.prototype.assign = function (bill) {
  utils.assign(this.data.Model, bill);

  this.data.Model.FEntity = [];
  if (bill.FEntities) {
    if (!_.isArray(bill.FEntities))
      bill.FEntities = [bill.FEntities];

    for (var i = 0; i < bill.FEntities.length; i++) {
      var entity = _.cloneDeep(this.entitySchema);
      utils.assign(entity, bill.FEntities[i]);
      this.data.Model.FEntity.push(entity)
    }
  }
}

/**
 * 供应链 -> 销售管理 -> 销售出库单 -> 审核
 * @param {K3CloudApiClient} client
 * @param {String | Array} numbers
 * @param {String} createOrgId
 */
module.exports.audit = function (client, numbers, createOrgId) {
  var data = {
    CreateOrgId: '0',
    Numbers: []
  };

  if (numbers) {
    data.Numbers = _.isArray(numbers) ? numbers : [numbers];
  }

  if (createOrgId) {
    data.CreateOrgId = createOrgId;
  }

  return client.audit('SAL_OUTSTOCK', data);
}

/**
 * 供应链 -> 销售管理 -> 销售出库单 -> 保存
 * @param {K3CloudApiClient} client
 * @param {Object} bill
 */
module.exports.save = function (client, bill) {
  var data = new OutStockBill();
  data.assign(bill);

  return client.save('SAL_OUTSTOCK', data.data);
}

/**
 * 供应链 -> 销售管理 -> 销售出库单 -> 提交
 * @param {K3CloudApiClient} client
 * @param {String | Array} numbers
 * @param {String} createOrgId
 */
module.exports.submit = function (client, numbers, createOrgId) {
  var data = {
    CreateOrgId: '0',
    Numbers: []
  };

  if (numbers) {
    data.Numbers = _.isArray(numbers) ? numbers : [numbers];
  }

  if (createOrgId) {
    data.CreateOrgId = createOrgId;
  }

  return client.submit('SAL_OUTSTOCK', data);
}

/**
 * 供应链 -> 销售管理 -> 销售出库单 -> 保存 -> 提交 -> 审核
 * @param {K3CloudApiClient} client
 * @param {Object} bill
 */
module.exports.saveAndAudit = function (client, bill) {
  return new Promise((resolve, reject) => {
    this.save(client, bill)
      .then((data) => {
        if (data.Result.ResponseStatus.IsSuccess) {
          var number = data.Result.Number;

          this.submit(client, data.Result.Number)
            .then((data) => {
              if (data.Result.ResponseStatus.IsSuccess) {
                this.audit(client, number)
                  .then((data) => {
                    if (data.Result.ResponseStatus.IsSuccess) {
                      resolve(data);
                    } else {
                      reject({
                        act: 'audited',
                        params: { number: number },
                        err: data.Result
                      });
                    }
                  })
                  .catch((err) => {
                    reject({
                      act: 'auditing',
                      params: { number: number },
                      err: err
                    });
                });
              } else {
                reject({
                  act: 'submited',
                  params: { number: number },
                  err: data.Result
                });
              }
            })
            .catch((err) => {
              reject({
                act: 'submiting',
                params: { number: number },
                err: err
              });
            });
        } else {
          reject({
            act: 'saved',
            err: data.Result
          });
        }
      })
      .catch((err) => {
        reject({
          act: 'saving',
          err: err
        });
      });
  });
}