const core = (text) => {
    const parent = document.createElement('span');
    parent.style.display = 'inline-flex';
    const children = [...text]
        .map((text, order) => ({ order, rand: Math.random(), text: text }))
        .sort((a, b) => a.rand - b.rand)
        .map(({ order, text }) => {
        const span = document.createElement('span');
        span.style.order = order.toString();
        span.textContent = text;
        return span;
    })
        .reduce((prev, curr) => {
        prev.appendChild(curr);
        return prev;
    }, document.createDocumentFragment());
    parent.appendChild(children);
    return parent;
};
const recursive = (target) => {
    if (target.nodeType === Node.TEXT_NODE) {
        const text = target.textContent;
        if (text === null || text === '') {
            return;
        }
        target.replaceWith(core(text));
        return;
    }
    [...target.childNodes].forEach(recursive);
};
export const init = (selector = '[data-copipex]') => {
    const targets = document.querySelectorAll(selector);
    if (targets.length === 0) {
        return;
    }
    targets.forEach(recursive);
};
