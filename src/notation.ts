import * as svg from './svg.js';
import { Page } from "./page.js";
import { Dimens } from "./interface.js";
import { element } from './element.js';
import * as res from './resource.js';

export class Notation extends element {
    private pages: Page[];

    constructor(json: string) {
        super(json, 'g', 'muse-notation');
    }
    protected draw() {
        this.element.innerHTML = "";
        this.pages.forEach((ele) => {
            this.element.appendChild(ele.svg());
        });
    }
    public settle(): Dimens {
        this.dimens.margin_left = 0;
        this.dimens.margin_right = 0;
        this.dimens.width = 0
        this.dimens.margin_top = 0;
        this.dimens.margin_bottom = 0;
        this.dimens.height = 0;
        this.dimens.x = 0;
        this.dimens.y = 0;
        let y = 0;
        this.pages.forEach((elm) => {
            const r = elm.settle(y);
            this.dimens.width = r.width + r.margin_left + r.margin_right;
            this.dimens.height += r.height + r.margin_top + r.margin_bottom + res.dimens.page_gap;
            y = this.dimens.height;
        });
        this.dimens.height -= res.dimens.page_gap;
        this.attach();
        this.draw();
        return this.dimens;
    }
    public toObject(): Object {
        const r = { pages: <any>[], dimens: {} };
        this.pages.forEach((elm) => {
            r.pages.push(elm.toObject());
        });
        r.dimens = this.dimens;
        return r;
    }
    public fromObject(o: any) {
        this.pages = new Array<Page>();
        this.dimens = o.dimens;
        o.pages.forEach((ele: any) => {
            this.pages.push(new Page(JSON.stringify(ele)));
        });
    }
};
