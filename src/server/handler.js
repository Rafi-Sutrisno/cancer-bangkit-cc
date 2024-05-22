const predictClassification = require("../services/inferenceService");
const storeData = require("../services/storeData");
const getHistories = require("../services/getHistories");

async function predictionHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const { result, suggestion } = await predictClassification(model, image);

  const data = {
    id: id,
    result: result,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: "success",
    message: "Model is predicted successfully.",
    data,
  });
  response.code(201);
  return response;
}

async function getPredictionHandler(request, h) {
  // const histories = [];
  const histories = await getHistories();

  const response = h.response({
    status: "success",
    data: histories,
  });
  response.code(200);
  return response;
}

module.exports = { predictionHandler, getPredictionHandler };
