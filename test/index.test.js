const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');

chai.use(chaiHttp);

describe('Node Server', ()=>{
    it(' (Get /) anasayfayi dondurur', (done)=>{
        chai.request(server)
            .get('/')
            .end( (err,res) =>{
                res.should.have.status(200);
                done();
            });
    });
});