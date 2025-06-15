/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name:Abdullatif Metwalli-Shetawi  Student ID:145707220  Date: 2025-06-15
*
********************************************************************************/
const express = require("express");
const app = express();
const projectData = require("./modules/projects");

const HTTP_PORT = process.env.PORT || 3000;

projectData.initialize().then(() => {
    

   
    app.get("/", (req, res) => {
        res.send("Assignment 3: Abdullatif - 123456789"); 
    });

    
    app.get("/solutions/projects", (req, res) => {
        projectData.getAllProjects()
            .then(projects => res.json(projects))
            .catch(err => res.status(500).send(err));
    });

    
    app.get("/solutions/projects/id-demo", (req, res) => {
        projectData.getProjectById(9) 
            .then(project => res.json(project))
            .catch(err => res.status(404).send(err));
    });

    
    app.get("/solutions/projects/sector-demo", (req, res) => {
        projectData.getProjectsBySector("agriculture") 
            .then(projects => res.json(projects))
            .catch(err => res.status(404).send(err));
    });

    
    app.listen(HTTP_PORT, () => {
        console.log(`Server is listening on port ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log("Initialization failed: ", err);
});