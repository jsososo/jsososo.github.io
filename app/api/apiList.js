/**
 * Created by Feil(admin@feil.wang) on 2017/12/18.
 */
let baseRcServer = function (url, method, apiName) {
  return {
    server: 'rc',
    url:  url, //todo
    params: {
      method: method,
      apiName: apiName
    }
  }
};

export default {
  // 通用接口
  doSwitch: baseRcServer('/doSwitch.rjson', 'GET', 'doSwitch'), // 切换开关
  queryItemDetail: baseRcServer('/queryItemDetail.rjson', 'GET', 'queryItemDetail'), // 查询商品详情
  queryUserAddressList: baseRcServer('/queryUserAddressList.rjson', 'GET', 'queryUserAddressList'), // 查询卖家地址库
  queryUserBaseInfo: baseRcServer('/queryUserBaseInfo.rjson', 'GET', 'queryUserBaseInfo'), // 查询用户基本信息
  delAutoConfigItem: baseRcServer('/delAutoConfigItem.rjson', 'GET', 'delAutoConfigItem'), // 自动设置里删除商品接口
  saveAutoConfigItem: baseRcServer('/saveAutoConfigItem.rjson', 'GET', 'saveAutoConfigItem'), // 自动设置里添加商品接口
  saveAutoConfigNick: baseRcServer('/saveAutoConfigNick.rjson', 'GET', 'saveAutoConfigNick'), // 自动设置里添加买家Nick接口
  delAutoConfigNick: baseRcServer('/delAutoConfigNick.rjson', 'GET', 'delAutoConfigNick'), // 自动设置里删除买家nick接口

  // 售后订单
  getTradeList: baseRcServer('/queryAfterSaleOrderList.rjson', 'GET', 'getTradeList'),
  getTradeDetail: baseRcServer('/getTradeDetail.rjson', 'GET', 'getTradeDetail'),
  syncAfterSaleOrderList: baseRcServer('/syncAfterSaleOrderList.rjson', 'GET', 'syncAfterSaleOrderList'),
  getReturnWarningInfo: baseRcServer('/getReturnWarningInfo.rjson', 'GET', 'getReturnWarningInfo'),
  //物流
  queryDeliverInfo: baseRcServer('/queryDeliverInfo.rjson', 'GET', 'queryDeliverInfo'),
  queryRefunderInfo: baseRcServer('/queryRefunderInfo.rjson', 'GET', 'queryRefunderInfo'),
  //批量操作
  agreeRefundFee: baseRcServer('/agreeRefundFee.rjson', 'POST', 'agreeRefundFee'),
  refuseRefundFee: baseRcServer('/refuseRefundFee.rjson', 'POST', 'refuseRefundFee'),
  agreeRefundGoods: baseRcServer('/agreeRefundGoods.rjson', 'POST', 'agreeRefundGoods'),
  refuseRefundGoods: baseRcServer('/refuseRefundGoods.rjson', 'POST', 'refuseRefundGoods'),
  remarkTrade: baseRcServer('/remarkTrade.rjson', 'POST', 'remarkTrade'),
  agreeExchangeGoods: baseRcServer('/agreeExchangeGoods.rjson', 'POST', 'agreeExchangeGoods'),
  refuseExchangeGoods: baseRcServer('/refuseExchangeGoods.rjson', 'POST', 'refuseExchangeGoods'),
  //拒绝原因
  queryRefuseReasonList: baseRcServer('/queryRefuseReasonList.rjson', 'POST', 'queryRefuseReasonList'),
  //同意确认收货
  agreeConfirmReceiveGoods: baseRcServer('/agreeConfirmReceiveGoods.rjson', 'POST', 'agreeConfirmReceiveGoods'),
  //拒绝
  refuseConfirmReceiveGoods: baseRcServer('/refuseConfirmReceiveGoods.rjson', 'POST', 'refuseConfirmReceiveGoods'),
  //发货
  consignGoods: baseRcServer('/consignGoods.rjson', 'POST', 'consignGoods'),
  //提醒买家
  remindBuyer: baseRcServer('/remindBuyer.rjson', 'POST', 'remindBuyer'),  //提醒买家
  queryLogisticsCompanies: baseRcServer('/queryLogisticsCompanies.rjson', 'GET', 'queryLogisticsCompanies'),

  // 日志查询
  getReturnLogList: baseRcServer('/queryEarlyWarningLogList.rjson', 'GET', 'queryEarlyWarningLogList'),
  getAutoLogList: baseRcServer('/queryAutoOperateLogList.rjson', 'GET', 'queryAutoOperateLogList'),
  getBatchLogList: baseRcServer('/queryBatchOperateLogList.rjson', 'GET', 'queryBatchOperateLogList'),
  // 自动换货
  queryAutoAgreeExchangeSetting: baseRcServer('/queryAutoAgreeExchangeSetting.rjson', 'GET', 'queryAutoAgreeExchangeSetting'),
  saveAutoAgreeExchangeSetting: baseRcServer('/saveAutoAgreeExchangeSetting.rjson', 'GET', 'saveAutoAgreeExchangeSetting'),
  queryAutoRefuseExchangeSetting: baseRcServer('/queryAutoRefuseExchangeSetting.rjson', 'GET', 'queryAutoRefuseExchangeSetting'),
  saveAutoRefuseExchangeSetting: baseRcServer('/saveAutoRefuseExchangeSetting.rjson', 'POST', 'saveAutoRefuseExchangeSetting'),
  // 自动退货
  queryAutoAgreeRefundSetting: baseRcServer('/queryAutoAgreeRefundSetting.rjson', 'GET', 'queryAutoAgreeRefundSetting'),
  saveAutoAgreeRefundSetting: baseRcServer('/saveAutoAgreeRefundSetting.rjson', 'POST', 'saveAutoAgreeRefundSetting'),
  queryAutoRefuseRefundSetting: baseRcServer('/queryAutoRefuseRefundSetting.rjson', 'GET', 'queryAutoRefuseRefundSetting'),
  saveAutoRefuseRefundSetting: baseRcServer('/saveAutoRefuseRefundSetting.rjson', 'POST', 'saveAutoRefuseRefundSetting'),
  // 短信内容
  querySmsSetting: baseRcServer('/querySmsSetting.rjson', 'GET', 'querySmsSetting'),
  saveSmsSetting: baseRcServer('/saveSmsSetting.rjson', 'POST', 'saveSmsSetting'),
  querySmsSignList: baseRcServer('/querySmsSignList.rjson', 'GET', 'querySmsSignList'),
  // 退换预警
  queryEarlyWarningSetting: baseRcServer('/queryEarlyWarningSetting.rjson', 'GET', 'queryEarlyWarningSetting'),
  saveEarlyWarningSetting: baseRcServer('/saveEarlyWarningSetting.rjson', 'POST', 'saveEarlyWarningSetting'),
  // 退换分析
  queryRefundAnalysis: baseRcServer('/queryRefundAnalysis.rjson', 'GET', 'queryRefundAnalysis'),
}
