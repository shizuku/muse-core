import * as svg from './svg.js';
import { Page } from "./page.js";
import { Dimens } from "./interface.js";
import { element } from './element.js';
import * as res from './resource.js';

export class Notation extends element {
    private pages: Page[];

    constructor(json: string) {
        super(json);
        this.pages = new Array<Page>();
        let o = JSON.parse(json);
        this.dimens = o.dimens;
        o.pages.forEach((ele: any) => {
            this.pages.push(new Page(JSON.stringify(ele)));
        });

        this.element = svg.g('muse-notation');
        this.attach();
        this.draw();
    }
    protected draw() {
        this.element.innerHTML = "";
        this.pages.forEach((ele) => {
            this.element.appendChild(ele.svg());
        });
    }
    public settle(pdimens: Dimens, position: number): Dimens {
        this.dimens.width = pdimens.width;
        this.dimens.height = pdimens.height;
        this.pages.forEach((elm, idx) => {
            elm.settle(this.dimens, idx);
        });
        this.attach();
        return this.dimens;
    }
    public obj(): Object {
        const r = { pages: <any>[], dimens: {} };
        this.pages.forEach((elm) => {
            r.pages.push(elm.obj());
        })
        r.dimens = this.dimens;
        return r;
    }
};
