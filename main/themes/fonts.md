Each font is available from the theme at: `theme.fonts.<name>`

Alternatively you can import `{ fonts }` independently from the theme file.

In addition, each font is available as a CSS class.

```jsx noeditor
import { fonts } from './glyphworks'
import FontSample from './FontSample'

Object.keys( fonts ).map( font => 
  <FontSample key={ font } font={ font } declaration={ fonts[ font ] } />
)
```
