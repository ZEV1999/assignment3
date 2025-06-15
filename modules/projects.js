
const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = projectData.map(proj => {
                const sectorObj = sectorData.find(sec => sec.id === proj.sector_id);
                return {
                    ...proj,
                    sector: sectorObj ? sectorObj.sector_name : "Unknown"
                };
            });
            resolve();
        } catch (err) {
            reject("Failed to initialize project data.");
        }
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        resolve(projects);
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const proj = projects.find(p => p.id === projectId);
        proj ? resolve(proj) : reject("Unable to find requested project");
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const results = projects.filter(p =>
            p.sector.toLowerCase().includes(sector.toLowerCase())
        );
        results.length > 0
            ? resolve(results)
            : reject("Unable to find requested projects");
    });
}

module.exports = {
    initialize,
    getAllProjects,
    getProjectById,
    getProjectsBySector
};