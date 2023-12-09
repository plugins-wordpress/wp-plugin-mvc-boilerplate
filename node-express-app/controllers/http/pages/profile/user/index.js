'use strict';
// Import required models and modules
const User = require('../../../../../models/User');
const Connection = require('../../../../../models/Connection');
const Team = require('../../../../../models/Team');
const Project = require('../../../../../models/Project');
const { createDataFileWithStream } = require('../../../../../src/modules/helper')();

// Normalize user profile project data
const normalizeUserProfileProjectData = (data = []) => {
  let id = 1;
  const jsonData = [];
  for (let datum of data) {
    let output = {};
    output['id'] = id;
    output['project_img'] = datum.avatar || '';
    output['project_leader'] = 'Freddy';
    output['project_name'] = datum.name || ' ';
    output['team'] = ["1.png", "3.png", "4.png"];
    output['data'] = '09 Feb 2021';
    output['status'] = datum.status + '%';
    jsonData.push(output);
    id = id + 1;
  }
  return jsonData;
};

// Render the user profile view and retrieve related data
exports.index = async (req, res, next, connection = new Connection(), team = new Team(), project = new Project()) => {
  // Retrieve user connections, teams, and projects
  const connections = await connection.connections(req.user);
  const teams = await team.userTeams(req.user, 5);
  const projects = await project.userProjects(req.user, 5);

  // Create a data file with normalized project data (not currently used)
  // createDataFileWithStream({ data: normalizeUserProfileProjectData(projects) }, 'user-lab-profile');

  console.log('user profile items', projects);

  // Render the user profile view and pass the retrieved data to the view
  return res.render('pages-profile-user', { user: req.user, connections, teams });
};

// Placeholder for the user profile creation (not implemented)
exports.store = (req, res, next, user = new User()) => {};

// Placeholder for displaying user profile details (not implemented)
exports.show = (req, res, next, user = new User()) => {};

// Placeholder for editing user profile (not implemented)
exports.edit = (req, res, next, user = new User()) => {};

// Placeholder for updating user profile (not implemented)
exports.update = (req, res, next, user = new User()) => {};

// Placeholder for deleting user profile (not implemented)
exports.destroy = (req, res, next, user = new User()) => {};
