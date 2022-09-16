const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080
const models = require("./models")

app.use(express.json())
app.use(cors())

app.get("/products", (req, res) => {
    models.Product.findAll({
        order: [    //정렬방식 변경
            ["createAt", "DESC"]    //최신인것부터 정렬
        ],
        attributes: [       //뿌려주는 데이터 조절
            "id",
            "name",
            "price",
            "createAt",
            "seller",
            "imageUrl"
        ]
    }).then((result) => {
        console.log("PRODUCTS:", result)
        res.send({
            products: result,
        })
    }).catch((err) => {
        console.log(err)
        res.send("에러 발생")
    })
});

app.post("/products", (req, res) => {
    const body = req.body
    const { name, description, price, seller } = body;
    if (!name || !description || !price || !seller) {
        res.send("모든 필드를 채워주세요")
    }
    models.Product.create({ //product 테이블에 객체 생성
        name, // name = name
        description,
        price,
        seller
    }).then((result) => {
        console.log("상품 생성 결과", result)
        res.send({
            result,
        })

    }).catch((err) => {
        console.log(err)
        res.send('상품 업로드에 애러 발생')
    })
})

app.get("/products/:id", (req, res) => {
    const params = req.params
    const { id } = params
    models.Product.findOne({
        where: {
            id: id
        }
    }).then((result) => {
        console.log("PRODCUT: ", result)
        res.send({
            product: result,
        })
    }).catch((err) => {
        console.log("err : ", err)
        res.send("상품 조회 에버발생")
    })
})

app.listen(port, () => {
    console.log("start server.js")
    models.sequelize.sync().then(() => {
        console.log("DB 연결 성공")
    }).catch((err) => {
        console.error(err)
        console.log(err)
        process.exit()      //프로세스 종료
    }) //데이터베이스 동기화
})