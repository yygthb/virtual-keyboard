export default function createElement({
  tagName = 'div',
  classNames = '',
  child,
  attributes = [],
}) {
  // createElement with classNames
  const el = document.createElement(tagName);
  if (classNames) {
    el.classList.add(...classNames.split(' '));
  }

  // set children
  if (child && typeof child === 'string') {
    el.innerHTML = child;
  } else if (child && Array.isArray(child) && child.length) {
    child.forEach((childNode) => el.append(childNode));
  }

  // set attributes
  attributes.forEach(([attrName, attrValue]) => {
    if (attrName.match(/data-/)) {
      el.dataset[attrName.slice(5)] = attrValue;
    } else {
      el.setAttribute(attrName, attrValue);
    }
  });

  return el;
}
