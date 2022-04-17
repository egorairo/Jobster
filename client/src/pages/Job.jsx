import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Header from '../components/Header/Header';
import JobInfo from '../components/JobInfo/JobInfo.jsx';

export default function Job() {
  const {id} = useParams();

  const jobs = useSelector((state) => state.jobs);

  const job = jobs.find((job) => job.id === id);

  return (
    <>
      <Header />
      <JobInfo job={job} />
    </>
  );
}
