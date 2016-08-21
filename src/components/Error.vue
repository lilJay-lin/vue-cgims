<template>
  <div class="error_ex">
    <h1>{{message}}</h1>
    <a class="btn btn-warning btn-big" v-link="url">{{btnText}}</a>
  </div>
</template>
<script>
  export default {
    props: {
      message: String,
      url: [Object, String],
      btnText: String
    }
  }
</script>
