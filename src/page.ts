import * as svg from './svg.js';
import { Line } from './line.js';
import { Dimens } from './interface.js';
import { element } from './element.js';

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
    public settle(): Dimens {
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
