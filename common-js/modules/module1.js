// moudle.exports = value 暴露一个对象
module.exports = {
    msg:'aaa',
    foo(){
        console.log(this.msg)
    }
}