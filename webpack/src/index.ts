import './css-module1.css';
import { person } from './js/1';

const app: HTMLDivElement | null = document.querySelector('#app');

app && (app.innerHTML = '哈哈');

person.name = 'hh';
