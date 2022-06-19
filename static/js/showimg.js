window.onload=function(){
     //点击按钮切换图片
     var select=document.getElementById("select");
     var prev=document.getElementById("prev");
     var play=document.getElementById("play");
     var next=document.getElementById("next");
     var img=document.getElementById("img");
     //创建数组保存图片路径

     var imgArr=["/static/images/2010_01.png","/static/images/2010_02.png"];

     select.onclick=function(){
          Canlender.handle();//点击其他元素隐藏日期选择框
          var year = document.getElementById("year").value;
          var month = document.getElementById("month").value;
          if (year == 2022 && month > 4) {
               alert("超出查询范围");
          }       
     }

     //创建索引，来保存当前正在显示图片索引
     var index=0;
     prev.onclick=function btn(){
          Canlender.handle();
          index--;
          if(index<0){
               index=1;
          }    
          img.src=imgArr[index];
     }
     play.onclick=function btn(){
          Canlender.handle();
          pass;
     }
     next.onclick=function(){
          Canlender.handle();
          index++;
          if(index>1){
               index=0;
          }
          img.src=imgArr[index];
     }
}

// 点击空白处隐藏日期选择框
// 笨方法，交互不完善
function handle(){
     Canlender.handle();
}