<template>
  <div class="pagination-box" :class="{hide: isHide}">
    <div class="pagination-info" v-if="total">
      <span>共{{total}}条</span><span>当前展示第{{(curPage - 1 ) * pageSize + 1}}条到第{{curPage * pageSize > total ? total : curPage * pageSize}}条</span>
    </div>
    <div class="pagination " >
<!--      <a tabindex="0" class="first pg-button  " :class="{'pg-state-disabled':isFirst}" @click="onPageClick($event, 1)" style="display: none">首页</a>
      <a tabindex="0" class="previous pg-button " :class="{'pg-state-disabled' :hasPre}"  @click="onPageClick($event, 'pre')" style="display: none">上一页</a>
      -->
      <span v-for = "page in pages" track-by="$index">
          <a href="javascript:void(0)" class="pg-button" v-if="page.idx === 'so'">...</a>
          <a class="pg-button" :class="{'pg-state-disabled':page.isCurrent}" @click="onPageClick($event, page.idx)" v-else>{{page.idx}}</a>
      </span>
      <!--
      <a tabindex="0" class="next pg-button " :class="{'pg-state-disabled':hasNext}" @click="onPageClick($event, 'next')" style="display: none">下一页</a>
      <a tabindex="0" class="last pg-button " :class="{'pg-state-disabled':isLast}"  @click="onPageClick($event, totalPage)" style="display: none">尾页</a>
    -->
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
        default: 3
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
      },
      setFor: (arr, min, max, cur) => {
        for (; min <= max; min++) {
          arr.push({
            idx: min,
            isCurrent: cur === min
          })
        }
        return arr
      }
    },
    computed: {
/*      isFirst: function () {
        return this.curPage === 1
      },
      isLast: function () {
        return this.curPage === this.totalPage
      },
      hasNext: function () {
        let vm = this
        return vm.curPage === vm.totalPage
      },
      hasPre: function () {
        let vm = this
        return vm.curPage === 1
      },*/
      pages: function () {
        let vm = this
        let cur = vm.curPage
        let total = vm.totalPage
        let show = vm.showPage
        /*
        * 1 到 show
        * */
        let lp = vm.setFor([], 1, show, cur)
        /*
        * total - row + 1 到 total
        * */
        let rp = vm.setFor([], total - show + 1, total, cur)
        let middle = []
        let lc = cur - show > 0 ? cur - show : 1
        let rc = cur + show > total ? total : cur + show
        /*
        * 左边不足 show, 或者show + 1 个，全展示
        * 右边边不足 show, 或者show + 1 个，全展示
        * */
        lc = lc - show - 1 > 1 ? lc : (lp = [], 1)
        rc = rc + show + 1 < total ? rc : (rp = [], total)
        vm.setFor(middle, lc, rc, cur)
        lp.length > 0 && lp.push({idx: 'so'})
        rp.length > 0 && rp.unshift({idx: 'so'})
        return [].concat(lp, middle, rp)
/*
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
     */
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
  .pagination{
    text-align: center;
  }
  .pagination .pg-button{
    border-width: 1px 1px 1px 0;
  }
  .pagination > span:first-of-type a{
    border-width: 1px
  }
</style>
