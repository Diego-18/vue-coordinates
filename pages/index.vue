<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo mt-4 py-4 d-flex justify-center">
        <NuxtLogo />
      </v-card>
      <v-card class="logo py-4 ">
        <v-card-title class="headline d-flex justify-center"> Vue Coordinates </v-card-title>
        <v-card-text>

        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "IndexPage",
  setup() {},
});
</script>
