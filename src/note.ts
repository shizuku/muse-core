import * as svg from './svg.js';
import { Dimens } from "./interface.js";

export class Note {
    private p: number;
    private pa: number;
    private l: number;
    private dimens: Dimens;

    private element: SVGGElement;

    constructor(json: string) {
        let o = JSON.parse(json);
        this.p = o.p;
        this.pa = o.pa;
        this.l = o.l;
        this.dimens = o.dimens;

        this.element = svg.svg('muse-note');
    }
    public settle(): Dimens {
        return this.dimens;
    }
    public draw(): SVGGElement {
        return this.element;
    }
};
