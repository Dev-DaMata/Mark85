describe('POST /users', ()=>{
  it('Register a new user',() =>{

    const user = {
      name: "Guilherme Cordeiro",
      email: "guilherme@gmail.com",
      password: "A123456"
    }

    cy.task('deleteUser', user.email)

    cy.request({
      url: '/users',
      method: 'POST',
      body: user,
      failOnStatusCode: false
    }).then(res =>{
      expect(res.status).to.eq(200)
      cy.log(JSON.stringify(res.body))
    })
  })
})