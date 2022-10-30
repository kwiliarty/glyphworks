describe( 'The GlyphWorks navigation', () => {
  it( 'contains a header link to the home page', () => {
    cy.visit( '/' )
    cy.get( 'a:contains(GlyphWorks)' )
      .click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it( 'contains a link to the home page', () => {
    cy.visit( '/' )
    cy.get( 'a:contains(Home)' )
      .click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it( 'contains a link to the Glyphs list', () => {
    cy.visit( '/' )
    cy.get( 'a:contains(Glyphs)' )
      .click()
    cy.url().should('eq', Cypress.config().baseUrl + '/glyphs')
  })
})
