/**
 * Created by linxiaojie on 2016/8/29.
 */
/*
 * 获取面包屑菜单列表
 * */
function loopSubMenu (menus, breads, active) {
  let isHit = 0
  forEach(menus, (menu) => {
    if (isHit) return
    breads.push({
      name: menu.name,
      title: menu.title
    })
    if (menu.name === active || menu.contains && ~menu.contains.indexOf(active)) {
      isHit = 1
    } else {
      let subMenus = menu.sub
      if (subMenus && subMenus.length > 0) {
        let isHit = loopSubMenu(subMenus, breads, active)
        !isHit && breads.pop()
      } else {
        breads.pop()
      }
    }
  })
  return isHit
}
export const getBreadCrumb = (state) => {
  let slider = state.slider
  let menus = slider.menus
  let active = slider.active
  let breads = []
  loopSubMenu(menus, breads, active)
  return {
    menus: breads,
    active: active
  }
}
