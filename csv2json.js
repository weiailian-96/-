var xlsx2json = require("node-xlsx");

var bill_file = xlsx2json.parse("./bill.csv" );
var cgs_file = xlsx2json.parse("./categories.csv" );
// 读取到的数据为[{name:'xxx',data: []}]格式

var bill = [...(bill_file[0].data)];
var cgs = [...(cgs_file[0].data)];

var bills = [];
for (let i = 1 ; i < bill.length; i++) {
    for(let j = 1;j < cgs.length; j++){
        if(bill[i][2] == cgs[j][0]){
            const param = {
                // 这里对数据进行处理，bill里面的category字段和categories里面的name对应，相应值赋给相应字段
                'type':bill[i][0],
                'time':bill[i][1],
                'name':cgs[j][2],
                'amount':bill[i][3]
             };
             bills.push(param);
        }
    }
    
}

// 将数组整合
var data = {bills,cgs};
console.log(data);



// 服务器端口程序
// cors:解决跨域处理
// express-session:session对象
// express:web服务器
//服务器文件夹下载，npm i cors express-session express
const express=require("express");
const cors=require('cors');
const session=require("express-session");

var server=express();

server.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080"],
    //允许跨域的两个URL
    credentials:true//每次请求需要验证
}));

server.use(session({
    secret:"128位字符串",//安全字符串
    resave:true,//请求时更新数据
    saveUninitialized:true//保存初始数据
}));
server.use(express.static("public"));
server.listen(4000);
server.get("/",(req,res)=>{
    //发送数据给前端
    res.send(data);
})

