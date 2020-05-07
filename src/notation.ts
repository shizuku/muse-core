import * as svg from './svg';
import { Page } from "./page";
import { Dimens } from "./interface";

export class Notation{
    private pages: Page[];
    private dimens: Dimens;
    private element: SVGGElement;

    constructor(json: string) {
        let o = JSON.parse(json);
        this.dimens = o.dimens;
        o.pages.forEach((ele) => {
            this.pages.push(new Page(JSON.stringify(ele))
        });
        this.pages
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
