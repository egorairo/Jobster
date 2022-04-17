import React from 'react';

import s from './Header.module.css';

export default class Header extends React.Component {
  render() {
    return (
      <h1 className={s.container}>
        <span className={s.text}>JOBSTER</span>
      </h1>
    );
  }
}
