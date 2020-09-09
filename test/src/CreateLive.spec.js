const CreateLive = require('../../src/CreateLive');
const fs = require('fs').promises;
const path = require('path');
describe('CreateLive', () => {
  describe('acknowledge', function() {
    it('should call _download', async () => {
        const event = {
            body: {
                signature_request: {
                    signature_request_id: 'uwqyeuyeuwqryiuw34342532',
                },
            },
        };

        const contract = await fs.readFile('/mnt/c/Users/jared/Projects/scratch/hellosign/test/data/contract.pdf')
            .catch((err) => {
                console.log(err);
            });
        console.log(contract);
        nock('https://api.hellosign.com:443', {"encodedQueryParams":true})
            .get('/v3/signature_request/files/' + event.body.signature_request.signature_request_id, "file_type=pdf")
            .query({"file_type":"pdf"})
            .reply(200, {a:'b'}, {});
            // .reply(200, contract, [
            //     'Access-Control-Allow-Headers',
            //     'Authorization, Origin, X-Requested-With, Content-Type, Accept',
            //     'Access-Control-Allow-Methods',
            //     'GET, POST, OPTIONS',
            //     'Access-Control-Allow-Origin',
            //     '*',
            //     'Cache-Control',
            //     'cache-control=must-revalidate',
            //     'Content-Description',
            //     'File Transfer',
            //     'Content-Disposition',
            //     'attachment; filename="abcd"',
            //     'Content-Transfer-Encoding',
            //     'binary',
            //     'Content-Type',
            //     'application/pdf',
            //     'Date',
            //     'Fri, 26 Jun 2020 16:39:49 GMT',
            //     'ETag',
            //     '"57c83-0"',
            //     'Expires',
            //     'Sat, 26 Jul 1997 05:00:00 GMT',
            //     'Last-Modified',
            //     'Fri, 26 Jun 2020 16:39:50 GMT',
            //     'P3P',
            //     'CP="NOP3PPOLICY"',
            //     'Pragma',
            //     'public: 1',
            //     'Server',
            //     'Apache',
            //     'Strict-Transport-Security',
            //     'max-age=15768000',
            //     'Content-Length',
            //     '359555',
            //     'Connection',
            //     'Close'
            // ]);
        const createEvent = new CreateLive();
        const actual = await createEvent.acknowledge(event.headers, event.body)
            .catch(function(err) {
                console.log(err);
                expect(function() { throw err })
                    .to.not.throw();
                });
            });
  });
});