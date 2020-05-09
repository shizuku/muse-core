import * as svg from './svg.js';
import { Track } from './track.js';
import { Dimens } from './interface.js';
import { element } from './element.js';

export class Line extends element {
    private tracks: Track[];

    constructor(json: string) {
        super(json);
        this.tracks = new Array<Track>();
        let o = JSON.parse(json);
        this.dimens = o.dimens;
        o.tracks.forEach((ele: any) => {
            this.tracks.push(new Track(JSON.stringify(ele)));
        });
        this.element = svg.g('muse-line');
        this.attach();
        this.draw();
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
    public obj(): Object {
        const r = { tracks: <any>[], dimens: {} };
        this.tracks.forEach((elm) => {
            r.tracks.push(elm.obj());
        })
        r.dimens = this.dimens;
        return r;
    }
};
