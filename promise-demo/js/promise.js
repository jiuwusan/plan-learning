/**
 * 自定义 Promise
 * 
 * @param {*} excutor 执行器
 */

function Promise(excutor) {
    const _this = this;
    //定义状态
    _this.promiseState = 'pending';
    _this.promiseResult = null;
    _this.callbacks = [];

    // 成功 回调函数
    function resolve(data) {
        // 状态只能修改一次
        if (_this.promiseState !== 'pending') return;
        // to do (1) 修改状态 (2) 设置 result 结果
        _this.promiseState = 'fulfilled';
        _this.promiseResult = data;
        // 处理异步
        let T = setTimeout(function () {
            _this.callbacks.forEach(item => {
                item.onResolved && item.onResolved(data);
            });
            clearTimeout(T)
        })
    }

    // 失败 回调函数
    function reject(data) {
        if (_this.promiseState !== 'pending') return;
        _this.promiseState = 'rejected';
        _this.promiseResult = data;
        let T = setTimeout(function () {
            _this.callbacks.forEach(item => {
                item.onRejected && item.onRejected(data);
            });
            clearTimeout(T)
        })
    }

    try {
        // 执行器 excutor 同步执行 
        excutor(resolve, reject);
    } catch (error) {
        // 修改 状态，返回 错误
        reject(error)
    }
}

/**
 * 
 * 回调
 * @param {*} onResolved 
 * @param {*} onRejected 
 * @returns 
 */
Promise.prototype.then = function (onResolved, onRejected) {
    let _this = this;
    if (typeof onResolved !== 'function') onResolved = (value) => value
    if (typeof onRejected !== 'function') onRejected = (error) => error
    // 通过 promiseState 状态 执行 回调函数
    return new Promise((resolve, reject) => {

        function callback(fn) {
            try {
                let result = fn(_this.promiseResult);
                if (result instanceof Promise) {
                    result.then((v) => {
                        resolve(v)
                    }, (r) => {
                        reject(r)
                    })
                } else {
                    resolve(result)
                }
            } catch (error) {
                reject(error)
            }
        }

        switch (_this.promiseState) {
            case 'pending':// 等待
                // 保存回调函数
                _this.callbacks.push({
                    onResolved: () => {
                        callback(onResolved)
                    },
                    onRejected: () => {
                        callback(onRejected)
                    },
                })
                break
            case 'fulfilled':// 成功
                callback(onResolved)
                break
            case 'rejected': //失败
                callback(onRejected)
                break
        }
    })
}

/**
 * 异常处理
 * 
 * @param {*} onRejected 
 */
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

/**
 * 添加成功方法
 * 
 * @param {*} value 
 * @returns 
 */
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(resolve, reject)
        } else {
            resolve(value)
        }
    })
}

/**
 * 添加 失败方法
 * 
 * @param {*} reason 
 * @returns 
 */
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}

/**
 * 添加 all 方法
 * 所有promise执行成功
 */
Promise.all = function (promiseArray) {

    return new Promise((resolve, reject) => {
        let count = 0;
        let result = [];
        // 遍历
        for (let i = 0; i < promiseArray.length; i++) {
            promiseArray[i].then((value) => {
                count++;
                result[i] = value;
                if (count === promiseArray.length) {
                    // resolve(promiseArray.map(() => promiseArray.promiseResult))
                    resolve(result);
                }
            }, (error) => {
                reject(error)
            })

        }
    })
}

/**
 * 一旦有成功，就 resolve
 * 
 * @param {*} promiseArray 
 * @returns 
 */
Promise.race = function (promiseArray) {

    return new Promise((resolve, reject) => {

        // 遍历
        for (let i = 0; i < promiseArray.length; i++) {
            promiseArray[i].then((value) => {
                if (count === promiseArray.length) {
                    // resolve(promiseArray.map(() => promiseArray.promiseResult))
                    resolve(result);
                }
            }, (error) => {
                reject(error)
            })

        }
    })
}

/**
 * 回调函数异步执行
 * 
 * @param {*} promiseArray 
 */
Promise.resolveDelay = function (value, delay = 0) {
    return new Promise((resolve) => {
        let T = setTimeout(() => {
            if (value instanceof Promise) {
                value.then((v) => {
                    resolve(v)
                }, (r) => {
                    reject(r)
                })
            } else {
                resolve(value)
            }
            clearTimeout(T);
        }, delay)
    })
}