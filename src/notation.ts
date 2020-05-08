import * as svg from './svg.js';
import { Page } from "./page.js";
import { Dimens } from "./interface.js";

export class Notation {
    private pages: Page[];
    private dimens: Dimens;

    private element: SVGGElement;

    constructor(json: string) {
        this.pages = new Array<Page>();
        let o = JSON.parse(json);
        this.dimens = o.dimens;
        o.pages.forEach((ele: any) => {
            this.pages.push(new Page(JSON.stringify(ele)));
        });

        this.element = svg.svg('muse-notation');
        this.pages.forEach((ele) => {
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
