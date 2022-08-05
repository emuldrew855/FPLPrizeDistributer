const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("Test /application", () => {
  it("health should be okay", (done) => {
    chai
      .request(server)
      .get("/")
      .end((_err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("Test /setUpLeague", () => {
  it("health should be okay", (done) => {
    const prizes = [{ id: 1, prize: 80 }];
    chai
      .request(server)
      .post("/setUpLeague")
      .send(prizes)
      .end((_err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
