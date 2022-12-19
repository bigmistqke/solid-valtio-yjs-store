## solid-valtio-yjs-store

a synced store with yjs, solid-valtio, valtio-yjs
use just like a regular solid-store.

`
const ydoc = new Y.Doc();
const [store, setStore] = createValtioYjsStore(ydoc, {toggle: true})
setStore('toggle', (boolean) => !boolean)
`

comes with a performance cost
![js-framework-benchmark](/assets/benchmark.png)