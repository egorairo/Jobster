import React, {useEffect, useState, useCallback, useRef} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';

import {putJobs, putLocation, putTitle} from '../../store/actions';

import JobList from '../JobList/JobList.jsx';

import s from './SearchForm.module.css';

export default function SearchForm() {
  const cachedJobs = localStorage.getItem('displayedJobs');
  const inputTitle = useRef(null);
  const inputLocation = useRef(null);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setLoad] = useState(!!cachedJobs);
  const [isLoading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState(
    cachedJobs ? JSON.parse(cachedJobs) : []
  );

  async function fetchJobs() {
    const response = await axios.get('http://localhost:8888');
    const jobsData = response.data;

    return jobsData.filter(({id}) => id);
  }

  const init = async () => {
    try {
      const jobs = await fetchJobs();

      dispatch(putJobs(jobs));

      const searchingValues = JSON.parse(
        localStorage.getItem('searchingValues')
      );

      // if user search before show cached jobs
      if (searchingValues) {
        const {title = '', location = ''} = searchingValues;

        setTitle(title);
        setLocation(location);
      } else {
        localStorage.setItem('displayedJobs', JSON.stringify(jobs));

        setDisplayedJobs(jobs);
      }

      setLoad(true);
      setLoading(false);
      setJobs(jobs);
    } catch (error) {
      setLoad(true);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!title) {
        inputTitle.current.focus();
      } else {
        inputLocation.current.focus();
      }

      let displayedJobs = jobs.filter((job) => {
        return (
          (job.company.includes(title) ||
            job.position.includes(title)) &&
          job.location.includes(location)
        );
      });

      if (!title && !location) {
        inputTitle.current.focus();

        displayedJobs = jobs;
      }

      dispatch(putTitle(title));
      dispatch(putLocation(location));

      setDisplayedJobs(displayedJobs);

      localStorage.setItem(
        'displayedJobs',
        JSON.stringify(displayedJobs)
      );

      localStorage.setItem(
        'searchingValues',
        JSON.stringify({
          title,
          location,
        })
      );
    },
    [jobs, location, title]
  );

  return (
    <>
      <form className={s.form} onSubmit={handleFormSubmit}>
        <div className={s.container}>
          <div className={s.main}>
            <span className={s.icons}>🔎 </span>
            <input
              ref={inputTitle}
              type="text"
              className={s.input}
              placeholder="Title, companies, or expertise"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className={s.main}>
            <span className={s.icons}>🌎 </span>
            <input
              ref={inputLocation}
              type="text"
              className={s.input}
              placeholder="City, state, country, or zip"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </div>
          <button type="submit">Search</button>
        </div>
      </form>
      {error && <div>Ошибка: {error}</div>}
      {isLoading && <div>Загрузка...</div>}
      {isLoaded && displayedJobs.length === 0 ? (
        <div>Работ нет</div>
      ) : (
        <JobList jobs={displayedJobs} />
      )}
    </>
  );
}
