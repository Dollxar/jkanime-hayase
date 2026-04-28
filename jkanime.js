var jkanime = {
  id: "jkanime",
  name: "JKanime",

  async search(query) {
    return [
      {
        title: "Prueba funcionando: " + query,
        url: "https://jkanime.net"
      }
    ];
  },

  async episodes(url) {
    return [
      {
        number: 1,
        title: "Episodio 1",
        url: "https://jkanime.net"
      }
    ];
  },

  async stream(url) {
    return {
      url: "https://jkanime.net"
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = jkanime;
}

console.log("JKanime loaded");