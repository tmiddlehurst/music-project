var Band = require('../../models/band');


// likeBand

function likeBand (req, res) {
  Band.findByIdAndUpdate(
    req.params.id,
      {$inc: {likes:1}},
      { runValidators: true },
      function(err , band){
        if(err) return res.status(500).json({error: err.message});
        // redirect the user to a GET route. We'll go back to the INDEX.
        res.status(204).json(band);
      }
    );
}

// INDEX - GET /
function indexBand(req , res) {
  // get the model to load all the bands. wait for data in the callback
  Band.find({} , function(err, bands) {
    if(err) res.status(500).json({error: err.message});
    // data return so now we can render
    res.status(200).json(bands);
  });
}

// SHOW - GET /:id
function showBand(req , res) {

  Band.findById(req.params.id , function(err, band) {
    // check for errors or for no object found
    if(!band) return res.status(404).send("Not found");
    if(err) res.status(500).json({error: err.message});


    res.status(200).json(band);
  });
}

// DELETE - DELETE /:id
function deleteBand(req , res) {
  // tell the data store to remove the band with the id in the request
  Band.findByIdAndRemove(req.params.id , function(err) {
      if(err) return res.status(500).json({error: err.message});
      // redirect to a GET request
      res.status(204).json({
        message: "Successful deletion"
      });
  });

}

// UPDATE - UPDATE /:id
function updateBand(req , res) {
    // load, bind and save all in one hit
    Band.findByIdAndUpdate(
        req.params.id,
        { $set:  req.body },
        { runValidators: true },
        function(err , band){
          if(err) return res.status(500).json({error: err.message});
          // redirect the user to a GET route. We'll go back to the INDEX.
          res.status(204).json(band);
        }
    );

}


// CREATE - band /
function createBand(req , res) {
  // ask mongoose to save the data for us and wait for the response
  Band.create( req.body , function(err, band){
    // check for errors and return 500 if there was a problem
    if(err) return res.status(500).json({error: err.message});

    // redirect the user to a GET route. We'll go back to the INDEX.
    res.status(201).json({
      message: "Successfully created",
      band: band
    });
  });
}



// export all our controller functions in an object
module.exports = {

  index:indexBand,
  show: showBand,
  delete: deleteBand,
  update: updateBand,
  create: createBand,
  like: likeBand

}