import * as svg from '../src/svg';

export interface Point {
    x: number;
    y: number;
}

function point(x: number, y: number, r: number): SVGElement {
    const re = svg.circle(r);
    re.setAttribute('transform', `translate(${x},${y})`);
    return re;
}
function line(x1: number, y1: number, x2: number, y2: number): SVGElement {
    return svg.line(x1, y1, x2, y2);
}
function drawNote(note, position): SVGElement {
    const r = svg.g();
    let num = note.num.toString();
    r.setAttribute('class', 'muse-note');
    r.setAttribute('transform', `translate(${position.x - dimens.note_font_size / 4},${position.y})`);
    let t = svg.text(num, dimens.note_font_size)
    r.appendChild(t);
    let pu = 0;
    let pd = 0;
    if (note.p > 0) {
        pu = note.p; pd = 0;
    } else {
        pu = 0; pd = -note.p;
    }
    for (let i = 0; i < pd + note.l; ++i) {
        if (i >= note.l) {
            r.appendChild(point(dimens.note_font_size / 4,
                dimens.note_font_size + dimens.point_gap * (i + 1), dimens.point_round));
        }
    }
    for (let i = 0; i < pu; ++i) {
        r.appendChild(point(dimens.note_font_size / 4,
            -dimens.point_gap * (i) + dimens.point_top_padding, dimens.point_round));
    }
    let u = 0;
    let d = dimens.note_font_size;
    let w = 0;
    return { u: u, d: d, w: w, r: r };
}
function group_group(notes) {
    let r = [];
    let n = notes.length;
    r = [{ s: 0, e: n - 1 }];

    return r;
}
function group_position(notes, group, width) {
    let r = [];
    /*r = [20, 40, 60, 80, 100, 120];
    let sum = 0;
    let s = 0;
    notes.forEach((ele) => {
        s += Math.pow(2, -ele.l);
    });
    notes.forEach((ele) => {
        let x = Math.pow(2, -ele.l) / (s+1) * width + sum;
        r.push(x);
        sum = x;
    });*/

    let n = notes.length;
    let w = width / (n + 1);
    for (let i = 0; i < n; ++i) {
        r.push((i + 1) * w);
    }
    return r;
}
function group_line(notes, group) {
    let l = [];
    let maxh = 0;
    notes.forEach((ele) => {
        maxh = (ele.l > maxh ? ele.l : maxh);
    });
    group.forEach((g) => {
        let h = [];
        for (let k = 0; k < maxh; ++k) {
            h.push(-1);
        }
        if (g.e > g.s) {
            for (let i = g.s; i < g.e; ++i) {
                for (let j = 0; j < notes[i].l; ++j) {
                    if (h[j] < 0) {
                        h[j] = i;
                    }
                }
                if (notes[i].l > notes[i + 1].l) {
                    for (let j = notes[i + 1].l; j < notes[i].l; ++j) {
                        l.push({ y: j, s: h[j], e: i });
                        h[j] = -1;
                    }
                }
                if (notes[i].l < notes[i + 1].l) {
                    for (let j = 0; j < notes[i + 1].l; ++j) {
                        if (h[j] < 0) {
                            h[j] = i + 1;
                        }
                    }
                }
            }
            h.forEach((ele, idx) => {
                if (ele >= 0) {
                    l.push({ y: idx, s: ele, e: g.e });
                }
            });
        } else if (g.e == g.s) {
            for (let i = 0; i < notes[g.e].l; ++i) {
                l.push({ y: i, s: g.s, e: g.e });
            }
        }
    });
    return l;
}
function group(bar, width) {
    let r = { g: [], p: [], l: [], };
    r.g = group_group(bar.notes);
    r.p = group_position(bar.notes, r.g, width);
    r.l = group_line(bar.notes, r.g);
    return r;
}
function drawBar(bar, position, width): SVGElement {
    const r = svg.g();
    r.setAttribute('class', 'muse-bar');
    r.setAttribute('transform', `translate(${position.x},${position.y})`);
    let g = group(bar, width);
    bar.notes.forEach((ele, i) => {
        let n = drawNote(ele, { x: g.p[i], y: position.y });
        r.appendChild(n.r);
    });
    g.l.forEach((ele) => {
        r.appendChild(line(g.p[ele.s] - dimens.note_font_size / 4 - dimens.bottom_line_margin,
            dimens.note_font_size + dimens.point_gap * (ele.y + 1),
            g.p[ele.e] + dimens.note_font_size / 4 + dimens.bottom_line_margin,
            dimens.note_font_size + dimens.point_gap * (ele.y + 1)));
    })
    return r;
}
function drawTrack(track, position, width): SVGElement {
    const r = svg.g();
    r.setAttribute('class', 'muse-track');
    r.setAttribute('transform', `translate(${position.x},${position.y})`);
    let w = width / track.bars.length;
    track.bars.forEach((ele, i) => {
        let n = drawBar(ele, { x: i * w, y: 0 }, w);
        r.appendChild(n);
    });
    for (let i = 0; i < track.bars.length + 1; ++i) {
        r.appendChild(line(i * w, -dimens.bar_line_margin_top,
            i * w, dimens.bar_line_length + dimens.bar_line_margin_bottom));
    }
    return r;
}
function drawLine(_line, position): SVGElement {
    const r = svg.g();
    r.setAttribute('class', 'muse-line');
    r.setAttribute('transform', `translate(0,${position.y})`);
    _line.tracks.forEach((ele, i) => {
        r.appendChild(drawTrack(ele, { x: 0, y: i * dimens.track_height }, dimens.page_width));
    });
    r.appendChild(line(-10, 0, -10, 20));
    return r;
}
function drawPage(page, position): SVGElement {
    const r = svg.g();
    r.setAttribute('class', 'muse-page');
    r.setAttribute('transform', `translate(${position.x},${position.y})`);
    let x = position.y;
    page.lines.forEach((ele, i) => {
        r.appendChild(drawLine(ele, { x: 0, y: x }));
        x += page.lines[i].tracks.length * dimens.track_height + dimens.line_space;
    });
    return r;
}
function drawTitlePage(page, position): SVGElement {
    const r = svg.g();
    r.setAttribute('class', 'muse-page');
    r.setAttribute('transform', `translate(${position.x},${position.y})`);
    page.lines.forEach((ele, i) => {
        r.appendChild(drawLine(ele, { x: 0, y: 0 }));
    });
    return r;
}
function drawNotation(notation, position): SVGElement {
    const r = svg.g();
    r.setAttribute('class', 'muse-notation');
    r.setAttribute('transform', `translate(${position.x},${position.y})`);
    notation.pages.forEach((ele, i) => {
        r.appendChild(drawPage(ele, { x: dimens.page_margin_horizontal, y: dimens.page_margin_vertical }));
    });
    return r;
}
export function drawMuse(muse, element): void {
    console.log(muse.title);
    const s = svg.svg();
    s.setAttribute('width', (dimens.page_width + dimens.page_margin_horizontal * 2).toString());
    s.setAttribute('height', (dimens.page_height + dimens.page_margin_vertical * 2).toString());
    s.appendChild(drawNotation(muse, { x: 0, y: 0 }));
    element.appendChild(s);
}
