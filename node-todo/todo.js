// 第一种方式，可以动态添加db文件，但是新建的todo内容不能动态更新
// var fs = require(`fs`)  //引入fs模块，用来读写文件。file system 文件系统 
// fs.writeFileSync('G:\\todo\\db','hey')  //以同步的方式写入一个文件
// const list = []  // 任务清单
// const nodePath = process.argv[0]
// const todoPath = process.argv[1]
// const verb = process.argv[2]  //动作
// const content = process.argv[3]
// const task = content
// list.push(task)
// console.log('动作 '+verb)
// console.log('任务 '+content)
// console.log('list ',list)

// 第二种方法，必须先创建一个db文件，默认值为[] 初次优化
// var path = require('path') // 引入路径系统
// var fs = require(`fs`)

// // 这个方法被弃用了
// // if (path.existsSync('G:\\todo\\db')) {
// //     const fileContent = fs.readFileSync('G:\\todo\\db').toString() // 读取之前的list
// // } else {
// //     fs.writeFileSync('G:\\todo\\db', '')
// // }
// const verb = process.argv[2] //动作
// const content = process.argv[3]
// const editValue = process.argv[4] //修改的值
// const dbPath = 'G:\\todo\\db'

// enSureDb()
// const list = fetch()
// const n = content
// switch (verb) {
//     case 'add':
//         // fs.stat(dbPath, function (err, stat) {
//         // if (err == null) {
//         //     // const fileContent = fs.readFileSync(dbPath).toString() // 读取之前的list
//         //     // const list = JSON.parse(fileContent) //反序列化
//         //     list = fetch()

//         //     addTask(list, content)
//         //     save(list)
//         //     display(list)
//         // } else if (err.code == 'ENOENT') {
//         // fs.writeFileSync(dbPath, '')
//         // list = []

//         // const task = content
//         addTask(list, content)
//         // fs.writeFileSync(dbPath, JSON.stringify(list))
//         // } else {
//         //     console.log('Some other error:', err.code)
//         // }
//         // })
//         break;
//     case 'list':
//         // list = fetch()
//         break;
//     case 'edit':
//         // list = fetch()
//         // n = content
//         // list[n - 1][0] = editValue
//         editTask(list, n, editValue)
//         break;
//     case 'delete':
//         // list = fetch()
//         // 判断一个任务有没有完成，需要加一个是否完成的状态 
//         // n = content //从1开始,实际的下标是从0开始，所以要减去1
//         // list.splice(n - 1, 1)
//         removeTask(list, n)
//         break;
//     case 'done':
//         // list = fetch()
//         // n = content
//         // list[n - 1][1] = true
//         markTaskAsDone(list, n)
//         break;
//     default:
//         console.log('动词是 ' + verb)
//         console.log('我不知道你想干啥')
//         break
// }
// display(list)
// if (verb !== 'list') {
//     save(list)
// }


// function save(list) {
//     fs.writeFileSync(dbPath, JSON.stringify(list)) //JSON.string() 序列化, 把这边的list存到数据库  db里
// }

// function fetch() {
//     const fileContent = fs.readFileSync(dbPath).toString() // 读取之前的list
//     let list
//     try {
//         list = JSON.parse(fileContent) || [] //反序列化
//     } catch {
//         list = []
//     }

//     return list
// }

// function display(list) { //语义化
//     console.log(list)
// }

// function addTask(list, content) {
//     list.push([content, false])
// }

// function removeTask(list, n) {
//     list.splice(n - 1, 1)
// }

// function markTaskAsDone(list, n) {
//     list[n - 1][1] = true
// }

// function editTask(list, n, newContent) {
//     list[n - 1][0] = newContent
// }

// function enSureDb() {
//     try {
//         fs.statSync(dbPath) //如果路径不存在会报错，要则创建文件，存在就不报错
//     } catch (error) {
//         fs.writeFileSync(dbPath, '')
//     }
// }

// 极致优化
var fs = require(`fs`)
var path = require('path')
const verb = process.argv[2] //动作
const content = process.argv[3]
const editValue = process.argv[4] //修改的值
// const dbPath = __dirname + '/db' //__dirname 表示当前文件目录，window系统中文件路径用\隔开，mac和unix用/隔开，为了避免这个问题，就用拼接的方式来写文件目录
const dbPath = path.join(__dirname,'db')

enSureDb()
const list = fetch()
const n = content
switch (verb) {
    case 'add':
        addTask(list, content)
        break;
    case 'list':
        break;
    case 'edit':
        editTask(list, n, editValue)
        break;
    case 'delete':
        removeTask(list, n)
        break;
    case 'done':
        markTaskAsDone(list, n)
        break;
    default:
        console.log('动词是 ' + verb)
        console.log('我不知道你想干啥')
        break
}
display(list)
if (verb !== 'list') {
    save(list)
}


function save(list) {
    fs.writeFileSync(dbPath, JSON.stringify(list)) //JSON.string() 序列化, 把这边的list存到数据库  db里
}

function fetch() {
    const fileContent = fs.readFileSync(dbPath).toString() // 读取之前的list
    let list
    try {
        list = JSON.parse(fileContent) || [] //反序列化
    } catch {
        list = []
    }

    return list
}

function display(list) { //语义化——显示优化
    for(let i = 0; i<list.length; i++){
        const mark = list[i][1] === true ?'[x]':'[_]'
        console.log('任务内容：'+mark + '' + list[i][0])
    }
}

function addTask(list, content) {
    list.push([content, false])
}

function removeTask(list, n) {
    list.splice(n - 1, 1)
}

function markTaskAsDone(list, n) {
    list[n - 1][1] = true
}

function editTask(list, n, newContent) {
    list[n - 1][0] = newContent
}

function enSureDb() {
    try {
        fs.statSync(dbPath) //如果路径不存在会报错，要则创建文件，存在就不报错
    } catch (error) {
        fs.writeFileSync(dbPath, '')
    }
}