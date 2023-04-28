describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    // create here a user to backend
    let user = {
      'username': 'hellas',
      'name': 'Test User',
      'password': 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    user = {
      'username': 'jasonzxu',
      'name': 'Test User 2',
      'password': 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('hellas')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('hellas')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('#notification')
        .should('contain','wrong username or password')
        .and('have.css','color','rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'hellas', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('Test User logged in')
      cy.contains('create new blog').click()

      cy.get('#title-input').type('React patterns')
      cy.get('#author-input').type('Michael Chan')
      cy.get('#url-input').type('https://reactpatterns.com/')
      cy.get('#submit-button').click()

      cy.get('#notification')
        .should('contain','a new blog React patterns by Michael Chan')
        .and('have.css','color','rgb(0, 128, 0)')
      cy.contains('React patterns Michael Chan')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
        })
      })

      it('users can like a blog', function () {
        //Test User clicks like button
        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
          .contains('view')
          .click()
        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
          .contains('like')
          .click()
        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
          .get('.likes').should('contain', 'Likes: 1')

        //Logout Test User and login test user 2
        cy.get('#logout-button').click()
        cy.login({ username: 'jasonzxu', password: 'salainen' })
        cy.reload()

        //Test User 2 clicks like button
        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
          .contains('view')
          .click()
        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
          .contains('like')
          .click()
        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
          .get('.likes').should('contain', 'Likes: 2')
      })

      it('user who created a blog can delete it', function() {
        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
          .contains('view')
          .click()

        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
          .contains('remove')
          .click()

        cy.get('.blog').should('not.exist')
      })

      it('only the createor can see the delete button of a blog', function() {
        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
          .contains('view')
          .click()

        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
          .should('contain', 'remove')

        //Logout Test User and login test user 2
        cy.get('#logout-button').click()
        cy.login({ username: 'jasonzxu', password: 'salainen' })
        cy.reload()

        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
          .contains('view')
          .click()

        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
          .should('not.contain', 'remove')
      })
    })
  })
})