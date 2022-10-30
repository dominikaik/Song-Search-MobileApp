/// <reference types="cypress" />

describe('Spotify explorer, list test', () => {
  beforeEach(() => {
    // Visit page before each test
    cy.visit('http://localhost:3000/')
  })

  it('Song list displays 10 table elements', () => {
    // Get all songs in table, 10 songs + 10 dropdowns, therefore 20
    cy.get('.MuiTableBody-root').find('tr').should('have.length', 20)

    // The first song with the default sorting should have the name Como Llora
    cy.get('.MuiTableBody-root td').eq(1).should('have.text', 'Como Llora')
  })

  it('Can filter on danceability', () => {

    cy.get('#select-search-filter').click() 
    cy.get('li').each(($elem) => {
    if ($elem.text() == "Danceability") {
        cy.wrap($elem).click()
      }
    })
    // The first song with the default sorting should have the name Como Llora
    cy.get('.MuiTableBody-root td').eq(1).should('have.text', 'Funky Cold Medina')
  })

  it('Search for songs by Kygo', () => {
    const search = 'Kygo'
    cy.get('#search-text-field').type(`${search}`)
    cy.get('.MuiButtonBase-root').contains('Search').click()
    cy.wait(500)
    // The second song with the default sorting should have the name Not Ok
    cy.get('.MuiTableBody-root td').eq(6).should('have.text', 'Not Ok')
    // The next table/td cell is the song year
    cy.get('.MuiTableBody-root td').eq(8).should('have.text', '2019')
  })

  it('Page 2 contains 10 new elements', () => {
    cy.get(`[aria-label="Go to page 2"]`).click()
    cy.wait(500)
    cy.get('.MuiTableBody-root').find('tr').should('have.length', 20)
    // The first song with the default sorting should now have the name 327
    cy.get('.MuiTableBody-root td').eq(1).should('have.text', '327')
    cy.get('.MuiTableBody-root td').eq(1).should('not.have.text', 'Como Llora')
  })

 it('Rate song sends a request', () => {
  cy.get('.MuiTableBody-root td').first().click()
  cy.get('.MuiChip-label').first().should('have.text', 'Info')
  cy.get('.MuiChip-label').eq(1).should('have.text', 'Danceability: 83%')
 })
})