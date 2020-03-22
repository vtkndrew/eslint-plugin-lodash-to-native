/**
 * @fileoverview Transform lodash map with native, if it&#39;s possible
 * @author Andrew Vyatkin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/map"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("map", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "_.map([1, 2, 3], fn)",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
