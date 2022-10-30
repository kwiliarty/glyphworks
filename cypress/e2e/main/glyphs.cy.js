describe( 'The Glyphs index page', () => {
  it( 'has an appropriate title and heading', () => {
    cy.visit( '/glyphs' )
    cy.title()
      .should( 'eq', 'Glyph List : GlyphWorks' )
    cy.get( 'h1' )
      .should( 'contain.text', 'Glyph List' )
  })

  it( 'displays a grid of glyphs', () => {
    cy.visit( '/glyphs' )
    cy.get( '[data-cy="glyphcard-wrapper"]' )
      .should( 'have.length', 170 )
  })

  it( 'passes accessibility checks', () => {
    cy.visit( '/glyphs' )
    cy.injectAxe()
    cy.myCheckA11y()
  })
})
