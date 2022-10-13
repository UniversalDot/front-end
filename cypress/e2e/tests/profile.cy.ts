describe('general tests', () => {

  it('navigates to the testing endpoint', () => {
    cy.visit('http://localhost:3000')
  })

  it('can switch the theme to dark mode', () => {
    cy.visit('http://localhost:3000')

    cy.get('#root > div > header > div > div.css-j4k7zp-MuiStack-root > label > span.MuiSwitch-root.MuiSwitch-sizeMedium.css-12oj5kh-MuiSwitch-root > span.MuiSwitch-switchBase.MuiSwitch-colorPrimary.MuiButtonBase-root.MuiSwitch-switchBase.MuiSwitch-colorPrimary.PrivateSwitchBase-root.css-w2z5nt-MuiButtonBase-root-MuiSwitch-switchBase > input')
      .check({ force: true })

    //TODO check why its not wroking with cypress selector
    // cy.get('[data-cy="switch-theme"]')
    //   .check({ force: true })
    
  })

  it('changes the username', () => {
    cy.visit('http://localhost:3000')

    const username = 'JamesBond'

    cy.get('[data-cy="edit-icon"]').click()

    cy.get('[data-cy="username"]')
      .clear()
      .type(`${username}{enter}`, { delay: 100 })

    cy.get('[data-cy="edit-icon"]').click()

    cy.get('[data-cy="profile"]')
      .click()
  })

  it('changes the available hours', () => {
    cy.visit('http://localhost:3000')

    const hours = '40'

    cy.get('[data-cy="hours"]')
      .type(`${hours}{enter}`, { delay: 100 })

    cy.get('[data-cy="profile"]')
      .click()
  })
})