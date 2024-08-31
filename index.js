let express = require("express");
let StudentArray = require("./initialData");
const studentArray = require("./initialData");
let app = express();
app.use(express.json());
let PORT = 3000;

app.get("/student", (req, res) => {
  res.send(StudentArray);
});

app.get("/student/:id", (req, res) => {
  let studentId = parseInt(req.params.id);
  let studentData = studentArray.find((item) => item.id == studentId);
  console.log(studentId,studentData);

  if(studentData === undefined) {
    res.status(404).json({ message: "Student id not found" });
  } else {
    res.send(studentData);
  }
});

app.post("/student", (req, res) => {
const objkeys= Object.keys(req.body);
let studentData = req.body;
if(objkeys.find(item =>{return item=="id"}) && objkeys.find(item =>{return item=="name"}) && objkeys.find(item =>{return item =="Age"}) && objkeys.find(item =>{return item=="grade"})){
studentArray.push(studentData);
res.send(studentData);
}
else{
    res.status(404).json({message:"Invalid request"});
}
});

app.put("/student/:id", (req, res) => {
    let studentId = parseInt(req.params.id);
    let studentData = studentArray.find((item) => item.id == studentId);
    if(studentData === undefined) {
      res.status(404).json({ message: "Student id not found" });
    } else {
     let newObj = req.body;
     let studentObj={...studentData,...newObj};
     let index = studentArray.indexOf(studentData);
     studentArray.splice(index, 1, studentObj);
     console.log(studentArray);
     res.send(studentArray);
    }
  });

  app.delete("/student/:id", (req, res) => {
    let studentId = parseInt(req.params.id);
    let studentData = studentArray.find((item) => item.id == studentId);
    if(studentData === undefined) {
      res.status(404).json({ message: "Student id not found" });
    } else {
     let index = studentArray.indexOf(studentData);
     studentArray.splice(index, 1);
     console.log(studentArray);
     res.send(studentArray);
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
