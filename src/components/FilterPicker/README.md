# FilterList  
  
#### ABOUT:  
FilterPicker is React _Render Component_ that uses [render props](https://reactjs.org/docs/render-props.html) to abstract 
away some of the implementation complexity while allowing for maximum extensibility. This pattern was used to avoid a 
"props explosion" that would come with all the variations we have of this pattern. This approach will give control to 
the implementer and keep this component lean. Here are a few noteworthy things:

*-* **ATTN:** If a max scrollable height should be used (likely in most cases), consider using use an oui class like "max-scroll--medium" around `BlockList.Category`  
*-* **ATTN:** If a search Input will be used with `Blocklist` and `FilterList.ListItem`, consider wrapping `Blocklist` inside a div with the `oui-filter-picker-list` class to remove the Input's bottom border (see story and story source for example)  
*-* Using `react-immutable-proptypes`, FilterPicker can be used with Immutable or POJO datasets.  
*-* By default, this component filters `selectedEntityIds` and items that don't match the `filterQuery` to create and return `availableEntities` via the render props function  
*-* If a `customFilterFn` is used, it will be used in place of the `filterQuery` filter. If `selectedEntityIds` should be kept in, simply do not include that list as a component prop  
*-* Find out more below  
  
See more how this was implemented in [`FilterPicker.story.js`](https://github.com/optimizely/oui/blob/devel/src/components/FilterPicker/FilterPicker.story.js).