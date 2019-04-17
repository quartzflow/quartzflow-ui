/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const JOB_DATA_FILE = path.join(__dirname, 'server-job-data.json');
const ACTIVE_JOB_DATA_FILE = path.join(__dirname, 'server-active-job-data.json');


app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/jobs', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');

  if (req.query.criteria == 'executing') {
    fs.readFile(ACTIVE_JOB_DATA_FILE, (err, data) => {
      res.json(JSON.parse(data));
    });
  }
  else {
    fs.readFile(JOB_DATA_FILE, (err, data) => {
      res.json(JSON.parse(data));
    });
  }
});

app.get('/jobs/:jobId', (req, res) => {
  let id = req.params.jobId;

  res.setHeader('Cache-Control', 'no-cache');

    fs.readFile(JOB_DATA_FILE, (err, data) => {
      const jobs = JSON.parse(data);
      let indexOfJobItemToUpdate = jobs.findIndex(i => i.id == id);
      res.json(jobs[indexOfJobItemToUpdate]);
    });
});

app.put('/jobs', (req, res) => {
  fs.readFile(JOB_DATA_FILE, (err, data) => {
    const jobs = JSON.parse(data);
    let action = req.body.actionToTake;

    if (action == 'pause') {
      jobs.forEach((job, index) => {
        job.status = 'Paused'
      });
    } else if (action == 'resume') {
      jobs.forEach((job, index) => {
        job.status = 'Active'
      });
    }
    fs.writeFile(JOB_DATA_FILE, JSON.stringify(jobs, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      //res.json(jobs);
      res.sendStatus(200);
    });
  });
});

app.put('/jobs/:jobId', (req, res) => {
  let action = req.body.actionToTake;
  let id = req.params.jobId;

  res.setHeader('Cache-Control', 'no-cache');

  if (action == 'kill') {
    fs.readFile(ACTIVE_JOB_DATA_FILE, (err, data) => {
      const jobs = JSON.parse(data);
      let indexOfJobItemToUpdate = jobs.findIndex(i => i.id == id);
      jobs.splice(indexOfJobItemToUpdate, 1);
      fs.writeFile(ACTIVE_JOB_DATA_FILE, JSON.stringify(jobs, null, 4), () => {
        //res.json(jobs);
        res.sendStatus(200);
      });
    });
  } else {
    fs.readFile(JOB_DATA_FILE, (err, data) => {
      const jobs = JSON.parse(data);
      let indexOfJobItemToUpdate = jobs.findIndex(i => i.id == id);

      if (action == 'pause') {     
        jobs[indexOfJobItemToUpdate].status = 'Paused';
      } else if (action == 'resume') {
        jobs[indexOfJobItemToUpdate].status = 'Active';
      }

      fs.writeFile(JOB_DATA_FILE, JSON.stringify(jobs, null, 4), () => {
        //res.json(jobs[indexOfJobItemToUpdate]);
        res.sendStatus(200);
      });
    });
  }
});


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
