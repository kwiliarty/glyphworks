`Glyphs` displays an index of glyphs

```jsx
import { MockedProvider } from '@apollo/client/testing'
import { mocks } from './mocks'
;

<MockedProvider mocks={ mocks } addTypename={ false }>
  <Glyphs />
</MockedProvider>
```
