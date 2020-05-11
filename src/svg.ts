/* eslint-disable no-undef */
export function circle(r: number, fill: string = 'black'): SVGCircleElement {
    const re = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    re.setAttribute('r', r.toString());
    re.setAttribute('fill', fill);
    return re;
};
export function rect(width: number, height: number, fill: string = 'black'): SVGRectElement {
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    r.setAttribute('width', width.toString());
    r.setAttribute('height', height.toString());
    r.setAttribute('fill', fill);
    return r;
}
export function line(x1: number, y1: number, x2: number, y2: number): SVGLineElement {
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    r.setAttribute('x1', x1.toString());
    r.setAttribute('x2', x2.toString());
    r.setAttribute('y1', y1.toString());
    r.setAttribute('y2', y2.toString());
    r.setAttribute('style', 'stroke:black;stroke-width:1');
    return r;
};
export function text(text: string, size: number, font: string = "serif", fill: string = "black"): SVGTextElement {
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    r.innerHTML = text;
    r.setAttribute('font-size', size.toString());
    r.setAttribute('fill', fill);
    r.setAttribute('font-family', font);
    r.setAttribute('width', (size / 2).toString());
    r.setAttribute('height', size.toString());
    r.setAttribute('transform', `translate(0,${size})`);
    return r;
};
export function path(d: string, fill: string = 'black'): SVGPathElement {
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    r.setAttribute('d', d);
    r.setAttribute('fill', fill);
    return r;
};
export function g(_class: string): SVGGElement {
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    r.setAttribute('class', _class);
    return r;
};
export function svg(_class: string): SVGSVGElement {
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    r.setAttribute('class', _class);
    return r;
};
