const BASE_URL = "http://localhost:3000"

function getImageUrl(url) {
  return `${BASE_URL}/${url}`
}

module.exports = {
    getImageUrl
}