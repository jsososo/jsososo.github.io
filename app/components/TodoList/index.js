/**
*
* TodoList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import TodoThing from './TodoThing';
import TodoDetail from './TodoDetail';
import './index.scss';
import { getQueryFromUrl } from '../../utils/stringHelper';
import timer from '../../utils/timer';
import Storage from '../../utils/Storage';

// import styled from 'styled-components';


class TodoList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
    };
  }

  // 获取某一事件 或 该事件的某个值
  getThing(id, key, list = this.props.list) {
    const thing = list.find((item) => item.id === id);
    if (key && thing) {
      return thing[key];
    }
    return thing;
  }

  updateThing(thing) {
    const { list, updateList } = this.props;
    updateList(list.map((item) => (item.id === thing.id ? thing : item)));
  }

  updateStatus(id, status) {
    const { updateList } = this.props;
    /*
    *  如果某事件状态改为1：
    *  1、子事件状态全都不动
    *  2、所有父事件状态改为1
    * */
    if (status === 1) {
      const allParents = this.findAllParent([id], id);
      updateList(this.changeStatus(allParents, 1));
    } else {
      /*
      *  如果把某事件的状态改为0
      *  1、所有的子事件改为0
      *  2、检查判断是否需要将父事件状态修改为0或1
      *
      *  如果事件状态改为2：
      *  1、所有子事件状态全改为2
      *  2、父事件状态通过判断再改为1或2
      * */
      const allChildren = this.findAllChildren(id);
      const newList = this.changeStatus(allChildren, status);
      updateList(this.changeStatus(this.findLimitedParent(id, newList, status), status, newList));
    }
  }

  // 改变arr数组内所有的事件status为val
  changeStatus(arr, val, list = this.props.list) {
    return list.map((item) => {
      if (arr.indexOf(item.id) > -1) {
        item.status = val;
      }
      return item;
    });
  }

  // 寻找受限的父事件（受父事件的其他子事件状态限制）
  findLimitedParent(id, list, val) {
    const parent = this.getThing(id, 'parent', list);
    const thing = this.getThing(parent, null, list);
    // 如果为空
    if (!thing) {
      return [];
    }
    let result = [];

    let allSame = true;
    thing.children.forEach((tC) => {
      // 非自身的其他子事件为非0，则不改变父事件状态
      if (this.getThing(tC, 'status', list) !== val && (tC !== id)) {
        allSame = false;
      }
    });
    // 所有子事件均为0，改变父事件状态，并继续推算祖父事件的状态
    if (allSame) {
      result = [...result, thing.id, ...(this.findLimitedParent(thing.id, list, val))];
    }
    return result;
  }

  // 全部的子孙事件
  findAllChildren(id) {
    let result = [id];
    const thing = this.getThing(id);
    if (thing.children.length > 0) {
      thing.children.forEach((tC) => {
        result = [...result, ...(this.findAllChildren(tC))];
      });
    }
    return result;
  }

  // 全部的直系父事件
  findAllParent(parents, id) {
    const tP = this.getThing(id, 'parent');
    if (tP !== 0) {
      parents.push(tP);
      return this.findAllParent(parents, tP);
    }
    return parents;
  }

  // 根据事件的id删除一个事件
  delThing(id) {
    const { list, updateList } = this.props;
    const thing = this.getThing(id);
    const parent = this.getThing(thing.parent);
    const deleteIds = this.findAllChildren(id);

    // 删除日历中对应的这些事件
    deleteIds.forEach((dId) => {
      this.delCalendarThing(this.getThing(id, 'time'), dId);
    });

    // 丢掉所有的子订单
    const newList = list.filter((t) => deleteIds.indexOf(t.id) === -1);

    // 从父事件那里的子事件属性中删除这个事件的id
    if (parent) {
      newList.forEach((t, i) => {
        if (t.id === parent.id) {
          newList[i].children = newList[i].children.filter((sId) => sId !== id);
        }
      });
    }
    updateList(newList);
  }

  // 删除这个事件在日历中对应的事件
  delCalendarThing(time, id) {
    if (!time) {
      return;
    }
    const cList = Storage.get('p_c_list', true, '{}');
    const day = timer(time).str('YYYYMMDD');
    if (cList[day]) {
      cList[day] = cList[day].filter((thing) => thing.id !== id);
      Storage.set('p_c_list', cList, true);
    }
  }

  render() {
    const { list, createNewTodo } = this.props;
    const parentThing = list.filter((item) => item.parent === 0) || [];
    const query = getQueryFromUrl();
    const sT = list.find((item) => item.id === Number(query.id));
    const isEdit = Boolean(Number(query.edit));

    return (
      <div>
        <div className="todo-list">
          {parentThing.map((pT) => (
            <TodoThing
              key={pT.id}
              noBorder
              updateThing={(val) => this.updateThing(val)}
              list={list}
              thing={pT}
              updateStatus={(id, val) => this.updateStatus(id, val)}
            />
          ))}
        </div>
        {
          sT && <TodoDetail
            updateThing={(val) => this.updateThing(val)}
            thing={sT}
            edit={isEdit}
            delThing={(id) => this.delThing(id)}
            delCalendarThing={(time, id) => this.delCalendarThing(time, id)}
            createNewTodo={createNewTodo}
            updateStatus={(id, val) => this.updateStatus(id, val)}
          />
        }
      </div>
    );
  }
}

TodoList.propTypes = {
  list: PropTypes.array.isRequired,
  createNewTodo: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
};

export default TodoList;
