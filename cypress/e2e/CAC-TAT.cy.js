/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => cy.visit('../../src/index.html'))

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
        cy.get('#title').should('contain','CAC TAT')   
     })

     it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText= 'Teste,  Teste,  Teste,  Teste,  Teste,  Teste,  Teste, Teste,  Teste,  Teste,  Teste,  Teste,  Teste,  Teste,  Teste,'
       
        cy.clock()
       
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Elizo')
        cy.get('#email').type('gabrielelizio@hotmail.com')
        cy.get('#open-text-area').type(longText,{delay:0})
        cy.contains('.button','Enviar').click()
        cy.get('.success').should('be.visible')
        
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')


     })

it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Elizo')
    cy.get('#email').type('gabrielelizio@hotmail')
    cy.get('#open-text-area').type('texte')
    cy.contains('.button','Enviar').click()
    cy.get('.error').should('be.visible')
})

it('campo telefone continua vazio quando preenchido com valor não-númerico', function(){
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Elizo')
    cy.get('#email').type('gabrielelizio@hotmail.com')
    cy.get('#phone')
        .type('abcdefgj')
        .should('have.value','')

})
     
it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Elizo')
    cy.get('#email').type('gabrielelizio@hotmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    cy.contains('.button','Enviar').click()
    cy.get('.error').should('be.visible')    

})
     
it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
    cy.get('#firstName').type('Gabriel')
    .should('have.value','Gabriel')
    .clear().should('have.value','')
    cy.get('#lastName').type('Elizo')
    .should('have.value','Elizo')
    .clear().should('have.value','')
    cy.get('#email').type('gabrielelizio@hotmail.com')
    .should('have.value','gabrielelizio@hotmail.com')
    .clear().should('have.value','')
    cy.get('#open-text-area').type('teste')
    .should('have.value','teste')
    .clear().should('have.value','')
   })

it(' exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
    cy.contains('.button','Enviar').click()
    cy.get('.error').should('be.visible')    
})

it('envia o formuário com sucesso usando um comando customizado',function(){
    cy.fillMandatoryFieldsAndSubmit()
})

it('seleciona um produto (YouTube) por seu texto',function(){
    cy.get('#product')
    .select('YouTube')
    .should('have.value','youtube')
})


it('seleciona um produto (Mentoria) por seu valor (value)',function(){
    cy.get('#product')
    .select('Mentoria')
    .should('have.value','mentoria')
})



it('seleciona um produto (Blog) por seu índice',function(){
    cy.get('#product')
    .select(1)
    .should('have.value','blog')
})

it('marca o tipo de atendimento "Feedback"',function(){
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
})

it('marca cada tipo de atendimento',function(){
    cy.get('input[type="radio"]')
    .check()
    .should('have.length',3)
    .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
    })
})
it('marca ambos checkboxes, depois desmarca o último',function(){
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
})

it('seleciona um arquivo da pasta fixtures',function(){
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })
})

it('seleciona um arquivo simulando um drag-and-drop',function(){
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })

})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"')
    .selectFile('@sampleFile')
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })
})

it (' verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')

})

it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')


})

it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })


  it('preenche a area de texto usando o comando invoke',function(){
    const longText = Cypress._.repeat('Gabriel Ama Anna', 20)
    cy.get('#open-text-area')
    .invoke('val', longText)
    .should('have.value', longText)

  })

  it('faz uma requisição HTTP',function(){
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').then((response)=>{
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
        expect(response.body).to.include('CAC TAT')

    })
    
  
    

  })

  it('Desafio (encontre o gato)', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .invoke('hide')
      .should('not.be.visible')
     })

})
