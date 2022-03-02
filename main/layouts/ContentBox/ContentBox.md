A three-part vertical flex layout

```jsx
import Block from '../Block'
;

<HeaderBodyFooter>
  <HeaderBodyFooter.Header>
    <Block blockTitle='Header' minHeight='70px' />
  </HeaderBodyFooter.Header>
  <HeaderBodyFooter.Body>
    <Block blockTitle='Body' minHeight='270px' />
  </HeaderBodyFooter.Body>
  <HeaderBodyFooter.Footer>
    <Block blockTitle='Footer' minHeight='50px' />
  </HeaderBodyFooter.Footer>
  <div>
    Content that is not in one of the designated children will not be displayed.
  </div>
</HeaderBodyFooter>
```

