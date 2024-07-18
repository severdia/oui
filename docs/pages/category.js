import React from 'react';
import components from 'docs/data/index.json';
import { toTitleCase, getLanguagesFromComponent } from 'docs/utils/';
import CategorySection from 'docs/components/CategorySection/';
import ResponsiveMatrix from 'docs/components/ResponsiveMatrix/';
import MatrixFileCard from 'docs/components/MatrixFileCard/';
import Hero from 'docs/components/Hero/';
import s from 'docs/styles/';
import { css } from 'glamor';

const Category = (props) => {
  const categoryName = props.routes[1].path;
  const componentsInCategory = components[categoryName];

  return (
    <div>
      { props.children ||
        <div>
          <Hero
            title={ `OUI ${toTitleCase(categoryName)}` }
            description="Documentation for the design system that powers the Optimizely user interface."
          />
          <div className="flex" { ...css(s.container, s.contentPaddingEnds) }>
            <div { ...css(s.contentPaddingEnds) }>
              <CategorySection
                categoryName={ toTitleCase(categoryName) }
                categorySlug={ categoryName }>
                <ResponsiveMatrix>
                  { componentsInCategory && Object.keys(componentsInCategory).map(componentId => {
                    const component = componentsInCategory[componentId];
                    if (!component.private) {
                      return (
                        <MatrixFileCard
                          key={ component.name }
                          link={ `/${categoryName}/${component.name}` }
                          languages={ getLanguagesFromComponent(component) }>
                          { component.name }
                        </MatrixFileCard>
                      );
                    }
                  })}
                </ResponsiveMatrix>
              </CategorySection>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

Category.propTypes = {
  children: React.PropTypes.element,
  routes: React.PropTypes.arrayOf(React.PropTypes.shape({
    path: React.PropTypes.string.isRequired,
  })).isRequired,
};

export default Category;
