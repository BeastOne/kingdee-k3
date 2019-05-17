Kingdee K3 Cloud 
===========================

Automatically complete the saving and auditing of bills in Kingdee K3 Cloud.

Installation
===========================

###Using npm:

```Bash
$ npm i -g kingdee-k3
$ npm i --save kingdee-k3
```

###In Node.js:

```Javascript
var K3CloudApiClient = require('kingdee-k3-webapi'),
    K3 = require('../lib');

var client = new K3CloudApiClient('http://your.k3.site');

var outstockbill = {
  // 销售组织，组织编码
  FSaleOrgId: {
    FNumber: '123'
  },
  // 客户，客户编码
  FCustomerID: {
    FNumber: 'CUST01234'
  },
  // 发货组织，组织编码 
  FStockOrgId : {
    FNumber: '123'
  },
  // 收货方
  FReceiverID: {
    FNumber: 'CUST01234'
  },
  // 结算方
  FSettleID: {
    FNumber: 'CUST01234'
  },
  // 付款方
  FPayerID: {
    FNumber: 'CUST01234'
  },
  SubHeadEntity: {
    // 结算组织
    FSettleOrgID: {
      FNumber: '123'
    }
  },
  FEntities: [
    {
      // 物料编码
      FMaterialID: {
        FNumber: '01.03.01.001'
      },
      // 实发数量
      FRealQty: '2',
      // 单价，价格为商品单价
      FPrice: '198',
      // 是否赠品
      FIsFree: false,
      // 含税单价
      FTaxPrice: '198',
      // 货主
      FOwnerID: {
        FNumber: '123'
      },
      // 销售数量
      FSALUNITQTY: '2',
      // 销售基本数量
      FSALBASEQTY: '2',
      // 计价基本数量
      FPRICEBASEQTY: '2'
    }, {
      FMaterialID: {
        FNumber: '01.02.01.004'
      },
      FRealQty: '1',
      FPrice: '68',
      FIsFree: false,
      FTaxPrice: '68',
      FOwnerID: {
        FNumber: '123'
      },
      FSALUNITQTY: '1',
      FSALBASEQTY: '1',
      FPRICEBASEQTY: '1'
    }, {
      FMaterialID: {
        FNumber: '04.01.04.003'
      },
      FRealQty: '4',
      FPrice: '0',
      FIsFree: true,
      FTaxPrice: '0',
      FOwnerID: {
        FNumber: '123'
      },
      FSALUNITQTY: '4',
      FSALBASEQTY: '4',
      FPRICEBASEQTY: '4'
    }
  ]
};

var receivebill = {
  // 往来单位，客户编码 
  FCONTACTUNIT: {
    FNumber: "CUST01234"
  },
  // 付款单位，客户编码 
  FPAYUNIT: {
    FNumber: "CUST01234"
  },
  // 收款组织，组织编码
  FPAYORGID: {
    FNumber: "100"
  },
  // 结算组织，组织编码 
  FSETTLEORGID: {
    FNumber: "100"
  },
  // 销售组织，组织编码
  FSALEORGID: {
    FNumber: "100"
  },
  // 单据头备注
  FREMARK: "商品销售",
  FEntities: [
    {
      // 结算方式
      FSETTLETYPEID: {
        FNumber: K3.BD.SettleType.Cash
      },
      // 收款用途
      FPURPOSEID: {
        FNumber: K3.CN.RecPayPurpose.Sale
      },
      // 预收项目类型，销售收款
      FRECEIVEITEMTYPE: " ",
      // 表体-应收金额
      FRECTOTALAMOUNTFOR: 975.0,
      // 收款金额
      FRECAMOUNTFOR_E: 975.0,
      // 手续费
      FHANDLINGCHARGEFOR: 2.35,
      // 备注
      FCOMMENT: "商品销售",
      // 收款金额本位币
      FRECAMOUNT_E: 975.0,
      // 登账日期
      FPOSTDATE: ""
    }
  ]
};

// Log on to Kingdee K3 Cloud using a 3rd party app account.
client.login('dbId', 'user', 'appId', 'appSecret', lang)
  .then((data) => {
    console.log('Log on to K3 Cloud success.');
      
    if (data.LoginResultType == 1) {
      K3.STK.Inventory.query(client, { 'FStockOrgId': 699033, 'FMaterialId.FNumber': '05.11.01.051' })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });

      K3.SAL.OutStock.saveAndAudit(client, outstockbill)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.err.ResponseStatus.Errors);
        });

      K3.AR.ReceiveBill.saveAndAudit(client, receivebill)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.err.ResponseStatus.Errors);
        });
    }
  })
  .catch((err) => {
    console.log('Log on to K3 Cloud failed.');
    console.log(err.message);
  });
```

See the [package source](https://github.com/BeastOne/kingdee-k3)  for more details.