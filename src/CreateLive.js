const helloAPI = require('hellosign-sdk')({key: 'abdshjdsj3543546'});
class CreateLive {
  constructor() {

  }

  async acknowledge(header, body) {
    const contractFile = await this._download(body)
      .catch((err) => {
        throw err;
      });
  }

  async _download(body) {
    const requestID = body.signature_request.signature_request_id;
    const downloadedData = await helloAPI.signatureRequest.download(requestID, {file_type: 'pdf'})
      .then((res) => {
        return new Promise((resolve, reject) => {
          let downloadData = Buffer.from('');
          res.on('data', (data) => {
            downloadData = Buffer.concat([downloadData, data]);
          });
          res.on('end', () => {
            resolve(downloadData);
          });
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
    console.log(downloadedData)
    return downloadedData;
  }
}
module.exports = CreateLive;