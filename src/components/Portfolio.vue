<template>
  <div>

    <v-data-table :headers="headers" :items="userStocks" :loading="dataLoading">
      <template v-slot:item.amount="{ item }">
        {{item.purchaseQuantity * item.currentPrice | currencyFilter}}
      </template>
      <template v-slot:item.currentPrice="{ item }">{{item.currentPrice | currencyFilter}}</template>
      <template v-slot:item.highestToday="{ item }">{{item.highestToday | currencyFilter}}</template>
      <template v-slot:item.lowestToday="{ item }">{{item.lowestToday | currencyFilter}}</template>
      <template v-slot:item.action="{ item }">
        <v-btn class="success" outlined dark small @click="sellStock(item)">Sell</v-btn>
      </template>
      <template v-slot:body.append v-if="userStocks.length">
        <tr style="color: teal; font-weight: bolder">
          <td>Summary</td>
          <td>-</td> <td>-</td> <td>-</td> <td>{{ totalAmount | currencyFilter}}</td>
          <td>-</td> <td>-</td><td>-</td>
        </tr>
      </template>
    </v-data-table>

    <BuySellStock :dialog.sync="formDialog" ref="buy-sell-popup" @getBalance="getBalance"/>
  </div>
</template>

<script>
import axios from 'axios';
import Constants from "../Constants/Constants";
import BuySellStock from "@/components/BuySellStock";
export default {
  name: "Portfolio",
  components: {BuySellStock},
  data() {
    return {
      headers: [
        { text: 'Company Name', value: 'name'},
        { text: 'Trading As', value: 'code'},
        { text: 'Available Qty', value: 'purchaseQuantity'},
        { text: 'Current Price', value: 'currentPrice'},
        { text: 'Amount', value: 'amount'},
        { text: 'Highest Today', value: 'highestToday'},
        { text: 'Lowest Today', value: 'lowestToday'},
        { text: 'Action', value: 'action'},
      ],
      userStocks: [],
      formDialog: false,
      dataLoading: false,
      totalAmount: 0
    }
  },
  methods: {
    sellStock(row) {
      this.$refs['buy-sell-popup'].setForm({...row, operation:2});
      this.formDialog = true;
    },
    getBalance() {
      this.$emit('getBalance');
    },
    getUserStocks() {
      this.dataLoading = true;
      let user = JSON.parse(localStorage.user);
      axios.post(`${Constants.base_url}getUserStock`, {userId: user.id}).then((response) => {
        this.userStocks = response.data.data;
        this.totalAmount = this.userStocks.reduce((prev, curr) => prev + (curr.purchaseQuantity * curr.currentPrice), 0)
        this.dataLoading = false;
      }).catch((error) => {console.log(error);});
    }
  },
  created() {
    this.getUserStocks();
  }
}
</script>

<style scoped>

</style>