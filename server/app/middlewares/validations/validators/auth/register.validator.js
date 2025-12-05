import registerField from '../../fields/user.register.field.js';

const registerValidator = [
  registerField.email,
  registerField.password,
  registerField.passwordCheck,
  registerField.nick,
];

export default registerValidator;