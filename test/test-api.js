const app = require('../server');
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);
describe("Server!", () => {
    it("api gives a 200", done => {
      chai
        .request(app)
        .get("/version")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return valid payload', done => {
      chai
        .request(app)
        .get("/version")
        .end((err, res) => {
          expect('Content-Type', /json/);
          done();
        });
    });
});

