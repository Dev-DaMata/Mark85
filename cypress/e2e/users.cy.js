describe('POST /users', () => {

  beforeEach(function() {
    cy.fixture('users').then(function (users) {
      this.users = users
    })
  })

  it('Register a new user', function() {

    const user = this.users.create

    cy.task('deleteUser', user.email)

    cy.postUser(user).then(res => {
      expect(res.status).to.eq(200)
    })
  })

  it('duplicate mail', function() {

    const user = this.users.dup_mail

    cy.task('deleteUser', user.email)

    cy.postUser(user)

    cy.postUser(user).then(res => {

      const { message } = res.body

      expect(res.status).to.eq(409)
      expect(message).to.eq("Duplicated email!")
    })
  })

  context('required fields', function() {
    let user;

    beforeEach(function() {
      user = this.users.required
    })

    it('name is required', () =>{
      delete user.name

      cy.postUser(user).then(res =>{
        const { message } = res.body
        expect(res.status).to.eq(400)
        expect(message).to.eq("ValidationError: \"name\" is required. \"email\" is required. \"mail\" is not allowed")
      })
    })

    it('email is required', function() {
      delete user.mail

      cy.postUser(user).then(res =>{
        const { message } = res.body
        expect(res.status).to.eq(400)
        expect(message).to.eq("ValidationError: \"email\" is required")
      })
    })

    it('password is required', function() {
      delete user.password

      cy.postUser(user).then(res =>{
        const { message } = res.body
        expect(res.status).to.eq(400)
        expect(message).to.eq("ValidationError: \"email\" is required. \"password\" is required. \"mail\" is not allowed")
      })
    })
  })
  
})