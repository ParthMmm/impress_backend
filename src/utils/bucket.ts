import AWS from 'aws-sdk';
import fs from 'fs';

const s3 = new AWS.S3({
  accessKeyId: process.env.KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
});

const params = { Bucket: process.env.BUCKET_NAME };

const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync(fileName);
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: '',
    Body: fileContent,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

export default uploadFile;
