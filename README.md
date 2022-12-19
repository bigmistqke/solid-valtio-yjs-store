# solid-valtio-yjs-store

a synced store with yjs, solid-valtio, valtio-yjs
use just like a regular solid-store.

```
const ydoc = new Y.Doc();
const [store, setStore] = createValtioYjsStore(ydoc, {toggle: true})
setStore('toggle', (boolean) => !boolean)
```

comes with a performance cost!!
<div style="text-align: center; width: 100%;">
<img style="width: 300px;" src="/assets/benchmark.png"></img>
</div>
