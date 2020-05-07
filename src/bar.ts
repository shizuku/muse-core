import * as svg from './svg';
import { Note } from "./note";
import { Dimens } from "./interface";

export class Bar{
    private notes: Note[];
    private dimens: Dimens;
    private element: SVGGElement;

    constructor(json: string) {
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
