A three-part vertical flex layout. The `Top` and the `Bottom` will be only as
tall as they need to be, but the contents can be set to fill a minimum height.
In the example below, the `ContentBox` is inside a container that is `300px`
tall. The `Bottom` is sticky.

```jsx
import Block from '../Block'
;

<ContentBox minHeight='300px'>
  <ContentBox.Top>
    <Block blockTitle='Top' minHeight='0' />
  </ContentBox.Top>
  <ContentBox.Contents>
    <Block blockTitle='Contents' minHeight='0' />
  </ContentBox.Contents>
  <ContentBox.Bottom>
    <Block blockTitle='Bottom' minHeight='0' />
  </ContentBox.Bottom>
  <div>
    Content that is not in one of the designated children will not be displayed.
  </div>
</ContentBox>
```

At the same time, the `Contents` will expand as needed.

```jsx
import Block from '../Block'
;

<ContentBox minHeight='300px'>
  <ContentBox.Top>
    <Block blockTitle='Top' minHeight='0' />
  </ContentBox.Top>
  <ContentBox.Contents>
    <Block blockTitle='Contents' minHeight='400px' />
  </ContentBox.Contents>
  <ContentBox.Bottom>
    <Block blockTitle='Bottom' minHeight='0' />
  </ContentBox.Bottom>
  <div>
    Content that is not in one of the designated children will not be displayed.
  </div>
</ContentBox>
```
