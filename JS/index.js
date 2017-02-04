window.onload=function(){
    //学院选项卡
   var btnOuter=document.getElementById('section_a');
    var oBtn=btnOuter.getElementsByTagName('li');
    var divOuter=document.getElementById('tab');
    var oDiv=divOuter.getElementsByTagName('div');
    var oUp=document.getElementById('up');
    for(var i=0;i<oBtn.length;i++){
         oBtn[i].timer=null;
        oBtn[i].index=i;
        oBtn[i].onmouseover=function(){
            oDiv[this.index].style.display='block';
        };

        oBtn[i].onmouseout=function(){
            oDiv[this.index].style.display='none';
            }
         }
    for(var j=0;j<oDiv.length;j++){
        oDiv[j].onmouseover=function(){
            this.style.display='block';
        }
        oDiv[j].onmouseout=function(){
            this.style.display='none';
        }
    }
    /*无缝滚动*/
    var outComment=document.getElementById('outComment');
    var innerComment=document.getElementById('innerComment');
    var oLi=document.getElementsByTagName('li');
    innerComment.innerHTML+=innerComment.innerHTML;
    var totalHeight=0;
    for(var i=0;i<oLi.length;i++){
        totalHeight+=oLi[i].offsetHeight;
    }
    innerComment.style.height=totalHeight+'px';
    var speed=1;
    function move(){
        if(innerComment.offsetTop<=-innerComment.offsetHeight/2){
            innerComment.style.top=0;
        }
        innerComment.style.top=innerComment.offsetTop-speed+'px';
    }
    var timer=setInterval(move,30);
    outComment.onmouseout=function(){
        timer=setInterval(move,30);
    };
    outComment.onmouseover=function(){
        clearInterval(timer);
    }
   /*热门关注点击变色*/
   var mainFocus=document.getElementById('mainFocus');
    var focusSpan=mainFocus.getElementsByTagName('span');
    for(var i=0;i<focusSpan.length;i++){
        focusSpan[i].onclick=function(){
            for(var i=0;i<focusSpan.length;i++){
                focusSpan[i].className='';
                focusSpan[i].style.color='#9d9d9d';
            }
            this.className='on';
            this.style.color='white';
        }
    }
  /*侧边栏阅读模块*/
  var read = document.getElementById('readding');
    var tecnique = document.getElementById('tecnique');
   var choise=document.getElementById('choise');
    var choiseSpan = choise.getElementsByTagName('span');

        choiseSpan[0].onclick=function(){
            for(var i=0;i<choiseSpan.length;i++){
                choiseSpan[i].className='';
            }
            this.className='active';
            tecnique.style.display='block';
            read.style.display='none';
    }
        choiseSpan[1].onclick=function(){
            for(var i=0;i<choiseSpan.length;i++){
                choiseSpan[i].className='';
            }
            this.className='active';
            read.style.display='block';
            tecnique.style.display='none';
        }
   /*城市三级联动*/
   $.ajax({
       url:'JS/city.json',
       type:'get',
       dataType:'json',
       async:true,
       success:function(data){
          $.each(data,function(index,items){
              var op1=$('<option></option>').attr('value',index).append(items.name);
              $('#province').append(op1);
              $('#province').change(function(){
                  $('#city').children('option').remove();
                  for(var j=0;j<data[this.value].cities.length;j++){
                      var op2=$('<option></option>').attr('value',index).append(data[this.value].cities[j]);
                      $('#city').append(op2);
                  }
              }).trigger('change');

          })

       },
       error:function(err){
           alert('未获取到数据');
       }
   })
}
