<template>
  <ul>
    <template v-for="menu in slider.menus" track-by="$index">
      <li :class="{submenu: menu.sub.length, 'open': menu.close === false}">
        <a href="javascript:void(0)" @click.prevent="onItemClick($event, menu, $index)">
          <i class="icon icon-th-list"></i>
          <span>{{menu.title}}</span>
        </a>
        <ul v-show="menu.sub">
          <li v-for="sub in menu.sub" :class="{'active': sub.active === true}"  track-by="$index">
            <a v-link="sub.name" @click.prevent="onItemClick($event, sub, $index)">{{sub.title}}</a>
          </li>
        </ul>
      </li>
    </template>
  </ul>
</template>
<script type="text/ecmascript-6">
  import {getMenus} from 'my_vuex/getters/slider'
  import {setMenuOpen} from 'my_vuex/actions/slider'
  import go from '../util/go'
  export default {
    methods: {
      onItemClick: function (e, menu, idx) {
        let el = e.currentTarget
        if (el.tagName.toLowerCase() === 'a') {
          if (menu.sub && menu.sub.length > 0) {
            console.log(menu.close)
            this.setMenuOpen({
              idx,
              close: !menu.close
            })
          } else {
            go(menu.link, this.$router)
          }
        }
      }
    },
    vuex: {
      getters: {
        slider: getMenus
      },
      actions: {
        setMenuOpen
      }
    }
  }
</script>
