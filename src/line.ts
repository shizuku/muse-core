import * as svg from './svg.js';
import { Track } from './track.js';
import { Dimens } from './interface.js';

export class Line {
    private tracks: Track[];
    private dimens: Dimens;

    private element: SVGGElement;

    constructor(json: string) {
        this.tracks = new Array<Track>();
        let o = JSON.parse(json);
        this.dimens = o.dimens;
        o.tracks.forEach((ele: any) => {
            this.tracks.push(new Track(JSON.stringify(ele)));
        });
        this.element = svg.svg('muse-line');
        this.tracks.forEach((ele) => {
            this.element.appendChild(ele.draw());
        });
        this.attach();
    }
    protected attach() {
        this.element.setAttribute('width', (this.dimens.width + this.dimens.margin_left + this.dimens.margin_right).toString());
        this.element.setAttribute('height', (this.dimens.height + this.dimens.margin_top + this.dimens.margin_bottom).toString());
        this.element.setAttribute('transform', `translate(${this.dimens.x},${this.dimens.y})`);
    }
    public settle(): Dimens {
        return this.dimens;
    }
    public draw(): SVGGElement {
        return this.element;
    }
};
