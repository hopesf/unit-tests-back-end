const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');

let movieId, testCategory;

describe('Movie End Points', ()=>{
    it('(Post /kayit) yeni film kaydi eklemeli', (done)=>{
        chai.request(server)
            .post('/kayit')
            .send( { name: "testName", category: "testCategory", imdb:1 } )
            .end( (err, res) =>{
                res.should.have.status(200);
                res.body.should.have.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('category');
                res.body.should.have.property('imdb');
                movieId = res.body._id;
                testCategory = res.body.category;
                done();
            });
    });

    it('(Get /movies) tum filmlere erismeli', (done)=>{
        chai.request(server)
            .get('/movies')
            .end( (err, res) =>{
               res.should.have.status(200);
               res.body.should.have.be.a('array');
               done();
            });
    })

    it('(Get /category/:category) yazilan kategoriye sahip filmlere erismeli', (done)=>{
        chai.request(server)
            .get('/category/'+ testCategory)
            .end( (err, res) =>{
                res.should.have.status(200);
                done();
            });

    });

    it('(Get /movie/:searchid) girilen id adresli film bulunmali', (done) =>{
       chai.request(server)
           .get('/movie/' + movieId)
           .end( (err, res)=>{
               res.should.have.status(200);
               res.body.should.have.be.a('object');
               res.body.should.have.property('name');
               res.body.should.have.property('category');
               res.body.should.have.property('imdb');
               res.body.should.have.property('_id').eql(movieId);
               done();
           });
    });

    it('(Delete /movie/:movieId) girilen id adresli film silinmeli', (done) =>{
       chai.request(server)
           .delete('/movie/'+ movieId)
           .end( (err, res) =>{
               res.should.have.status(200);
               res.body.should.have.be.a('object');
               res.body.should.have.property('_id').eql(movieId);
               done();
           });
    });


});