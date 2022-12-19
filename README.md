# solid-valtio-yjs-store

a synced store with [yjs](https://github.com/yjs/yjs), [valtio](https://github.com/pmndrs/valtio), [solid-valtio](https://github.com/wobsoriano/solid-valtio), [valtio-yjs](https://github.com/dai-shi/valtio-yjs)</br>
use just like a regular solid-store:

```
  const ydoc = new Y.Doc();
  const [store, setStore] = createValtioYjsStore(ydoc, {toggle: true})
  setStore('toggle', (boolean) => !boolean)
```
comes with a pretty hefty performance cost:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style="height: 500px;" src="/assets/benchmark_new.png"></img>

but in return you get a store that automatically syncs over multiple clients:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style="height: 500px;" src="/assets/pixelpainter.gif"></img>
