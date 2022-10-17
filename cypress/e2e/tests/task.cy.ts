describe('Task tests', () => {

  it('navigates to the Task', () => {
    cy.visit('http://localhost:3000')

    cy.get("#root > div > header > div > div.MuiBox-root.css-vxcmzt > button > svg")
      .click()

    cy.get('body > div.MuiModal-root.MuiDrawer-root.MuiDrawer-modal.css-8cluuh-MuiModal-root-MuiDrawer-root > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation16.MuiDrawer-paper.MuiDrawer-paperAnchorLeft.css-7lh4qq-MuiPaper-root-MuiDrawer-paper > div > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div.MuiBox-root.css-0 > ul > a:nth-child(3) > div.MuiListItemText-root.MuiListItemText-multiline.css-hasn9s-MuiListItemText-root')
      .click()

    cy.get('[data-cy="upcoming-tasks"]').first().should('have.text', 'Upcoming Tasks')

  })

})