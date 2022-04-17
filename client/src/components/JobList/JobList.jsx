/* eslint-disable react/prop-types */
import React from 'react';
import {Link} from 'react-router-dom';

import defaultLogo from '../../img/defaultLogo.jpeg';
import s from './JobList.module.css';

export default function JobList({jobs}) {
  return (
    <div className={s.container}>
      {jobs.map((job) => {
        const publicationDate = new Date(job.date);

        if (!job.company_logo) {
          job.company_logo = defaultLogo;
        }

        return (
          <Link
            to={`/job/${job.id}`}
            key={job.id}
            className="jobLink"
          >
            <div className={s.containerLogoNamePos}>
              <img src={job.company_logo} className={s.img}></img>
              <div className={s.containerNamePos}>
                <div>
                  <p className={s.companyName}>{job.company}</p>
                  <p className={s.position}>{job.position}</p>
                </div>
              </div>
            </div>
            <div className={s.containerTimeLocation}>
              <div className={s.location}>
                <span className={s.locationIcon}>📍</span>
                <p>{job.location}</p>
              </div>
              <div className={s.date}>
                <span className={s.timeIcon}>🕓</span>
                <p>{publicationDate.toDateString()}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
