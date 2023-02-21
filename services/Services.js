import axios from 'axios'

const APIMaps = 'https://nominatim.openstreetmap.org/'
export default class Services {
  getAddress(lat, lng) {
    return axios.get(
      APIMaps + 'reverse?format=jsonv2&lat=' + lat + '&lon=' + lng,
    )
  }

  getCoords(data) {
    return axios.get(APIMaps + 'search?format=jsonv2&q=' + data)
  }
}
