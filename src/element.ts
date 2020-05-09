import { Dimens } from "./interface";

export abstract class element {
    protected element: SVGElement;
    protected dimens: Dimens;
    constructor(json: string) {

    }
    protected abstract draw(): void;
    public abstract obj(): Object;
    protected attach() {
        this.element.setAttribute('width', (this.dimens.width + this.dimens.margin_left + this.dimens.margin_right).toString());
        this.element.setAttribute('height', (this.dimens.height + this.dimens.margin_top + this.dimens.margin_bottom).toString());
        this.element.setAttribute('transform', `translate(${this.dimens.x},${this.dimens.y})`);
    }
    public svg(): SVGElement {
        return this.element;
    }
    public stringify(): string {
        return JSON.stringify(this.obj());
    }
}
