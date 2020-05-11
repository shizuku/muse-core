import * as svg from './svg.js';
import { Dimens } from "./interface.js";
import * as res from './resource.js';
import { element } from './element.js';

export class Note extends element {
    private num: number;
    private p: number;
    private pa: number;
    private l: number;

    constructor(json: string) {
        super(json, 'g', 'muse-note');
    }
    protected draw() {
        this.element.innerHTML = ""
        const rect = svg.rect(this.dimens.width + this.dimens.margin_left + this.dimens.margin_right,
            this.dimens.height + this.dimens.margin_top + this.dimens.margin_bottom, 'white');
        rect.setAttribute('transform', `translate(${-this.dimens.margin_left},${-this.dimens.margin_top})`);
        rect.setAttribute('stroke-width', `1px`);
        rect.setAttribute('stroke', `white`);
        this.element.appendChild(rect);


        let n = this.num.toString();
        let t = svg.text(n, res.dimens.note_font_size);
        t.setAttribute('transform', `translate(${this.dimens.width / 2 - res.dimens.note_font_size / 4},${res.dimens.note_font_size})`);
        this.element.appendChild(t);
    }
    public settle(pdimens: Dimens, x: number, w: number): Dimens {
        this.dimens.width = w;
        this.dimens.margin_left = 0;
        this.dimens.margin_right = 0;
        this.dimens.height = pdimens.height;
        this.dimens.margin_top = 0;
        this.dimens.margin_bottom = 0;
        this.dimens.x = x;
        this.dimens.y = 0;
        this.attach();
        this.draw();
        return this.dimens;
    }
    public toObject(): Object {
        return {
            num: this.num,
            p: this.p,
            pa: this.pa,
            l: this.l,
            dimens: this.dimens,
        };
    }
    public fromObject(o: any) {
        this.num = o.num;
        this.p = o.p;
        this.pa = o.pa;
        this.l = o.l;
        this.dimens = o.dimens;
    }
};
