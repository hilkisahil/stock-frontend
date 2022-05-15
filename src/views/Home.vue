<template>
  <div class="home">
    <v-row>
      <div class="col-7 text-center fs-24 mt-6">Private Banking</div>
      <div class="col-5">
        <login @showToast="showToast"/>
      </div>
    </v-row>
  </div>
</template>

<script>

import Login from "@/components/Login";
export default {
  name: 'Home',
  components: {Login},
  methods: {
    showToast(val) {
      this.$emit('showToast', val)
    }
  }
}
</script>
