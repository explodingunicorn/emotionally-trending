const { updateDb } = require("./twitter/updateDb");


const main = async () => {
  await updateDb();
  console.log('db updated');
};

main();