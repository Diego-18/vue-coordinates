/* jshint sub:true */
<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom="12" :center="[6.224521, -75.533752]" @click="addMarker">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

        <l-marker
          v-if="coordOrigin.length > 0"
          :lat-lng="[coordOrigin[0]['lat'], coordOrigin[0]['lng']]"
        />

        <l-marker
          v-if="destination.length > 0"
          :lat-lng="[destination[0]['lat'], destination[0]['lng']]"
        />
      </l-map>
    </client-only>
  </div>
</template>
<script>
import { useStore, onMounted } from "@nuxtjs/composition-api";
import { ref, computed } from "vue";

export default {
  setup() {
    /** DATA */
    const store = useStore();
    const coordOrigin = ref([]);
    const coordDestination = ref();
    const origin = computed(() => store.getters.getOrigin);
    const destination = computed(() => store.getters.getDestination);

    /** METHODS */
    onMounted(() => {
      getLocationCurrent();
    });

    const getLocationCurrent = () => {
      if (navigator.geolocation) {
        const success = function (position) {
          const dataOrigin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(dataOrigin);
          coordOrigin.value.push(dataOrigin);
          // console.log(coordOrigin.value);
          store.dispatch("removeCoordOrigin");
          store.dispatch("addCoordOrigin", dataOrigin);
        };
        navigator.geolocation.getCurrentPosition(success, function (msg) {
          console.error(msg);
        });
      }
    };
    const addMarker = (event) => {
      if (origin.value.length >= 1) {
        coordDestination.value = event.latlng;
        store.dispatch("removeCoordDestination");
        store.dispatch("addCoordDestination", coordDestination.value);
      }

      if (destination.value.length === 0) {
        coordDestination.value = event.latlng;
        store.dispatch("addCoordDestination", coordDestination.value);
      }

      if (destination.value.length >= 1) {
        coordDestination.value = event.latlng;
        store.dispatch("removeCoordDestination");
        store.dispatch("addCoordDestination", coordDestination.value);
      }
    };

    return {
      coordOrigin,
      coordDestination,
      origin,
      destination,
      addMarker,
    };
  },
};
</script>
