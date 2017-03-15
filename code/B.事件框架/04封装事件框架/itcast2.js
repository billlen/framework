//定义一个对象 - 名字是$
var $$ = function(){};

//第二种写法
$$.prototype = {
    $id:function(str){
        return document.getElementById(str);
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag);
    },
    extend:function(tar,source){
      //遍历对象
        for(var i in source){
            tar[i] = source[i]
        }
        return tar;
    },

    //随机数
    random: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    },
    //数据类型检测
    isNumber:function (val){
        return typeof val === 'number' && isFinite(val)
    },
    isBoolean:function (val) {
        return typeof val ==="boolean";
    },
    isString:function (val) {
        return typeof val === "string";
    },
    isUndefined:function (val) {
        return typeof val === "undefined";
    },
    isObj:function (str){
        if(str === null || typeof str === 'undefined'){
            return false;
        }
        return typeof str === 'object';
    },
    isNull:function (val){
        return  val === null;
    },
    isArray:function (arr) {
        if(arr === null || typeof arr === 'undefined'){
            return false;
        }
        return arr.constructor === Array;
    }
}

//在框架中实例化，这样外面使用的使用就不用实例化了
$$= new $$();

$$.extend($$,{//复制所有的方法;
    /*绑定事件*/
    on:function(id,type,fn){
        //var dom = document.getElementById(id);
        var dom  = $$.isString(id)?document.getElementById(id):id;

        //如果支持
        //W3C版本 --火狐 谷歌 等大多数浏览器
        //如果你想检测对象是否支持某个属性，方法，可以通过这种方式
        if(dom.addEventListener){
            dom.addEventListener(type,fn,false);
        }else if(dom.attachEvent){
            //如果支持 --IE
            dom.attachEvent('on'+type,fn);
        }
    },
    /*解除事件*/
    un:function(id,type,fn){
        //var dom = document.getElementById(id);
        var dom = $$.isString(id)?document.getElementById(id):id;
        if(dom.removeEventListener){
            dom.removeEventListener(type,fn);
        }else if(dom.detachEvent){
            dom.detachEvent(type,fn);
        }
    },
    /*点击*/
    click:function(id,fn){
        this.on(id,'click',fn);
    },
    mouseover:function(id,fn){
        this.on(id,'mouseover',fn);//this指代的是event;
    },
    mouseout:function(id,fn){
        this.on(id,'mouseout',fn);
    },
    /*悬浮*/
    hover:function(id,fnOver,fnOut){
        if(fnOver){
            this.on(id,'mouseover',fnOver);
        }
        if(fnOut){
            this.on(id,'mouseout',fnOut);
        }
    }
});



