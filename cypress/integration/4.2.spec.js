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
        cy.get('input[type="text"]').type('acode')
        uploadFile(fileName, 'image/jpg', 'input[name="image"]')
        cy.get('input[type="submit"]').click()
        cy.get('#output').contains('Thanks!')    
    })

    it('Testing error catching', () => {
        cy.visit('bunnimage/index.html')
        const fileName = "testimage.jpg"
        uploadFile(fileName, 'image/jpg', 'input[name="image"]')
        cy.get('input[type="submit"]').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`No name error.`)
        })
    })
})