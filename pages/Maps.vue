<template>
  <v-row>
    <v-col>
      <v-card class="ma-5">
        <v-row class="ml-1">
          <v-divider />
          <v-col class="col-12 col-lg-6 col-xl-6" v-if="origin.length > 0">
            <v-row>
              <v-col class="col-6 col-lg-6 col-xl-6 ml-0 mr-0">
                <v-icon>mdi-google-maps</v-icon>
                <span class="font-weight-black">Origin Address:</span>
                <v-text-field
                  v-model="origin[0].lat"
                  label="Lat. Origen"
                  solo
                  elevation="2"
                  disabled
                />
              </v-col>
              <v-col class="col-6 col-lg-6 col-xl-6 mt-6">
                <v-text-field
                  v-model="origin[0].lng"
                  label="Long. Origen"
                  solo
                  elevation="2"
                  disabled
                />
              </v-col>
            </v-row>

            <v-row v-if="destination.length > 0">
              <v-col class="col-6 col-lg-6 col-xl-6 ml-0 mr-0">
                <v-icon>mdi-google-maps</v-icon>
                <span class="font-weight-black">Destination Address:</span>
                <v-text-field
                  v-model="destination[0].lat"
                  label="Lat. Destino"
                  solo
                  elevation="2"
                  disabled
                />
              </v-col>
              <v-col class="col-6 col-lg-6 col-xl-6 mt-6">
                <v-text-field
                  v-model="destination[0].lng"
                  label="Long. Destino"
                  solo
                  elevation="2"
                  disabled
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col class="maps col-12 col-lg-6 col-xl-6 pb-0 pt-0">
            <Maps />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent, useStore, computed } from "@nuxtjs/composition-api";
import Maps from "@/components/Maps/Maps.vue";

export default defineComponent({
  name: "MapsPage",
  components: {
    Maps,
  },
  setup() {
    /** DATA */
    const store = useStore();
    const origin = computed(() => store.getters.getOrigin);
    const destination = computed(() => store.getters.getDestination);

    return {
      origin,
      destination,
    };
  },
});
</script>
<style lang="scss" scoped>
.row {
  margin: 0 !important;
}
</style>
