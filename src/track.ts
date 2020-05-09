import * as svg from './svg.js';
import { Bar } from './bar.js';
import { Dimens } from './interface.js';
import { element } from './element.js';

export class Track extends element {
    private bars: Bar[];

    constructor(json: string) {
        super(json);
        this.bars = new Array<Bar>();
        let o = JSON.parse(json);
        this.dimens = o.dimens;
        o.bars.forEach((ele: any) => {
            this.bars.push(new Bar(JSON.stringify(ele)));
        });
        this.element = svg.g('muse-track');
        this.draw();
        this.attach();
    }
    protected draw() {
        this.bars.forEach((ele) => {
            this.element.appendChild(ele.svg());
        });
    }
    public settle(): Dimens {
        return this.dimens;
    }
    public obj(): Object {
        const r = { bars: <any>[], dimens: {} };
        this.bars.forEach((elm) => {
            r.bars.push(elm.obj());
        })
        r.dimens = this.dimens;
        return r;
    }
};
