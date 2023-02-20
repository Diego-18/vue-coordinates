/* jshint sub:true */
<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only v-if="coordOrigin.length > 0">
      <l-map :zoom="12" :center="[coordOrigin[0], coordOrigin[1]]">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" title="Current Location"/>

        <l-marker
          v-if="coordOrigin.length > 0"
          :lat-lng="[coordOrigin[0], coordOrigin[1]]"
        />
      </l-map>
    </client-only>
  </div>
</template>
<script>
import { ref } from "vue";
import { defineComponent, onMounted } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    /** DATA */
    const coordOrigin = ref([]);
    const coordDestination = ref();

    /** METHODS */
    onMounted(() => {
      getLocationCurrent();
    });

    const getLocationCurrent = () => {
      if (navigator.geolocation) {
        const success = function (position) {
          coordOrigin.value.push(position.coords.latitude);
          coordOrigin.value.push(position.coords.longitude);
        };
        navigator.geolocation.getCurrentPosition(success, function (msg) {
          console.error(msg);
        });
      }
    };

    return {
      coordOrigin,
    };
  },
});
</script>
