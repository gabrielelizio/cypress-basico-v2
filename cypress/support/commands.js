
Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){

        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Elizo')
        cy.get('#email').type('gabrielelizio@hotmail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('.button','Enviar').click()
        cy.get('.success').should('be.visible')
})