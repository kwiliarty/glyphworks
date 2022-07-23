describe( 'The GlyphWorks index page', () => {
  it( 'has an appropriate heading', () => {
    cy.visit( '/' )
    cy.get( 'h1' )
      .should( 'contain.text', 'GlyphWorks' )
      .click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it( 'features an IpaPairedInput', () => {
    cy.visit( '/' )
    cy.get( 'input[name="xsampa"]' )
      .type('sVm TIN')
    cy.get( 'input[name="ipa"]' )
      .should( 'have.value', 'sʌm θɪŋ' )
  })

  it( 'passes accessibility checks', () => {
    cy.visit( '/' )
    cy.injectAxe()
    cy.myCheckA11y()
  })
})
