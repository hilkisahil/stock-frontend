<template>
<div>

  <v-tabs color="deep-purple accent-4">
    <v-tab>Portfolio</v-tab>
    <v-tab>Stocks</v-tab>
    <v-tab>Transactions</v-tab>
    <v-btn outlined color="primary" icon small class="my-auto ml-4" @click="fetchRecords">
      <v-icon>refresh</v-icon>
    </v-btn>
    <v-tab-item key="1">
      <v-container fluid> <Portfolio @getBalance="getBalance" ref="portfolio"/> </v-container>
    </v-tab-item>
    <v-tab-item key="2">
      <v-container fluid> <Stocks @getBalance="getBalance"/> </v-container>
    </v-tab-item>
    <v-tab-item key="3">
      <v-container fluid> <Transaction/> </v-container>
    </v-tab-item>
  </v-tabs>

</div>
</template>

<script>
import Stocks from "@/components/Stocks";
import Portfolio from "@/components/Portfolio";
import Transaction from "@/components/Transaction";
export default {
  name: "ManageStock",
  components: {Transaction, Portfolio, Stocks},
  methods: {
    getBalance() {
      this.$emit('getBalance');
      this.fetchRecords();
    },
    fetchRecords(){
      this.$refs['portfolio'].getUserStocks();
    }
  }
}
</script>

<style scoped>

</style>