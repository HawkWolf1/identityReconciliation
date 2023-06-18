const mongoose = require('mongoose');


const mongoConnect = async (callback) => {
    try {
      const client = await mongoose.connect(
        'mongodb+srv://iamhoneysights:Bucketone23@identity0.fwu66gf.mongodb.net/'
      );
      console.log('MongoDB connected!');
      callback(client);
    } catch (err) {
      console.log(err);
    }
  };




module.exports = mongoConnect