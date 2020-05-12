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
        this.element.innerHTML = "";
        const rect = svg.rect(this.dimens.width + this.dimens.margin_left + this.dimens.margin_right,
            this.dimens.height + this.dimens.margin_top + this.dimens.margin_bottom, 'white');
        rect.setAttribute('transform', `translate(${-this.dimens.margin_left},${-this.dimens.margin_top})`);
        rect.setAttribute('stroke-width', `1px`);
        rect.setAttribute('stroke', `gray`);
        this.element.appendChild(rect);

        this.lines.forEach((ele) => {
            this.element.appendChild(ele.svg());
        });
    }
    public settle(y: number): Dimens {
        this.dimens.margin_left = res.dimens.page_margin_horizontal;
        this.dimens.margin_right = res.dimens.page_margin_horizontal;
        this.dimens.width = res.dimens.page_width;
        this.dimens.margin_top = res.dimens.page_margin_vertical;
        this.dimens.margin_bottom = res.dimens.page_margin_vertical;
        this.dimens.height = res.dimens.page_height;
        this.dimens.x = 0;
        this.dimens.y = y;
        let ny = 0;
        this.lines.forEach((elm) => {
            const r = elm.settle(this.dimens, ny);
            ny += r.height + r.margin_top + r.margin_bottom + res.dimens.line_gap;
        });
        this.attach();
        this.draw();
        return this.dimens;
    }
    public toObject(): Object {
        const r = { lines: <any>[], dimens: {} };
        this.lines.forEach((elm) => {
            r.lines.push(elm.toObject());
        });
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
