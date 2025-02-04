import { Signup } from '../support/actions/signup'
import { Home } from '../support/actions/home'
import { Admin } from '../support/actions/admin'
import { Notification } from '../support/actions/components/notification'

describe('Dado que estou na página de cadastro', function() {

    context('Quando eu preencho os dados corretamente', function() {

        it('Então deve ser possível cadastrar como User', function() {

            const user = {
                name: 'Isaac Cadastro como User',
                email: 'isaac-user-@qa.com.br',
                password: 'teste',
                adm: 'false'
            }

            cy.deleteUserByEmail(user.email)
            Signup.go()
            Signup.fillForm(user)
            Signup.submit()
            Home.isVisible()

        })

        it('Então deve ser possível cadastrar como Admin', function() {

            const user = {
                name: 'Isaac Cadastro como Admin',
                email: 'isaac-admin-@qa.com.br',
                password: 'teste',
                adm: 'true'
            }

            cy.deleteUserByEmail(user.email)
            Signup.go()
            Signup.fillForm(user)
            Signup.submit()
            Admin.isVisible(`Bem Vindo  ${user.name}`)

        })

    })

    context('Quando eu preencho os dados incorretamente', function() {

        const requiredFields = [
            { name: '' , email:'isaac-sem-nome@qa.com.br', password: 'teste',           output: 'Nome é obrigatório'     },
            { name: 'Isaac sem Email' , email:'', password: 'teste',                    output: 'Email é obrigatório'    },
            { name: 'Isaac sem Senha' , email:'isaac-sem-nome@qa.com.br', password: '', output: 'Password é obrigatório' },
        ]

        requiredFields.forEach(function(required) {

            it(`Então o sistema deve retornar "${required.output}"`, function() {
                Signup.go()
                Signup.fillForm(required)
                Signup.submit()
                Notification.errorMsgShouldBe(required.output)
            })

        })

        it('Então deve retornar mensagem após esvaziar campos', function() {
        
                const user = {
                    name: 'Isaac Teste Esvaziar Campos',
                    email: 'isaac-teste-esvaziar campos',
                    password: 'teste',
                    adm: 'false'
                }
    
                Signup.go()
                Signup.fillForm(user)
                Signup.clearForm()
                Signup.submit()  
                Notification.errorMsgShouldBe('Nome não pode ficar em branco')  
                Notification.errorMsgShouldBe('Email não pode ficar em branco')  
                Notification.errorMsgShouldBe('Password não pode ficar em branco')  
        
        })

        it('Então não deve permitir logar com email sem @', function(){
                    
                    const user = {
                        name: 'Isaac Email Ruim',
                        email: 'isaac-email-ruim',
                        password: 'teste',
                        adm: 'false'
                    }
                
                    cy.deleteUserByEmail(user.email)
                
                    Signup.go()
                    Signup.fillForm(user)
                    Signup.submit()
                    Signup.outputShuoldBe(`Please include an '@' in the email address`)
                
                })

    })

})