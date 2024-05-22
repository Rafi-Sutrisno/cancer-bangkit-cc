const tf = require("@tensorflow/tfjs-node");

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ["Cancer", "Non-Cancer"];

    //   const classResult2 = tf.argMax(prediction, 1).dataSync()[0];
    //   const label2 = classes[classResult];

    let classResult;

    if (probabilities[0] > 0.5) {
      classResult = 0;
    } else {
      classResult = 1;
    }

    const label = classes[classResult];

    if (label === "Cancer") {
      result = "Cancer";
      suggestion = "Segera periksa ke dokter!";
    }

    if (label === "Non-Cancer") {
      result = "Non_Cancer";
      suggestion = "Anda sehat!";
    }

    return { result, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}
module.exports = predictClassification;
