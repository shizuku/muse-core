import * as svg from './svg.js';
import { Note } from "./note.js";
import { Dimens } from "./interface.js";
import { element } from './element.js';

export class Bar extends element {
    private notes: Note[];

    constructor(json: string) {
        super(json);
        this.notes = new Array<Note>();
        let o = JSON.parse(json);
        this.dimens = o.dimens;
        o.notes.forEach((ele: any) => {
            this.notes.push(new Note(JSON.stringify(ele)));
        });
        this.element = svg.g('muse-bar');
        this.attach();
        this.draw();
    }
    protected draw() {
        this.notes.forEach((ele) => {
            this.element.appendChild(ele.svg());
        });
    }
    public settle(pdimens: Dimens, position: number): Dimens {
        this.notes.forEach((elm, idx) => {
            elm.settle(this.dimens, idx);
        });
        return this.dimens;
    }
    public obj(): Object {
        const r = { notes: <any>[], dimens: {} };
        this.notes.forEach((elm) => {
            r.notes.push(elm.obj());
        })
        r.dimens = this.dimens;
        return r;
    }
};
