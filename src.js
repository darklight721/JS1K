// Declare variables
var	t = ["Love.","Liebe.","Amor.","Cinta.","Pagibig.","愛。"],// texts
	p = 5, 		// pixel size
	s = 2,		// spacing between pixels
	map = [],	// mapping of texts to pixels
	r,g,v,		// rgb colors
	i=0,h,m;		// incrementors

// Set canvas size
c.width = 700;
c.height = 448;

// Set background color
b.style.backgroundColor = "#000";

// Format font
a.font = "200px Georgia";
a.textBaseline = "middle";
a.textAlign = "center";

// Initialize map
for (var j = 0; j < t.length; j++)
{
	map[j] = [];
	for (var k = 0; k < c.width; k++)
	{
		map[j][k] = [];
	}
}

// Tests whether a pixel intersects with the text
var isTextOnPixel = function(d) {
	for (var y = 0; y < d.height; y++)
	{
		for (var x = 0; x < d.width; x++)
		{
			var i = (y*4) + (x*4);
			if (d.data[i] !== 0 || d.data[i+1] !== 0 && d.data[i+2] !== 0)
			{
				return 1;
			}
		}
	}
	return 0;
};

// Loops a two dimensional array
var loopxy = function(x,y,s,callback){
	for (var i = 0; i < y; i+=s)
	{
		for (var j = 0; j < x; j+=s)
		{
			callback(j,i);
		}
	}
};

for (var j = 0; j < t.length; j++)
{
	// Draw text
	a.fillStyle = "#fff";
	a.fillText(t[j],c.width/2,c.height/2);

	// Map text
	loopxy(c.width,c.height,p+s,function(x,y){
		map[j][x][y] = isTextOnPixel(a.getImageData(x,y,p,p));
	});
	
	// Clear the canvas
	a.clearRect(0,0,c.width,c.height);
}

// Get a random value between 0 to n
var getRandomValue = function(n){
	return Math.floor(Math.random()*n);
};

// Pick a random rgb color
var randomColor = function(){
	r = getRandomValue(256);
	g = getRandomValue(256);
	v = getRandomValue(256);
};

m = parseInt(c.width/(p+s)+1,10);	// number of pixelated columns

// Start rendering
(function render(){

	window.setTimeout(function(){
	
		if (i === 0) // only pick a random color once the whole canvas is painted with the current color
		{
			h = getRandomValue(t.length);
			randomColor();
		}
		
		loopxy(i*(p+s),c.height,p+s,function(x,y){
			if (map[h][x][y] === 1)
			{
				// if pixel contains text, get the opposite color
				a.fillStyle = "rgb("+(255-r)+","+(255-g)+","+(255-v)+")";
			}
			else
			{
				a.fillStyle = "rgb("+r+","+g+","+v+")";
			}
			a.fillRect(x,y,p,p);
		});
		
		i = (i+1) % m;
		
		render();
	},1);
})();

