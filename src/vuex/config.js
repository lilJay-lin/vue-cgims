/**
 * Created by liljay on 2016/8/26.
 */
/*
 * 菜单和权限关联表配置
 * key-map, eg: {菜单名: 权限}
 * */
export const menuRelPermission = {
  'startStatistic': 'analysisManager',
  'searchUser': 'userManager',
  'searchRole': 'roleManager',
  'searchOrder': 'orderManager/orderView',
  'searchUserOrder': 'userOrderManager',
  'searchWorker': 'orderManager/orderView/workmanManager/userOrderManager',
  'addUser': 'userManager',
  'addRole': 'roleManager',
  'addOrder': 'orderManager',
  'addUserOrder': 'userOrderManager',
  'addWorker': 'workmanManager'
}
