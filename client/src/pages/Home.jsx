import React from 'react';

import Header from '../components/Header/Header';
import SearchForm from '../components/SearchForm/SearchForm';
import PostJob from '../components/PostJob/PostJob';

export default function Home() {
  return (
    <>
      <div className="headerAndPost">
        <Header />
        <PostJob />
      </div>
      <SearchForm />
    </>
  );
}
