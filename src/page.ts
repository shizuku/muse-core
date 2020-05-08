import * as svg from './svg.js';
import { Line } from './line.js';
import { Dimens } from './interface.js';

export class Page {
    private lines: Line[];
    private dimens: Dimens;

    private element: SVGGElement;

    constructor(json: string) {
        this.lines = new Array<Line>();
        let o = JSON.parse(json);
        this.dimens = o.dimens;
        o.lines.forEach((ele: any) => {
            this.lines.push(new Line(JSON.stringify(ele)));
        });
        this.element = svg.svg('muse-page');
        this.lines.forEach((ele) => {
            this.element.appendChild(ele.draw());
        })
    }
    public settle(): Dimens {
        this.element.setAttribute('width', (this.dimens.width + this.dimens.margin_left + this.dimens.margin_right).toString());
        this.element.setAttribute('height', (this.dimens.height + this.dimens.margin_top + this.dimens.margin_bottom).toString());
        return this.dimens;
    }
    public draw(): SVGGElement {
        return this.element;
    }
};
