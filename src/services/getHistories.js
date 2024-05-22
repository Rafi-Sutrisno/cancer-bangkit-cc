const { Firestore } = require("@google-cloud/firestore");

async function getHistories() {
  const db = new Firestore();

  const firestoredb = db.collection("predictions");
  const getData = await firestoredb.get();
  const AllHistories = [];

  getData.forEach((prediction) => {
    const currData = {
      id: prediction.id,
      history: prediction.data(),
    };
    AllHistories.push(currData);
  });
  return AllHistories;
}

module.exports = getHistories;
