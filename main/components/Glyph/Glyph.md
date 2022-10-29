The `Glyph` component displays details of a specific glyph. If you pass in a
`glyphObject` then the component will use it directly. If you pass in a `slug`
or provide it as a URL parameter, then the component will fetch the Glyph object.

The examples here use the following `mocks` file:

```js { "file": "../mocks.js" }
```

By default, we display the glyph embedded in a page:

```jsx
import { MockedProvider } from '@apollo/client/testing'
import { mocks } from './mocks'
;

<MockedProvider mocks={ mocks } addTypename={ false }>
  <Glyph slug='lower-case-p' />
</MockedProvider>
```

We can also display the unwrapped glyph details:

```jsx
import { MockedProvider } from '@apollo/client/testing'
import { mocks } from './mocks'
;

<MockedProvider mocks={ mocks } addTypename={ false }>
  <Glyph.Detail slug='lower-case-p' />
</MockedProvider>
```

Passing a `glyphObject` directly to the component:

```jsx
import { MockedProvider } from '@apollo/client/testing'
import { mocks } from './mocks'
;

<MockedProvider>
  <Glyph glyphObject={ mocks[0].result.data.glyph } />
</MockedProvider>
```

Passing a `glyphObject` directly to the `Detail` subcomponent:

```jsx
import { MockedProvider } from '@apollo/client/testing'
import { mocks } from './mocks'
;

<MockedProvider>
  <Glyph.Detail glyphObject={ mocks[0].result.data.glyph } />
</MockedProvider>
```
