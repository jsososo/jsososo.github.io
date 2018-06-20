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
import { changeUrlQuery, getQueryFromUrl } from '../../utils/stringHelper';
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
    const thing = list.find((item) => item.objectId === id);
    if (key && thing) {
      return thing[key];
    }
    return thing;
  }

  updateAll(list, val) {
    let count = list.length;
    list.forEach((item) => {
      this.props.updateThing(item.objectId, val, () => {
        count--;
        if (!count) {
          this.props.queryAllList();
        }
      });
    });
  }

  updateStatus(status, id) {
    /*
    *  如果某事件状态改为1：
    *  1、子事件状态全都不动
    *  2、所有父事件状态改为1
    * */
    if (status === 1) {
      const allParents = this.findAllParent([], id, (t) => t.status === 1).filter((item) => item.status !== 1);
      this.updateAll(allParents, { status: 1 });
    } else {
      /*
      *  如果把某事件的状态改为0
      *  1、所有的子事件改为0
      *  2、检查判断是否需要将父事件状态修改为1 (不改为0)
      *
      *  如果事件状态改为2：
      *  1、所有子事件状态全改为2
      *  2、父事件状态通过判断再改为1 （不改为2）
      * */
      this.updateAll(this.findLimitedParent(id, status), { status: 1 });
      this.props.updateThing(id, { status });
      this.updateAll(this.findAllChildren(id), { status });
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
  findLimitedParent(id, val, result = []) {
    const parent = this.getThing(id, 'parent');
    const thing = this.getThing(parent);
    // 如果为空
    if (!thing) {
      return result;
    }
    // 所有子事件均为 目标状态，改变父事件状态，并继续推算祖父事件的状态
    if (thing.status !== 1 && thing.status !== val) {
      result.push(thing);
      return this.findLimitedParent(thing.objectId, val, result);
    }
    return result;
  }

  // 全部的子孙事件
  findAllChildren(id, onlyId = false) {
    if (!id) {
      return [];
    }
    const thing = this.getThing(id);
    let result = [];
    if (thing && thing.children.length > 0) {
      thing.children.forEach((tC) => {
        if (onlyId) {
          result.push(tC);
        } else {
          result.push(this.getThing(tC));
        }
        result = [...result, ...(this.findAllChildren(tC))];
      });
    }
    return result;
  }

  // 全部的直系父事件
  // stop 为判断停下的函数
  findAllParent(parents, id, stop = () => false) {
    const tP = this.getThing(id);
    parents.push(tP);
    if (stop(tP)) {
      return parents;
    }
    if (tP.parent !== '') {
      return this.findAllParent(parents, tP.parent);
    }
    return parents;
  }

  // 根据事件的id删除一个事件
  delThing(id) {
    const { updateThing } = this.props;
    const thing = this.getThing(id);
    const parent = this.getThing(thing.parent);
    const deleteIds = this.findAllChildren(id, true);
    deleteIds.push(id);
    let count = 0;
    deleteIds.forEach((item) => {
      Storage.delBmob('Thing', item, () => {
        count++;
        if (count === deleteIds.length) {
          this.props.queryAllList();
          if (parent) {
            const newC = parent.children.filter((c) => c !== id);
            updateThing(parent.objectId, { children: newC });
            changeUrlQuery({ edit: 0 });
          }
        }
      });
    });
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
    const { list, createNewTodo, updateThing, queryAllList } = this.props;
    const parentThing = list.filter((item) => item.parent === '') || [];
    const query = getQueryFromUrl();
    const sT = list.find((item) => item.objectId === query.id);
    const isEdit = Boolean(Number(query.edit));

    return (
      <div>
        {
          parentThing.length === 0 &&
            <div className="fc_666 mt_20">没有事咯</div>
        }
        <div className="todo-list">
          {parentThing.map((pT) => (
            <TodoThing
              key={pT.objectId}
              noBorder
              updateThing={updateThing}
              list={list}
              thing={pT}
              updateStatus={(val, id) => this.updateStatus(val, id)}
            />
          ))}
        </div>
        {
          sT && <TodoDetail
            updateThing={updateThing}
            queryAllList={queryAllList}
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
  updateThing: PropTypes.func.isRequired,
  queryAllList: PropTypes.func.isRequired,
};

export default TodoList;
