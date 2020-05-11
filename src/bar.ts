import * as svg from './svg.js';
import { Note } from "./note.js";
import { Dimens } from "./interface.js";
import { element } from './element.js';

export class Bar extends element {
    private notes: Note[];

    constructor(json: string) {
        super(json, 'g', 'muse-bar');
    }
    protected draw() {
        const rect = svg.rect(this.dimens.width + this.dimens.margin_left + this.dimens.margin_right,
            this.dimens.height + this.dimens.margin_top + this.dimens.margin_bottom, 'white');
        rect.setAttribute('transform', `translate(${-this.dimens.margin_left},${-this.dimens.margin_top})`);
        rect.setAttribute('stroke-width', `1px`);
        rect.setAttribute('stroke', `gray`);
        this.element.appendChild(rect);

        this.notes.forEach((ele) => {
            this.element.appendChild(ele.svg());
        });
    }
    public settle(pdimens: Dimens, x: number, width: number): Dimens {
        this.dimens.width = width;
        this.dimens.margin_left = 0;
        this.dimens.margin_right = 0;
        this.dimens.height = 0;
        this.dimens.margin_top = 0;
        this.dimens.margin_bottom = 0;
        this.dimens.x = x;
        this.dimens.y = 0;
        const w = this.dimens.width / this.notes.length;
        let nx = 0;
        this.notes.forEach((elm) => {
            const r = elm.settle(this.dimens, nx, w);
            nx = r.x + w;
            let h = r.height + r.margin_top + r.margin_bottom;
            this.dimens.height = (h > this.dimens.height ? h : this.dimens.height);
        });
        this.attach();
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
