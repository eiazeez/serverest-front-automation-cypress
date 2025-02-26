import { ProductList } from '../support/actions/admin/productList' 

describe('Dado que estou na Lista de Usuários', function () {

    beforeEach(function () {
        cy.fixture('signup/successful').then(function (successful) {
            this.successful = successful
        })
        cy.fixture('products/tech').then(function (tech) {
            this.tech = tech
        })
    })

    context('Quando clico no botão de "Excluir"', function () {

        it('Então deve ser possível deletar um Produto', function () {

            const admin = this.successful.admin
            const product = this.tech.gpu
            cy.adjustUserData(admin)
            cy.deleteProductByName(admin, product.nome)
            cy.postProduct(admin, product)

            ProductList.go(admin)
            ProductList.deleteProduct(product)

        })
    })

    context('Quando clico no botão de "Editar"', function () {

        it('Então deve ser possível editar o produto', function () {

            const admin = this.successful.admin
            const product = this.tech.gpu
            cy.adjustUserData(admin)
            cy.deleteProductByName(admin, product.nome)
            cy.postProduct(admin, product)

            ProductList.go(admin)
            ProductList.editProduct(product)

        })
    })
})