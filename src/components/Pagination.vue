<template>
  <div class="pagination-box" :class="{hide: isHide}">
    <div class="pagination-info" v-if="total">
      <span>共{{total}}条</span><span>当前展示第{{(curPage - 1 ) * pageSize + 1}}条到第{{curPage * pageSize > total ? total : curPage * pageSize}}条</span>
    </div>
    <div class="pagination " >
      <a tabindex="0" class="first pg-button  " :class="{'pg-state-disabled':isFirst}" @click="onPageClick($event, 1)">首页</a>
      <a tabindex="0" class="previous pg-button " :class="{'pg-state-disabled' :hasPre}"  @click="onPageClick($event, 'next')">上一页</a>
    <span v-for = "page in pages" track-by="$index">
        <a tabindex="0" class=" pg-button" :class="{'pg-state-disabled':page.isCurrent}" @click="onPageClick($event, page.idx)">{{page.idx}}</a>
    </span>
      <a tabindex="0" class="next pg-button " :class="{'pg-state-disabled':hasNext}" @click="onPageClick($event, 'pre')">下一页</a>
      <a tabindex="0" class="last pg-button " :class="{'pg-state-disabled':isLast}"  @click="onPageClick($event, totalPage)">尾页</a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      curPage: Number,
      pageSize: Number,
      totalPage: Number,
      total: Number,
      showPage: {
        type: Number,
        default: 5
      }
    },
    methods: {
      onPageClick: function (e, type) {
        let el = e.target
        if (!el.classList.contains('pg-state-disabled')) {
          let page = type
          switch (page) {
            case 'next':
              page = this.curPage + 1
              break
            case 'pre':
              page = this.curPage - 1
              break
            default:
              page = type
          }
          this.$dispatch('go-page', page)
        }
      }
    },
    computed: {
      isFirst: function () {
        return this.curPage === 1
      },
      isLast: function () {
        return this.curPage === this.totalPage
      },
      hasNext: function () {
        let vm = this
        return !(vm.pages[vm.pages.length - 1] < vm.totalPage)
      },
      hasPre: function () {
        let vm = this
        return !(vm.pages[0] > 1)
      },
      pages: function () {
        let vm = this
        let min = vm.curPage
        let maxPage = vm.showPage + min - 1
        let max = maxPage - vm.totalPage
        let arr = []
        if (max > 0) {
          min = vm.curPage - max
          max = vm.totalPage
        } else {
          max = maxPage
        }
        min = min > 0 ? min : 1
        for (; min <= max; min++) {
          arr.push({
            idx: min,
            isCurrent: min === vm.curPage
          })
        }
        return arr
      },
      isHide: function () {
        return this.totalPage <= 1
      }
    }
  }
</script>
<style>
  .hide{
    visibility: hidden;
  }
</style>
