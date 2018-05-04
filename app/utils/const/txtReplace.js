const txtReplace = [
  {
    reg: /##b\s(.+)(\sb##|\n|$)/g,
    del: ['##b ', ' b##'],
    before: '<b>',
    after: '</b>',
  },
  {
    reg: /##red\s(.+)(\sred##|\n|$)/g,
    del: ['##red ', ' red##'],
    before: '<span class="fc_red">',
    after: '</span>',
  },
  {
    reg: /##blue\s(.+)(\sblue##|\n|$)/g,
    del: ['##blue ', ' blue##'],
    before: '<span class="fc_blue">',
    after: '</span>',
  },
  {
    reg: /##orange\s(.+)(\sorange##|\n|$)/g,
    del: ['##orange ', ' orange##'],
    before: '<span class="fc_orange">',
    after: '</span>',
  },
  {
    reg: /~~\s(.+)(\s~~|\n|$)/g,
    del: ['~~ ', ' ~~'],
    before: '<span style="text-decoration: line-through">',
    after: '</span>',
  },
  {
    reg: /__\s(.+)(\s__|\n|$)/g,
    del: ['__ ', ' __'],
    before: '<span style="text-decoration: underline">',
    after: '</span>',
  },
  {
    reg: /##a\s(.+)(\sa##|\n|$)/g,
    del: ['##a ', ' a##'],
    before: '<a class="fc_blue" href="RESULT" target="_blank">',
    after: '</a>',
  },
  {
    reg: /######\s(.+)(\n|\s######|$)/g,
    del: ['###### ', ' ######'],
    before: '<h6>',
    after: '</h6>',
  },
  {
    reg: /#####\s(.+)(\n|\s#####|$)/g,
    del: ['##### ', ' #####'],
    before: '<h5>',
    after: '</h5>',
  },
  {
    reg: /####\s(.+)(\n|\s####|$)/g,
    del: ['#### ', ' ####'],
    before: '<h4>',
    after: '</h4>',
  },
  {
    reg: /###\s(.+)(\n|\s###|$)/g,
    del: ['### ', ' ###'],
    before: '<h3>',
    after: '</h3>',
  },
  {
    reg: /##\s(.+)(\n|\s##|$)/g,
    del: ['## ', ' ##'],
    before: '<h2>',
    after: '</h2>',
  },
  {
    reg: /#\s(.+)(\n|\s#|$)/g,
    del: ['# ', ' #'],
    before: '<h1>',
    after: '</h1>',
  },
];

export default txtReplace;
