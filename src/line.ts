import { Track } from './track.js';
import { Dimens } from './interface.js';
import { element } from './element.js';

export class Line extends element {
    private tracks: Track[];

    constructor(json: string) {
        super(json, 'g', 'muse-line');
    }
    protected draw() {
        this.tracks.forEach((ele) => {
            this.element.appendChild(ele.svg());
        });
    }
    public settle(pdimens: Dimens, position: number): Dimens {
        this.tracks.forEach((elm, idx) => {
            elm.settle(this.dimens, idx);
        })
        return this.dimens;
    }
    public toObject(): Object {
        const r = { tracks: <any>[], dimens: {} };
        this.tracks.forEach((elm) => {
            r.tracks.push(elm.toObject());
        })
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
