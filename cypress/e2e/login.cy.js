import { Access } from '../support/actions/access'

describe('Dado que estou na página de login', function(){

    context('Quando preencho o formulário com dados válidos', function(){

        it('Então deve ser possível realizar o LOGIN como Usuário', function(){
    
            const user = {
                name: 'Isaac Douglas',
                email: 'teste-isaac@qa.com.br',
                password: 'teste',
                adm: 'false'
            }
        
            cy.deleteUserByEmail(user.email)
            cy.postUser(user)
        
            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.userShouldLogin()
        
        })

        it('Então deve ser possível realizar o LOGIN como Admin', function(){
    
            const user = {
                name: 'Azeez Qa Admin',
                email: 'teste-azeez-admin@qa.com.br',
                password: 'teste',
                adm: 'true'
            }
        
            cy.deleteUserByEmail(user.email)
            cy.postUser(user)
        
            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.adminShouldLogin(`Bem Vindo  ${user.name}`)
        
        })

    })

    context.only('Quando preencho o formulário de forma incorreta', function() {

        it('Então deve ser possível realizar um LOGIN sem sucesso', function(){
            
            const user = {
                name: 'Isaac Email Ruim',
                email: 'isaac-email-n-cadastrado@qa.com.br',
                password: 'teste',
                adm: 'false'
            }
        
            cy.deleteUserByEmail(user.email)
        
            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.errorMsgShouldBe('Email e/ou senha inválidos')
        
        })

        it('Então não deve ser possível logar com senha incorreta', function(){
            
            const user = {
                name: 'Isaac Senha Ruim',
                email: 'isaac-senha-invalida@qa.com.br',
                password: '123',
                adm: 'false'
            }
        
            cy.deleteUserByEmail(user.email)
        
            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.errorMsgShouldBe('Email e/ou senha inválidos')
        
        })

        it('Então não deve permitir logar com email sem @', function(){
            
            const user = {
                name: 'Isaac Email Ruim',
                email: 'isaac-email-ruim',
                password: 'teste',
                adm: 'false'
            }
        
            cy.deleteUserByEmail(user.email)
        
            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.outputShuoldBe(`Please include an '@' in the email address`)
        
        })

        it('Então não deve permitir logar sem preencher os campos', function() {

            Access.go()
            Access.submit()  
            Access.errorMsgShouldBe('Email é obrigatório')  
            Access.errorMsgShouldBe('Password é obrigatório')  

        })

        it.only('Então deve retornar mensagem após esvaziar campos', function() {

            const user = {
                name: 'Isaac Teste Esvaziar Campos',
                email: 'isaac-teste-esvaziar campos',
                password: 'teste',
                adm: 'false'
            }

            Access.go()
            Access.fillForm(user)
            Access.clearForm()
            Access.submit()  
            Access.errorMsgShouldBe('Email não pode ficar em branco')  
            Access.errorMsgShouldBe('Password não pode ficar em branco')  

        })

    })

    context('Quando clico no botão "Cadastre-se"', function() {

        it('Então deve ser possível ir para a página de cadastro', function() {

            Access.go()
            Access.goToSignup()

        })

    })

})

