import { RegisterUser } from "../support/actions/admin/registerUser"
import { UserList } from "../support/actions/admin/userList"
import { Notification } from "../support/actions/components/notification"

describe('Dado que estou na página de Registrar Usuário', function () {

    beforeEach(function () {
        cy.fixture('signup/successful').then(function (successful) {
            this.successful = successful
        })
        cy.fixture('signup/invalid').then(function (invalid) {
            this.invalid = invalid
        })
    })

    context('Quando eu preencho os dados corretamente', function () {

        it('Então deve ser possível cadastrar como User', function () {

            const admin = this.successful.admin
            const user = this.successful.user
            cy.adjustUserData(admin)
            cy.deleteUserByEmail(user.email)

            RegisterUser.go(admin)
            RegisterUser.fillForm(user)
            RegisterUser.submit()
            UserList.findUserByEmail(user.email)

        })

        it('Então deve ser possível cadastrar como Admin', function () {

            const admin = this.successful.admin
            const user = this.successful.adminUser

            cy.adjustUserData(admin)
            cy.deleteUserByEmail(user.email)

            RegisterUser.go(admin)
            RegisterUser.fillForm(user)
            RegisterUser.submit()
            UserList.findUserByEmail(user.email)

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

                    const admin = this.successful.admin

                    cy.adjustUserData(admin)

                    RegisterUser.go(admin)
                    RegisterUser.fillForm(required)
                    RegisterUser.submit()
                    Notification.errorMsgShouldBe(required.output)
                })
    
            })
    
            it('Então deve retornar mensagem após esvaziar campos', function () {
    
                const admin = this.successful.admin
                const user = this.successful.user

                cy.adjustUserData(admin)
                cy.deleteUserByEmail(user.email)

                RegisterUser.go(admin)
                RegisterUser.fillForm(user)
                RegisterUser.clearForm()
                RegisterUser.submit()
                Notification.errorMsgShouldBe('Nome não pode ficar em branco')
                Notification.errorMsgShouldBe('Email não pode ficar em branco')
                Notification.errorMsgShouldBe('Password não pode ficar em branco')
    
            })
    
            it('Então não deve permitir logar com email sem @', function () {
    
                const admin = this.successful.admin
                const user = this.invalid.badEmail

                cy.adjustUserData(admin)
                cy.deleteUserByEmail(user.email)

                RegisterUser.go(admin)
                RegisterUser.fillForm(user)
                RegisterUser.submit()
                RegisterUser.outputShuoldBe(`Please include an '@' in the email address`)
    
            })
    
        })

})