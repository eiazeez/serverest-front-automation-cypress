import { el } from './elements'

export const Signup = {

    go: function() {
        cy.visit('/cadastrarusuarios')
        this.isVisible()
    },

    isVisible: function() {
        cy.get(el.form).should('be.visible')
    },

    fillForm: function(user) {
        if( user.name )             cy.get(el.name).type(user.name)
        if( user.email )            cy.get(el.email).type(user.email)
        if( user.password )         cy.get(el.password).type(user.password)
        if( user.adm === "true" )   cy.get(el.adm).click()
    },

    clearForm: function(){
        cy.get(el.name).clear()
        cy.get(el.email).clear()
        cy.get(el.password).clear()
    },

    submit: function() {
        cy.get(el.submit).click()
    },

    outputShuoldBe: function(text){
        cy.get(el.email)
            .invoke('prop', 'validationMessage')
            .should('to.contain', text)
    }

}