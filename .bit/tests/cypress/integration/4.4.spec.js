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
    it('Testing upload', () => {
        cy.visit('bunnimage/index.html')
        const fileName = "testimage.jpg"
        cy.get('input[id="username"]').type('acode')
        uploadFile(fileName, 'image/jpg', 'input[name="image"]')
        cy.get('input[id="button1"]').click()
        cy.get('#output').contains('Your image has been stored successfully!')    
    })

    it('Testing download', () => {
        cy.get('input[id="downloadusername"]').type('acode')
        cy.get('input[id="button2"]').click()
    })
})
