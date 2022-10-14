describe('Profile tests', () => {

  it('navigates to the testing endpoint', () => {
    cy.visit('http://localhost:3000')
  })

  it('can switch the theme to dark mode', () => {
    cy.visit('http://localhost:3000')

    cy.get('#root > div > header > div > div.css-j4k7zp-MuiStack-root > label > span.MuiSwitch-root.MuiSwitch-sizeMedium.css-12oj5kh-MuiSwitch-root > span.MuiSwitch-switchBase.MuiSwitch-colorPrimary.MuiButtonBase-root.MuiSwitch-switchBase.MuiSwitch-colorPrimary.PrivateSwitchBase-root.css-w2z5nt-MuiButtonBase-root-MuiSwitch-switchBase > input')
      .check({ force: true })

    //TODO check why its not working with cypress selector
    // cy.get('[data-cy="switch-theme"]')
    //   .check({ force: true })
    
  })

  it('can select an account', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-cy="accounts"]')
      .click()

    cy.get('[data-cy="selected-account"]')
      .first()
      .click({ multiple: false })
  })

  it('can select a language', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-cy="language"]')
      .click()
  })

  it('can see events', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-cy="events"]')
      .click()
  })

  it('can see basic account info', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-cy="account"]')
      .click()
  })

  //TODO: Bug found, enable after closing https://github.com/UniversalDot/front-end/issues/44
  it('can create a profile', () => {
    cy.visit('http://localhost:3000')

    const username = 'JamesBond'
    const hours = '40'
    const info = "I am 007 Agent"
    const interests = "Sofware Development"


    cy.get('[data-cy="username"]')
      .type(`${username}{enter}`, { delay: 50 })

    cy.get('[data-cy="hours"]')
      .type(`${hours}{enter}`, { delay: 100 })

    cy.get('[data-cy="other-information"]')
      .type(`${info}{enter}`, { delay: 100 })

    cy.get('[data-cy="interests"]')
      .type(`${interests}{enter}`, { delay: 100 })

    cy.get('[data-cy="add-interest"]')
      .click()

    cy.get('[data-cy="profile"]')
      .click()

    cy.wait(5000)
  })

  //TODO: Bug found, enable after closing https://github.com/UniversalDot/front-end/issues/44
  it('changes the username', () => {
    cy.visit('http://localhost:3000')

    const username = 'JamesBond'

    cy.get('[data-cy="edit-icon"]').click()

    cy.get('[data-cy="username"]')
      .type(`${username}{enter}`, { delay: 50 })


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

  it('changes the additional information', () => {
    cy.visit('http://localhost:3000')

    const info = 'I like WEB3'

    cy.get('[data-cy="other-information"]')
      .type(`${info}{enter}`, { delay: 100 })
      .clear()

    cy.get('[data-cy="profile"]')
      .click()
  })

  it('deletes the profile', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-cy="delete-profile"]')
      .click()
  })
})