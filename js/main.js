/**
 * Created by Administrator on 5/6/2016.
 */
window.onload=function(){

    var input=document.getElementById('input');
    var num=0;
    var o_span=document.getElementsByTagName('span');
    var o_div=document.getElementsByClassName('wrapper')[0];
    var onOff=0;
    (function(){
        input.onfocus=function(){
            this.value='';
        };
        //word limit
        input.onkeydown=function(){
            if(this.value.length>5){
                this.value=this.value.substring(0,5);
            }
        };
        input.onkeyup=function(e){
            if(onOff){
                e=e || event;
                //enter key
                if(e.keyCode=='13'){
                    var data;
                    var cont=this.value;
                    this.value='';
                    data=canvasSetting(cont);
                    textSetting(data);
                    textMove(data);
                }
            }
        };
    })();
   //开场白
    (function(){
        var word=["2","1","hi :)","I am","Neo","Try it","❤" ,">_<"];
        var timer=null,
            data,
            i=0;
        data=canvasSetting("3");
        //text transform
        textSetting(data);
        textMove(data);
        timer=setInterval(function(){
            data=canvasSetting(word[i]);
            //text transform
            textSetting(data);
            textMove(data);
            i++;
            if(i==word.length){
                clearInterval(timer);
                onOff=1;
            }
        },2500);

    })();

    function posRandom(obj){
        var  a=o_div.offsetWidth;
        obj.style.left=Math.round(Math.random()*a)+'px';
        obj.style.top=Math.round(Math.random()*300)+'px';
    }
    //text transform function
    function textSetting(data){
        var stri='',i;
        if(num==0){
            num=data.left.length;
            for( i=0;i<data.left.length;i++){
                stri+='<span></span>';
            }
            o_div.innerHTML=stri;
            for( i=0;i<o_span.length;i++){
                posRandom(o_span[i]);
            }
        }else{
            if(num>data.left.length){
                for(i=data.left.length;i<num;i++){
                    posRandom(o_span[i]);
                }
            }else{
                for(i=num;i<data.left.length;i++){
                    stri+='<span></span>';
                }
                o_div.innerHTML+=stri;
                for(i=num;i<data.left.length;i++){
                    posRandom(o_span[i]);
                }
            }
            num=data.left.length;
        }

    }
    //move text
    function textMove(data){
        setTimeout(function(){
            var  a=o_div.offsetWidth;
            for(var i=0;i<o_span.length;i++){
                o_span[i].style.left=data.left[i]+a/2.6+'px';
                o_span[i].style.top=data.top[i]+'px';
                o_span[i].style.opacity='1';
            }
        },50);
    }
    //canvas settings and return position data
    function canvasSetting(cont){
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        var pos_arr={
            'left':[],
            'top':[]
        };
        var canvas_data;
        var y,x;
        ctx.font="40px Georgia";
            ctx.textAlign="center";
        ctx.clearRect(0,0,300,300);//clear the content
        ctx.fillText(cont,150,150);//write the word into canvas
        canvas_data=ctx.getImageData(0,0,300,300);
        for( y=0;y<300;y++){
            for( x=0;x<300;x++){
                if(canvas_data.data[(y*300+x)*4+3]!='0'){//背景色是黑色透明的rgba(0,0,0,0)
                    pos_arr.left.push(x);
                    pos_arr.top.push(y);
                }
            }
        }
        return pos_arr;
    }
};