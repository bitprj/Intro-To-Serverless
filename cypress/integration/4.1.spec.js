
Cypress.on('fail', (error, runnable) => {
    console.log("CUSTOM ERROR MESSSASGE")
    console.error("CUSTOM ERROR MESSSASGE")

    console.log(error)
    // we now have access to the err instance
    // and the mocha runnable this failed on

    throw new Error("CUSTOME RRRORR") // throw error to have test still fail
})

describe('Testing Bunnimage', () => {
    it('Testing Week 4 Step 1', () => {
        cy.visit('bunnimage/index.html')
        cy.get('input[type="text"]').type('console.log("hi yall")')
        cy.get('input[type="button"]').click()
        cy.get('#output').contains('console.log("hi yall")❤️')
    })
})
