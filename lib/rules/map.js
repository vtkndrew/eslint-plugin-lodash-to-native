/**
 * @fileoverview Transform lodash map with native, if it's possible
 * @author Andrew Vyatkin
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Transform lodash map with native, if it\'s possible',
      category: 'Best Practices',
      recommended: true
    },
    fixable: 'code',
    schema: []
  },

  create: function(context) {
    const reportError = (node, fix) => {
      context.report({
        node,
        message: 'Use native map for arrays, not lodash map function',
        fix: fixer => fixer.replaceText(node, fix)
      });
    };

    return {
      [`CallExpression[callee.object.name='_'][callee.property.name='map']`](node) {
        if (node.arguments.length < 2) return;

        const sourceCode = context.getSourceCode();

        const firstArgument = node.arguments[0];
        const firstArgumentSource = sourceCode.getText(firstArgument);

        const secondArgument = node.arguments[1];
        const secondArgumentSource = sourceCode.getText(secondArgument);

        let fix = `${firstArgumentSource}.map(${secondArgumentSource})`;
        switch (firstArgument.type) {
          case 'ObjectExpression':
            return;
          case 'ArrayExpression':
          case 'Array':
            break;
          case 'Identifier':
            if (node.parent.type === 'ConditionalExpression') return;
          default:
            fix = `Array.isArray(${firstArgumentSource}) ? ${fix} : ${sourceCode.getText(node)}`;
        }

        reportError(node, fix);
      }
    };
  }
};
