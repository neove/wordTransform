# wordTransform
###原生JS+CSS3+canvas实现的文字转换特效    ![View online](http://www.neove.cc/wordTransform/index.html)
（打不开请戳http://neove.cc/wordTransform/index.html）
====
    前几天突发奇想，希望实现动态的文字转换特效，刚开始的想法是通过js检测屏幕上每个像素点的显示状态，然后控制每个像素点的移动来
    实现但是查阅后发现，js没有这种功能。
    然后想到了canvas，因为canvas是可以操作像素的，可以获取画布上指定区域每个像素点的状态，通过getImageData（）命令，将像素点信息
    存储在一个数组中，每个像素点对应四个数据，分别是r，g，b，a，取值大小都是0-255，这样就可以获取像素点位置，进行下一步的操作了

====    
####关键的代码如下
#####将文字写入canvas画布，检测所有像素点的状态，将有文字的像素点信息取出来放在json中
```javascript
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
```
    其它方面还有很多的细节需要处理，比如说前后两次输入内容不同，那么取出来的像素点位置信息个数就不同，在这里就要判断一下，
    依据多少来决定是插入像素点到html文档还是，移除（这里移除没有处理好，挖个坑，以后填）
====
    当然，虽然效果大体上实现了，但是性能可能没那么理想，虽然用了css3的transition动画，然而像素点的个数实在是太多了，
    几千个乃至上万，这种情况下该如何优化，有待发掘ing ....if you hava any good idea,please tell me 0.0

