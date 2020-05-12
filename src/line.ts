import * as svg from './svg.js';
import { Track } from './track.js';
import { Dimens } from './interface.js';
import { element } from './element.js';
import * as res from './resource.js';

export class Line extends element {
    private tracks: Track[];

    constructor(json: string) {
        super(json, 'g', 'muse-line');
    }
    protected draw() {
        this.element.innerHTML = "";
        const rect = svg.rect(this.dimens.width + this.dimens.margin_left + this.dimens.margin_right,
            this.dimens.height + this.dimens.margin_top + this.dimens.margin_bottom, 'white');
        rect.setAttribute('transform', `translate(${-this.dimens.margin_left},${-this.dimens.margin_top})`);
        rect.setAttribute('stroke-width', `1px`);
        rect.setAttribute('stroke', `white`);
        this.element.appendChild(rect);

        this.tracks.forEach((ele) => {
            this.element.appendChild(ele.svg());
        });
        const bar_line = svg.line(0, 0, 0, this.dimens.height);
        bar_line.setAttribute('stroke-width', '4');
        this.element.appendChild(bar_line);
    }
    public settle(pdimens: Dimens, y: number): Dimens {
        this.dimens.width = pdimens.width;
        this.dimens.margin_left = 0;
        this.dimens.margin_right = 0;
        this.dimens.height = 0;
        this.dimens.margin_top = res.dimens.line_margin_vertical;
        this.dimens.margin_bottom = res.dimens.line_margin_vertical;
        this.dimens.x = 0;
        this.dimens.y = y;
        let ny = 0;
        this.tracks.forEach((elm) => {
            const r = elm.settle(this.dimens, ny);
            ny += r.height + r.margin_top + r.margin_bottom + res.dimens.track_gap;
            this.dimens.height += r.height + r.margin_top + r.margin_bottom + res.dimens.track_gap;
        });
        this.dimens.height -= res.dimens.track_gap;
        this.attach();
        this.draw();
        return this.dimens;
    }
    public toObject(): Object {
        const r = { tracks: <any>[], dimens: {} };
        this.tracks.forEach((elm) => {
            r.tracks.push(elm.toObject());
        });
        r.dimens = this.dimens;
        return r;
    }
    public fromObject(o: any) {
        this.tracks = new Array<Track>();
        this.dimens = o.dimens;
        o.tracks.forEach((ele: any) => {
            this.tracks.push(new Track(JSON.stringify(ele)));
        });
    }
};
