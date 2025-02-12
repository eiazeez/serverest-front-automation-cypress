import { Home } from "../support/actions/home"
import { ProductList } from "../support/actions/productList"
import { ProductDetails } from "../support/actions/productDetails"
import { Header } from "../support/actions/components/header"

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

        it('Então o produto deve ir para a Lista de Compras', function () {

            const user = this.successful.user
            const admin = this.successful.admin
            const product = this.tech.mouse

            cy.adjustUserData(admin)
            cy.adjustUserData(user)
            cy.deleteProductByName(admin, product.nome)
            cy.postProduct(admin, product)

            Home.go(user)
            Home.addProductToList(product)
            ProductList.shouldHaveProduct(product)
                
        })
    })

    context('Quando clico no botão Detalhes', function () {

        it('Então devo ser redirecionado para a página de Detalhes do Produto', function () {

            const user = this.successful.user
            const admin = this.successful.admin
            const product = this.tech.monitor

            cy.adjustUserData(admin)
            cy.adjustUserData(user)
            cy.deleteProductByName(admin, product.nome)
            cy.postProduct(admin, product)

            Home.go(user)
            Home.goToProductDetails(product)
            ProductDetails.verifyDetails(product)
                
        })
    })

    context('Quando clico no botão de Carrinho', function () {

        it('Então devo ser redirecionado para a página Lista de Compras', function () {

            const user = this.successful.user

            cy.adjustUserData(user)

            Home.go(user)
            Home.clickOnCart()
            ProductList.shouldBeVisible()
                
        })
    })

    context('Quando pesquiso pelo produto', function () {

        it('Então o sistema deve me retornar o filtro corretamente', function () {

            const user = this.successful.user
            const admin = this.successful.admin
            const product = this.tech.teclado

            cy.adjustUserData(admin)
            cy.adjustUserData(user)
            cy.deleteProductByName(admin, product.nome)
            cy.postProduct(admin, product)

            Home.go(user)
            Home.searchProduct(product.nome)
            Home.shouldHaveProduct(product)
                 
        })

        it('Então o sistema deve me retornar nenhum produto', function () {

            const user = this.successful.user

            cy.adjustUserData(user)

            Home.go(user)
            Home.searchProduct('Produto Ruim')
            Home.notFoundShouldHaveTxt('Nenhum produto foi encontrado')
                 
        })
    })

    context('Quando clico nos botões do Header', function () {

        it('Então devo ser redirecionado a Lista de compras', function () {

            const user = this.successful.user

            cy.adjustUserData(user)

            Home.go(user)
            Header.goToProductList()
            
        })

        it('Então devo ser redirecionado a Carrinho', function () {

            const user = this.successful.user

            cy.adjustUserData(user)

            Home.go(user)
            Header.goToCart()
            
        })

        it('Então devo ser redirecionado a Home', function () {

            const user = this.successful.user

            cy.adjustUserData(user)

            Home.go(user)
            Header.goToProductList()
            Header.goToHome()
            
        })

        it('Então deve ser possível realizar Logout', function () {

            const user = this.successful.user

            cy.adjustUserData(user)

            Home.go(user)
            Header.logout()
            
        })
    })
})