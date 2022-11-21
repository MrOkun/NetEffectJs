let pointsCount = 5;

let fadeDistance = 250;

let pointColor = 'rgb(101, 123, 163)';
let lineColor = 'rgb(90, 95, 146)';

let canvas;
let context;

let radius = 20;

let lineWidth = 40;

class Point 
{
    constructor(xPos, yPos, deltaX, deltaY) 
    {
        this.xPos = xPos;
        this.yPos = yPos;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }
}

let points = [];

function initialize()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");

    generatePoints();

    setInterval(render, 5);
}

function generatePoints()
{
    pointsCount = document.getElementById("input-points-count").value;
    fadeDistance = document.getElementById("input-fade-distance").value;
    radius = document.getElementById("input-radius").value;

    let pc_r = document.getElementById("input-point-color-r").value;
    let pc_g = document.getElementById("input-point-color-g").value;
    let pc_b = document.getElementById("input-point-color-b").value;

    let lc_r = document.getElementById("input-line-color-r").value;
    let lc_g = document.getElementById("input-line-color-g").value;
    let lc_b = document.getElementById("input-line-color-b").value;

    pointColor = "rgb(" + pc_r + "," + pc_g + "," + pc_b + ")";
    lineColor = "rgb(" + lc_r + "," + lc_g + " ," + lc_b + ")";

    lineWidth = document.getElementById("input-line-width").value;

    points = [];

    for (let i = 0; i < pointsCount; i++)
    {
        points.push(new Point(Math.random() * 512, Math.random() * 512, 1 + getRandomInt(5), 1 + getRandomInt(5)));
    }
}

function render()
{
    document.getElementById("info").textContent = "scene info : point color " + pointColor + ", line color " + lineColor + ", points count " + pointsCount + ", fade distance " + fadeDistance;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < points.length; i++)
    {
        if(points[i].xPos >= canvas.width - 20)
        {
            points[i].deltaX = -Math.abs(points[i].deltaX);
        }
        if(points[i].xPos <= 0)
        {
            points[i].deltaX = Math.abs(points[i].deltaX);
        }
        if(points[i].yPos <= 0)
        {
            points[i].deltaY = Math.abs(points[i].deltaY);
        }
        if(points[i].yPos >= canvas.height - 20)
        {
            points[i].deltaY = -Math.abs(points[i].deltaY);
        }

        points[i] = new Point(points[i].xPos + points[i].deltaX, points[i].yPos + points[i].deltaY, points[i].deltaX, points[i].deltaY);
    }

    draw();
}

function draw()
{
    for(let i = 0; i < points.length; i++)
    {
        for(let j = 0; j < points.length; j++)
        {
            let a = new Point(points[i].xPos, points[i].yPos, 0, 0);
            let b = new Point(points[j].xPos, points[j].yPos, 0, 0);

            let Distance = Math.sqrt(Math.pow(Math.abs(b.xPos - a.xPos), 2) + Math.pow(Math.abs(b.yPos - a.yPos), 2));

            let Fade = -(Distance - fadeDistance) / fadeDistance;

            if(Fade > 0)
            {
                context.beginPath();
                context.strokeStyle = lineColor;
                context.lineWidth = Fade * lineWidth;
                
                context.moveTo(a.xPos, a.yPos);
                context.lineTo(b.xPos, b.yPos);
                context.stroke();
            }
        }
    }

    for (let i = 0; i < points.length; i++)
    {
        context.fillStyle = pointColor;

        context.beginPath();
        context.arc(points[i].xPos, points[i].yPos, radius, 0, 2 * Math.PI, false);
        context.fill();
    }
}

function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}