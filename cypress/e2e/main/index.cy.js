describe( 'The GlyphWorks index page', () => {
  it( 'has an appropriate title and heading', () => {
    cy.visit( '/' )
    cy.title()
      .should( 'eq', 'Home : GlyphWorks' )
    cy.get( 'h1' )
      .should( 'contain.text', 'Welcome!' )
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
