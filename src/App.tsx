import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';


import { proxy, useSnapshot } from 'solid-valtio'
import * as Y from "yjs";
import { bind } from "valtio-yjs";
import { WebrtcProvider } from 'y-webrtc';

import { createStore } from "solid-js/store"



const App: Component = () => {
  const ydoc = new Y.Doc();
  const ymap = ydoc.getMap("mymap");
  const state = proxy({help: {}});
  new WebrtcProvider("docName", ydoc)
  bind(state, ymap);
  const snap = useSnapshot(state);

  setTimeout(() => {
    state.test = "valtio"+ Math.random()
  }, 2000)

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        {
          snap.test
        }
      </header>
    </div>
  );
};

export default App;

