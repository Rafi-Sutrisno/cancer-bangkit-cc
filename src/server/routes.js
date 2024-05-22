const {
  predictionHandler,
  getPredictionHandler,
} = require("../server/handler");

const routes = [
  {
    method: "POST",
    path: "/predict",
    handler: predictionHandler,
    options: {
      payload: {
        /*Mengizinkan data berupa gambar*/
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 1000000,
      },
    },
  },
  {
    method: "GET",
    path: "/predict/histories",
    handler: getPredictionHandler,
  },
];

module.exports = routes;
