import { Bar } from './bar.js';
import { Dimens } from './interface.js';
import { element } from './element.js';

export class Track extends element {
    private bars: Bar[];

    constructor(json: string) {
        super(json, 'g', 'muse-track');
    }
    protected draw() {
        this.bars.forEach((ele) => {
            this.element.appendChild(ele.svg());
        });
    }
    public settle(pdimens: Dimens, position: number): Dimens {
        this.bars.forEach((elm, idx) => {
            elm.settle(this.dimens, idx);
        })
        return this.dimens;
    }
    public toObject(): Object {
        const r = { bars: <any>[], dimens: {} };
        this.bars.forEach((elm) => {
            r.bars.push(elm.toObject());
        })
        r.dimens = this.dimens;
        return r;
    }
    public fromObject(o: any) {
        this.bars = new Array<Bar>();
        this.dimens = o.dimens;
        o.bars.forEach((ele: any) => {
            this.bars.push(new Bar(JSON.stringify(ele)));
        });
    }
};
