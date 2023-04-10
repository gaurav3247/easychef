function QueryBuilder() {
    this.params = {};

    this.addParam = function (key, value) {
        this.params[key] = value;
    };

    this.build = function () {
        const query = [];

        for (const [key, value] of Object.entries(this.params)){
            if (value) {
                for (const val of value) {
                    if (val) {
                        query.push(`${key}=${val}`);
                    }
                }
            }
        }

        return query.join("&");
    };
}

export default QueryBuilder