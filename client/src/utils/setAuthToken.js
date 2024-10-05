import axios from "axios";

//当我么有一个token,我们只需要发送他满足每一个要求，而不是选择与哪个请求一起发送
const setAuthToken = token =>{
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token); //新添加的
    }else{
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token'); //新添加的，待确定
    }
}

export default setAuthToken;