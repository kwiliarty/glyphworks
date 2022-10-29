`Glyphs` displays an index of glyphs.

The following examples use this `mocks` file:

```js { "file": "../mocks.js" }
```

By default the component comes wrapped in a Page:

```jsx
import { MockedProvider } from '@apollo/client/testing'
import { mocks } from './mocks'
;

<MockedProvider mocks={ mocks } addTypename={ false }>
  <Glyphs />
</MockedProvider>
```

It is also possible to get just the list:

```jsx
import { MockedProvider } from '@apollo/client/testing'
import { mocks } from './mocks'
;

<MockedProvider mocks={ mocks } addTypename={ false }>
  <Glyphs.List />
</MockedProvider>
```
