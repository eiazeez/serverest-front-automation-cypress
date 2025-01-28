import { Access } from '../support/actions/access'

it('LOGIN com sucesso', function(){
    
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
    Access.shouldLogin()

})

it.only('LOGIN sem sucesso', function(){
    
    const user = {
        name: 'Cristiano Ronaldo CR7 SIIIII',
        email: 'cr7@qa.com.br',
        password: 'teste',
        adm: 'false'
    }

    cy.deleteUserByEmail(user.email)

    Access.go()
    Access.fillForm(user)
    Access.submit()
    Access.errorMsgShouldBe('Email e/ou senha inválidos')

})