var iStart = 0;
var canvas, ctx;
var width, height;
var oBall, oBricks, oStricker;
var left = false, right = false, len1 = true, len2 = true;
var star = false, scissor = false;
var starx = new Array(25);
var stary = new Array(25);
var scissorx = new Array(25);
var scissory = new Array(25);
var x = 0, y = 0;
var stricker_min = 147 / 4;
var stricker_max = 147 * 4;
var hit1 = 0, hit2 = 0;
function Ball(x,y,dx,dy,r)
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
}
function Stricker(x,y,w,h)
{
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.color = '#FFB800';
}
function Bricks(w,h,r,c)
{
    this.w = w;
    this.h = h;
    this.r = r;
    this.c = c;
    this.color = '#00985C';
    this.objs;
}
function Stars(x,y,r,n,f)
{
    this.x = x;
    this.y = y;
    this.r = r;
    this.n = n;
    this.f = f;
    this.obj;    
}
function Scissors(x,y,r)
{
    this.x = x;
    this.y = y;
    this.r = r;
    this.obj;    
}
function clear()
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // fill background
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

}
function drawGame()
{
    // clear canvas every time so that a good look is gained and it is so fast 10ms
    clear();
    clearInterval(iStart);
    // ball
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(oBall.x, oBall.y, oBall.r, 0, Math.PI * 2, true);    
    ctx.closePath();
    ctx.fill();    
    // bricks                                      
    ctx.fillStyle = oBricks.color;
    for(i=0;i<oBricks.r;i++)
    {
        for(j=0;j<oBricks.c;j++)
        {
            if(oBricks.objs[i][j]==1 || oBricks.objs[i][j]==2 || oBricks.objs[i][j]==3)
            {
                ctx.beginPath();
                ctx.rect(j*(oBricks.w),i*(oBricks.h),oBricks.w,oBricks.h); 
                ctx.closePath();
                ctx.lineWidth = 4;
                if(oBricks.objs[i][j]==2)                
                {
                    ctx.fillStyle = 'green';
                }
                else if(oBricks.objs[i][j]==3)                
                {
                    ctx.fillStyle = '#f00';
                }
                else                
                {
                    ctx.fillStyle = oBricks.color;
                }                                
                ctx.strokeStyle = '#333333';
                ctx.fill();
                ctx.stroke();
            }                   
        }    
    }    
    // new bricks and push them and delete bricks from last row and add starting row newly show trasition so it looks good

    // stricker
    if (left && (oStricker.x > 0))
    {
        oStricker.x -= 10;
    }
    if (right && ((oStricker.x + oStricker.w) < ctx.canvas.width))
    {
        oStricker.x += 10;
    }
    ctx.beginPath();
    ctx.rect(oStricker.x, oStricker.y, oStricker.w, oStricker.h);
    /*var grd = ctx.createLinearGradient((oStricker.x),0,(oStricker.x + 148),0);
    grd.addColorStop(0,'#ff6a00');
    grd.addColorStop(0.5,'#FFF');
    grd.addColorStop(0.75,'#FFF');
    grd.addColorStop(1,'#ff6a00')
    ctx.fillStyle = grd;*/
    ctx.fillStyle = oStricker.color;
    ctx.closePath();
    ctx.fill();
    //star                            multiple star therefor arrays are used
    for (var i = 0; i < x; i++)
    {        
            ctx.fillStyle = '#DAA520';
            ctx.beginPath();
            /*ctx.translate(oStars.x, oStars.y);
            ctx.moveTo(0, 0 - oStrars.r);
            for (var i = 0; i < oStars.n; i++)
            {
            ctx.rotate(Math.PI / oStars.n);
            ctx.lineTo(0, 0 - (oStars.r*oStars.f));
            ctx.rotate(Math.PI / oStars.n);
            ctx.lineTo(0, 0 - oStars.r);
            }*/
            ctx.moveTo(starx[i] + 20, (stary[i] + 0.0));
            ctx.lineTo(starx[i] + 26.6, stary[i] + 13.3);
            ctx.lineTo(starx[i] + 40, stary[i] + 16);
            ctx.lineTo(starx[i] + 30, stary[i] + 26.6);
            ctx.lineTo(starx[i] + 32, stary[i] + 40);
            ctx.lineTo(starx[i] + 20, stary[i] + 32);
            ctx.lineTo(starx[i] + 8, stary[i] + 40);
            ctx.lineTo(starx[i] + 10, stary[i] + 26.6);
            ctx.lineTo(starx[i] + 0, stary[i] + 16);
            ctx.lineTo(starx[i] + 13.3, stary[i] + 13.3);
            ctx.lineTo(starx[i] + 20, stary[i] + 0.0);
            ctx.closePath();
            ctx.fill();
            stary[i] += 2;
            if (((stary[i] + 40) > (ctx.canvas.height - (oStricker.h + 5))) && ((stary[i]) < (ctx.canvas.height - (oStricker.h + 5))) && (starx[i] > oStricker.x && starx[i] < (oStricker.x + oStricker.w)) && len1)
            {
                len1 = false;
                if (stricker_max > oStricker.w)
                {
                    oStricker.w *= 2;
                }
                else                
                {
                    oStricker.w = 147 * 4;
                }
            }
    }
    // scissor
    for (var j = 0; j < y; j++)
    {
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(scissorx[j] + 25, scissory[j] + 25, 25, Math.PI * 3 / 4, Math.PI * 3 / 2, false);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(scissorx[j] + 25, scissory[j] + 25, 25, Math.PI * 3 / 2, Math.PI * 9 / 4, false);
            ctx.closePath();
            ctx.fill();
            scissory[j] += 2;
            if (((scissory[j] + 42) > (ctx.canvas.height - (oStricker.h + 5))) && ((scissory[j]) < (ctx.canvas.height - (oStricker.h + 5))) && (scissorx[j] > oStricker.x && scissorx[j] < (oStricker.x + oStricker.w)) && len2)
            {
                len2 = false;
                if(stricker_min < oStricker.w)                
                {
                    oStricker.w /= 2;    
                }
                else                
                {
                    oStricker.w = 147 / 4;
                }
                
            }
    } 
    // ball motion
    oBall.x += oBall.dx;
    oBall.y += oBall.dy;
    iStart = setInterval(drawGame, 10);
    // collision detection
    iRowH = oBricks.h;
    iRow = Math.floor(oBall.y /iRowH);
    iCol = Math.floor(oBall.x/(oBricks.w));
    // mark brick as brocken
    if(oBall.y < oBricks.r*iRowH && iRow>=0 && iCol>=0 && oBricks.objs[iRow][iCol] == 1)    
    {
        oBricks.objs[iRow][iCol] = 0;
        oBall.dy = -oBall.dy;
        hit2++;
    }
    if(oBall.y < oBricks.r*iRowH && iRow>=0 && iCol>=0 && oBricks.objs[iRow][iCol] == 2)    // green brick increses stricker size to double
    {
        oBricks.objs[iRow][iCol] = 0;
        oBall.dy = -oBall.dy;
        x++;
        hit2++;
        len1 = true;
    }
    if(oBall.y < oBricks.r*iRowH && iRow>=0 && iCol>=0 && oBricks.objs[iRow][iCol] == 3)    // red brick decreses striker size to half
    {
        oBricks.objs[iRow][iCol] = 0;
        oBall.dy = -oBall.dy;
        y++;
        hit2++;
        len2 = true;
    }
    // reversing X cordinate
    if((oBall.x + oBall.dx + oBall.r) > ctx.canvas.width || (oBall.x + oBall.dx - oBall.r) < 0)    
    {
        oBall.dx = -oBall.dx;
    }
    // reversing Y position
    if((oBall.y + oBall.dy - oBall.r) < 0) 
    {
        oBall.dy = - oBall.dy;
    }
    else if((oBall.y + oBall.dy + oBall.r) > (ctx.canvas.height - (oStricker.h + 5)))    
    {
        if(oBall.x > oStricker.x && oBall.x < (oStricker.x + oStricker.w))        
        {
            oBall.dy = -oBall.dy;
            oBall.dx = 10 * ((oBall.x-(oStricker.x+oStricker.w/2))/oStricker.w);
        }
        else if ((oBall.y + oBall.dy + oBall.r) > ctx.canvas.height)        
        {
            clearInterval(iStart);
        }
    }
}
$(function ()
{
    canvas = document.getElementById('game');
    ctx = canvas.getContext("2d");
    width = canvas.getAttribute("width");
    height = canvas.getAttribute("height");
    oStricker = new Stricker((width / 2) - 74, 575, 147, 20);
    oBall = new Ball((width / 2), 565, 1, -4, 10);
    oBricks = new Bricks((width / 10), 40, 8, 10);
    oStars = new Stars(0, 0, 20, 5, 0.5); // stars for incressing size of slider
    oScissors = new Scissors(0, 0, 25); // scissor for reducing size of slider
    oBricks.objs = new Array(oBricks.r);
    // filling bricks with background values    
    for (i = 0; i < oBricks.r; i++)
    {
        oBricks.objs[i] = new Array(oBricks.c);
        for (j = 0; j < oBricks.c; j++)
        {
            oBricks.objs[i][j] = 0;
        }
    }
    // random delete
    for (i = 0; i < 40; i++, hit1++)                    // i < 40 is giving 42 bricks
    {
        var rRow = Math.floor(Math.random() * 8);
        var rCol = Math.floor(Math.random() * 10);
        if (oBricks.objs[rRow][rCol] == 0)
        {
            oBricks.objs[rRow][rCol] = 1;
        }
        else
        {
            i--;
        }

        if (i == 5 || i == 15 || i == 25 || i == 35)
        {
            oBricks.objs[rRow][rCol] = 2;
        }
        if (i == 10 || i == 20 || i == 30 || i == 38)
        {
            oBricks.objs[rRow][rCol] = 3;
        }
    }
    console.log(hit1);
    console.log('Game developed by Rajeev Kumar Sharma');
    // a random x location of star
    for (var k = 0; k < 25; k++)
    {
        starx[k] = Math.floor(Math.random() * 839 + 50);
        scissorx[k] = Math.floor(Math.random() * 839 + 50);
        stary[k] = 0;
        scissory[k] = 0;
    }
    //drawGame();
    // main functionality
    iStart = setInterval(drawGame, 10);
    // binding mouse with movement
    var iCanX1 = $(canvas).offset().left;
    var iCanX2 = parseFloat(iCanX1) + parseFloat(width);
    $("#game").mousemove(function (e)
    {
        if (e.pageX > iCanX1 && e.pageX < iCanX2)
        {
            oStricker.x = Math.max(e.pageX - iCanX1 - (oStricker.w / 2), 0);
            oStricker.x = Math.min(ctx.canvas.width - oStricker.w, oStricker.x);
        }
    });

    // binding ball movement with keybourd
    $(window).keydown(function (e)
    {
        switch (e.keyCode)
        {
            case 37:
                {
                    left = true;
                    break;
                }
            case 39:
                {
                    right = true;
                    break;
                }
        }
    });
    $(window).keyup(function (e)
    {
        switch (e.keyCode)
        {
            case 37:
                {
                    left = false;
                    break;
                }
            case 39:
                {
                    right = false;
                    break;
                }
        }
    });
});