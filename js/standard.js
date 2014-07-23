var iStart = 0;
var canvas, ctx;
var width, height;
var oBall, oBricks, oStricker;
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
function clear()
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // fill background
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

}
function drawGame()
{
    // clear canvas every time
    clear();
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
            if(oBricks.objs[i][j]==1)
            {
                ctx.beginPath();
                ctx.rect(j*(oBricks.w),i*(oBricks.h),oBricks.w,oBricks.h); 
                ctx.closePath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = '#333333';
                ctx.fill();
                ctx.stroke();
            }                   
        }    
    }
    // stricker
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
    // ball motion
    oBall.x += oBall.dx;
    oBall.y += oBall.dy;
    // collision detection
    iRowH = oBricks.h;
    iRow = Math.floor(oBall.y /iRowH);
    iCol = Math.floor(oBall.x/(oBricks.w));
    // mark brick as brocken
    if(oBall.y < oBricks.r*iRowH && iRow>=0 && iCol>=0 && oBricks.objs[iRow][iCol] == 1)    
    {
        oBricks.objs[iRow][iCol] = 0;
        oBall.dy = -oBall.dy;
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
        else if ((oBall.y + oBall.dy + oBall.r) > ctx.canvas.height - 2)        
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
    oStricker = new Stricker((width / 2) - 74, 575, 148, 20);
    oBall = new Ball((width / 2), 565, 0.5, -2, 10);
    oBricks = new Bricks((width / 10), 40, 8, 10);
    oBricks.objs = new Array(oBricks.r);
    // filling brocks    
    for (i = 0; i < oBricks.r; i++)
    {
        oBricks.objs[i] = new Array(oBricks.c);
        for (j = 0; j < oBricks.c; j++)
        {
            oBricks.objs[i][j] = 1;
        }
    }
    // random delete
    for (i = 0; i < 40; i++)
    {
        var rRow = Math.floor(Math.random() * 8);
        var rCol = Math.floor(Math.random() * 10);
        if (oBricks.objs[rRow][rCol] == 1)
        {
            oBricks.objs[rRow][rCol] = 0;
        }
        else
        {
            i--;
        }
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
});