```jsx noeditor
import { fonts } from './glyphworks'
import FontSample from './FontSample'

Object.keys( fonts ).map( font => 
  <FontSample key={ font } font={ font } declaration={ fonts[ font ] } />
)
```
