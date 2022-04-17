import React, {useEffect, useLayoutEffect, useState} from 'react';
import axios from 'axios';

import jobInfoStyles from '../JobInfo/JobInfo.module.css';
import successIcon from '../../img/success-icon.png';
import s from './PostJobForm.module.css';

export default function JobForm() {
  const [values, setValue] = useState({});
  const [submit, setSubmit] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setDisabled(true);
    setSubmit(true);

    const date = new Date();

    values.date = date;

    axios('http://localhost:8888/post-job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      data: JSON.stringify(values),
    });
  };

  useLayoutEffect(() => {
    const cashedValues = JSON.parse(localStorage.getItem('values'));

    if (cashedValues) {
      setValue(cashedValues);
    }
  }, []);

  useEffect(() => {
    return () => {
      localStorage.setItem('values', JSON.stringify(values));
    };
  }, [values]);

  return (
    <>
      <div className={jobInfoStyles.backToJobList}>
        <a className={jobInfoStyles.a} href="/">
          ← Back to search
        </a>
      </div>
      {!submit ? (
        <form className={s.jobForm} onSubmit={handleSubmit}>
          <div className={s.formGroup}>
            <label htmlFor="id">
              Company id<span className={s.required}> *</span>
            </label>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="Enter any 6 digits"
              disabled={disabled}
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  id: e.target.value,
                }))
              }
              value={values.id || ''}
              pattern="[0-9]{6}"
              required
            ></input>
          </div>
          <div className={s.formGroup}>
            <label htmlFor="company">
              Company name<span className={s.required}> *</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Company name"
              disabled={disabled}
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  company: e.target.value,
                }))
              }
              maxLength="20"
              required
              value={values.company || ''}
            ></input>
          </div>
          <div className={s.formGroup}>
            <label htmlFor="company_logo">Company logo</label>
            <input
              type="url"
              id="company_logo"
              name="company_logo"
              placeholder="URL Company logo"
              disabled={disabled}
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  company_logo: e.target.value,
                }))
              }
              value={values.company_logo || ''}
            ></input>
          </div>
          <div className={s.formGroup}>
            <label htmlFor="position">
              Employee position<span className={s.required}> *</span>
            </label>
            <input
              type="text"
              id="position"
              name="position"
              placeholder="Position"
              disabled={disabled}
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  position: e.target.value,
                }))
              }
              value={values.position || ''}
              required
            ></input>
          </div>
          <div className={s.formGroup}>
            <label htmlFor="tags">Quick search tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Tags separated by comma"
              disabled={disabled}
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  tags: e.target.value,
                }))
              }
              value={values.tags || ''}
              pattern="^[a-zA-Z]+(,\s*[a-zA-Z]+)*$"
            ></input>
          </div>
          <div className={s.formGroup}>
            <label htmlFor="description">
              Job description<span className={s.required}> *</span>
            </label>
            <textarea
              id="description"
              name="description"
              disabled={disabled}
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  description: e.target.value,
                }))
              }
              minLength="40"
              required
              value={values.description || ''}
            ></textarea>
          </div>
          <div className={s.formGroup}>
            <label htmlFor="location">
              Location<span className={s.required}> *</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Location"
              disabled={disabled}
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  location: e.target.value,
                }))
              }
              required
              value={values.location || ''}
            ></input>
          </div>
          <div className={s.formGroup}>
            <label htmlFor="apply_url">
              Apply URL<span className={s.required}> *</span>
            </label>
            <input
              type="url"
              id="apply_url"
              name="apply_url"
              placeholder="Apply url"
              disabled={disabled}
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  apply_url: e.target.value,
                }))
              }
              required
              value={values.apply_url || ''}
            ></input>
          </div>
          <button className={s.inputButton} type="submit">
            Post
          </button>
        </form>
      ) : (
        <div className={s.mainContainer}>
          <div className={s.imgContainer}>
            <img className={s.successIcon} src={successIcon} />
          </div>
          <h1 className={s.h1}>Thank you</h1>

          <p className={s.text}>
            {values.company} your job was posted
          </p>
        </div>
      )}
    </>
  );
}
