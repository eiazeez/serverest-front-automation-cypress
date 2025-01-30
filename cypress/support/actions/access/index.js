import { el } from './elements'

import { Home } from '../home'
import { Admin } from '../admin'
import { Signup } from '../signup'

export const Access = {
    go: function(){
        cy.visit('/login')
    },

    fillForm: function(user){
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    },

    clearForm: function(){
        cy.get(el.email).clear()
        cy.get(el.password).clear()
    },

    submit: function() {
        cy.get(el.submit).click()
    },

    errorMsgShouldBe: function(message) {
        cy.contains('span', message)
    },

    userShouldLogin: function(){
        Home.isVisible()
    },

    adminShouldLogin: function(text) {
        Admin.isVisible(text)
    },

    goToSignup: function(){
        cy.get(el.goToSignup).click()
        Signup.isVisible()
    },

    outputShuoldBe: function(text){
        cy.get(el.email)
            .invoke('prop', 'validationMessage')
            .should('to.contain', text)
    }

}