<template>
  <v-row>
    <v-col>
      <v-card class="ma-5">
        <v-card-title outlined single-line sticky tile class="mb-5">
          <span class="ml-3">Ubicación</span>
          <v-spacer />
          <v-icon large class="second-font">mdi-google-maps</v-icon>
        </v-card-title>

        <v-row class="ml-1 mr-1">
          <v-divider />
          <v-col class="col-12 col-lg-6 col-xl-6">
            <v-form ref="form" fluid>
              <v-row class="pb-0 pt-0">
                <v-col class="col-12">
                  <v-flex>
                    <span class="font-weight-black">Locación:</span>
                  </v-flex>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="col-12">
                  <p class="font-weight-bold">Origen</p>
                  <v-text-field
                    label="Direccción de Origen"
                    solo
                    elevation="2"
                    disabled
                    v-model="addressOrigin"
                  />
                </v-col>
                <v-col class="col-12 col-lg-6" v-if="origin.length > 0">
                  <span class="font-weight-bold">Latitud</span>
                  <v-text-field
                    v-model="origin[0].lat"
                    label="Lat. Origen"
                    solo
                    elevation="2"
                    disabled
                  />
                </v-col>
                <v-col class="col-12 col-lg-6" v-if="origin.length > 0">
                  <span class="font-weight-bold">Longitud</span>
                  <v-text-field
                    outline
                    v-model="origin[0].lng"
                    label="Long. Origen"
                    solo
                    elevation="2"
                    disabled
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-12">
                  <p class="font-weight-bold">Destino:</p>
                  <v-text-field
                    label="Direccción de Destino"
                    solo
                    elevation="2"
                    disabled
                    v-model="addressDestination"
                  />
                </v-col>

                <v-col class="col-12 col-lg-6" v-if="destination.length > 0">
                  <span class="font-weight-bold">Latitud</span>
                  <v-text-field
                    v-model="destination[0].lat"
                    label="Lat. Destino"
                    solo
                    elevation="2"
                    disabled
                  />
                </v-col>

                <v-col class="col-12 col-lg-6" v-if="destination.length > 0">
                  <span class="font-weight-bold">Longitud</span>

                  <v-text-field
                    v-model="destination[0].lng"
                    label="Long. Destino"
                    solo
                    elevation="2"
                    disabled
                  />
                </v-col>
              </v-row>
            </v-form>
            <p>
              Distance aproximada de tu ubicación al punto destino
              <span class="red--text font-weight-black">
                {{ distance }} Km
              </span>
            </p>

            <v-alert
              v-if="!hasLocationPermission"
              type="info"
              outlined
              class="mt-5"
            >
              Por favor, otorga permisos de ubicación en tu navegador para
              utilizar esta funcionalidad.
            </v-alert>
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
import {
  defineComponent,
  useStore,
  computed,
  ref,
  watch,
  onMounted,
} from "@nuxtjs/composition-api";
import Maps from "@/components/Maps/Maps.vue";
import Services from "@/services/Services";

export default defineComponent({
  name: "MapsPage",
  components: {
    Maps,
  },
  setup() {
    /** DATA */
    const services = ref(new Services());
    const store = useStore();
    const origin = computed(() => Array.from(store.getters.getOrigin));
    const destination = computed(() =>
      Array.from(store.getters.getDestination)
    );
    const addressOrigin = ref();
    const addressDestination = ref();
    const distance = ref(0);

    // METHODS
    onMounted(() => {
      setTimeout(() => {
        getAddressOrigin(origin.value[0]?.lat, origin.value[0]?.lng);
      }, 5000);
    });

    watch(
      () => destination.value[0]?.lat,
      (currentValue) => {
        calculateDistance();
        getAddressDestination(
          destination.value[0]?.lat,
          destination.value[0]?.lng
        );
      }
    );

    const getAddressOrigin = (lat, lng) => {
      services.value.getAddress(lat, lng).then(({ data }) => {
        addressOrigin.value = data.display_name;
      });
    };

    const getAddressDestination = (lat, lng) => {
      services.value.getAddress(lat, lng).then(({ data }) => {
        addressDestination.value = data.display_name;
      });
    };

    const calculateDistance = () => {
      if (
        origin.value &&
        origin.value.length > 0 &&
        destination.value &&
        destination.value.length > 0 &&
        origin.value[0]?.lat &&
        origin.value[0]?.lng &&
        destination.value[0]?.lat &&
        destination.value[0]?.lng
      ) {
        const radioEarthKm = 6371;

        const latitude1Deg = degreesARadians(origin.value[0].lat);
        const latitude2Deg = degreesARadians(destination.value[0].lat);
        const latitudeDiffRad = degreesARadians(
          destination.value[0].lat - origin.value[0].lat
        );
        const lengthDiffRad = degreesARadians(
          destination.value[0].lng - origin.value[0].lng
        );

        const a =
          Math.sin(latitudeDiffRad / 2) * Math.sin(latitudeDiffRad / 2) +
          Math.cos(latitude1Deg) *
            Math.cos(latitude2Deg) *
            Math.sin(lengthDiffRad / 2) *
            Math.sin(lengthDiffRad / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        distance.value = (radioEarthKm * c).toFixed(2);
      }
    };

    const degreesARadians = (grades) => {
      return (grades * Math.PI) / 180;
    };

    const updateOrigin = (value) => {
      store.dispatch("setOrigin", value);
    };

    const updateDestination = (value) => {
      store.dispatch("setDestination", value);
    };

    const setOrigin = (place) => {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      store.dispatch("setOrigin", location);
    };

    const setDestination = (place) => {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      store.dispatch("setDestination", location);
    };

    return {
      origin,
      destination,
      distance,
      addressOrigin,
      addressDestination,
      calculateDistance,
      degreesARadians,
      updateOrigin,
      updateDestination,
      setOrigin,
      setDestination,
    };
  },
});
</script>

<style lang="scss" scoped>
.container-form {
  max-height: 90vh;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* this is for Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.maps {
  z-index: 0;
}

.g-autocomplete {
  flex: 1 1 auto;
  line-height: 20px;
  padding: 8px 0 8px;
  max-width: 100%;
  min-width: 0px;
  width: 100%;
  border: #a4a4a4 1px solid;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem 0rem;
}
</style>
