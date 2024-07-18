# Sass

OUI's Sass consists of two parts:

1. **Core OUI Sass**
    - Base styles used as the foundation for any site.
    - This code lives in this OUI repository and is loaded before application specific Sass.
2. **Project specific Sass (mobile website, developer site, etc…)**
    - Project specific Sass built with OUI code such as variables or mixins.
    - This code lives in the project repo, pulling OUI as a dependency.

For example, if you're building a mobile site, your main SCSS file `mobile.scss` would contain:

```scss
// # Mobile Website
// Root file driving the Mobile Website CSS.

// ## OUI and custom functions
@import '../node_modules/optimizely-oui/src/oui/partials/sass/functions';
@import 'mobile-website/functions';

// ## OUI and custom variables
// The mobile website variables file can contain new variables or overwrite existing variables.
@import '../node_modules/optimizely-oui/src/oui/oui-variables';
@import 'mobile-website/mobile-variables';

// ## OUI and custom partials
// Partials are files that import other components
@import '../node_modules/optimizely-oui/src/oui/oui-partials';
@import 'mobile-website/mobile-partials';

// ## Overrides (helper/utility classes)
// Overrides use `!important` classes for overrides and should always be loaded last.
@import '../node_modules/optimizely-oui/src/overrides/admin';
@import '../node_modules/optimizely-oui/src/overrides/background';
@import '../node_modules/optimizely-oui/src/overrides/borders';
@import '../node_modules/optimizely-oui/src/overrides/layout';
@import '../node_modules/optimizely-oui/src/overrides/margin';
@import '../node_modules/optimizely-oui/src/overrides/padding';
@import '../node_modules/optimizely-oui/src/overrides/type';
@import '../node_modules/optimizely-oui/src/overrides/sizing';
```
