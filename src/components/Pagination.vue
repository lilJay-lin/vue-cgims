<template>
  <div class="pagination " >
    <a tabindex="0" class="first pg-button  " @click="onPageClick('first')">首页</a>
    <a tabindex="0" class="previous pg-button " :class="{'pg-state-disabled' :hasPre}"  @click="onPageClick('next')">上一页</a>
    <span v-for = "idx in pages" track-by="$index">
        <a tabindex="0" class=" pg-button" v-iscurrent="idx">{{idx}}</a>
    </span>
    <a tabindex="0" class="next pg-button " :class="{'pg-state-disabled':hasNext}" @click="onPageClick('pre')">下一页</a>
    <a tabindex="0" class="last pg-button " @click="onPageClick('last')">尾页</a></div>
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
    },
    computed: {
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
          max = vm.totalPage
          min = maxPage - max
        } else {
          max = maxPage
        }
        min = min > 0 ? min : 1
        for (; min <= max; min++) {
          arr.push(min)
        }
        return arr
      }
    },
    directives: {
      iscurrent: function (idx) {
        this.el.classList[this.vm.curPage === idx ? 'add' : 'remove']('pg-state-disabled')
      }
    }
  }
</script>
