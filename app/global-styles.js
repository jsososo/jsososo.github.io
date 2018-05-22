import {injectGlobal} from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  *{ -webkit-font-smoothing: antialiased;}
  hr{ border-top:1px solid #eeeeee;}
  @mixin border-radius($value) {
  -moz-border-radius: $value;
  -webkit-border-radius: $value;
  border-radius: $value;
}
  body {
    color: #555;
    background: white;
    height: calc(100vh - 120px);
  }
  
  a {
    text-decoration: none !important;
    color: #555;
  }
  `;
