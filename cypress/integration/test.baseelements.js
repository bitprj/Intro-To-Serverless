describe('Test Base Elements', () => {
    it('Testing base elements exist', () => {
        cy.visit('./index.html')

        // header exists
        cy.get('header').should('have.length', 1)
        // div#container exists
        cy.get('#container').should('have.length', 1)
        // div#emotion exists
        cy.get('#emotion').should('have.length', 1)
        // form#image-form exists
        cy.get('form').should('have.length', 1).and('have.id', 'image-form')
            
        // within form
        cy.get('form').within(($form)=> {
            cy.get('input[name="image"]').should('have.length', 1)
            cy.get('img').should('have.id', 'output')
            cy.get('button').should('have.type', 'submit')
        })
    })

    it('Testing display elements exist', () => {
        cy.visit('./index.html')
        cy.get('h3').contains('emotions')
        cy.get('p').should('have.length', 8)
    })
})