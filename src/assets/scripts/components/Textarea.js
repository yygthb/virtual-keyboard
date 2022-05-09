import createElement from '../utils/createElement';

const textarea = () => {
  const node = createElement({
    tagName: 'textarea',
    classNames: 'textarea',
    attributes: [
      ['cols', 50],
      ['rows', 10],
      ['name', 'textarea'],
    ],
  });

  return node;
};

export default textarea;
