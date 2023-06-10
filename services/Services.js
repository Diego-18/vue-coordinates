import axios from "axios";

const APIMaps = "https://nominatim.openstreetmap.org/";

export default class Services {
  getAddress(lat, lng) {
    const url = `${APIMaps}reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    return axios.get(url);
  }

  getCoords(data) {
    const url = `${APIMaps}search?format=jsonv2&q=${data}`;
    return axios.get(url);
  }
}
