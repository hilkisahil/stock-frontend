<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="700" scrollable>
      <v-card>
        <v-card-title class="text-h5 pl-6 font-weight-regular">{{form.operation === 1?'Buy':'Sell'}} Stock
          <v-spacer/><v-btn icon @click="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title><v-divider/>
        <v-card-text class="mt-4">
          <v-form ref="form">
            <v-row>
              <v-col cols="6">
                <label class="text-uppercase grey--text font-weight-bold">Stock: </label>
                <span class="field-value"> {{stock.name}} - {{stock.code}}</span>
              </v-col>
              <v-col cols="6">
                <label class="text-uppercase grey--text font-weight-bold">Current Price: </label>
                <span class="field-value"> {{stock.currentPrice | currencyFilter}} </span>
              </v-col>
              <v-col cols="6">
                <label class="text-uppercase grey--text font-weight-bold">Highest Today: </label>
                <span class="field-value"> {{stock.highestToday | currencyFilter}} </span>
              </v-col>
              <v-col cols="6">
                <label class="text-uppercase grey--text font-weight-bold">Lowest Today: </label>
                <span class="field-value"> {{stock.lowestToday | currencyFilter}} </span>
              </v-col>
              <v-col cols="4">
                <label class="text-uppercase grey--text font-weight-bold">Quantity*</label>
                <v-text-field outlined v-model="form.quantity" class="" type="number" min="1" dense
                              :rules="[v => !!v || 'Quantity required', v => v>0 || 'Invalid quantity']"/>
              </v-col>
              <v-col cols="12" class="pt-0 mt-0 mb-4">
                <label class="text-uppercase grey--text font-weight-bold">Total Amount: </label>
                <span class="field-value"> {{form.quantity * form.currentPrice | currencyFilter}} </span>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn class="text-capitalize elevation-0 mr-2" @click="closeDialog">Cancel</v-btn>
          <v-btn class="primary px-3 text-capitalize" :loading="formLoading" dark @click="handleSubmit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Snackbar :toaster="toaster"/>
  </div>
</template>

<script>
import axios from "axios";
import Constants from "@/Constants/Constants";
import Snackbar from "@/components/utility/Snackbar";

let form = { userId: '', stockId: '', quantity: 1, operation: 1, currentPrice: 0 };
export default {
  name: "BuySellStock",
  components: {Snackbar},
  props: ['dialog'],
  data(){
    return {
      form: {...form},
      stock: {name:'', code:'', highestToday:0, lowestToday:0, currentPrice:0},
      user: JSON.parse(localStorage.getItem('user')),
      formLoading: false,
      toaster: {}
    }
  },
  methods: {
    setForm({id, operation, currentPrice, code, name, highestToday, lowestToday}) {
      this.stock = {id, operation, currentPrice, code, name, highestToday, lowestToday};
      this.form = {stockId: id,  userId:this.user.id, operation, currentPrice, quantity: 1}
    },
    handleSubmit(){
      if(this.$refs['form'].validate()) {
        this.buySellStock();
      }
    },
    buySellStock() {
      this.formLoading = true;
      axios.post(`${Constants.base_url}buySellStock`, this.form).then((response) => {
        if(response.data.flag){
          this.toaster = {enable:true, color:'green', message: `Stock ${this.form.operation===1?'purchased':'sold'} successfully}`};
          this.$emit('getBalance');
        }else this.toaster = {enable:true, color:'red', message: `${response.data.data.message || 'Query failed'}`};
        this.formLoading = false;
        this.closeDialog();
      }).catch((error) => {console.log(error);});
    },
    closeDialog() {
      this.$refs.form.resetValidation();
      this.form = {...form};
      this.$emit('update:dialog', false);
    }
  }
}
</script>

<style scoped>
.field-value{
  color: black;
  font-weight: 600;
  margin-left: 10px;
}
</style>