Each color is available from the theme at: `theme.colors.<name>`

Alternatively you can import `{ colors }` independently from the theme file.

```jsx noeditor
import { colors } from './glyphworks'
import Swatch from './Swatch'

Object.keys( colors ).map( color =>
  <Swatch key={ color } color={ color } declaration={ colors[ color ] } />
)
```
