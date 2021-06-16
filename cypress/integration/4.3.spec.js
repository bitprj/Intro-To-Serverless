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

describe('Test Bunnimage', () => {
    it('Testing form submission', () => {
        cy.visit('bunnimage/index.html')
        const fileName = "testimage.jpg"
        cy.get('input[type="text"]').type('mysecret')
        uploadFile(fileName, 'image/jpeg', 'input[name="image"]')
        cy.get('input[type="submit"]').click()
        cy.wait(5000)
        cy.get('#output').contains('Your image has been stored successfully!')    
    })
})