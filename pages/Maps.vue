<template>
  <v-row>
    <v-col>
      <v-card class="ma-5">
        <v-row class="ml-1 mr-1">
          <v-divider />
          <v-col class="col-12 col-lg-6 col-xl-6">
            <v-row class="pb-0 pt-5">
              <v-col class="col-12 col-lg-12 col-xl-12 pb-0 pt-0">
                <v-text-field
                  v-model="origin"
                  label="Dirección de origen"
                  outlined
                  disabled
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="col-6 col-lg-6 col-xl-6 ml-0 mr-0">
                <v-text-field
                  v-model="coordOrigin[0]"
                  label="Lat. Origen"
                  solo
                  elevation="2"
                  disabled
                />
              </v-col>
              <v-col class="col-6 col-lg-6 col-xl-6 ml-0 mr-0">
                <v-text-field
                  v-model="coordOrigin[1]"
                  label="Long. Origen"
                  solo
                  elevation="2"
                  disabled
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="col-10 col-lg-10 col-xl-10 pb-0 pt-0">
                <v-text-field
                  v-model="destination"
                  label="Dirección de destino"
                  outlined
                />
              </v-col>

              <v-col class="col-2 col-lg-2 col-xl-2">
                <v-flex text-right>
                  <v-btn elevation="2" fab icon small @click="showCoords">
                    <v-icon>mdi-update</v-icon>
                  </v-btn>
                  <v-btn
                    elevation="2"
                    fab
                    icon
                    small
                    color="error"
                    @click="removeAddress"
                  >
                    <v-icon>mdi-delete-circle</v-icon>
                  </v-btn>
                </v-flex>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="col-6 col-lg-6 col-xl-6 ml-0 mr-0">
                <v-text-field
                  v-model="coordDestination[0]"
                  label="Lat. Destino"
                  solo
                  elevation="2"
                  
                />
              </v-col>
              <v-col class="col-6 col-lg-6 col-xl-6 ml-0 mr-0">
                <v-text-field
                  v-model="coordDestination[1]"
                  label="Long. Destino"
                  solo
                  elevation="2"

                />
              </v-col>
            </v-row>
          </v-col>
          <v-col class="maps col-12 col-lg-6 col-xl-6 pb-0 pt-0">
            <Maps :Origin="coordOrigin" :Destination="coordDestination"/>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  watch,
} from "@nuxtjs/composition-api";
import Maps from "@/components/Maps/Maps.vue";
import Service from "../services/Services";

export default defineComponent({
  name: "MapsPage",
  components: {
    Maps,
  },
  setup() {
    /** DATA */
    const service = ref(new Service());
    const origin = ref();
    const destination = ref();
    const coordOrigin = ref([]);
    const coordDestination = ref([]);

    /** Methods */
    onMounted(() => {
      getLocationCurrent();
    });

    const getLocationCurrent = () => {
      if (navigator.geolocation) {
        const success = function (position) {
          coordOrigin.value.push(position.coords.latitude);
          coordOrigin.value.push(position.coords.longitude);

          service.value
            .getAddress(coordOrigin.value[0], coordOrigin.value[1])
            .then((data) => {
              origin.value = data.data.display_name;
            });
        };
        navigator.geolocation.getCurrentPosition(success, function (msg) {
          console.error(msg);
        });
      }
    };

    /** MAPS */

    const showCoords = () => {
      getDestination();
    };

    const getDestination = () => {
      const encodeLocation = encodeURIComponent(destination);
      service.value.getCoords(encodeLocation).then((data) => {
        coordDestination.value = [];
        coordDestination.value.push(data.data[0].lat);
        coordDestination.value.push(data.data[0].long);
        destination.value = data.data[0].display_name;
      });
    };

    const removeAddress = () => {
      coordDestination.value = ref([]);
      destination.value = "";
    };
    /** END MAPS */

    return {
      origin,
      destination,
      coordOrigin,
      coordDestination,
      showCoords,
      removeAddress
    };
  },
});
</script>
