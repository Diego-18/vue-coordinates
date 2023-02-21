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

        l-marker
          v-if="coordDestination.length > 0"
          :lat-lng="[coordDestination[0], coordDestination[1]]"
        />
      </l-map>
    </client-only>
  </div>
</template>
<script>
import { ref } from "vue";
import { defineComponent, onMounted } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
  Origin: [],
  Destination: [],
  },
  setup(props, { emit }) {
    /** DATA */
    const coordOrigin = ref(props.Origin);
    const coordDestination = ref(props.Destination);

    /** METHODS */


    return {
      coordOrigin,
      coordDestination,
    };
  },
});
</script>
