let User = require('../../Backend/models/user.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../Backend/app');
let expect = require('chai').expect;

chai.use(chaiHttp);

describe('user controller', () => {

  beforeEach( async () => {
    const signup = await chai.request(app)
    .post('/api/user/signup')
    .send({email: 'devchai@test.com', password: 'welkom'})
    expect(signup).to.be.a('object');
    expect(signup.status).to.equal(201);
  })

  afterEach(async () => {
    await User.deleteMany();
  });

  describe('/Signup', () => {
    it('Should register a user', async() => {
      const signup = await chai.request(app)
      .post('/api/user/signup')
      .send({email: 'testSignup@test.com', password: 'welkom'})
      expect(signup).to.be.a('object');
      expect(signup.status).to.equal(201);
    });
  })

  describe('/Login', () => {
    it('it return 200 if credentials are correct', async () => {
      const login = await chai.request(app)
      .post('/api/user/login')
      .send({email: 'devchai@test.com', password: 'welkom'})
      expect(login).to.be.a('object');
      expect(login.status).to.equal(200);
      expect(login.body).to.have.property('token');
    });

  });
})
