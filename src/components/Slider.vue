<template>
  <ul>
    <template v-for="menu in allMenus | filterMenus active" track-by="$index">
      <li :class="{submenu: menu.sub.length, 'open': menu.close === false}">
        <a href="javascript:void(0)" @click.prevent="onItemClick($event, menu)">
          <i class="icon icon-th-list"></i>
          <span>{{menu.title}}</span>
        </a>
        <ul v-show="menu.sub">
          <li v-for="sub in menu.sub" :class="{'active': sub.active === true}"  track-by="$index">
            <a v-link="sub.name" @click.prevent="onItemClick($event, sub)">{{sub.title}}</a>
          </li>
        </ul>
      </li>
    </template>
  </ul>
</template>
<script type="text/ecmascript-6">
  import {isUndefined} from '../util/util'
  import go from '../util/go'
  const forEach = require('lodash/forEach')
  export default {
    props: {
      menus: Array,
      active: {
        type: String,
        default: '/'
      }
    },
    computed: {
      allMenus () {
        let vm = this
        let allMenus = vm.menus.slice()
        forEach(allMenus, (menu) => {
          vm.setDefault(menu.close, false)
          vm.setDefault(menu.sub, [])
          forEach(menu.sub, (sub) => {
            vm.setDefault(sub.contains, [])
            vm.setDefault(sub.active, false)
          })
        })
        return allMenus
      }
    },
    filters: {
      filterMenus (allMenus, active) {
        let menus = allMenus.slice(0)
        forEach(menus, (menu, idx) => {
          let subs = menu.sub
          if (subs && subs.length > 0) {
            forEach(subs, (sub) => {
              let isActive = sub.name === active || sub.contains && ~sub.contains.indexOf(active)
              if (isActive) {
                sub.active = true
                menu.close = false
              } else {
                sub.active = false
              }
            })
          }
        })
        return menus
      }
    },
    methods: {
      setDefault (val, def) {
        isUndefined(val) && (val = def)
      },
      onItemClick: function (e, menu) {
        let el = e.currentTarget
        if (el.tagName.toLowerCase() === 'a') {
          let parent = el.parentNode
          let classList = parent.classList
          if (menu.sub && menu.sub.length > 0) {
            classList[!classList.contains('open') ? 'add' : 'remove']('open')
          } else {
            go(menu.link, this.$router)
          }
        }
      }
    }
  }
</script>
