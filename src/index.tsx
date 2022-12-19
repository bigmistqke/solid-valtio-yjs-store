/* @refresh reload */
import { render } from 'solid-js/web';
import Demo from './Demo';
import "./root.css";

render(() => <Demo />, document.getElementById('root') as HTMLElement);
