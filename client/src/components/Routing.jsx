import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Home from '../pages/Home';
import Job from '../pages/Job';
import PostJob from '../pages/PostJob';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/job/:id" element={<Job />} />
      <Route path="/post-job" element={<PostJob />} />
    </Routes>
  );
}
