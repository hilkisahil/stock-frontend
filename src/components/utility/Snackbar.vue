<template>
  <div id="toaster">
    <v-snackbar :color="toaster.color" v-model="toaster.enable" :timeout="3000" bottom>
      <span v-html="toaster.message?toaster.message:'Something went Wrong'"></span>
      <!--<v-btn icon @click="toaster.enable = false">
          <v-icon>close</v-icon>
      </v-btn>-->
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Snackbar',
  props: ['toaster'],
}
</script>

<style scoped>

</style>