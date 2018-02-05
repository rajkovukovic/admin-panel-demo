import expect from 'expect';

import { validateEmail } from '../../src/helpers/formValidation';

describe('ServerListPage Component', () => {

  const badEmails = [
    'test@',
    'marko@gmail',
    '@gmail.com',
    'marko@gmail.c',
  ];

  const goodEmails = [
    'test@yahoo.com',
    'marko@gmail.co',
    'm_@gmail.com',
  ];

  it('should detect incorect email format', () => {
    badEmails.forEach(email => expect(validateEmail(email).toBeFalsy()));
  });

  it('should validate correct email format', () => {
    goodEmails.forEach(email => expect(validateEmail(email).toBeTruthy()));
  });
});
