﻿/***使用此函数可以在html中查看打印的值。
此函数为调试的时候使用，否则使用alert没有
点击关闭太麻烦
// ****/
// function run(x)
// {
// 	var ko=document.getElementById("div")
// 	ko.innerText=x
// }



/*
使用$包装可以使样子与jquery非常像。
核心类是chajian()，获取的所有对象
都放在this.element中，插件要调用
对象可以直接在插件中使用this.element[XX]。
return this 是返回插件这个对象，这
样可以使用连号继续调用其中的方法，
起到连缀的效果（如：a.b.c）。
*/

var $ = function(x) 
{
	var _init = new chajian()

		//使用多级选择器获取对象的并且会放在this.element中
		if (x != null ) 
		{
			_init.query(x)
		}
		return _init
	}


	/***定义的一个类**/
/*
把自己的函数插入可以调用
$().extend(fn) fn不要括号
*/
function chajian()
{

	//随便弄几个变量以便放值
	this.element = []
	this.temp = 1


	/************************通过类名得到对象*********************/
	this.getClassName = function(x) 
	{
		this.element = []
		var classname = document.getElementsByTagName("*")

		for (var i = 0; i < classname.length; i++)
		{
			if (classname[i].className == x) 
			{

				this.element.push(classname[i])
				this.temp = classname[i]

			}

			if (i == classname.length - 1 && this.element.length == 0) 
			{
				alert("获取classname得到了null")
			}
		}
		return this
	}

	/*********************通过id得到对象*****************************/
	this.getId = function(x) 
	{
		var id = document.getElementById(x)

		if (id != null)
		{
			this.element[0] = id
			this.temp = id
		}
		if (id == null) 
		{
			alert("获取id得到了null")
		}
		return this
	}

	/**********************通过元素得到对象************************/
	this.getElement = function(x) 
	{
		var el = document.getElementsByTagName(x)
		if (el.length != 0) 
		{
			this.element = el
			this.temp = el
		}
		if (el.length == 0) 
		{
			alert("获取Element得到了null")
		}
		return this
	}


	/*******通过调用上面其中某个方法后得到一个对象，根据此对象得到子对象***********/

	this.findchild = function(y) 
	{
		y = y.toLowerCase();
		this.temp = [];
		var ale = y;
		var start = y.charAt(0);
		var flag = 1;

		switch (start) 
		{
			case ".":
			y = y.slice(1);
			flag = "className";
			break;
			case "#":
			y = y.slice(1);
			flag = "id";
			break;
			default:
			y = y;
			flag = "tagName";
			break
		}


		for (var i = 0; i < this.element.length; i++) 
		{
			var ele = this.element[i].children

			this.child -= 1
			var ko = this.child
				/*某对象没有子元素的情况下看看
				传入的参数是否还有（参数个数倒
				减计算的形式）是这种的情况就警告*/
				if (ele.length == 0 && ko != 0) 
				{
					alert("父级已经没有子级了！" + "\n报错级数为：" + ale + "\n在findchild函数中报错")
					return;
				}

				for (var j = 0; j < ele.length; j++) 
				{
					var ch = ele[j][flag].toLowerCase()
					if (ch == y) 
					{
						this.temp.push(ele[j])
					}

				/*某级还有子元素，但是下一个参数
				和子元素不一样导致temp空有子元素
				且temp为空，可以确定上面条件。*/
				if (this.temp.length == 0 && j == ele.length - 1) 
				{
					alert("没有此对象:" + ale + "\n或者Html中嵌套错误" + "\n在findchild函数中报错")
					return;
				}
			}
		}
		this.element = this.temp
		return this
	}


	/*****************多级选择*****************/
	this.child = 0 //数据由query修改传给findchild，用于计数有多少个参数传入
	this.query = function(x) 
	{
		var q = this.tool(x)
		var tem = 0

		/*
		刚开始通过查看第传入的第一个参数是那种
		类型来决定使用那种方法获取第一个对象
		*/
		switch (q[0].charAt(0)) 
		{
			case ".":
			tem = q[0].slice(1);
			this.getClassName(tem);
			break;
			case "#":
			tem = q[0].slice(1);
			this.getId(tem);
			break;
			default:
			tem = q[0];
			this.getElement(tem);
			break;
		}

        /*数据由query修改传给findchild，
        用于计数有多少个参数传入
        */
        this.child = q.length 

		/*
		不断查找子元素，第一个参数由上
		面的方法得到了所以i从1开始
		*/
		for (var i = 1; i < q.length; i++) 
		{
			this.findchild(q[i])
		}
	}

	/*****************导入js文件*****************/
	/*
	  append是在选定元素的子元素后面追加
	  innerHTML导入的js代码不能执行要使用
      createElement
      使用：$().include("XXX.js")
      */
      this.include = function(x) 
      {
      	var body = document.getElementsByTagName("html")[0];
      	var content = document.createElement("srcipt");

      	content.setAttribute("src", x)
      	body.append(content)
      }



      /*****************颜色设置函数*****************/
	/*

	 $("div").color("background:color, color:black")
	 */
	 this.css = function(y) 
	 {     
	 	var x=y.replace(" ","")
	 	var y = y.split(",")

	 	if (x == null) 
	 	{
	 		alert("css函数传入的不是标准值")
	 		return;
	 	}
	 	
	 	for (var i = 0; i < y.length; i++) 
	 	{
	 		if (y[i] != "") 
	 		{
	 			var u = y[i].split(":")

	 			for (var j = 0; j < this.element.length; j++) 
	 			{
					this.element[j].style[u[0]] = u[1] //style的点号可以使用[]替代，这样就能动态设置了。
				}
			}
		}
		return this
	}


	/*****************得到元素*****************/
	/*
	使用：$("XX"||空值).getEl(数值) 
	得到元素后就可以使用js原生的方法了。
	*/
	this.getEl=function()
	{
		var ar=arguments;
		var len=ar.length;

		if(this.element.length==0)
		{
			alert("你还没有选定元素");
			return;
		}
		if(len!=0)
		{  
			if(this.element.length!=arguments[0]+1)
			{
				alert("元素集中没有第："+arguments[0]+"\n个元素")
				return  this;
			}
			else
			{
				return this.element[arguments[0]]
			}
		}
		else
		{
			return this.element
		}
	}


	/*****************3D效果*****************/
	/*
	  j:加载的图片数量
	  src:图片的位置
	  id：你自己定义的容器id
	  shengdu:表示精深
	  z:图片到中心的距离
	  #_wrap img:设置图片颜色
	  #_wrap:设置包裹的div的样式
	  使用如：$().D3(2,"file/img","_div",100,100)
	 */
	this.D3=function(j,src,id,shengdu,z)
	{
	/*
	先添加包装元素
	*/	
    var loc=document.getElementById(id)

	var insertwrap="<div id='_wrap'> </div>"
	loc.innerHTML=insertwrap

	var wrap=document.getElementById("_wrap")
	    wrap.style.transformStyle="preserve-3d"
	    wrap.style.transform="rotateX(-10deg)"
	    wrap.style.position="relative"

	var insertstack=[]
	var insertimg=""

	//设置景深
	loc.style.perspective=shengdu+"px"
	for(var k=1;k<j+1;k++ )
	{   
		insertstack.push("<img src='"+src+"/"+k+".jpg'>")

	}
	/*
	如果直接在for中使用length
	由于每次弹栈length都会改变
	经验就是：不在for()中计算
	*/
	var len=insertstack.length
	for(var i=0;i<len;i++)
	{  
		insertimg+=insertstack.shift()
	}

	wrap.innerHTML=insertimg


	/************* 
	以下是3D核心代码*
	****************/
	var oimg = document.getElementsByTagName("img");
	var owrap = document.getElementById("_wrap")
	var deg = 360 / (oimg.length);
	var len = oimg.length;
	var timer;

	for (var i=0; i < len; i++)
	{   
        oimg[i].style.position="absolute"
        oimg[i].style.webkitBoxReflect="below 5px -webkit-linear-gradient(top,rgba(0,0,0,0) 40%,rgba(0,0,0,0.5) 100%)" 
		oimg[i].style.transform = "rotateY(" + i * deg + "deg)  translateZ("+z+"px)";
		oimg[i].style.zindex = -i*2;
		oimg[i].style.WebkitTransition = "all 2s";
		oimg[i].style.transition = "all "+(i+1)+"s";

	}



	var nowx = 0,
	nowy = 0,
	minusx = 0,
	minusy = 0,
	rotx = 0,
	roty = 0;
	document.onmousedown = function(e)
	{
		e.preventDefault();

		var e = e || window.event;
		lastx = e.clientX, lasty = e.clientY,

		this.onmousemove = function(e) {

			var e = e || window.event;
			nowx = e.clientX;
			nowy = e.clientY;

			minusx = nowx - lastx;
			minusy = nowy - lasty;

			rotx -= minusy;
			roty += minusx;

			if (rotx < -30) {
				rotx = -30
			}
			if (rotx > 30) {
				rotx = 30
			}

			// transform会清空所有的设置。所以
			// 一起设置，否则最后一次有效。
			owrap.style.transform = "rotateX(" + rotx + "deg)  rotateY(" + roty + "deg)";

			lastx = nowx;
			lasty = nowy;
			return this
		}

		this.onmouseup = function(e)
		{
			/*清除事件*/
			this.onmousemove=null

			/*惯性*/
			timer = setInterval(function() 
			{
				minusx *= 0.98;
				minusy *= 0.98;
				rotx -= minusy * 0.1
				roty += minusx * 0.1

				if (rotx < -30) 
				{
					rotx = -30
				}
				if (rotx > 30) 
				{
					rotx = 30
				}
				
				owrap.style.transform = "rotateX(" + rotx + "deg) rotateY(" + roty + "deg)";
				if (Math.abs(minusx) < 0.1 || Math.abs(minusy) < 0.1) 
				{
					clearInterval(timer)
				}
			}, 1000 / 60)
		}
	}
}


/*****************字符分割工具*****************/
this.tool = function(x)
{
	var h = x.toLowerCase().split(" ");
	var tol = [];

	for (var i = 0; i < h.length; i++)
	{
		if (h[i] != "") 
		{
			tol.push(h[i])
		}
	}
	return tol
}




/******************获取函数名称***************/
	/*使用了正则表达式,
	  "/要匹配的样式/ig" i表示忽略大小写，g是global
	  表示全局
	  */
	  this.getFunc = function(str) 
	  {
		var e = /^function\s+[A-z]+/ig //得到 function  x（）
		var t = /\s[A-z]+/ig //得到空格+x()
		var y = /[A-z]+/ig //去除空格
		var op = e.exec(ji)
		var ko = t.exec(op)

		ko = y.exec(ko)
		ko = ko.toString()
		return ko

	}


	/********************插件扩展******************/
	/*
	使用方法是：$().extend(XXX)
	XXX是函数的名称，不要括号。 
	*/
	this.extend = function(x) 
	{
		var name = this.getFunc(x) //获取函数的名称

		/*prototype 不能使用this 只能使用类的 
		名称使用[]号替代点号可以动态设置名称.
		由于$函数中每次是new一个对象，所以使用
		prototype 设置插件，这样左右的对象可以
		共享这个插件
		*/
		chajian.prototype[name] = x
		return this
	}

}



/**************************测试*******************************/
// function ji()
// {
//   run("此显示是在插件ji中")
// }

// //插件扩展
// $().extend(ji)
// $().ji()


// $(".div1").css("color:red,background:yellow")






