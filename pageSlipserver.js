const express = require('express');
const Mock = require('mockjs');

const app = express();
const total = 53;

const handleRequest = (req, res) => {
    let pageSize = parseInt(req.query.page_size || 10);
    let page = parseInt(req.query.page || 1);

    let currentPageItemCount = pageSize;
    if (page * pageSize > total) {
        currentPageItemCount = total - (page - 1 ) * pageSize;
    }

    let ids = [];
    for (let i = 0 ;i < currentPageItemCount; i++ ) {
        ids.push((page - 1)*pageSize + i +1);
    };


    let pageData = [];
    for (let i = 0; i < currentPageItemCount; i++) {
        pageData.push({
            "id":ids[i],
            "name": Mock.Random.cname(),
            "email": Mock.Random.email(),
        });
    }

    let template = {
        "page": page,
        "page_size": pageSize,
        "total": total,
        "data": pageData
    };

    let responseJson = Mock.mock(template);
    res.json(responseJson);
};

app.get('/pageSlip',handleRequest);

const port = 3000;
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
}
)