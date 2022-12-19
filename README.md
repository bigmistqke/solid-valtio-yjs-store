# solid-valtio-yjs-store

a synced store with yjs, solid-valtio, valtio-yjs</br>
use just like a regular solid-store:

```
  const ydoc = new Y.Doc();
  const [store, setStore] = createValtioYjsStore(ydoc, {toggle: true})
  setStore('toggle', (boolean) => !boolean)
```
comes with a pretty hefty performance cost:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style="width: 300px;" src="/assets/benchmark_new.png"></img>
