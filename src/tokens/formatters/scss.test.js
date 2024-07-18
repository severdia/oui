const toScss = require('./scss');

describe('throws errors', () => {
  it('throws an error when no `id` is provided', () => {
    const token = {
      value: 'hsla(227, 100%, 75%, 1)',
      name: 'Brand Blue (Light)',
    };

    expect(() => toScss('', token)).toThrow();
  });

  it('throws an error when no `value` is provided', () => {
    const token = {
      id: 'brand-blue-light',
      name: 'Brand Blue (Light)',
    };

    expect(() => toScss('', token)).toThrow();
  });
});
