import { Component, createEffect, createSignal, For, Index } from 'solid-js'
import * as solid from 'solid-js/store'
import { createStore, reconcile } from 'solid-js/store'
import { IndexeddbPersistence } from 'y-indexeddb'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from "yjs"

// import syncedStore, { enableSolidBindings, getYjsDoc } from '@syncedstore/core'

import dragg from '../utils/dragg'

import styles from './Canvas.module.css'
import './Canvas.css'
import createValtioYjsStore from '../lib/createValtioYjsStore'

const Pixel = (props: { color: string }) => (
  <div
    class={styles.pixel}
    style={{
      background: props.color,
    }}
  />
)

const Canvas: Component<{ size: number }> = (props: { size: number }) => {

  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider("another one", ydoc)

  const [store, setStore] = createValtioYjsStore<{pixels: {[key: string] : string}}>(
    ydoc,
    {
      pixels: {}
    },
  )


  const getRandomColor = () =>
    `hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${
      Math.random() * 100
    }%)`
  const [color, setColor] = createSignal(getRandomColor())

  // const store = syncedStore<{ pixels: { [key: string]: string } }>({
  //   pixels: {},
  // })

  // enableSolidBindings(solid)

  // const doc = getYjsDoc(store)
  const docName = 'grid:' + props.size
  /* const docName = 'grid:' + props.size
  doc.whenLoaded.then(() => console.log('doc is loaded'))
  doc.on('loaded', () => console.log('loaded')) */

  localStorage.log = 'none'
  const webrtcProvider = new WebrtcProvider(docName, ydoc)
  const persistenceProvider = new IndexeddbPersistence(docName, ydoc)
  webrtcProvider.on('synced', () => console.log('synced'))
  persistenceProvider.on('synced', () => {
    console.log('content from the database is loaded')
  })

  // All of our network providers implement the awareness crdt
  const awareness = webrtcProvider.awareness
  const [users, setUsers] = createStore<{ [key: string]: any }[]>([])

  // You can observe when a user updates their awareness information
  awareness.on('change', () => {
    setUsers(reconcile(Array.from(awareness.getStates().values())))
  })

  awareness.setLocalStateField(
    'user',
    'big-mistqke-' + Math.floor(Math.random() * 10000)
  )

  window.addEventListener('mousemove', ({ clientX, clientY }) => {
    const x = Math.floor((clientX / window.innerWidth) * props.size)
    const y = Math.floor((clientY / window.innerHeight) * props.size)
    awareness.setLocalStateField('position', x + ':' + y)
  })

  window.addEventListener('mouseout', () => {
    awareness.setLocalStateField('position', undefined)
  })
  window.addEventListener('blur', () => {
    awareness.setLocalStateField('position', undefined)
  })

  createEffect(() => awareness.setLocalStateField('color', color()))
  createEffect(() => {
    document.body.style.setProperty('--color', color())
  })
  createEffect(() => {
    document.body.style.setProperty('--grid-amount', props.size)
  })

  type Point = {
    x: number
    y: number
  }

  const drawBetweenTwoPoints = (pointA: Point, pointB: Point) => {
    const delta = {
      x: pointB.x - pointA.x,
      y: pointB.y - pointA.y,
    }
    const sign = {
      x: delta.x / Math.abs(delta.x),
      y: delta.y / Math.abs(delta.y),
    }

    if (Math.abs(delta.x) > Math.abs(delta.y)) {
      for (let i = 1; i <= Math.abs(delta.x); i++) {
        const _x = pointA.x + i * sign.x
        const _y = pointA.y + Math.floor((delta.y / Math.abs(delta.x)) * i)
        const key = _x + ':' + _y
        if (store.pixels[key] !== color()) {
          setStore('pixels', key, color())
          // store.pixels[key] = color()
        }
      }
    } else {
      for (let i = 1; i <= Math.abs(delta.y); i++) {
        const _x = pointA.x + Math.floor((delta.x / Math.abs(delta.y)) * i)
        const _y = pointA.y + i * sign.y
        const key = _x + ':' + _y
        if (store.pixels[key] !== color()) {
          setStore('pixels', key, color())
          // store.pixels[key] = color()
        }
      }
    }
  }

  const paint = async (e) => {
    let lastPoint: { x: number; y: number } | undefined = undefined
    const add = (e) => {
      const currentPoint = {
        x: Math.floor((e.clientX / window.innerWidth) * props.size),
        y: Math.floor((e.clientY / window.innerHeight) * props.size),
      }

      const key = currentPoint.x + ':' + currentPoint.y

      if (lastPoint) {
        drawBetweenTwoPoints(lastPoint, currentPoint)
      } else {
        if (store.pixels[key] !== color()){
          setStore('pixels', key, color())
          // store.pixels[key] = color()
        }
      }

      lastPoint = currentPoint
    }

    add(e)
    await dragg(add)
  }

  const keyToPosition = (key: string) =>
    key.split(':').map((v) => +v) as [left: number, top: number]

  const onKeyDown = (e) => {
    console.log(e.code)

    if (e.code === 'Space') {
      console.log('getRandomColor', getRandomColor())
      setColor(getRandomColor())
    }
  }

  window.addEventListener('keydown', onKeyDown)

  return (
    <div class={styles.main}>
      <div class={styles.grid} onmousedown={paint}>
        <Index each={new Array(props.size).fill(undefined)}>
          {(_, y) => (
            <Index each={new Array(props.size).fill(undefined)}>
              {(_, x) => (
                <Pixel
                  color={
                    users.find((user) => user.position === x + ':' + y)
                      ?.color ||
                    store.pixels[x + ':' + y] ||
                    'white'
                  }
                />
              )}
            </Index>
          )}
        </Index>
      </div>
    </div>
  )
}

export default Canvas
