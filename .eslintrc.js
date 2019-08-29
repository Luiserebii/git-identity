module.exports = {
  'env': {
    'es6': true,
    "node": true,
    "mocha": true,
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    "max-len": ["error", 120, 2],
    "@typescript-eslint/no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "no-multiple-empty-lines": ['error', { "max": 2 }],
    "semi-style": ["error", "last"],
    "quotes": ["error", "single", { "allowTemplateLiterals": true }]
  }, 
  "plugins": [
    "@typescript-eslint"
  ]
};

