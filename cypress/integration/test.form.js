const uploadFile = (fileName, fileType = '', selector) => {
    cy.get(selector).then(subject => {
        cy.fixture(fileName, 'base64')
        .then(Cypress.Blob.base64StringToBlob)
        .then(blob => {
            const el = subject[0]
            const testFile = new File([blob], fileName, { type: fileType })
            const dataTransfer = new DataTransfer()
            dataTransfer.items.add(testFile)
            el.files = dataTransfer.files
            console.log(el.files)
        })
    })
}

describe('Test HTML Page', () => {

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

    it('Testing form submission', () => {
        const fileName = "testimage.jpg"
        uploadFile(fileName, 'image/jpg', 'input[name="image"]')
        cy.get('button').click()
        cy.get('#emotion').contains('anger', {matchCase: false})
        cy.get('#emotion').contains('contempt', {matchCase: false})
        cy.get('#emotion').contains('disgust', {matchCase: false})
        cy.get('#emotion').contains('fear', {matchCase: false})
        cy.get('#emotion').contains('happiness', {matchCase: false})
        cy.get('#emotion').contains('neutral', {matchCase: false})
        cy.get('#emotion').contains('sadness', {matchCase: false})
        cy.get('#emotion').contains('surprise', {matchCase: false})
    })
})