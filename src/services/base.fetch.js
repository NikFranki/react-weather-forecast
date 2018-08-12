class RequestService {
    request = (url) => {
        try {
            const result = fetch(url).then(res => res.json()).then(res => res);
            // return new Promise(resolve => resolve(result));
            return Promise.resolve(result);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default new RequestService();