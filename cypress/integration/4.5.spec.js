describe('Testing the CatzAPP', () => {
    it('Testing Week 4 Step 5', () => {
        cy.visit('catzapp/index.html')
        cy.get('input[type="text"]').type('cat') 
        cy.get('input[type="button"]').click()
        cy.get('img').should('have.attr', 'src').should('include','https://cataas.com/cat/says/cat')
    })
})