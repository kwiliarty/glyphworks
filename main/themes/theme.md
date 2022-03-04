## Settings

```jsx noeditor
import theme from './glyphworks'

;
<dl>
  {
    Object.keys( theme ).map( key => {
      if ( typeof( theme[ key ] ) == 'string' ) {
        return (
          <React.Fragment key={ key } >
            <dt><strong>{ key }</strong></dt>
            <dd><pre>{ theme[ key ] }</pre></dd>
          </React.Fragment>
        )
      }
    })
  }
</dl>
```
