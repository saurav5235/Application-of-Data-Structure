count = 0;

function init()
{
	var canvas = document.getElementById('mycanvas');
	W = canvas.width = 700;
	H = canvas.height = 700;
	pen = canvas.getContext('2d');
	cs = 35;
	food = randomfood();
	gameover = false;
	
	snake = {
		init_length : 5,
		color : "brown",
		cells : [],
		dir : "right",

		createsnake : function()
		{
			for(var i=this.init_length;i>0;i--)
			{
				this.cells.push({x:i,y:0});
			}
		},

		drawsnake : function()
		{
			for(var i=0;i<this.cells.length;i++)
			{
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-i,cs-i);
			}
		},

		updatesnake:function()
		{
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y)
			{
				food = randomfood();
				count+=1;
			}
			else
			{
				this.cells.pop();
			}

			var X,Y;
			if(this.dir=="right")
			{
				X = headX+1;
				Y = headY;
			}
			else if(this.dir=="left")
			{
				X = headX-1;
				Y = headY;
			}
			else if(this.dir=="up")
			{
				X = headX;
				Y = headY-1;
			}
			else if(this.dir=="down")
			{
				X = headX;
				Y = headY+1;
			}
			this.cells.unshift({x:X,y:Y});

			var lastx = Math.round(W/cs);
			var lasty = Math.round(H/cs);

			if(this.cells[0].x>=lastx || this.cells[0].y>=lasty || this.cells[0].x<0 || this.cells[0].y<0)
			{
				gameover=true;
			}
		}
	}

	snake.createsnake();

	function control(e)
	{
		if(e.key=="ArrowRight")
		{
			snake.dir = "right";
		}
		else if(e.key=="ArrowLeft")
		{
			snake.dir = "left";
		}
		else if(e.key=="ArrowUp")
		{
			snake.dir = "up";
		}
		else if(e.key=="ArrowDown")
		{
			snake.dir = "down";
		}
	}

	document.addEventListener("keydown",control);
}

function draw()
{
	pen.clearRect(0,0,W,H);
	snake.drawsnake();
	pen.fillStyle=food.color;
	pen.fillRect(food.x*cs,food.y*cs,cs,cs);
	pen.fillStyle = "yellow";
	pen.font = "50px Roboto";
	pen.fillText(count,25,50);
}

function update()
{
	if(gameover==true)
	{
		clearInterval(f);
		alert("GAME OVER");
	}
	snake.updatesnake();
}

function randomfood()
{
	var foodx = Math.round(Math.random()*(W-cs)/cs);
	var foody = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodx,
		y:foody,
		color:"red",
	}
	return food;
}

function gameloop()
{
	draw();
	update();
}

init();
var f = setInterval(gameloop,100);

