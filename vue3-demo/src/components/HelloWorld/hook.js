import { ref, reactive, onMounted } from 'vue'

const fetchUserInfo = (uid) => {
    return new Promise((resolve) => {
        let T = setTimeout(() => {
            resolve({ uid, name: '张三', age: 18 });
            clearTimeout(T);
        }, 2000)
    })
}

const fetchExams = () => {
    return new Promise((resolve) => {
        let T = setTimeout(() => {
            resolve([{ title: '量子力学的提出？', option: { A: '普朗克', B: '爱因斯坦' } }, { title: '重力加速度？', option: { A: '9.8 m/s', B: '10 m/s' } }]);
            clearTimeout(T);
        }, 2000)
    })
}

/**
 * 获取用户信息
 * 
 * @returns 
 */
export const useUserInfo = () => {
    let userInfo = ref({});

    const queryUserInfo = async (uid) => {
        let data = await fetchUserInfo(uid);
        userInfo.value = data;
        console.log('用户信息', userInfo.value);
    }

    onMounted(() => {
        console.log('挂载成功');
        queryUserInfo()
    })

    return [userInfo, queryUserInfo]
}

/**
 * 获取用户信息
 * 
 * @returns 
 */
export const useExam = () => {
    let exams = reactive([]);

    const queryExams = async () => {
        let data = await fetchExams();
        exams.push.apply(exams, data);
    }

    return [exams, queryExams]
}