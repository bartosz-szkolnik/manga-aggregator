import { Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';
import { Home } from './views/home';
import { Manga } from './views/manga';
import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Routes>
        <Route path="/" component={Home}></Route>
        <Route path="/manga/:mangaId" component={Manga}></Route>
      </Routes>
    </div>
  );
};

export default App;
