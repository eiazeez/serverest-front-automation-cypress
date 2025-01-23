

it('Teste 01 - LOGIN', function(){

    cy.api({
        url: 'https://serverest.dev/usuarios',
        method: 'POST',
        failOnStatusCode: false,
        body: {
                "nome": "Isaac Douglas Aragao Eu sou o Douglas",
                "email": "teste-isaac@qa.com.br",
                "password": "teste",
                "administrador": "false"
            }
    })

    cy.visit('https://front.serverest.dev/login')
    cy.get('input[type=email]').type('teste-isaac@qa.com.br')
    cy.get('input[type=password]').type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('section[class="row espacamento"]').should('be.visible')

})