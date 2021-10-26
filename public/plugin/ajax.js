function Ajax() {
    this.get = function (url, params) {
        return this.request("GET", url, params);
    };

    this.post = function (url, params) {
        return this.request("POST", url, params);
    };

    this.request = function (method, url, params) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = xhrChange;

            xhr.responseType = "json";

            params = params || (params = {});

            let action = url;

            const formData = [];

            for (let key in params) {
                formData.push(key + "=" + params[key]);
            }

            if (method === "GET" && formData.length) {
                action = url + "?" + formData.join("&");
            }

            xhr.open(method, action, true);

            xhr.send(method === "GET" ? null : JSON.stringify(params));

            function getError(action, option, xhr) {
                let msg;
                if (xhr.response) {
                    msg = `${xhr.response.error || xhr.response}`;
                } else if (xhr.responseText) {
                    msg = `${xhr.responseText}`;
                } else {
                    msg = `fail to ${option.method} ${action} ${xhr.status}`;
                }

                const err = new Error(msg);
                err.status = xhr.status;
                err.url = action;
                err.method = option.method;
                return err;
            }

            function xhrChange() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response || JSON.parse(xhr.responseText));
                    } else {
                        reject(getError(url, { method, action }, xhr));
                    }
                }
            }
        });
    };
}

const ajax = new Ajax();
