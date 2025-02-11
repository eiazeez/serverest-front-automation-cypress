import { Signup } from '../support/actions/signup'
import { Home } from '../support/actions/home'
import { Admin } from '../support/actions/admin'
import { Access } from '../support/actions/access'

import { Notification } from '../support/actions/components/notification'

describe('Dado que estou na página de cadastro', function () {

    beforeEach(function() {
        cy.fixture('signup/successful').then(function(successful) {
            this.successful = successful
        })

        cy.fixture('signup/invalid').then(function(invalid) {
            this.invalid = invalid
        })
    })

    context('Quando eu preencho os dados corretamente', function () {

        it('Então deve ser possível cadastrar como User', function () {

            const user = this.successful.user

            cy.deleteUserByEmail(user.email)
            Signup.go()
            Signup.fillForm(user)
            Signup.submit()
            Home.isVisible()

        })

        it('Então deve ser possível cadastrar como Admin', function () {

            const user = this.successful.admin

            cy.deleteUserByEmail(user.email)
            Signup.go()
            Signup.fillForm(user)
            Signup.submit()
            Admin.isVisible(`Bem Vindo  ${user.name}`)

        })

    })

    context('Quando eu preencho os dados incorretamente', function () {

        const requiredFields = [
            { name: '', email: 'isaac-sem-nome@qa.com.br', password: 'teste', output: 'Nome é obrigatório' },
            { name: 'Isaac sem Email', email: '', password: 'teste', output: 'Email é obrigatório' },
            { name: 'Isaac sem Senha', email: 'isaac-sem-nome@qa.com.br', password: '', output: 'Password é obrigatório' },
        ]

        requiredFields.forEach(function (required) {

            it(`Então o sistema deve retornar "${required.output}"`, function () {
                Signup.go()
                Signup.fillForm(required)
                Signup.submit()
                Notification.errorMsgShouldBe(required.output)
            })

        })

        it('Então deve retornar mensagem após esvaziar campos', function () {

            const user = this.invalid.clear

            Signup.go()
            Signup.fillForm(user)
            Signup.clearForm()
            Signup.submit()
            Notification.errorMsgShouldBe('Nome não pode ficar em branco')
            Notification.errorMsgShouldBe('Email não pode ficar em branco')
            Notification.errorMsgShouldBe('Password não pode ficar em branco')

        })

        it('Então não deve permitir logar com email sem @', function () {

            const user = this.invalid.badEmail

            cy.deleteUserByEmail(user.email)
            Signup.go()
            Signup.fillForm(user)
            Signup.submit()
            Signup.outputShuoldBe(`Please include an '@' in the email address`)

        })

    })

    context('Quando clico no botão "Entrar"', function() {
    
        it('Então deve ser possível ir para a página de Login', function() {

            Signup.go()
            Signup.goToLogin()
            Access.isVisible()

        })
    })
})