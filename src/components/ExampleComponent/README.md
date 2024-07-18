# ExampleComponent
  
### ABOUT:
The ExampleComponent, while not actually exported, serves as a reference for how to create or update components. Every component should include the following:  
  
-- index.js  
-- ComponentName.story.js  
-- README.mkd  
  
Aditionally, subcomponents or an `index.scss` file can be added to the component and imported in `src/oui/_oui-partials.scss` (please use existing OUI classes when possible and consult UI Eng when adding styles is absolutely necessary).  
  
### Composition vs Inheritance  

As mentioned in the [docs](https://reactjs.org/docs/composition-vs-inheritance.html), React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components. As you create components and try out new patterns, consider linking to those in this file.  
  
### Adopt Storybook Driven Development
Storybook is the best way to learn about, play with, prototype, and build OUI components. Storybook runs locally and will watch for component and documentation updates. Visit http://storybooks-official.netlify.com/ for inspiration on all that is possible!  
  
Every component should contain a README, prop definitions, and a robust set of Storybook examples (stories). This will allow for quicker adoption and help Storybook to serve as the best hub for OUI technical documentation. **If you create or update a component, it shouldn't be considered finished until you've completed the following:**  
  
-- Run Storybook and watch assets via `yarn storybook`  
-- Copy or reference the format of this [ExampleComponent](./data/components/ExampleComponent) to ensure your component's README and stories are set up correctly  
-- Include accurate `propType` configurations and comments, as well as `defaultProps` if applicable (these details are pulled into the _show info_ section)  
-- Add README.md with component usage information and implementation tips (see note below)  
  
>Note: until Storybook Issues [#3458](https://github.com/storybooks/storybook/issues/3458) and [#4499](https://github.com/storybooks/storybook/issues/4499) are resolved, each component README should be added in your **_*.story.js** file. Additionally using double-spaces at the end of each line and a period + double-space for line breaks will help make the files more readable.