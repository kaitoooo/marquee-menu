import '../style/style.scss';
import picturefill from 'picturefill';
picturefill();
import Menu from './components/menu';
import Webgl from './components/webgl';
import Loading from './components/loading';

export default class App {
    constructor() {
        window.addEventListener(
            'DOMContentLoaded',
            () => {
                this.init();
            },
            false
        );
    }
    init() {
        this.webgl();
        new Loading();
        new Menu(document.querySelector('[data-menu="parent"]'));
    }
    webgl() {
        const item00 = new Webgl('[data-canvas="item00"]', ['./img/img2.jpeg', './img/img1.jpeg', './img/effect5.jpg']);
        const item01 = new Webgl('[data-canvas="item01"]', ['./img/img3.jpeg', './img/img4.jpeg', './img/effect6.jpg']);
        const item02 = new Webgl('[data-canvas="item02"]', ['./img/img6.jpeg', './img/img5.jpeg', './img/effect3.jpg']);
        const item03 = new Webgl('[data-canvas="item03"]', ['./img/img7.jpeg', './img/img8.jpeg', './img/effect4.jpg']);
        const item04 = new Webgl('[data-canvas="item04"]', ['./img/img2.jpeg', './img/img1.jpeg', './img/effect2.jpg']);
        const item05 = new Webgl('[data-canvas="item05"]', ['./img/img7.jpeg', './img/img8.jpeg', './img/effect6.jpg']);
    }
}
new App();
