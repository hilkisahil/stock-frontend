<template>
  <div id="app">
    <v-app>
      <v-header ref="v-header"></v-header>
      <router-view class="routed-view" @showToast="showToast" @getBalance="getBalance"/>
      <Snackbar :toaster="toaster"/>
    </v-app>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Snackbar from "@/components/utility/Snackbar";
export default {
  name: 'App',
  components: {Snackbar, vHeader: Header},
  data() {
    return{
      toaster: {}
    }
  },
  methods: {
    showToast(val) {
      this.toaster = val;
    },
    getBalance() {
      this.$refs['v-header'].getUserBalance();
    }
  }
}
</script>
<style lang="scss">
@import "../src/style/main.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.routed-view {
  margin-top: 62px;
}
.h-pointer{
  cursor: pointer;
}
</style>
