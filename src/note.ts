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
        this.dimens = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            margin_left: 0,
            margin_right: 0,
            margin_top: 0,
            margin_bottom: 0,
        };

        this.element = svg.svg('muse-note');
        this.attach();
    }
    public stringify(): string {
        return JSON.stringify({
            p:this.p,
            pa:this.pa,
            l:this.l,
            dimens:this.dimens,
        });
    }
    protected attach() {
        this.element.setAttribute('width', (this.dimens.width + this.dimens.margin_left + this.dimens.margin_right).toString());
        this.element.setAttribute('height', (this.dimens.height + this.dimens.margin_top + this.dimens.margin_bottom).toString());
        this.element.setAttribute('transform', `translate(${this.dimens.x},${this.dimens.y})`);
    }
    public settle(): Dimens {
        return this.dimens;
    }
    public draw(): SVGGElement {
        return this.element;
    }
};
