import * as svg from './svg.js';
import { Line } from './line.js';
import { Dimens } from './interface.js';
import { element } from './element.js';
import * as res from './resource.js';

export class Page extends element {
    private lines: Line[];

    constructor(json: string) {
        super(json);
        this.lines = new Array<Line>();
        let o = JSON.parse(json);
        this.dimens = o.dimens;
        o.lines.forEach((ele: any) => {
            this.lines.push(new Line(JSON.stringify(ele)));
        });

        this.element = svg.g('muse-page');
        this.attach();
        this.draw();
    }
    protected draw() {
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
    public obj(): Object {
        const r = { lines: <any>[], dimens: {} };
        this.lines.forEach((elm) => {
            r.lines.push(elm.obj());
        })
        r.dimens = this.dimens;
        return r;
    }
};
