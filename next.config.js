module.exports = {
  exportPathMap: function() {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
      "/p/975": { page: "/post", query: { id: "975" } },
      "/p/481": { page: "/post", query: { id: "481" } },
      "/p/504": { page: "/post", query: { id: "504" } }
    };
  }
};
