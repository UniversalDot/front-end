describe('Task tests', () => {


  // TODO Improve Tests
  it('navigates to the Task', () => {
    cy.visit('http://localhost:3000')

    //TODO: Find better selectors
    cy.get("#root > div > header > div > div.MuiBox-root.css-vxcmzt > button > svg")
      .click()

    cy.get('body > div.MuiModal-root.MuiDrawer-root.MuiDrawer-modal.css-8cluuh-MuiModal-root-MuiDrawer-root > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation16.MuiDrawer-paper.MuiDrawer-paperAnchorLeft.css-7lh4qq-MuiPaper-root-MuiDrawer-paper > div > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div.MuiBox-root.css-0 > ul > a:nth-child(3) > div.MuiListItemText-root.MuiListItemText-multiline.css-hasn9s-MuiListItemText-root')
      .click()

    cy.get('[data-cy="upcoming-tasks"]').first().should('have.text', 'Upcoming Tasks')

  })


  it('can start and complete tasks', () => {
    cy.visit('http://localhost:3000')

    cy.get("#root > div > header > div > div.MuiBox-root.css-vxcmzt > button > svg")
      .click()

    cy.get('body > div.MuiModal-root.MuiDrawer-root.MuiDrawer-modal.css-8cluuh-MuiModal-root-MuiDrawer-root > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation16.MuiDrawer-paper.MuiDrawer-paperAnchorLeft.css-7lh4qq-MuiPaper-root-MuiDrawer-paper > div > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div.MuiBox-root.css-0 > ul > a:nth-child(3) > div.MuiListItemText-root.MuiListItemText-multiline.css-hasn9s-MuiListItemText-root')
      .click()

    cy.get('#root > div > main > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-zow5z4-MuiGrid-root > div > div > div.css-1lwbda4-MuiStack-root > div:nth-child(1) > div.MuiCardHeader-root.css-13cp96e-MuiCardHeader-root > div.MuiCardHeader-action.css-sgoict-MuiCardHeader-action > button > svg')
      .click()
  })

})