<template>
  <ul>
    <template v-for="menu in menus">
      <li :class="{submenu: menu.sub.length, active: menu.name === active}" class="open">
        <a href="javascript:void(0)" @click.prevent="onItemClick($event, menu)">
          <i class="icon icon-th-list"></i>
          <span>{{menu.title}}</span>
          <span class="label" v-show="menu.sub.length">{{menu.sub.length}}</span>
        </a>
        <ul v-show="menu.sub">
          <li v-for="sub in menu.sub" :class="{active: sub.name === active || sub.contains && ~sub.contains.indexOf(active)}">
            <a v-link="sub.name" @click.prevent="onItemClick($event, sub)">{{sub.title}}</a>
          </li>
        </ul>
      </li>
    </template>
  </ul>
</template>
<script>
import go from '../util/go'
export default {
  props: {
    menus: {
      type: Array
    },
    active: {
      type: String,
      default: '/'
    }
  },
  filters: {
    canOpen: function (active, menu) {
      let res = 0
      if (menu.sub && menu.sub.length > 0) {
        res = menu.sub.some(function (sub) {
          if (!res) {
            res = sub.contains ? sub.contains.indexOf(active) > -1 : sub.name === active
            return res
          }
        })
      }
      return res
    }
  },
  directives: {
    open: function (open) {
      open && this.el.classList.add('open')
    }
  },
  methods: {
    onItemClick: function (e, menu) {
      let el = e.currentTarget
      if (el.tagName.toLowerCase() === 'a') {
        let parent = el.parentNode
        let classList = parent.classList
        if (menu.sub && menu.sub.length > 0) {
          classList[!classList.contains('open') ? 'add' : 'remove']('open')
        } else {
          go(menu.name, this.$router)
        }
      }
    }
  }
}
</script>
