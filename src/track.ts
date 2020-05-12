import * as svg from './svg.js';
import { Bar } from './bar.js';
import { Dimens } from './interface.js';
import { element } from './element.js';
import * as res from './resource.js';

export class Track extends element {
    private bars: Bar[];

    constructor(json: string) {
        super(json, 'g', 'muse-track');
    }
    protected draw() {
        this.element.innerHTML = "";
        const rect = svg.rect(this.dimens.width + this.dimens.margin_left + this.dimens.margin_right,
            this.dimens.height + this.dimens.margin_top + this.dimens.margin_bottom, 'white');
        rect.setAttribute('transform', `translate(${-this.dimens.margin_left},${-this.dimens.margin_top})`);
        rect.setAttribute('stroke-width', `1px`);
        rect.setAttribute('stroke', `white`);
        this.element.appendChild(rect);

        this.bars.forEach((ele) => {
            this.element.appendChild(ele.svg());
        });
        let x = 0;
        this.bars.forEach((elm) => {
            const d = elm.getDimens();
            x += d.width + d.margin_left + d.margin_right;
            const bar_line = svg.line(x, 0, x, this.dimens.height);
            bar_line.setAttribute('stroke-width', '2');
            this.element.appendChild(bar_line);
        });
    }
    public settle(pdimens: Dimens, y: number): Dimens {
        this.dimens.width = pdimens.width;
        this.dimens.margin_left = 0;
        this.dimens.margin_right = 0;
        this.dimens.height = res.dimens.track_height;
        this.dimens.margin_top = res.dimens.track_margin_vertical;
        this.dimens.margin_bottom = res.dimens.track_margin_vertical;
        this.dimens.x = 0;
        this.dimens.y = y;
        const w = this.dimens.width / this.bars.length;
        let x = 0;
        this.bars.forEach((elm) => {
            const r = elm.settle(this.dimens, x, w);
            x = r.x + w;
        });
        this.attach();
        this.draw();
        return this.dimens;
    }
    public toObject(): Object {
        const r = { bars: <any>[], dimens: {} };
        this.bars.forEach((elm) => {
            r.bars.push(elm.toObject());
        });
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
