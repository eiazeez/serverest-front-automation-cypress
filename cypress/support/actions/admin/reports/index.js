

export const Reports = {

    notReadyMsgShouldBe: function(msg) {
        cy.get('h1').should('have.text', msg)
    }

}