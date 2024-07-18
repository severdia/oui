import React from 'react';
import { render } from 'react-dom';
import files from 'docs/data/index.json';
import { Link } from 'react-router';
import Routes from 'docs/router';
import Hero from 'docs/components/Hero/';
import ResponsiveMatrix from 'docs/components/ResponsiveMatrix/';
import MatrixFileCard from 'docs/components/MatrixFileCard/';
import CategorySection from 'docs/components/CategorySection/';
import { getLanguagesFromComponent, toTitleCase } from 'docs/utils/';
import { css } from 'glamor';
import s from 'docs/styles/';

const App = (props) => (
  <div>
    <header { ...css(s.container, s.contentPaddingEnds) }>
      <h1>
        <Link to="/">
          <img
            src="http://design.optimizely.com/assets/img/design-guide-lockup.svg"
            alt="Optimizely Design Guide"
            className="max-width--300"
          />
        </Link>
      </h1>
    </header>
    { props.children ||
      <div>
        <Hero
          title="OUI Sass &amp; React"
          description="Documentation for the design system that powers the Optimizely user interface."
        />
        <div { ...css(s.container, s.contentPaddingEnds) }>
          { files && Object.keys(files).map((category) => (
            <div
              key={ category }
              { ...css(s.contentPaddingEnds) }>
              <CategorySection
                categoryName={ toTitleCase(category) }
                categorySlug={ category }>
                <ResponsiveMatrix>
                  { files[category] && Object.keys(files[category]).map(componentId => {
                    const component = files[category][componentId];
                    if (!component.private) {
                      return (
                        <MatrixFileCard
                          key={ component.name }
                          link={ `/${category}/${component.name}` }
                          languages={ getLanguagesFromComponent(component) }>
                          { component.name }
                        </MatrixFileCard>
                      );
                    }
                  })}
                </ResponsiveMatrix>
              </CategorySection>
            </div>
          )) }
        </div>
      </div>
    }
    <footer
      { ...css(s.container, s.contentPaddingEnds) }
      className="border--top">
      <Link to="optimizely.com" title="Optimizely homepage">
        <img className="width--100" src="http://design.optimizely.com/assets/img/optimizely-logo-gray.svg" />
      </Link>
    </footer>
  </div>
);

App.propTypes = {
  children: React.PropTypes.element,
};

render(<Routes shell={ App } />, document.getElementById('container'));
