var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var expect = require('chai').expect;
var Band = require('../models/band');

chai.use(chaiHttp);

describe('Bands', function() {
	var band = new Band({
		name: 'Wham!',
		yearsActive: ['1981-1986', '1988', '1991'],
		genre: ['Dance-pop', 'Post-disco'],
		members: 2,
		rating: 5,
		image: 'https://upload.wikimedia.org/wikipedia/en/7/7b/Whammake2.jpg'
	});

	beforeEach(function() {
	band.save(function(err, newBand) {
		if (err) return console.log(err);
		/* This might cause an error because .id was changed to .name */
		console.log("made newBand with name " + newBand.name);
		car.band = newBand.name;
	})
	})

	afterEach(function() {
		/* again, .id changed to .name */
		Band.findByIdAndRemove(band.name, function(err) {
			if (err) return console.log(err);
		})
	})

	it('should list ALL bands on / GET', function(done) {
		var request = chai.request(app);
		request
			.get('/')
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.html;
				res.text.should.match("All bands");
				res.text.should.match("Wham!");
				done();
			});
	});

	//========================SHOW===================================

  // it('should list a SINGLE car on /<id> GET', function(done) {
  //   chai.request(app)
  //     .get('/' + car.id)
  //     .end(function(err, res){
  //       res.should.have.status(200);
  //       res.should.be.html;
  //       res.text.should.match(/Post 1/);
  //       done();
  //     });
  // });

	//===============================================================

	//========================CREATE=================================

	// it('should add a SINGLE car on / POST' , function(done){
	// var request = chai.request(app);
	// request.post('/')
	//   .set('content-type', 'application/x-www-form-urlencoded')
	//   .send({
	//     _id: 123,
	//     color: "green",
	//     make: "nissan",
	//     model: "micra",
	//     bhp: 90,
	//     year: 2011,
	//     miles: 40000
	//   })
	//   .end(function(err, res){
	//     res.should.have.status(200);
	//     res.should.be.html;
	//     res.text.should.match(/All cars/);
	//     request
	//       .get('/123')
	//       .end(function(err, res){
	//         res.should.have.status(200);
	//         res.should.be.html;
	//         res.text.should.match(/green/);
	//         res.text.should.match(/micra/);

	//         Car.findByIdAndRemove(123, function(err) {
	//           if (err) return console.log(err);
	//           done();
	//         });
	//       });
	//   });
	// });

	//===============================================================

	//========================UPDATE=================================

	// // describe a test for PUT
	// it('should update a SINGLE car on /<id> PUT' , function(done){
	//   var request = chai.request(app);
	//   request.put('/' + car.id)
	//     .set('content-type', 'application/x-www-form-urlencoded')
	//     .send({'color': 'blue', 'miles': 70000})
	//     .end(function(err, res){
	//       res.should.have.status(200);
	//       res.should.be.html;
	//       res.text.should.match(/All cars/);
	//       request
	//         .get('/' + car.id)
	//         .end(function(err, res){
	//           res.should.have.status(200);
	//           res.should.be.html;
	//           res.text.should.match(/blue/);
	//           res.text.should.match(/miles/);
	//           done();
	//         });
	//     });
	// });

	//===============================================================

	//========================DELETE=================================

	// it('should delete a SINGLE car on /<id> DELETE' , function(done) {
	// 	var request = chai.request(app);
	//     request.delete('/' + car.id)
	//       .end(function(err, res){
	//         res.should.have.status(200);
	//         res.should.be.html;
	//         res.text.should.match(/All cars/);
	//         request
	//           .get('/' + car.id)
	//           .end(function(err, res){
	//             res.should.have.status(404);
	//             done();
	//           });
	//       });
 //  	});
	//===============================================================  
});


