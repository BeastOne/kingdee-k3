/**
 * A interface for the settle type.
 */
"use strict";

module.exports = {
  // 现金	1
  Cash: 'JSFS01_SYS',

  // 现金支票	2
  CashCheck: 'JSFS02_SYS',

  // 转账支票	3
  TransferCheck: 'JSFS03_SYS',

  // 电汇	4
  TeleTransfer: 'JSFS04_SYS',

  // 信汇	5
  MailTransfer: 'JSFS05_SYS',

  // 商业承兑汇票	6
  TA: 'JSFS06_SYS',

  // 银行承兑汇票	7
  BA: 'JSFS07_SYS',

  // 信用证	8
  LetterOfCredit: 'JSFS08_SYS',

  // 应收票据背书	9
  EndorsementOfNotes: 'JSFS09_SYS',

  // 内部利息结算	20599
  InternalInterest: 'JSFS10_SYS',

  // 集中结算	20604
  Centralized: 'JSFS21_SYS',

  // 票据退票	20610
  RefundOfBill: 'JSFS12_SYS',

  // 微信	30604
  WechatPay: 'JSFS31_SYS',

  // 支付宝	30609
  AliPay: 'JSFS32_SYS',

  // 保证金转货款	30700
  MarginTransfer: 'JSFS22_SYS',

  // POS基本户-储蓄卡	363520
  JSFS33_SYS: 'JSFS33_SYS',

  // POS银行户-储蓄卡	364349
  JSFS35_SYS: 'JSFS35_SYS',

  // POS银行户-信用卡	699735
  JSFS36_SYS: 'JSFS36_SYS',

  // POS基本户-信用卡	699736
  JSFS34_SYS: 'JSFS34_SYS',

  // 转账	1773184
  JSFS41_SYS: 'JSFS41_SYS',

  // 团购	1773190
  JSFS42_SYS: 'JSFS42_SYS',

  // 会员卡	1773191
  JSFS43_SYS: 'JSFS43_SYS',

  // 套餐包	1773192
  JSFS44_SYS: 'JSFS44_SYS'
}