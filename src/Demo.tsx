import { Component } from 'solid-js';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from "yjs";
import createValtioYjsStore from './lib/createValtioYjsStore';

const Demo: Component = () => {
  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider("another one", ydoc)

  const [store, setStore] = createValtioYjsStore(
    ydoc,
    {
      test: "ok",
      users: [
        {
          id: "ok",
          content: "sure"
        }
      ]
    }
  )

  setTimeout(() => {
    setStore('users', ({id}) => id === "ok", "content", (value) => value.toString().split('').map(a => a + a).join(''))
  }, 1000)

  return (
    <div >
      {
        JSON.stringify(store)
      }
      {
        store.users[0].content
      }
    </div>
  );
};

export default Demo;

