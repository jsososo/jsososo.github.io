/**
*
* CashBookInput
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;
// import styled from 'styled-components';


class CashBookInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  readFile(file) {
    const [fileReader, data] = [new FileReader(), {}];
    let [binaryData, workbook] = [null, null];

    fileReader.onload = (e) => {
      binaryData = e.target.result;
      workbook = XLSX.read(binaryData, { type: 'binary' });

      // 遍历每一张工作表
      Object.keys(workbook.Sheets).forEach((sheet) => {
        data[sheet] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      });
      try {
        this.props.getData(data);
      } catch (err) {
        console.log(err);
        message.error('我的代码没问题，就是你文件的错！');
      }
    };

    // 以二进制方式打开文件
    fileReader.readAsBinaryString(file);
  }
  render() {
    const props = {
      name: 'file',
      multiple: true,
      action: '',
      accept: '.xlsx, .xls',
      beforeUpload: () => false,
      onChange: (info) => this.readFile(info.file),
    };
    return (
      <div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">点击或将文件拖到此处</p>
          <p className="ant-upload-hint">仅支持由口袋记账导出的账单</p>
        </Dragger>
      </div>
    );
  }
}

CashBookInput.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default CashBookInput;
