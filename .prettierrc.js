module.exports = {
  // 不使用分号 - 现代 JavaScript 主流风格
  semi: false,

  // 使用单引号而非双引号
  singleQuote: true,

  // 缩进使用 2 个空格
  tabWidth: 2,

  // 使用空格缩进,不使用 Tab 字符
  useTabs: false,

  // 在对象、数组等末尾添加逗号(ES5 兼容)
  trailingComma: 'es5',

  // 每行最大字符数为 80
  printWidth: 80,

  // 在对象字面量的括号之间添加空格 { foo: bar }
  bracketSpacing: true,

  // 箭头函数单个参数时省略括号 x => x
  arrowParens: 'avoid',

  // 使用 LF (\n) 作为换行符,确保跨平台一致性
  endOfLine: 'lf',

  // HTML 文件中的空格敏感度,css 表示遵循 CSS display 属性的默认值
  htmlWhitespaceSensitivity: 'css',

  // Tailwind CSS 类名自动排序插件
  // plugins: ['prettier-plugin-tailwindcss'],
}
