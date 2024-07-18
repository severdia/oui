# Autocomplete 

Example:

```js
<Autocomplete
  onSuggestionClick={ func }
  suggestions={ Immutable.List([]) }
/>
```

# Summary

This PR implements a typehead component named `Autocomplete`. It's purpose it to take in a 
query string from a user and will either fetch for suggestions from an API or query an internal
list (state) of suggestions

# Features

## Querying a stateful list of suggestions

When `Autocomplete`'s `stateful` prop is set to `true`, it will run queries on an internal suggestions list, each time the InputField is changes.

`stateful` is set to `true` by default.

```js
<Autocomplete
  stateful={ true }
  suggestions={['foo', 'bar']}
/>
```

## Fetching suggestions from an API endpoint

When `Autocomplete`'s `stateful` prop is set to `false`, it will not keep an internal suggestions list. It will be up to parent the parent component to provide the new suggestions list.

```js
// a query string is passed to the `onInputChange` handler
const fetchNewSuggestions = (query) => fetchSuggestions(query)

// You can limit the number of request made to your service per input change
// by setting debounce time (ms)

<Autocomplete
  debounce={ 200 }
  stateful={ false }
  suggestions={['foo', 'bar']}
  onInputChange={ fetchNewSuggestions }
/>
```

## Swappable Sub-Components

`Autocomplete` has three sub-components that can to swapped: `SuggestionField`, `InputField` and `ActionField`.

By default `Autocomplete` render a list of `List`:

<img width="543" alt="screen shot 2018-10-16 at 3 06 46 pm" src="https://user-images.githubusercontent.com/41028823/47054826-b6a03200-d179-11e8-8b6d-5726596b6184.png">

### Swappable SuggestionField

What if you're data is more complex? You can swap the SuggestionField component to render
more complex data

```js
  <Autocomplete SuggestionField={ SomeCustomSuggestionField } />
```

<img width="547" alt="screen shot 2018-10-16 at 3 07 01 pm" src="https://user-images.githubusercontent.com/41028823/47054831-c455b780-d179-11e8-8705-bf11cec5a8b2.png">

### Swappable InputField

Let's say you want different Input component that has a search icon in to left-hand corner. You can 
swap the `InputField` with your desired Input component.

```js
  <Autocomplete InputField={ SomeCustomInputField } />
```

![typeahead-experiments-page](https://user-images.githubusercontent.com/41028823/47054991-bc4a4780-d17a-11e8-8f74-3f4c25fbbfbd.png)

### Swappable ActionField

You can also add an action field by providing the `ActionField` prop with a valid React component.

```js
<Autocomplete
    onActionClick={ createNewCity }
    ActionField={ SomeCustomActionField }
/>
```

<img width="583" alt="screen shot 2018-10-16 at 7 38 21 pm" src="https://user-images.githubusercontent.com/41028823/47055048-1cd98480-d17b-11e8-9a73-e8551c0fb316.png">

# Future Features

Some features the might be useful to add in the future

- `fixedSuggestions` - always render the suggestions list and disable Input blur events
- `SuggestionsField` - a swappable components for the suggestions list
- `rankBy` - determines how to rank search results when `stateful` is `true`
