

export const UserList = {

    isVisible: function() {
        cy.get('table tbody').should('be.visible')
    },

    findUserByEmail: function(email) {
        cy.contains('td', email).should('be.visible')
    }

} 