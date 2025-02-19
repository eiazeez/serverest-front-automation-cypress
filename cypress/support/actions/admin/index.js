import { Reports } from "./reports"
import { RegisterUser } from "./registerUser"
import { UserList } from "./userList"
import { ProductRegister } from "./productRegister"
import { ProductList } from "./productList"

export const Admin = {
    isVisible: function(text) {
        cy.get('h1').should('contain', text)
    },

    go: function(user) {

        cy.apiLogin(user).then(function(response) {
            window.localStorage.setItem('serverest/userEmail', user.email)
            window.localStorage.setItem('serverest/userNome', user.name)
            window.localStorage.setItem('serverest/userToken', response.body.authorization)
        })

        cy.visit('admin/home')
        this.isVisible(`Bem Vindo  ${user.name}`)
    },

    goToReports: function() {
        cy.get('a[data-testid="relatorios"]').click()
        Reports.notReadyMsgShouldBe('Em construção aguarde')
    },

    goToRegisterUser: function() {
        cy.get('a[data-testid="cadastrarUsuarios"]').click()
        RegisterUser.isVisible()
    },

    goToUserList: function() {
        cy.get('a[data-testid="listarUsuarios"]').click()
        UserList.isVisible()
    },

    goToRegisterProducts: function() {
        cy.get('a[data-testid="cadastrarProdutos"]').click()
        ProductRegister.isVisible()
    },

    goToProductList: function() {
        cy.get('a[data-testid="listarProdutos"]').click()
        ProductList.isVisible()
    },


} 