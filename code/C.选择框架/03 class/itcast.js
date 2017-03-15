//定义一个对象 - 名字是$
var $$ = function(){};

//第二种写法
$$.prototype = {
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

//我们定义一个事件对象专门放置事件相关操作
var event = function(){

}

event.prototype = {
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
}

$$.event = new event();

/*选择框架*/
$$.extend($$, {
    $id: function (str) {
        return document.getElementById(str);
    },
    $tag: function (context,tag){
        if(typeof context == 'string'){
            context = $$.$id(context);
        }
        if(context){
            return context.getElementsByTagName(tag);
        }else{
            return document.getElementsByTagName(tag);
        }
    },
    $class:function(context,className){
        var elements;
        var dom;
        //如果传递过来的是字符串 ，则转化成元素对象
        if($$.isString(context)){
            context = document.getElementById(context);
        }
        //如果兼容getElementsByClassName
        if(context.getElementsByClassName){
            return context.getElementsByClassName(className);
        }else{
            //如果浏览器不支持
            dom = context.getElementsByTagName('*');
            for(var i,len=dom.length;i<len;i++) {
                if(dom[i].className && dom[i].className ==className ) {
                    elements.push(dom[i]);
                }
            }
        }
        return elements;
    }
});


