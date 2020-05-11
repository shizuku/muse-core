import { Dimens } from "./interface";

export abstract class element {
    protected element: SVGElement;
    protected dimens: Dimens;
    constructor(json: string, type: string, _class: string) {
        this.parse(json);
        this.element = document.createElementNS('http://www.w3.org/2000/svg', type);
        this.element.setAttribute('class', _class);
        this.attach();
        this.draw();
    }
    protected abstract draw(): void;
    public abstract toObject(): Object;
    public abstract fromObject(obj: any): void;
    protected attach() {
        this.element.setAttribute('width', `${this.dimens.width}`);
        this.element.setAttribute('height', `${this.dimens.height}`);
        this.element.setAttribute('transform', `translate(${this.dimens.x + this.dimens.margin_left},${this.dimens.y + this.dimens.margin_top})`);
    }
    public svg(): SVGElement {
        return this.element;
    }
    public stringify(): string {
        return JSON.stringify(this.toObject());
    }
    public parse(json: string) {
        this.fromObject(JSON.parse(json));
    }
    public getDimens(): Dimens {
        return this.dimens;
    }
}
