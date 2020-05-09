import * as svg from './svg.js';
import { Notation } from './notation.js';
import { element } from './element.js';

export class Muse extends element {
    private title: string;
    private notation: Notation;

    constructor(json: string) {
        super(json);
        let o = JSON.parse(json);
        this.title = o.title;
        this.dimens = o.dimens;
        this.notation = new Notation(JSON.stringify(o));

        this.element = svg.svg('muse');
        this.attach();
        this.draw();
    }
    protected attach() {
        this.element.setAttribute('width', (this.dimens.width + this.dimens.margin_left + this.dimens.margin_right).toString());
        this.element.setAttribute('height', (this.dimens.height + this.dimens.margin_top + this.dimens.margin_bottom).toString());
        this.element.setAttribute('transform', `translate(${this.dimens.x},${this.dimens.y})`);
    }
    protected draw() {
        this.element.appendChild(this.notation.svg());
        console.log(this.title);
    }
    public setttle() {

    }
    public obj(): Object {
        return {
            title: this.title,
            notation: this.notation,
            dimens: this.dimens,
        };
    }
};
