<template>
<div>

  <v-row class="justify-space-between green px-2 header ma-0">
    <div class="col-3 fs-24 font-weight-bold h-pointer" @click="redirectToInternetBanking">
      <img src="../assets/Oriental_Bank_of_Commerce.png" height="30px" class="oriental-log">
      <span class="ml-10">Oriental Bank</span></div>
    <div class="col-3 text-right mr-4" v-if="$route.path !== '/home'">
      <v-avatar size="32" class="mr-6 green darken-4 h-pointer mt-n-16">
        <v-icon dark>person</v-icon>
      </v-avatar>
      <div class="user-detail">
        <div>{{ user.name }}</div>
        <div>Balance: ₹ {{balance}}
          <v-btn icon x-small @click="getUserBalance" class="green lighten-2 ml-2" :loading="balanceLoading">
            <v-icon>refresh</v-icon></v-btn></div>
      </div>

      <v-btn icon dark class="ml-6 mt-n-16" title="Logout" @click="confirmDialog=true"><v-icon>logout</v-icon></v-btn>
    </div>
  </v-row>

  <v-dialog @keydown.esc="$emit('close')" max-width="400" persistent v-model="confirmDialog">
    <v-card>
      <v-card-title style="word-break: break-word">Are you sure, You want to logout ?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.native="confirmDialog=false" class="error--text elevation-0" text>Cancel</v-btn>
        <v-btn @click="logout" class="primary--text elevation-0" text>Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</div>
</template>

<script>
import axios from "axios";
import Constants from "@/Constants/Constants";

export default {
  name: "Header",
  data(){
    return {
      balanceLoading: false,
      confirmDialog: false
    }
  },
  computed:{
    balance() {
      return this.$store.state.balance;
    },
    user() {
      return this.$route.path !== '/home' ? JSON.parse(localStorage.user): {};
    }
  },
  methods:{
    redirectToInternetBanking() {
      if(localStorage.user && this.$route.path !== '/internet-banking')
        this.$router.push('/internet-banking')
    },
    logout() {
      localStorage.clear();
      this.$store.commit('resetStore');
      this.confirmDialog = false;
      this.$router.push('/home');
    },
    getUserBalance() {
      this.balanceLoading = true;
      let user = JSON.parse(localStorage.user);
      axios.post(`${Constants.base_url}getUserDetail`, {userId: user.id}).then((response) => {
        this.$store.commit('setBalance', response.data.data.balance);
        this.balanceLoading = false;
      }).catch((error) => {console.log(error);});
    }
  }
}
</script>

<style scoped>
.header{
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
}
.mt-n-16{
  margin-top: -16px;
}
.user-detail{
  display: inline-block;
  margin: -2px 0 0 0;
  line-height: 18px;
  text-align: left;
}
.oriental-log{
  position: absolute;
  height: 42px;
  top: 6px;
}
</style>