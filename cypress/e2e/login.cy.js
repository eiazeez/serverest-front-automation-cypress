

it('Teste 01 - LOGIN', function(){
    cy.visit('https://front.serverest.dev/login')
    cy.get('input[type=email]').type('email-de-verdade@gmail.com')
    cy.get('input[type=password]').type('senhamuitoforte123456789hahaha')
    cy.get('button[type="submit"]').click()

    cy.get('section[class="row espacamento"]').should('be.visible')

})