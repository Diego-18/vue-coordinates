<template>
  <v-app dark>
    <v-main>
      <v-container fluid style="padding: 0px">
        <HeaderBar />
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {
  defineComponent,
} from "@nuxtjs/composition-api";
import HeaderBar from "../components/HeaderBar/HeaderBar.vue";


export default defineComponent({
  name: "DefaultLayout",
  components: {
    HeaderBar,
  },

  setup() {},
});
</script>

<style>
.link-oferta {
  color: white !important;
  text-decoration: none !important;
}
</style>
