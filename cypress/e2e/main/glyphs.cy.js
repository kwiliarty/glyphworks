describe( 'The Glyphs index page', () => {
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
