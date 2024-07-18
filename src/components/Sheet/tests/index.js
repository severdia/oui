import React from 'react';
import { mount } from 'enzyme';
import Sheet from '../index';
import Button from '../../Button';

describe('Sheet Component ', () => {
  it('renders a default Sheet', () => {
    const onClickSpy = jest.fn();
    const onCloseSpy = jest.fn();

    const component = mount(<Sheet
      title='This is a Sheet'
      onClose={ onCloseSpy }
      footerButtonList={ [
        <Button style="plain" key={ 0 } onClick={ onClickSpy }>
          No Thanks
        </Button>,
        <Button style="highlight" key={ 1 } onClick={ onClickSpy }>
          Continue
        </Button>,
      ] }>
      <p>Sheets can contain anything, typically forms, in the body.</p>
    </Sheet>);
    expect(component.find('.oui-close-button').length).toBe(1);
  });

  it('renders any children passed in', () => {
    const onClickSpy = jest.fn();
    const onCloseSpy = jest.fn();

    const bodyString = 'Sheets can contain anything, typically forms, in the body.';

    const component = mount(<Sheet
      title='This is a Sheet'
      onClose={ onCloseSpy }
      footerButtonList={ [
        <Button style="plain" key={ 0 } onClick={ onClickSpy }>
          No Thanks
        </Button>,
        <Button style="highlight" key={ 1 } onClick={ onClickSpy }>
          Continue
        </Button>,
      ] }>
      <p>{bodyString}</p>
    </Sheet>);
    expect(component.find('.oui-sheet__body').containsMatchingElement(<p>{bodyString}</p>)).toBe(true);
  });

  it('calls the onClose prop function when close button is clicked', () => {
    const onClickSpy = jest.fn();
    const onCloseSpy = jest.fn();

    const component = mount(<Sheet
      title='This is a Sheet'
      onClose={ onCloseSpy }
      footerButtonList={ [
        <Button style="plain" key={ 0 } onClick={ onClickSpy }>
          No Thanks
        </Button>,
        <Button style="highlight" key={ 1 } onClick={ onClickSpy }>
          Continue
        </Button>,
      ] }>
      <p>Sheets can contain anything, typically forms, in the body.</p>
    </Sheet>);
    component.find('.oui-close-button').simulate('click');
    expect(onCloseSpy).toHaveBeenCalled();
  });

  it('renders a subtitle when passed in', () => {
    const onClickSpy = jest.fn();
    const onCloseSpy = jest.fn();

    const subtitleString = 'This is a subtitle';

    const component = mount(<Sheet
      title='This is a Sheet'
      subtitle={ subtitleString }
      onClose={ onCloseSpy }
      footerButtonList={ [
        <Button style="plain" key={ 0 } onClick={ onClickSpy }>
          No Thanks
        </Button>,
        <Button style="highlight" key={ 1 } onClick={ onClickSpy }>
          Continue
        </Button>,
      ] }>
      <p>Sheets can contain anything, typically forms, in the body.</p>
    </Sheet>);
    expect(component.find('.oui-sheet__header').containsMatchingElement(<p>{subtitleString}</p>)).toBe(true);
  });

  it('renders a subtitle node when passed in', () => {
    const onClickSpy = jest.fn();
    const onCloseSpy = jest.fn();

    const subtitleNode = <p>This is a <a href="#">subtitle</a></p>;

    const component = mount(<Sheet
      title='This is a Sheet'
      subtitle={ subtitleNode }
      onClose={ onCloseSpy }
      footerButtonList={ [
        <Button style="plain" key={ 0 } onClick={ onClickSpy }>
          No Thanks
        </Button>,
        <Button style="highlight" key={ 1 } onClick={ onClickSpy }>
          Continue
        </Button>,
      ] }>
      <p>Sheets can contain anything, typically forms, in the body.</p>
    </Sheet>);
    expect(component.find('.oui-sheet__header').containsMatchingElement(<div>{subtitleNode}</div>)).toBe(true);
  });

  it('renders the footer buttons', () => {
    const onClickSpy = jest.fn();
    const onCloseSpy = jest.fn();

    const button1Label = 'No Thanks';
    const button2Label = 'Continue';


    const component = mount(<Sheet
      title='This is a Sheet'
      onClose={ onCloseSpy }
      footerButtonList={ [
        <Button style="plain" key={ 0 } onClick={ onClickSpy }>
          { button1Label }
        </Button>,
        <Button style="highlight" key={ 1 } onClick={ onClickSpy }>
          { button2Label }
        </Button>,
      ] }>
      <p>Sheets can contain anything, typically forms, in the body.</p>
    </Sheet>);
    expect(component.find('.oui-button-row').containsMatchingElement(<button>{button1Label}</button>)).toBe(true);
    expect(component.find('.oui-button-row').containsMatchingElement(<button>{button2Label}</button>)).toBe(true);
  });

  it('does not render a close button when hasCloseButton is false', () => {
    const onClickSpy = jest.fn();

    const component = mount(<Sheet
      title='This is a Sheet'
      hasCloseButton={ false }
      footerButtonList={ [
        <Button style="plain" key={ 0 } onClick={ onClickSpy }>
          No Thanks
        </Button>,
        <Button style="highlight" key={ 1 } onClick={ onClickSpy }>
          Continue
        </Button>,
      ] }>
      <p>Sheets can contain anything, typically forms, in the body.</p>
    </Sheet>);
    expect(component.find('.oui-close-button').length).toBe(0);
  });
});
