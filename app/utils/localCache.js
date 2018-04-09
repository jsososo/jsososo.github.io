const LocalCache = {
    _sessionstorage: window.sessionStorage,
    _localstorage: window.localStorage, //修改成了localStorage, 以便于保存更多的内容.
    /**
     *
     * 判断是否存在storage 这个方法
     */
    _hasStorage: function () {
        return this._sessionstorage || this._localstorage;
    },
    /**
     *  返回一个类别
     * @private
     * @param{String} tp        类别 session/storage，默认storage
     */
    _getstorage: function (tp) {
        return !tp ? this._localstorage : tp === 'session' ? this._sessionstorage : this._localstorage;
    },

    /**
     *  返回该类别下的所有数据
     * @param{String} tp        类别 session/storage，默认storage
     */
    getAll: function (tp) {
        if (!this._hasStorage()) {
            return false;
        }
        //这里没有做decode (decodeURIComponent) 处理, 我们假设我们拿的都是原数据, 我们需要的. 具体显示时各业务模块自己处理
        var i, s = this._getstorage(tp), data = {};
        for (i in s) {
            data[i] = this.get(i, tp);
        }
        return data;
    },

    /**
     *  返回该类别下的该字段数据
     * @param{String} key        选择的字段
     * @param{String} tp        类别 session/storage，默认storage
     */
    get: function (key, tp) {
        if (!this._hasStorage()) {
            return false;
        }
        var s = this._getstorage(tp);
        if (!key || !s.getItem(key)) {
            return false;
        }
        var v = s.getItem(key);
        if (/^(\{(.*)\}|\[(.*)\])$/.test(v)) {
            //取的时候, 一般情况下我们给出的应该是json对象.
            return JSON.parse(s.getItem(key));
        }
        return v;
    },

    /**
     *  设置 session
     * @param {String} key            键值
     * @param {Object} value        存储内容
     * @param {String} tp            类别 session/storage，默认storage
     */
    set: function (key, value, tp) {
        if (!this._hasStorage() || !key || value === undefined) {
            return false;
        }
        var s = this._getstorage(tp);
        var val;
        if (typeof value === 'object') {
            if (value instanceof Object) {
                value._lastModified = new Date();
            }
            val = JSON.stringify(value);
        } else {
            val = value;
        }
        s.setItem(key, val);
    },

    /**
     *  移除某类别下某键值的值
     * @param {String}key            键值
     * @param {String}tp            类别 session/storage，默认storage
     */
    remove: function (key, tp) {
        if (!key || !this._hasStorage()) {
            return false;
        }
        var s = this._getstorage(tp);
        if (s.getItem(key)) {
            s.removeItem(key);
            return true;
        }
        return false;
    },

    /**
     *  移除全部或者移除某个类别的全部
     * @param {String}tp        类别 session/storage，默认storage
     * @param {Object}isAll    是否删除所有
     */
    removeAll: function (tp, isAll) {
        if (!this._hasStorage()) {
            return false;
        }
        if (!isAll) {
            return this._getstorage(tp).clear();
        }
        this._sessionstorage.clear();
        this._localstorage.clear();
        return true;
    }
};

export default LocalCache;