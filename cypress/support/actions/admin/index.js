

export const Admin = {
    isVisible: function(text) {
        cy.get('h1').should('contain', text)
    },

    go: function(user) {

        cy.apiLogin(user).then(function(response) {
            window.localStorage.setItem('serverest/userEmail', user.email)
            window.localStorage.setItem('serverest/userToken', response.body.authorization)
        })

        cy.visit('admin/home')
        this.isVisible()
    }
} 