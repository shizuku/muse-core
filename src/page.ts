import * as svg from './svg.js';
import { Line } from './line.js';
import { Dimens } from './interface.js';
import { element } from './element.js';
import * as res from './resource.js';

export class Page extends element {
    private lines: Line[];

    constructor(json: string) {
        super(json, 'g', 'muse-page');
    }
    protected draw() {
        const rect = svg.rect(this.dimens.width + this.dimens.margin_left + this.dimens.margin_right,
            this.dimens.height + this.dimens.margin_top + this.dimens.margin_bottom, 'white');
        rect.setAttribute('transform', `translate(${this.dimens.x - this.dimens.margin_left},${this.dimens.y - this.dimens.margin_top})`);
        rect.setAttribute('stroke-width', `1px`);
        rect.setAttribute('stroke', `gray`);
        this.element.appendChild(rect);
        
        this.lines.forEach((ele) => {
            this.element.appendChild(ele.svg());
        });
    }
    public settle(pdimens: Dimens, position: number): Dimens {
        this.dimens.margin_left = res.dimens.page_margin_horizontal;
        this.dimens.margin_right = res.dimens.page_margin_horizontal;
        this.dimens.width = pdimens.width - res.dimens.page_margin_horizontal * 2;
        this.dimens.margin_top = res.dimens.page_margin_vertical;
        this.dimens.margin_bottom = res.dimens.page_margin_vertical;
        this.dimens.height = pdimens.height - res.dimens.page_margin_vertical * 2;
        this.attach();
        this.lines.forEach((elm, idx) => {
            elm.settle(this.dimens, idx);
        });
        return this.dimens;
    }
    public toObject(): Object {
        const r = { lines: <any>[], dimens: {} };
        this.lines.forEach((elm) => {
            r.lines.push(elm.toObject());
        })
        r.dimens = this.dimens;
        return r;
    }
    public fromObject(o: any) {
        this.lines = new Array<Line>();
        this.dimens = o.dimens;
        o.lines.forEach((ele: any) => {
            this.lines.push(new Line(JSON.stringify(ele)));
        });

    }
};
