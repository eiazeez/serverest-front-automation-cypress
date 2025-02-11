import { Home } from "../support/actions/home"


describe('Dado que estou na Página Inicial', function () {

    beforeEach(function() {
        cy.fixture('login/successful').then(function(successful) {
            this.successful = successful
        })
        cy.fixture('products/tech').then(function(tech) {
            this.tech = tech
        })
    })

    context('Quando clico no botão Adiocionar a Lista', function () {

        it.only('Então o produto deve ir para a Lista de Compras', function () {

            const user = this.successful.user
            const admin = this.successful.admin
            const product = this.tech.mouse

            cy.deleteProductByName(admin, product.nome)
            cy.postProduct(admin, product)

            Home.go(user)
            Home.addProductToList(product)
                
        })

    })

})