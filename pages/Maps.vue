<template>
  <v-row>
    <v-col class="text-center">
      <Maps/>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";
import Maps from "@/components/Maps/Maps.vue"

export default defineComponent({
  name: "MapsPage",
  components: {
    Maps,
  },
  setup() {},
});
</script>
