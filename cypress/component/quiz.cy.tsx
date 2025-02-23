import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';
import { getQuestions } from '../../client/src/services/questionApi';
import React from 'react';

// Mock the getQuestions function
cy.stub(getQuestions).resolves([
  {
    _id: '1',
    question: 'What is the output of print(2 ** 3)?',
    answers: [
      { _id: '1', text: '6', isCorrect: false },
      { _id: '2', text: '8', isCorrect: true },
      { _id: '3', text: '9', isCorrect: false },
      { _id: '4', text: '12', isCorrect: false },
    ],
  },
]);

describe("<Quiz />", () => {
  it("renders the quiz question and answers", () => {
    // Mount the component
    mount(<Quiz />);
    
    // Start the quiz
    cy.get('button').contains('Start Quiz').click();

    // Wait for questions to load
    cy.contains('What is the output of print(2 ** 3)?').should("be.visible");

    // Verify that the answers are displayed
    cy.contains("6").should("be.visible");
    cy.contains("8").should("be.visible");
    cy.contains("9").should("be.visible");
    cy.contains("12").should("be.visible");
  });
});
