var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fleet");

var vehicleSchema = new mongoose.Schema({
   name: String,
   year: Number,
   make: String,
   model: String,
   odometer: Number,
   units: String
});

var Vehicle = mongoose.model("Vehicle", vehicleSchema);

Vehicle.find({}, function(err, vehicles) {
   if(err) {
      console.log("error finding query for vehicle");
   }   
   else {
      console.log(vehicles);
   }
});

// var stinky = new Vehicle({name: "stinky", year: 1980, make: "MBZ", model: "300D", odometer: 174000, units: "Imp. US"});
// stinky.save(function (err, vehicle) {
//    if(err) {
//       console.log("failu`re saving " + vehicle.name + " to database");
//       console.log(err);
//    }  
//    else {
//       console.log("added to db:");
//       console.log(vehicle);
//    }
// });

// adding a new vehicle to the fleet
console.log("runnen dat sweet sweet scwlabl");
// retrieve the fleet db contents