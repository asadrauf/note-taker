// requiring fs that we will use to read from and write into the file
const fs = require("fs");

//Exporting app 
module.exports = function(app){

// Initialize notesData Array
let notesData = [];

app.get("/api/notes", function(err, res) {
    try {
      // Below we are reading the notes from our db.json file
      notesData = fs.readFileSync("./db/db.json", "utf8");
      console.log("Checkout db.json file which shoulb be updated!");

      // using parse so it will convert noteData array into an object
      notesData = JSON.parse(notesData);
  
      // Below code will handle the errors
    } catch (err) {
      console.log("\n error (in app.get.catch):");
      console.log(err);
    }
      // If there is not error we will send our notesData object to the browser
      res.json(notesData);
  });
  
  // writes the new note to the json file
  app.post("/api/notes", function(req, res) {
    try {
      // reads the json file
      notesData = fs.readFileSync("./db/db.json", "utf8");
      console.log(notesData);
  
      // parse the data to get an array of objects
      notesData = JSON.parse(notesData);
      // Set new notes id
      req.body.id = notesData.length;
      // add the new note to the array of note objects
      notesData.push(req.body); // req.body - user input
      // make it string(stringify)so you can write it to the file
      notesData = JSON.stringify(notesData);
      // writes the new note to file
      fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
        // error handling
        if (err) throw err;
      });
      // If there is not error we will send our notesData object to the browser
      res.json(JSON.parse(notesData));
  
      // error Handling
    } catch (err) {
      throw err;
      console.error(err);
    }
  });
  
  // Below code will delete the noteData object
  app.delete("/api/notes/:id", function(req, res) {
    try {
      //  reads the json file
      notesData = fs.readFileSync("./db/db.json", "utf8");
      // parse the data to get an array of the objects
      notesData = JSON.parse(notesData);
      // delete the old note from the array on note objects
      notesData = notesData.filter(function(note) {
        return note.id != req.params.id;
      });
      // make it string(stringify)so you can write it to the file
      notesData = JSON.stringify(notesData);
      // write the new notes to the file
      fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
        // error handling
        if (err) throw err;
      });
  
      // If there is not error we will send our notesData object to the browser
      res.send(JSON.parse(notesData));
  
      // error handling
    } catch (err) {
      throw err;
      console.log(err);
    }
  });
}