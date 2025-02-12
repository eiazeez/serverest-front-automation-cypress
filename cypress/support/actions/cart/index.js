

export const Cart = {

    shoudBeVisible: function() {
        cy.get('h1').should('be.visible')
    }

} 