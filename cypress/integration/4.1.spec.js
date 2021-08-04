describe('Testing Bunnimage', () => {
    it('Testing Week 4 Step 1', () => {
        cy.visit('bunnimage/index.html')
        cy.get('input[type="text"]').type('console.log("hi yall")')
        cy.get('input[type="button"]').click()
        cy.get('#output').contains('console.log("hi yall")❤️')
    })
})
