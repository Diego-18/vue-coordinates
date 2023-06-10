<template>
  <v-app dark>
    <v-main>
      <HeaderBar />
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";
import HeaderBar from "../components/HeaderBar/HeaderBar.vue";

export default defineComponent({
  name: "DefaultLayout",
  components: {
    HeaderBar,
  },
});
</script>

<style>
.link-oferta {
  color: white !important;
  text-decoration: none !important;
}

.cstm-footer {
  bottom: 0;
  position: fixed;
  padding: 0.5rem 1rem;
}
</style>
