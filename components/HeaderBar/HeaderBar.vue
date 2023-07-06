<template>
  <div>
    <v-app-bar height="60" app clipped-left dense flat color="warning">
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
import { ref, useContext } from "@nuxtjs/composition-api";
export default {
  name: "HeaderBar",
  setup() {
    /** DATA */
    const drawer = ref(true);
    const { $vuetify } = useContext();

    const toggleTheme = () => {
      $vuetify.theme.dark = !$vuetify.theme.dark;
    };

    return {
      drawer,
      toggleTheme,
    };
  },
};
</script>
<style>
.nuxt-logo-small {
  width: 3rem;
}
</style>
