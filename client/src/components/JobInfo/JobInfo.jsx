/* eslint-disable react/prop-types */
import React from 'react';

import defaultLogo from '../../img/defaultLogo.jpeg';
import s from './JobInfo.module.css';

export default function JobInfo({job}) {
  let publicationDate = new Date(job.date);

  if (!job.company_logo) {
    job.company_logo = defaultLogo;
  }

  return (
    <section>
      <div className={s.backToJobList}>
        <a className={s.a} href="/">
          ← Back to search
        </a>
      </div>
      <div className={s.mainContainer}>
        <div className={s.jobContainer}>
          <div className={s.titleContainer}>
            <h1 className={s.position}>{job.position}</h1>
          </div>
          <div className={s.dateContainer}>
            <span className={s.timeIcon}>🕓</span>
            <p>{publicationDate.toDateString()}</p>
          </div>
          <div className={s.companyInfoContainer}>
            <img className={s.img} src={job.company_logo} />
            <div className={s.nameAndLocationContainer}>
              <p className={s.companyName}>{job.company}</p>
              <div className={s.locationContainer}>
                <span className={s.locationIcon}>📍</span>
                <p>{job.location}</p>
              </div>
            </div>
          </div>
          <div className={s.descriptionContainer}>
            <p className={s.howToApply}>Description:</p>
            <p className={s.description}>{job.description}</p>
          </div>
          <div>
            <p className={s.howToApply}>How to apply?</p>
            <p className={s.applyUrl}>
              <a
                href={job.apply_url}
                target="_blank"
                rel="noreferrer"
              >
                {job.apply_url}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
