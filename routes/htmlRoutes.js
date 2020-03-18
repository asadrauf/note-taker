const path = require("path");


module.exports = function(app) {
  // html route that will return us to the notes.html page
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  
  // html route that will return us to the index page
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  
  app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "db/db.json"));
  });
  
  };