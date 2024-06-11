
Cypress.Commands.add('postSession', (user) => {
    cy.api({
        url: '/sessions',
        method: 'POST',
        body: {
            email: user.email,
            password: user.password 
        },
        failOnStatusCode: false
    }).then(res => {
        return res
    })
})