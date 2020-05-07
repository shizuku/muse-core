import * as svg from './svg';
import { Dimens } from "./interface";

export class Note{
    private p: number;
    private pa: number;
    private l: number;

    private dimens: Dimens;
    private element: SVGGElement;
    
    constructor(json: string) {
        this.element = svg.svg('muse-note');
        
    }
    parse(json: string): void {
        let o = JSON.parse(json);
        this.p = o.p;
        this.pa = o.pa;
        this.l = o.l;
        this.dimens = o.dimens;
    }
    stringigy(): string {
        return JSON.stringify({
            p:this.p,
            pa:this.pa,
            l:this.l,
            dimens:this.dimens,
        });
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
