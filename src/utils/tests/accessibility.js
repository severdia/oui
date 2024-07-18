import { getAssistiveTextFromColorClass } from '../accessibility';

describe('utils/accessibility', () => {
  describe('#getAssistiveTextFromColorClass', () => {
    it('should throw error if non-existent class is provided', () => {
      expect(() => { getAssistiveTextFromColorClass('foo-bar'); }).toThrow();
    });

    it('should return a word if a correct color class is provided', () => {
      expect(getAssistiveTextFromColorClass('good-news')).toBe('Success');
    });
  });
});
