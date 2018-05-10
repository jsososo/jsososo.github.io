const txtReplace = [
  {
    reg: /\*\*\s(.+)\s\*\*/g,
    del: ['** ', ' **'],
    before: '<b>',
    after: '</b>',
  },
  {
    reg: /\*\s(.+)\s\*/g,
    del: ['* ', ' *'],
    before: '<i>',
    after: '</i>',
  },
  {
    reg: /`([^`]+)`/g,
    del: ['` ', ' `'],
    before: '<code style="background: rgb(255, 241, 232);">',
    after: '</code>',
  },
  {
    reg: /##b\s(.+)\sb##/g,
    del: ['##b ', ' b##'],
    before: '<b>',
    after: '</b>',
  },
  {
    reg: /##red\s(.+)\sred##/g,
    del: ['##red ', ' red##'],
    before: '<span class="fc_red">',
    after: '</span>',
  },
  {
    reg: /##blue\s(.+)\sblue##/g,
    del: ['##blue ', ' blue##'],
    before: '<span class="fc_blue">',
    after: '</span>',
  },
  {
    reg: /##orange\s(.+)\sorange##/g,
    del: ['##orange ', ' orange##'],
    before: '<span class="fc_orange">',
    after: '</span>',
  },
  {
    reg: /##green\s(.+)\sgreen##/g,
    del: ['##green ', ' green##'],
    before: '<span class="fc_green">',
    after: '</span>',
  },
  {
    reg: /~~\s(.+)(\s~~)/g,
    del: ['~~ ', ' ~~'],
    before: '<span style="text-decoration: line-through">',
    after: '</span>',
  },
  {
    reg: /__\s(.+)\s__/g,
    del: ['__ ', ' __'],
    before: '<span style="text-decoration: underline">',
    after: '</span>',
  },
  {
    reg: /##a\s(.+)\sa##/g,
    del: ['##a ', ' a##'],
    before: '<a class="fc_blue" href="RESULT" target="_blank">',
    after: '</a>',
  },
  {
    reg: /######\s(.+)(\n|$)/g,
    del: ['###### '],
    before: '<h6>',
    after: '</h6>',
  },
  {
    reg: /#####\s(.+)(\n|$)/g,
    del: ['##### '],
    before: '<h5>',
    after: '</h5>',
  },
  {
    reg: /####\s(.+)(\n|$)/g,
    del: ['#### '],
    before: '<h4>',
    after: '</h4>',
  },
  {
    reg: /###\s(.+)(\n|$)/g,
    del: ['### '],
    before: '<h3>',
    after: '</h3>',
  },
  {
    reg: /##\s(.+)(\n|$)/g,
    del: ['## '],
    before: '<h2>',
    after: '</h2>',
  },
  {
    reg: /#\s(.+)(\n|$)/g,
    del: ['# '],
    before: '<h1>',
    after: '</h1>',
  },
];

export default txtReplace;
