import { el } from './elements'

export const RegisterUser = {

    isVisible: function() {
        cy.get('div[class*=container] form').should('be.visible')
    },

    go: function(user) {

        cy.apiLogin(user).then(function(response) {
            window.localStorage.setItem('serverest/userEmail', user.email)
            window.localStorage.setItem('serverest/userNome', user.name)
            window.localStorage.setItem('serverest/userToken', response.body.authorization)
        })

        cy.visit('admin/cadastrarusuarios')
        this.isVisible()
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
    },

} 