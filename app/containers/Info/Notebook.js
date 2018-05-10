import React from 'react';
import { Input } from 'antd';
import replacePre from '../../utils/const/txtReplace';

const TextArea = Input.TextArea;

const txtValue = `记事本语法的写法上与markdown有一定的相似之处，因为本身就是在模仿着markdown的语法做的，不过像序列、分割线、代码区块等功能尚未实现TAT，具体已实现的方法可以参考下面：

删除：~~ abc ~~
下划线； __ abc __
链接： ##a //jsososo.github.io/person-web/#/ a##
代码：   \`code\`
加粗：   ** 加粗 **
加粗：   ##b 加粗 b##
斜体：   * 倾斜 *
标题h1： # abcdefg
标题h2： ## abcdefg
标题h3： ### abcdefg
标题h4： #### abcdefg
标题h5： ##### abcdefg
标题h6： ###### abcdefg
红色：   ##red 红色 red##
蓝色：   ##blue 蓝色 blue##
橙色：   ##orange 橙色 orange## 


注意：

1、目前所有的效果均为单行有效，回车后无效，自动分行依旧游侠哦，如下：
  ~~ 很长的一段文字很长的一段文字很长的一段文字很长的一段文字很长的一段文字很长的一段文字很长的一段文字 ~~
  ~~ 很长的一段文字很长的一段文字很长的一段文字很长的一段文字
  很长的一段文字很长的一段文字很长的一段文字很长的一段文字 ~~
  
2、部分语法一定需要空格，不能漏
 `;

class Notebook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      txtValue,
    };
  }

  componentDidMount() {
    this.replaceTxt();
  }

  componentDidUpdate() {
    this.replaceTxt();
  }

  /*
  *  标签替换（可以引入图片，文字颜色，字体大小，粗细等功能）
  * */
  replaceTxt() {
    if (!this.state.edit) {
      const preDom = document.getElementById('info-notebook-pre');
      let txt = preDom.innerText;
      replacePre.forEach((obj) => {
        const resultArr = txt.match(obj.reg);
        if (resultArr && resultArr.length) {
          resultArr.forEach((result) => {
            let newTxt = result;
            obj.del.forEach((dT) => {
              newTxt = newTxt.replace(dT, '');
            });
            txt = txt.replace(result, `${obj.before.replace('RESULT', newTxt)}${newTxt}${obj.after}`);
          });
        }
      });
      preDom.innerHTML = txt;
    }
  }

  render() {
    const { txtValue } = this.state;
    return (
      <div>
        <h2 className="fc_666 mb_10">记事本语法说明</h2>
        <div className="mb_20">可以在下方的输入框内自由编辑体验效果</div>
        <div style={{width: '100%'}}>
          <div className="inline-block" style={{width: '50%'}}>
          <TextArea
            autosize={{ minRows: 6 }}
            value={txtValue}
            onChange={(e) => this.setState({txtValue: e.target.value})}
          />
          </div>
          <pre id="info-notebook-pre" className="inline-block vat pl_20 pt_5" style={{width: '50%'}}>
            {txtValue}
          </pre>
        </div>
      </div>
    )
  }
}

export default Notebook;
