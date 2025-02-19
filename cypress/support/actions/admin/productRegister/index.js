

export const ProductRegister = {

    isVisible: function() {
        cy.get('div[class*=container] form').should('be.visible')
    }

} 