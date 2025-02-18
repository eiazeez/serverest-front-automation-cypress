import { Cart } from "../support/actions/cart"

describe('Dado que estou na página de Carrinho', function() {
    
    beforeEach(function() {
        cy.fixture('login/successful').then(function(successful) {
            this.successful = successful
        })
    })

    it('Então o sistema deve retornar que a página ainda não está pronta', function() {

        const user = this.successful.user
        cy.adjustUserData(user)

        Cart.go(user)
        Cart.notReadyMsgShouldBe('Em construção aguarde')

    })

})