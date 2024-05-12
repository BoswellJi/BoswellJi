module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single',  { "allowTemplateLiterals": true }],
  },
}
