import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import s from './PostJob.module.css';

export default function PostJob() {
  const [showForm, setShowForm] = useState(false);

  const showFormJob = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <Link to="/post-job">
        <div>
          <button className={s.postJobButton} onClick={showFormJob}>
            Post a job
          </button>
        </div>
      </Link>
    </>
  );
}
