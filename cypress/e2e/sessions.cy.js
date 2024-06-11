describe('POST /sessions', () => {

    beforeEach(function (){
        cy.fixture('users').then(function (users){
            cy.log(JSON.stringify(users))
            this.users = users
        })
    })

    it('user session', function (){


        const userData = this.users.login
        cy.task('deleteUser', userData.email)
        cy.postUser(userData)

        cy.postSession(userData).then(res => {
            expect(res.status).to.eq(200)

            const { user } = res.body
            expect(res.body.user.email).to.eq(user.email)
            expect(user.name).to.eq(user.name)
            expect(user.mail).to.eq(user.mail)
        })

    })

    it('invalid password',function (){
        const userInvalid = this.users.inv_pass

        cy.postSession(userInvalid).then(res => {
            expect(res.status).to.eq(401)
        })
    })

    it('email not found',function (){
        const userInvalid = this.users.email_404

        cy.postSession(userInvalid).then(res => {
            expect(res.status).to.eq(401)
        })
    })
})