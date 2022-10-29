describe( 'A glyph page', () => {
  it( 'has a fitting title and h1', () => {
    cy.visit( '/glyphs/lower-case-p' )
    cy.get( 'h1 ')
      .should( 'contain.text', 'Lower-case p')
    cy.title()
      .should( 'eq', 'Lower-case p : GlyphWorks' )
  })

  it( 'displays glyph details', () => {
    cy.visit( '/glyphs/lower-case-p' )
    cy.get( '[data-cy="glyph-wrapper"] table' )
      .should( 'contain.text', 'IPA Name')
  })

  it( 'passes accessibility checks', () => {
    cy.visit( '/glyphs/lower-case-p' )
    cy.get( '[data-cy="glyph-wrapper"] table' )
    cy.injectAxe()
    cy.myCheckA11y()
  })
})
