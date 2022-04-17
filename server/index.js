/* eslint-disable no-undef */

const express = require('express');
const request = require('request');
const axios = require('axios');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

let jobs = [];

function removeDuplicates(array) {
  let uniq = {};
  return array.filter(
    (obj) => !uniq[obj.id] && (uniq[obj.id] = true)
  );
}

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://remoteok.com/api');

    const jobsData = response.data;

    jobs = [
      ...jobs,
      ...jobsData.filter(({id}) => {
        return id;
      }),
    ];

    const jobsWithoutDuplicates = removeDuplicates(jobs);

    res.send(jobsWithoutDuplicates);
  } catch (error) {
    console.error(error);
  }
});

app.post('/post-job', (req, res) => {
  jobs.unshift(req.body);

  res.send('ok');
});

app.listen(8888);
