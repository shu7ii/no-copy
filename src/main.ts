const core = (text: string): HTMLElement => {
  const parent = document.createElement('span');
  parent.style.display = 'inline-flex';

  const children = [...text]
    // generate random number to shuffle
    .map((text, order) => ({ order, rand: Math.random(), text: text }))
    // shuffle
    .sort((a, b) => a.rand - b.rand)
    // compose DOM
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

// recursive() applies core() to target
const recursive = (target: Element): void => {
  if (target.nodeType === Node.TEXT_NODE) {
    const text = target.textContent;
    if (text === null || text === '') {
      return;
    }

    target.replaceWith(core(text));
    return;
  }

  ([...target.childNodes] as Element[]).forEach(recursive);
};

export const init = (selector: string = '[data-copipex]'): void => {
  const targets = document.querySelectorAll(selector);
  if (targets.length === 0) {
    return;
  }

  targets.forEach(recursive);
};
