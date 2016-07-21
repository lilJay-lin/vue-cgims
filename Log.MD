
# 侧边栏

TODO: 无限级菜单

1. 菜单结构

  ```javascript

    {
      menus : [
      {
        name: 'user',
        title: '用户管理',
        sub: [
          {
            name: '/user/search',
            title: '用户搜索',
          },
          {
            name: '/user/detail',
            title: '用户详情',
          },
        ]
      }
      ],
      active: '/user/detail'
    }
  ```

2. 处理

    1. 循环展示menu  , 判断当前是否有sub，有增加submenu
    2. 判断当前是否需要展开


# BUG

1. method不能使用es6箭头函数，this会被改变从能内部访问不了vue

2.
