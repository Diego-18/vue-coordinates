<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom="12" :center="coordOrigin[0]" @click="addMarker">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

        <l-marker v-if="coordOrigin.length > 0" :lat-lng="coordOrigin[0]" />

        <l-marker v-if="destination.length > 0" :lat-lng="destination[0]" />
      </l-map>
    </client-only>
  </div>
</template>

<script>
import { useStore, onMounted } from "@nuxtjs/composition-api";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const coordOrigin = computed(() => store.getters.getOrigin);
    const destination = computed(() => store.getters.getDestination);

    onMounted(() => {
      getLocationCurrent();
    });

    const getLocationCurrent = () => {
      if (navigator.geolocation) {
        const success = function (position) {
          const { latitude: lat, longitude: lng } = position.coords;
          const dataOrigin = { lat, lng };
          store.dispatch("removeCoordOrigin");
          store.dispatch("addCoordOrigin", dataOrigin);
        };
        navigator.geolocation.getCurrentPosition(success, function (msg) {
          console.error(msg);
        });
      }
    };

    const addMarker = (event) => {
      const coordDestination = event.latlng;
      store.dispatch("removeCoordDestination");

      if (destination.value.length === 0 || origin.value.length >= 1) {
        store.dispatch("addCoordDestination", coordDestination);
      }
    };

    return {
      coordOrigin,
      destination,
      addMarker,
    };
  },
};
</script>
