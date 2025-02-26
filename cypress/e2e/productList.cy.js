import { ProductList } from "../support/actions/productList"

describe('Dado que estou na Lista de Compras', function () {

    beforeEach(function() {
        cy.fixture('login/successful').then(function(successful) {
            this.successful = successful
        })
        cy.fixture('products/tech').then(function(tech) {
            this.tech = tech
        })
    })

    it('Então deve ser possível ir para a Página inicial', function() {

        const user = this.successful.user
        cy.adjustUserData(user)

        ProductList.go(user)
        ProductList.goToHome()

    })

    context('Quando a lista está vazia', function () {

        it('Então o sistema deve retornar que o carrinho está vazio', function () {

            const user = this.successful.user
            cy.adjustUserData(user)

            ProductList.go(user)
            ProductList.emptyShouldHaveTxt('Seu carrinho está vazio')

        })
    })

    context('Quando a lista possui produto', function () {

        it('Então deve ser possível limpar a lista', function () {

            const user = this.successful.user
            const admin = this.successful.admin
            const product = this.tech.gpu

            cy.adjustUserData(admin)
            cy.adjustUserData(user)
            cy.addProductToCart(admin, product)

            ProductList.go(user)
            ProductList.clearList()
            ProductList.emptyShouldHaveTxt('Seu carrinho está vazio')

        })

        it('Então deve ser possível adicionar ao carrinho', function () {

            const user = this.successful.user
            const admin = this.successful.admin
            const product = this.tech.ssd

            cy.adjustUserData(admin)
            cy.adjustUserData(user)
            cy.addProductToCart(admin, product)

            ProductList.go(user)
            ProductList.addToCart()

        })

        it('Então deve ser possível aumentar a quantidade do produto', function () {

            const user = this.successful.user
            const admin = this.successful.admin
            const product = this.tech.headset

            cy.adjustUserData(admin)
            cy.adjustUserData(user)
            cy.addProductToCart(admin, product)

            ProductList.go(user)
            ProductList.increaseQuantity(product)

        })

        it('Então deve ser possível diminuir a quantidade do produto', function () {

            const user = this.successful.user
            const admin = this.successful.admin
            const product = this.tech.headset

            cy.adjustUserData(admin)
            cy.adjustUserData(user)
            cy.addProductToCart(admin, product)

            ProductList.go(user)
            ProductList.decreaseQuantity(product)

        })
    })
})