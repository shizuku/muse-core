import { Note } from "./note.js";
import { Dimens } from "./interface.js";
import { element } from './element.js';

export class Bar extends element {
    private notes: Note[];

    constructor(json: string) {
        super(json, 'g', 'muse-bar');
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
    public toObject(): Object {
        const r = { notes: <any>[], dimens: {} };
        this.notes.forEach((elm) => {
            r.notes.push(elm.toObject());
        })
        r.dimens = this.dimens;
        return r;
    }
    public fromObject(o: any) {
        this.notes = new Array<Note>();
        this.dimens = o.dimens;
        o.notes.forEach((ele: any) => {
            this.notes.push(new Note(JSON.stringify(ele)));
        });
    }
};
