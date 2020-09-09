const NockWorking = require('../../src/NockWorking');

const fs = require('fs').promises;
const path = require('path');
describe('NockWorking', () => {
  describe('acknowledge', function() {
    it('should call _download', async () => {
        const contract = await fs.readFile(path.join(__dirname, '../data/', 'contract.pdf'))
            .catch((err) => {
                console.log(err);
            });

        nock('https://www.vodafone.co.uk', {"encodedQueryParams":true})
            .get('/cs/groups/public/documents/document/vfcon102701.pdf')
            .reply(200, contract);
            
        const nockWorking = new NockWorking();
        const actual = await nockWorking.acknowledge()
            .catch(function(err) {
                console.log(err);
                expect(function() { throw err })
                    .to.not.throw();
                });
            });
  });
});