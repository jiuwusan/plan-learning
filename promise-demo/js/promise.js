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
        _this.callbacks.forEach(item => {
            item.onResolved && item.onResolved(data);
        });
    }

    // 失败 回调函数
    function reject(data) {
        if (_this.promiseState !== 'pending') return;
        _this.promiseState = 'rejected';
        _this.promiseResult = data;
        _this.callbacks.forEach(item => {
            item.onRejected && item.onRejected(data);
        });
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
    // 通过 promiseState 状态 执行 回调函数
    return new Promise((resolve, reject) => {
        switch (this.promiseState) {
            case 'pending':// 等待
                // 保存回调函数
                this.callbacks.push({
                    onResolved,
                    onRejected
                })
                break
            case 'fulfilled':// 成功
                try {
                    let result = onResolved(this.promiseResult);
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
                break
            case 'rejected': //失败
                let result = onRejected(this.promiseResult)
                break
        }
    })
}

/**
 * 异常处理
 * 
 * @param {*} onResolved 
 * @param {*} onRejected 
 */
Promise.prototype.catch = function (onResolved, onRejected) {

    }