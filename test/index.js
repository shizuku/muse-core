import {
    Muse
} from '../dist/muse.js';

var req = new XMLHttpRequest();
req.open('GET', 'http://127.0.0.1:8888');
req.send();
req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const n = new Muse(this.responseText);
        const p = document.querySelector('#paper');
        p.appendChild(n.svg());
    }
}