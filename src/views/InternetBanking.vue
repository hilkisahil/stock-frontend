<template>
<div>

  <v-app-bar color="white" dense class="green--text text--darken-2">
    <v-toolbar-title>Internet Banking</v-toolbar-title>

    <v-menu open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ml-8 green--text text--darken-2" text v-bind="attrs" v-on="on">Products <v-icon>expand_more</v-icon></v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in productItems" :key="index">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="green--text text--darken-2" text v-bind="attrs" v-on="on">Services <v-icon>expand_more</v-icon></v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in services" :key="index">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn text class="green--text text--darken-2" @click="$router.push('/manage-stock')">Invest Online</v-btn>
    <v-spacer></v-spacer>

    <v-btn icon class="green--text text--darken-2"><v-icon>pin_drop</v-icon></v-btn>
    <v-btn icon class="green--text text--darken-2"><v-icon>help</v-icon></v-btn>
    <v-btn icon class="green--text text--darken-2"><v-icon>search</v-icon></v-btn>
  </v-app-bar>

  <v-row>
    <div class="col-12" style="position: relative">
      <img :src="netBankImage">
      <div class="p1-card">
        <div class="p1-title">Earn a $300 checking bonus for a limited time.</div>
        <div class="p1-subtitle">New Customers can earn up to $300 with qualifying direct deposits.</div>
        <v-btn outlined color="white">Get Offer</v-btn>
      </div>
    </div>
    <div class="col-12">
      <div class="p2-title">Welcome to Oriental Bank Personal Banking</div>
    </div>
  </v-row>

</div>
</template>

<script>
export default {
  name: "InternetBanking",
  data() {
    return {
      productItems: ['Checkings', 'Savings', 'Credit Cards', 'Personal Loans', 'Debit Cards', 'Gift Cards', 'Special Offers'],
      services: ['Online Banking', 'Mobile Banking', 'Student Banking', 'Cross Border', 'Foreign Exchange Services', 'Overdraft Services'],
      netBankImage: 'https://s7d1.scene7.com/is/image/tdbank/38102_FY21_Q1Q2_CK_Incentive_Onsite_GenChecking_hpg_a_banner_1.17.4.1_d?fit=constrain&hei=380&wid=1920&qlt=75'
    }
  }
}
</script>

<style scoped>
.p1-card{
  position: absolute;
  background: #4CAF50;
  width: calc(100% - 857px);
  height: 380px;
  top: 12px;
  right: 0;
  padding: 40px;
  color: white;
}
.p1-title{
  font-size: 30px;
  font-weight: 600;
  line-height: 34px;
  margin-bottom: 30px;
}
.p1-subtitle{
  margin-bottom: 30px;
}
.p2-title{
  text-align: center;
  font-size: 28px;
  color: #1a5336;
}
@media screen and (max-width: 992px){
  .p1-card{
    display: none;
  }
}
</style>