import React from "react";
import { mount } from "cypress-react-unit-test";
import CreateUpdateTaskForm from '../../src/components/universaldot/DAO/CreateUpdateTaskForm';

const taskFormData = {
  title: '',
  specification: '',
  budget: '',
  deadline: '',
  attachments: '',
  keywords: '',
};

describe("IPFS File Upload Testing", () => {
	it("should handle file upload correctly", () => {

    const mockFunction = cy.stub();
    mount(<CreateUpdateTaskForm
        taskForm={taskFormData || {}}
        onCancel={mockFunction}
        actionCb={mockFunction}
      />);
		
    cy.get<HTMLInputElement>('input[type="file"]').attachFile('test.txt');

    // Assert that the file input value is set correctly
    cy.get('input[type="file"]').should('have.value', 'test.txt');
    
	});
});