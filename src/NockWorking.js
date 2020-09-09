const http = require('https');
class NockWorking {
  constructor() {

  }

  async acknowledge() {
    const contractFile = await this._download()
      .catch((err) => {
        throw err;
      });
  }

  async _download() {
    return new Promise((resolve, reject) => {
        const get = http.get('https://www.vodafone.co.uk/cs/groups/public/documents/document/vfcon102701.pdf', (res) => {
            let downloadData = Buffer.from('');
            res.on('data', (data) => {
                downloadData = Buffer.concat([downloadData, data]);
            });
            res.on('end', () => {
                resolve(downloadData);
            });
        })
        
    })
    
    
  }
}

module.exports = NockWorking;