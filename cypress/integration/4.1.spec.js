const functions = require('../../.bit/tests/functions.js');
const user = args['user'];
const repo = args['repo'];

Cypress.on('fail', async (error, runnable) => {
    console.log("CUSTOM ERROR MESSSASGE")
    console.error("CUSTOM ERROR MESSSASGE")

    console.log(error)
    // we now have access to the err instance
    // and the mocha runnable this failed on
    await functions.throwError(error, user, repo)

    throw error // throw error to have test still fail
})

describe('Testing Bunnimage', () => {
    it('Testing Week 4 Step 1', () => {
        cy.visit('bunnimage/index.html')
        cy.get('input[type="text"]').type('console.log("hi yall")')
        cy.get('input[type="button"]').click()
        cy.get('#output').contains('console.log("hi yall")❤️')
    })
})
