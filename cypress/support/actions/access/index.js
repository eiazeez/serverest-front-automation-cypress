import { Home } from '../home'

export const Access = {
    go: function(){
        cy.visit('/login')
    },

    fillForm: function(user){
        cy.get('input[type=email]').type(user.email)
        cy.get('input[type=password]').type(user.password)
    },

    submit: function() {
        cy.get('button[type="submit"]').click()
    },

    errorMsgShouldBe: function(message) {
        cy.get('div[role=alert] button')
            .siblings()
            .should('contain.text', message)
    },

    shouldLogin: function(){
        Home.shouldBeVisible()
    }

}