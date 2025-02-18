

export const Cart = {

    shoudBeVisible: function() {
        cy.get('h1').should('be.visible')
    },

    go: function(user) {
        cy.apiLogin(user).then(function(response){
            window.localStorage.setItem('serverest/userEmail', user.email)
            window.localStorage.setItem('serverest/userToken', response.body.authorization)
        })
        cy.visit('/carrinho')
        this.shoudBeVisible()
    },

    notReadyMsgShouldBe: function(msg) {
        cy.get('h1').should('have.text', msg)
    }

} 