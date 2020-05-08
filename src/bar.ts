import * as svg from './svg.js';
import { Note } from "./note.js";
import { Dimens } from "./interface.js";

export class Bar {
    private notes: Note[];
    private dimens: Dimens;

    private element: SVGGElement;

    constructor(json: string) {
        this.notes = new Array<Note>();
        let o = JSON.parse(json);
        this.dimens = o.dimens;
        o.notes.forEach((ele: any) => {
            this.notes.push(new Note(JSON.stringify(ele)));
        });
        this.element = svg.svg('muse-bar');
        this.notes.forEach((ele) => {
            this.element.appendChild(ele.draw());
        })
    }
    public settle(): Dimens {
        this.element.setAttribute('width', (this.dimens.width + this.dimens.margin_left + this.dimens.margin_right).toString());
        this.element.setAttribute('height', (this.dimens.height + this.dimens.margin_top + this.dimens.margin_bottom).toString());
        return this.dimens;
    }
    public draw(): SVGGElement {
        return this.element;
    }
};
