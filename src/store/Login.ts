import { observable, action } from 'mobx';

class Login {
    @observable isLogin: Boolean = false
    @observable phone: string = '15157103462'

    @action.bound
    setLogin(login: Boolean) {
        this.isLogin = login
    }
    setPhone(phone: string) {
        this.phone = phone
    }
}

export default new Login();