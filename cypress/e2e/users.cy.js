describe('POST /users', () => {

  it('Register a new user', () => {

    const user = {
      name: "Guilherme Cordeiro",
      email: "guilherme@gmail.com",
      password: "A123456"
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then(res => {
      expect(res.status).to.eq(200)
    })
  })

  it('duplicate mail', () => {

    const user = {
      name: "James Gun",
      email: "james.gun@gmail.com",
      password: "A123456"
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)

    cy.postUser(user).then(res => {

      const { message } = res.body

      expect(res.status).to.eq(409)
      expect(message).to.eq("Duplicated email!")
    })
  })

  context('required fields', ()=> {
    let user;

    beforeEach(() => {
      user = {
        name: 'Margot Robbie',
        mail: 'margor@gmail.com',
        password: 'A123456'
      }
    })

    it('name is required', () =>{
      delete user.name

      cy.postUser(user).then(res =>{
        const { message } = res.body
        expect(res.status).to.eq(400)
        expect(message).to.eq("ValidationError: \"name\" is required. \"email\" is required. \"mail\" is not allowed")
      })
    })

    it('email is required', () =>{
      delete user.mail

      cy.postUser(user).then(res =>{
        const { message } = res.body
        expect(res.status).to.eq(400)
        expect(message).to.eq("ValidationError: \"email\" is required")
      })
    })

    it('password is required', () =>{
      delete user.password

      cy.postUser(user).then(res =>{
        const { message } = res.body
        expect(res.status).to.eq(400)
        expect(message).to.eq("ValidationError: \"email\" is required. \"password\" is required. \"mail\" is not allowed")
      })
    })
  })
  
})