import * as svg from './svg';
import { Bar } from './bar';
import { Dimens } from './interface';

export class Track{
    private bars: Bar[];
    private dimens: Dimens;
    private element: SVGGElement;

    constructor(json: string) {
        this.element = svg.svg('muse-track');
        this.bars.forEach((ele) => {
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
