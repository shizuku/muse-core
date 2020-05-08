import * as svg from './svg.js';
import { Notation } from './notation.js';

export class Muse {
    private title: string;
    private notation: Notation;

    private element: SVGSVGElement;

    constructor(json: string) {
        let o = JSON.parse(json);
        this.title = o.title;
        this.notation = new Notation(JSON.stringify(o));

        this.element = svg.svg('muse');
        this.element.appendChild(this.notation.draw());

        console.log(this.title);
    }
    public setttle() {

    }
    protected draw() {

    }
    public svg(): SVGSVGElement {
        return this.element;
    }
};
