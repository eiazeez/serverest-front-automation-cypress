import { Access } from '../support/actions/access'
import { Notification } from '../support/actions/components/notification'

describe('Dado que estou na página de login', function(){

    beforeEach(function() {
        cy.fixture('login/successful').then(function(successful) {
            this.successful = successful
        })

        cy.fixture('login/invalid').then(function(invalid) {
            this.invalid = invalid
        })
    })

    context('Quando preencho o formulário com dados válidos', function(){

        it('Então deve ser possível realizar o LOGIN como Usuário', function(){
    
            const user = this.successful.user
        
            cy.deleteUserByEmail(user.email)
            cy.postUser(user)
        
            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.userShouldLogin()
        
        })

        it('Então deve ser possível realizar o LOGIN como Admin', function(){
    
            const user = this.successful.admin
        
            cy.deleteUserByEmail(user.email)
            cy.postUser(user)
        
            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.adminShouldLogin(`Bem Vindo  ${user.name}`)
        
        })

    })

    context('Quando preencho o formulário de forma incorreta', function() {

        it('Então deve ser possível realizar um LOGIN sem sucesso', function(){
            
            const user = this.invalid.unregistered
        
            cy.deleteUserByEmail(user.email)
        
            Access.go()
            Access.fillForm(user)
            Access.submit()
            Notification.errorMsgShouldBe('Email e/ou senha inválidos')
        
        })

        it('Então não deve ser possível logar com senha incorreta', function(){
            
            const user = this.invalid.badPassword
        
            cy.deleteUserByEmail(user.email)
        
            Access.go()
            Access.fillForm(user)
            Access.submit()
            Notification.errorMsgShouldBe('Email e/ou senha inválidos')
        
        })

        it('Então não deve permitir logar com email sem @', function(){
            
            const user = this.invalid.badEmail
        
            cy.deleteUserByEmail(user.email)
        
            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.outputShuoldBe(`Please include an '@' in the email address`)
        
        })

        it('Então não deve permitir logar sem preencher os campos', function() {

            Access.go()
            Access.submit()  
            Notification.errorMsgShouldBe('Email é obrigatório')  
            Notification.errorMsgShouldBe('Password é obrigatório')  

        })

        it('Então deve retornar mensagem após esvaziar campos', function() {

            const user = this.invalid.clear

            Access.go()
            Access.fillForm(user)
            Access.clearForm()
            Access.submit()  
            Notification.errorMsgShouldBe('Email não pode ficar em branco')  
            Notification.errorMsgShouldBe('Password não pode ficar em branco')  

        })

    })

    context('Quando clico no botão "Cadastre-se"', function() {

        it('Então deve ser possível ir para a página de cadastro', function() {

            Access.go()
            Access.goToSignup()

        })

    })

})