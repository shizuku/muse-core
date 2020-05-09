import { Dimens } from "./interface";

export abstract class element {
    protected element: SVGElement;
    protected dimens: Dimens;
    constructor(json: string) {

    }
    protected abstract draw(): void;
    public abstract obj(): Object;
    protected attach() {
        this.element.setAttribute('width', `${this.dimens.width}`);
        this.element.setAttribute('height', `${this.dimens.height}`);
        this.element.setAttribute('transform', `translate(${this.dimens.x + this.dimens.margin_left},${this.dimens.y + this.dimens.margin_top})`);
    }
    public svg(): SVGElement {
        return this.element;
    }
    public stringify(): string {
        return JSON.stringify(this.obj());
    }
    public parse(json: string) {

    }
}
