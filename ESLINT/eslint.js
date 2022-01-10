'use strict';

const config = {
    root: true,
    env: {
        node: true,
    },
    parser: 'vue-eslint-parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'vue/script-setup-uses-vars': 0,
        'vue/mustache-interpolation-spacing': [ 'error', 'always' ],
        '@typescript-eslint/naming-convention': [ 'warn', {
            selector: 'interface',
            format: [ 'PascalCase' ],
            custom: {
                regex: '^[A-Z]',
                match: true,
            },
        }],
        '@typescript-eslint/no-unused-expressions': [ 'error', {
            allowShortCircuit: true,
        }],
        '@typescript-eslint/no-unused-vars': [ 'warn', {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false,
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
        }],
        'no-unused-expressions': 'off',
        'no-debugger': 'error',
        'no-undefined': 'off',
        'no-unused-vars': 'off',
        'no-async-promise-executor': 'off',
        indent: 'off',
        '@typescript-eslint/indent': [ 'error', 4, { SwitchCase: 1 }],
        'array-bracket-spacing': [ 'warn', 'always', { objectsInArrays: false }],
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-use-before-define': 0,
        'no-use-before-define': 0,
        'no-extra-parens': [ 2, 'functions' ],
        'vue/component-definition-name-casing': 0,
        'vue/custom-event-name-casing': 0,
        'vue/no-lone-template': 0,


        // 临时处理， 以下是 @ks/eslint-config 的内容，配置太老了， indent 配置不兼容
        'comma-spacing': [ 2, { before: false, after: true }],
        'comma-style': [ 2, 'last' ], // 逗号不允许放到下一行
        'keyword-spacing': [ 2, { before: true, after: true }], // 空格
        semi: [ 2, 'always' ], // 语句强制分号结尾
        quotes: [ 2, 'single' ], // 建议使用单引号
        'no-inner-declarations': [ 1, 'both' ], // 不建议在{}代码块内部声明变量或函数
        'no-extra-boolean-cast': 2, // 多余的感叹号转布尔型
        'no-extra-semi': 2, // 多余的分号
        'no-empty': 2, // 空代码块
        complexity: [ 1, 20 ], // 圈复杂度大于20 警告
        'space-before-blocks': [ 2, 'always' ], // 不以新行开始的块{前面要有空格
        'space-before-function-paren': [ 2, {
            anonymous: 'always',
            named: 'never',
        }], // 函数定义时括号前面有2空格
        'spaced-comment': 2, // 注释风格 2空格什么的
        'space-infix-ops': 2, // 中缀操作符周围 有2空格
        'space-in-parens': [ 0, 'never' ], // 小括号里面要不要有空格
        radix: 2, // parseInt必须指定第二个参数
        'operator-linebreak': [ 2, 'before' ], // 换行时运算符在行尾还是行首
        'one-var': [ 2, 'never' ],
        'one-var-declaration-per-line': 2,
        'max-len': [ 0, 150, 4 ], // 字符串最大长度
        'key-spacing': [ 2, {
            beforeColon: false,
            afterColon: true,
        }], // 对象字面量中冒号的前后空格
        'no-multiple-empty-lines': [ 1, {
            max: 2,
        }], // 空行最多不能超过2行
        'no-multi-str': 2, // 字符串不能用\换行
        'no-mixed-spaces-and-tabs': [ 2, false ], // 禁止混用tab和空格
        'no-console': [ 'error', { allow: [ 'warn', 'error' ] }], // 禁止使用console
        // 常见错误
        'comma-dangle': [ 1, 'always-multiline' ], // 定义数组或对象最后多余的逗号
        'handle-callback-err': 1, // 对于node回调等callback，在使用error first的时候必须要优先处理error
        'no-nested-ternary': 2, // 禁止使用嵌套的三元表达式，应使用if else等来判断
        // 'no-debugger': 2, // debugger 调试代码未删除
        'no-caller': 2, // 禁止使用caller来进行方法本身访问
        'no-path-concat': 2, // 如果遇到路径concat场景，要使用path.resolve/join等，严禁直接拼装路径
        'no-eval': 2, // 如无必要，禁止使用eval
        'no-constant-condition': 2, // 常量作为条件
        'no-dupe-args': 2, // 参数重复
        'no-dupe-keys': 2, // 对象属性重复
        'no-extra-bind': 1, // 禁止使用无意义的bind函数
        'no-implied-eval': 2, // 禁止使用可能产生影响的动态代码
        'no-iterator': 2, // 禁止使用__iterator__属性
        'no-new-wrappers': 2, // 禁止使用new String/Number/Boolean等来创建对象
        'no-octal-escape': 2, // 字符串中使用特殊符号转义字符等，应强制使用unicode，不允许使用八进制转义序列
        'no-catch-shadow': 1, // 不允许在 catch 语句中遮盖变量
        'no-undef-init': 1, // 不要使用undefined作为变量初始值
        // 'no-undefined': 1, // 不要直接使用undefined作为值进行使用，建议使用typeof判断
        'no-duplicate-case': 2, // case重复
        'no-empty-character-class': 2, // 正则无法匹配任何值
        'no-invalid-regexp': 2, // 无效的正则
        'no-spaced-func': 2, // 函数调用时不允许有空格
        'no-func-assign': 1, // 函数被赋值
        'no-proto': 1, // 不允许使用__proto__来访问原型对象，应使用getPrototypeOf方法
        'no-negated-in-lhs': 2, // 对于in判断的时候需要如有!等符号判断时，应强制增加括号
        'valid-typeof': 2, // 无效的类型判断
        'no-unreachable': 2, // 不可能执行到的代码
        'no-unexpected-multiline': 2, // 行尾缺少分号可能导致一些意外情况
        'no-sparse-arrays': 2, // 数组中多出逗号
        'no-shadow-restricted-names': 2, // 关键词与命名冲突
        'no-undef': 2, // 变量未定义
        // 'no-unused-vars': 1, // 变量定义后未使用
        'no-cond-assign': 1, // 条件语句中禁止赋值操作
        'no-native-reassign': 2, // 禁止覆盖原生对象

        // 代码风格优化
        'brace-style': [ 1, '1tbs', { allowSingleLine: true }], // 对于大括号风格要求
        'no-else-return': [ 2, { allowElseIf: false }], // 在else代码块中return，else是多余的
        'new-cap': [ 1, { newIsCap: true, capIsNew: false }], // 如果明确为构造函数，应使用大写开头，其他情况应不做限制
        'new-parens': 2, // 使用new 操作符时应增加()
        'no-multi-spaces': 2, // 不允许多个空格
        'no-lonely-if': 2, // 当if仅仅出现在else内部时，应使用else if
        'block-scoped-var': 2, // 变量定义后未使用
        'consistent-return': 0, // 函数返回值可能是不同类型
        'accessor-pairs': 1, // object getter/setter方法需要成对出现
        'dot-location': [ 2, 'property' ], // 换行调用对象方法  点操作符应写在行首
        'dot-notation': 2, // 如果property能够直接访问时，要求必须使用.来访问
        'no-new-object': 2, // 禁止使用new Object(),应使用字面量
        'no-lone-blocks': 2, // 多余的{}嵌套
        'no-labels': 2, // 无用的标记
        'no-extend-native': 2, // 禁止扩展原生对象
        // 'no-extra-parens': 1, // [建议]如无必要，不增加多余的括号
        'no-floating-decimal': 2, // 浮点型需要写全 禁止.2 或 2.写法
        'no-loop-func': 2, // 禁止在循环体中定义函数
        'no-new-func': 2, // 禁止new Function(...) 写法
        'no-self-compare': 2, // 不允与自己比较作为条件
        'no-sequences': 2, // 禁止可能导致结果不明确的逗号操作符
        'no-throw-literal': 2, // 禁止抛出一个直接量 应是Error对象
        'no-return-assign': [ 2, 'always' ], // 不允return时有赋值操作
        'no-redeclare': [ 2, {
            builtinGlobals: true,
        }], // 不允许重复声明
        // 'no-unused-expressions': [ 2, {
        //     allowShortCircuit: true,
        //     allowTernary: true,
        // }], // 未使用的表达式
        'no-useless-call': 2, // 无意义的函数call或apply
        'no-useless-concat': 2, // 无意义的string concat
        'no-void': 2, // 禁用void
        'no-with': 2, // 禁用with
        'no-warning-comments': [ 2, {
            terms: [ 'any other term' ],
            location: 'anywhere',
        }], // 标记未写注释
        curly: [ 2, 'all' ], // if、else、while、for代码块用{}包围
        // es6部分
        'arrow-parens': [ 2, 'as-needed' ], // 要求箭头函数的参数使用圆括号
        'arrow-spacing': [ 2 ], // 强制箭头函数的箭头前后使用一致的空格
        eqeqeq: 2, // 使用===来进行值比较判断
        'constructor-super': [ 1 ], // 要求在构造函数中有 super() 的调用
        'generator-star-spacing': [ 2 ], // 强制 generator 函数中 * 号周围使用一致的空格
        'max-depth': [ 2, 4 ], // 限制嵌套层级
        'max-params': [ 2, 5 ], // 函数参数不应超过3个，建议使用spread object
        'no-class-assign': [ 2 ], // 禁止修改类声明的变量
        'no-confusing-arrow': [ 2 ], // disallow arrow functions where they could be confused with comparisons
        'no-const-assign': [ 2 ], // 禁止修改 const 声明的变量
        'no-dupe-class-members': [ 2 ], // 禁止类成员中出现重复的名称
        'no-duplicate-imports': [ 2 ], // disallow duplicate module imports
        'no-new-symbol': [ 2 ], // disallow new operators with the Symbol object
        'no-restricted-imports': [ 0 ], // disallow specified modules when loaded by import
        'no-this-before-super': [ 2 ], // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
        'no-useless-computed-key': [ 2 ], // disallow unnecessary computed property keys in object literals
        'no-useless-constructor': [ 1 ], // 禁用不必要的构造函数
        'no-useless-rename': [ 1 ], // disallow renaming import, export, and destructured assignments to the same name
        'no-var': 1, // 要求使用 let 或 const 而不是 var
        'object-shorthand': [ 0 ], // 要求或禁止对象字面量中方法和属性使用简写语法
        'object-curly-spacing': [ 2, 'always' ], // 要求 {} 内最左边和最右边需要一个空格（包含嵌套的 {}）
        'prefer-arrow-callback': [ 0 ], // 要求使用箭头函数作为回调
        'prefer-const': 1, // 要求使用 const 声明那些声明后不再被修改的变量
        'prefer-numeric-literals': [ 0 ], // disallow parseInt() in favor of binary, octal, and hexadecimal literals
        'prefer-rest-params': [ 0 ], // require rest parameters instead of arguments
        'prefer-spread': [ 0 ], // 要求使用扩展运算符而非 .apply()
        'prefer-template': [ 0 ], // 要求使用模板字面量而非字符串连接
        'quote-props': [ 2, 'as-needed' ], // 对象属性仅在有必要的时候使用引号
        'semi-spacing': 2, // 分号前不允许有空格，后方可以允许
        'space-unary-ops': 2, // 禁止在一元操作符之前或之后存在空格
        'require-yield': [ 0 ], // 要求 generator 函数内有 yield
        'rest-spread-spacing': [ 2 ], // enforce spacing between rest and spread operators and their expressions
        'sort-imports': [ 0 ], // 强制模块内的 import 排序
        'symbol-description': [ 0 ], // require symbol descriptions
        'template-curly-spacing': [ 2 ], // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
        'yield-star-spacing': [ 2 ], // 强制在 yield* 表达式中 * 周围使用空格
        'wrap-iife': 2, // 对于立即执行函数，应使用括号包裹起来

        // vue rules
        'no-trailing-spaces': [ 2, {
            skipBlankLines: false,
            ignoreComments: true, // 允许在注释块中尾随空格
        }], // 禁止行尾空格
        'vue/html-closing-bracket-newline': [ 2, {
            singleline: 'never',
            multiline: 'always',
        }], // 在标记的右括号之前要求或禁止换行符
        'vue/html-indent': [
            2,
            4, // 缩进4个空格
            {
                attribute: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ], // 在<template>中强制执行一致的缩进
        'vue/attribute-hyphenation': [ 0, 'never' ], // 模板中的自定义组件属性的命名样式
        'vue/max-attributes-per-line': [ 2, {
            singleline: 3,
            multiline: {
                max: 1,
                allowFirstLine: false,
            },
        }], // 每行的最大属性数
        'vue/order-in-components': 0, // 组件排序
        'vue/attributes-order': 0, // 属性顺序
        // 'vue/mustache-interpolation-spacing': [ 0, 'never' ], // 差值空格
        'vue/valid-v-for': 1, // 有效v-for指令
        'vue/require-v-for-key': 1, // v-for 须指定 key
        'vue/name-property-casing': [ 2, 'kebab-case' ], // 组件 name 命名格式
        'vue/html-closing-bracket-spacing': [ 2, {
            startTag: 'never',
            endTag: 'never',
            selfClosingTag: 'always',
        }], // 标签的空格
        'vue/html-self-closing': [ 2, {
            html: {
                void: 'any',
                normal: 'never',
                component: 'never',
            },
            svg: 'any',
            math: 'any',
        }], // 组件和常规元素不允许自闭合
        'vue/require-prop-types': 2, // props 需要指定类型
        'vue/require-default-prop': 2, // props 需要指定默认值
        'vue/no-confusing-v-for-v-if': 2, // vFor 与 vIf 不适合绑定在同一元素上，vFor 执行顺序优先级高于 vIf
    },
    overrides: [
        {
            files: [ '*.vue', '*.ts' ],
            rules: {
                'no-dupe-class-members': 'off',
                'no-redeclare': 'off',
                'no-undef': 0,
            },
        },
    ],
};

if (process.env.NODE_ENV !== 'production') {
    config.rules['no-console'] = [ 1, { allow: [ 'warn', 'error' ] }];
    config.rules['no-debugger'] = 1;
}
module.exports = config;
