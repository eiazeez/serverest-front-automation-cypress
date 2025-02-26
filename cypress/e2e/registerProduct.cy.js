import { ProductList } from '../support/actions/admin/productList'
import { ProductRegister } from '../support/actions/admin/productRegister'
import { Notification } from '../support/actions/components/notification'

describe('Dado que estou na página de Cadastro de Produtos', function () {

    beforeEach(function () {
        cy.fixture('signup/successful').then(function (successful) {
            this.successful = successful
        })
        cy.fixture('products/tech').then(function (tech) {
            this.tech = tech
        })
    })

    context('Quando eu preencho os dados corretamente', function () {

        it('Então deve ser possível cadastrar um produto com sucesso', function () {

            const admin = this.successful.admin
            const product = this.tech.gpu

            cy.adjustUserData(admin)
            cy.deleteProductByName(admin, product.nome)

            ProductRegister.go(admin)
            ProductRegister.fillForm(product)
            ProductRegister.submit()

            ProductList.findProductByName(product.nome)

        })

        it('Então não deve ser possível cadastrar um produto existente', function () {

            const admin = this.successful.admin
            const product = this.tech.headset

            cy.adjustUserData(admin)
            cy.deleteProductByName(admin, product.nome)
            cy.postProduct(admin, product)

            ProductRegister.go(admin)
            ProductRegister.fillForm(product)
            ProductRegister.submit()

            Notification.errorMsgShouldBe('Já existe produto com esse nome')

        })

        it('Então deve ser possível cadastrar um produto com Imagem', function () { 
            
            const admin = this.successful.admin
            const product = this.tech.teclado

            cy.adjustUserData(admin)
            cy.deleteProductByName(admin, product.nome)

            ProductRegister.go(admin)
            ProductRegister.fillForm(product)
            ProductRegister.submit()

            ProductList.imagePathShouldBe(product.nome, product.image)

        })

    })

    context('Quando eu preencho os dados incorretamente', function () {

        const requiredFields = [
            { nome: '', preco: '99', descricao: 'teste', quantidade: '5', output: 'Nome é obrigatório' },
            { nome: 'Produto sem preco', preco: '', descricao: 'teste', quantidade: '5', output: 'Preco é obrigatório' },
            { nome: 'Produto sem descricao', preco: '99', descricao: '', quantidade: '5', output: 'Descricao é obrigatório' },
            { nome: 'Produto sem Quantidade', preco: '99', descricao: 'Teste', quantidade: '', output: 'Quantidade é obrigatório' },
        ]

        requiredFields.forEach(function (required) {

            it(`Então o sistema deve retornar "${required.output}"`, function () {

                const admin = this.successful.admin

                cy.adjustUserData(admin)

                ProductRegister.go(admin)
                ProductRegister.fillForm(required)
                ProductRegister.submit()

                Notification.errorMsgShouldBe(required.output)
            })

        })

        it('Então deve retornar mensagem após esvaziar campos', function () {

            const admin = this.successful.admin
            const product = this.tech.monitor

            cy.adjustUserData(admin)

            ProductRegister.go(admin)
            ProductRegister.fillForm(product)
            ProductRegister.clearForm()
            ProductRegister.submit()
            
            Notification.errorMsgShouldBe('Nome não pode ficar em branco')
            Notification.errorMsgShouldBe('Preco deve ser um número')
            Notification.errorMsgShouldBe('Descricao não pode ficar em branco')
            Notification.errorMsgShouldBe('Quantidade deve ser um número')

        })

    })

})