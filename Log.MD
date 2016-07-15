
# 侧边栏

1. 菜单结构

  ```javascript

    {
      menus : [
      {
        name: 'user',
        title: '用户管理',
        link: '',
        sub: [
          {
            name: 'user-search',
            title: '用户搜索',
            link: ''
          },
          {
            name: 'user-detail',
            title: '用户详情',
            link: ''
          },
        ]
      }
      ],
      active: 'user-detail'
    }
  ```

2. 处理
  
    1. 循环展示menu  , 判断当前是否有sub，有增加submenu
    2. 判断当前是否需要展开
