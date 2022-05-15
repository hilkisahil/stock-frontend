<template>
<div>
  <v-card elevation="2">
    <v-card-title>Login</v-card-title>
    <v-card-subtitle>Login with Customer ID</v-card-subtitle>
    <v-card-text>
      <v-form ref="loginForm">
      <v-text-field outlined label="Username" v-model="user.username"
                    :rules="[v => !!v || 'Username required']"/>
      <v-text-field outlined label="Password" v-model="user.password" @keydown.enter="handleSubmit"
                    :type="showPassword?'text':'password'" @click:append="showPassword = !showPassword"
                    :append-icon="showPassword?'visibility':'visibility_off'" :rules="[v => !!v || 'Password required']"/>
      <v-btn class="primary mr-4" @click="handleSubmit" :loading="formLoading">Login</v-btn>
      <v-btn outlined>Forgot Password</v-btn>
      </v-form>
    </v-card-text>
  </v-card>

</div>
</template>

<script>
import axios from "axios";
import Constants from "@/Constants/Constants";

export default {
  name: "Login",
  data () {
    return {
      user : { username: '', password: '' },
      showPassword: false,
      formLoading: false,
      toaster: {}
    }
  },
  methods: {
    async handleSubmit() {
      if(this.$refs['loginForm'].validate()){
        this.formLoading = true;
        axios.post(`${Constants.base_url}login`, this.user).then((response) => {
          if(response.data.flag){
            this.showToast({enable: true, color: 'green', message: `Logged in successful`});
            localStorage.setItem('user', JSON.stringify(response.data.data));
            this.$store.commit('setBalance', response.data.data.balance);
            this.$router.push('/internet-banking').then();
          }else this.showToast({enable:true, color:'red', message: response.data.data.message})
          this.formLoading = false;
        }).catch((error) => { console.log(error) });
      }
    },
    showToast(val) {
      this.$emit('showToast', val)
    }
  }
}
</script>

<style scoped>

</style>