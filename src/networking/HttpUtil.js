import globalData from '../extend/GlobalData';

class HttpUtil {
    static urlEncode(param, key, encode=false) {  
        if(param==null) return '';  
        var paramStr = '';  
        var t = typeof (param);  
        if (t == 'string' || t == 'number' || t == 'boolean') {  
          paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);  
        } else {  
          for (var i in param) {  
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);  
            paramStr += urlEncode(param[i], k, encode);  
          }  
        }  
        return paramStr;  
      };  

    static _requisiteHeader() {
        return {
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization: '',
            device_login_id: globalData.loginParam.device_login_logs_id,
            app_user_id: '',
            device_id: globalData.loginParam.device_id,
            uid: ''
        }
    }

    static _formatUrl(url) {
        let baseUrl = 'https://uat-nginx.jianbing.com';
        if (url.indexOf('http') === 0) return url;
        let formatUrl = '';
        const baseUrlEndsWithSlash = baseUrl.endsWith('/');
        const urlStartsWithSlash = url.startsWith('/');
        if (baseUrlEndsWithSlash && urlStartsWithSlash) {
          formatUrl = baseUrl + url.substring(1);
        } else if (baseUrlEndsWithSlash || urlStartsWithSlash) {
          formatUrl = baseUrl + url;
        } else {
          formatUrl = baseUrl + '/' + url;
        }
        return formatUrl;
      }

    static get(url, params, callback) {
        url = this._formatUrl(url);
        if (params) {
            url = url + "?" + this.urlEncode(params);
        }
        fetch(url, {
            method: 'GET',
            headers: this._requisiteHeader(),
        }).then(response => {
            return response.json();
        }).then(res => {
            callback(res);
        }).catch(error => {
            callback(null, error);
        });
    }

    static post(url, params, callback) {
        url = this._formatUrl(url);
        fetch(url, {
            method: 'POST',
            headers: {
                ...this._requisiteHeader()
            },
            body: JSON.stringify(params),
        }).then(response => {
            return response.json();
        }).then(res => {
            callback(res);
        }).catch(error => {
            callback(null, error);
        });
    }
}

export default HttpUtil;