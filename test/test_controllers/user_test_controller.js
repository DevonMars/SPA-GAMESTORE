let User = require('../../Backend/models/user.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../Backend/app');
let expect = require('chai').expect;

chai.use(chaiHttp);

describe('user controller', () => {

  // before( async () => {
  //   const signup = await chai.request(app)
  //   .post('/api/user/signup')
  //   .send({email: 'devchai@test.com', password: 'welkom'})
  //   expect(signup).to.be.a('object');
  //   expect(signup.status).to.equal(201);
  // });

  afterEach(async () => {
    await User.deleteOne({"email" : "testSignup@test.com"});
  });

  describe('/Signup', () => {
    it('Should not register a user if email already exist', async() => {
      const user1 = new User({ email: "testSignup@test.com", password: 'welkom'});
      user1.save()
      const userCreate = await chai.request(app)
      .post('/api/user/signup')
      .send({email: "testSignup@test.com", password: 'welkom'})
      expect(userCreate.status).to.equal(500);
    });

    it('Should register a user if creds are valid', async() => {
      const signup = await chai.request(app)
      .post('/api/user/signup')
      .send({email: 'testSignup@test.com', password: 'welkom'})
      expect(signup).to.be.a('object');
      expect(signup.status).to.equal(201);
    });
  });

  describe('/Login', () => {
    it('it return 401 if cred is invalid', async () => {
      const loginfailed = await chai.request(app)
      .post('/api/user/login')
      .send({email: 'devchai@test.com', password: 'welkom1'})
      expect(loginfailed.status).to.equal(401);
    });
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
