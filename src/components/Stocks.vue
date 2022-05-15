<template>
<div>

  <v-data-table :headers="headers" :items="stocks" :loading="dataLoading">
    <template v-slot:item.action="{ item }">
      <v-btn class="success" outlined dark small @click="buyStock(item)">Buy</v-btn>
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
  name: "Stocks",
  components: {BuySellStock},
  data() {
    return {
      headers: [
        { text: 'Company Name', value: 'name'},
        { text: 'Trading As', value: 'code'},
        { text: 'Current Price', value: 'currentPrice'},
        { text: 'Highest Today', value: 'highestToday'},
        { text: 'Lowest Today', value: 'lowestToday'},
        { text: 'Action', value: 'action'},
      ],
      stocks: [],
      formDialog: false,
      dataLoading: false
    }
  },
  methods: {
    buyStock(row) {
      this.$refs['buy-sell-popup'].setForm({...row, operation:1});
      this.formDialog = true;
    },
    getBalance() {
      this.$emit('getBalance');
    },
    getStocks() {
      this.dataLoading = true;
      axios.post(`${Constants.base_url}stocks`, {}).then((response) => {
        this.stocks = response.data.data;
        this.dataLoading = false;
      }).catch((error) => {console.log(error);});
    }
  },
  created() {
    this.getStocks();
  }
}
</script>

<style scoped>

</style>