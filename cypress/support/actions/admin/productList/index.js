

export const ProductList = {

    isVisible: function() {
        cy.get('table tbody').should('be.visible')
    }

} 