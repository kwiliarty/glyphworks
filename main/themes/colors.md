```jsx noeditor
import { colors } from './glyphworks'
import Swatch from './Swatch'

Object.keys( colors ).map( color =>
  <Swatch key={ color } color={ color } declaration={ colors[ color ] } />
)
```
