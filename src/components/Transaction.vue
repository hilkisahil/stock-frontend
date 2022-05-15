<template>
  <div>

    <v-data-table :headers="headers" :items="transactions" :loading="dataLoading" item-key="transactId">
      <template v-slot:item.createdAt="{ item }">
        {{moment(item.createdAt).format('DD MMM YYYY hh:mm:ss A')}}
      </template>
      <template v-slot:item.operation="{ item }">
        <v-chip :color="item.operation===1?'primary':'secondary'">{{item.operation === 1 ? 'Buy' : 'Sell'}}</v-chip>
      </template>
      <template v-slot:item.currentPrice="{ item }">{{item.currentPrice | currencyFilter}}</template>
      <template v-slot:item.amount="{ item }">
        {{item.transactionQty * item.currentPrice | currencyFilter}}
      </template>
    </v-data-table>

  </div>
</template>

<script>
import axios from 'axios';
import Constants from "../Constants/Constants";
import moment from 'moment';
export default {
  name: "Transaction",
  data() {
    return {
      moment,
      headers: [
        { text: 'Created On', value: 'createdAt'},
        { text: 'Company Name', value: 'name'},
        { text: 'Trading As', value: 'code'},
        { text: 'Operation', value: 'operation'},
        { text: 'Qty', value: 'transactionQty'},
        { text: 'Current Price', value: 'currentPrice'},
        { text: 'Amount', value: 'amount'},
      ],
      transactions: [],
      dataLoading: false
    }
  },
  methods: {
    getTransactions() {
      this.dataLoading = true;
      let user = JSON.parse(localStorage.user);
      axios.post(`${Constants.base_url}getTransactions`, {userId: user.id}).then((response) => {
        this.transactions = response.data.data;
        this.dataLoading = false;
      }).catch((error) => {console.log(error);});
    }
  },
  created() {
    this.getTransactions();
  }
}
</script>

<style scoped>

</style>