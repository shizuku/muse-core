import * as svg from './svg';
import { Track } from './track';
import { Dimens } from './interface';

export class Line{
    private tracks: Track[];
    private dimens: Dimens;
    private element: SVGGElement;

    constructor(json: string) {
        this.element = svg.svg('muse-line');
        this.tracks.forEach((ele) => {
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
