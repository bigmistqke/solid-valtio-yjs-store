import { createStore } from "solid-js/store";
import { proxy, useSnapshot } from "solid-valtio";
import { bind } from "valtio-yjs";
import * as Y from "yjs";

export default function createValtioYjsStore<T extends {[key: string]: unknown}>(
  ydoc: Y.Doc, 
  value: T, 
  id?: string
){
  const yvalue = ydoc.getMap<T>(id || "root");
  const state = proxy(value);
  bind(state, yvalue as Y.Map<any>);
  const snap = useSnapshot(state);
  const [, setStore] = createStore(state);
  return [snap, setStore] as const
}