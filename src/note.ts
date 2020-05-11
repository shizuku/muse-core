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
        let n = this.num.toString();
        let t = svg.text(n, res.dimens.note_font_size);
        this.element.appendChild(t);
    }
    public settle(bar_dimens: Dimens, position: number): Dimens {

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
