var rSlider, xSlider;

function setup() {
  // create canvas
  createCanvas(windowWidth, windowHeight);
  textFont("sans",30);
  fill(242, 230, 213);

  var r0 = 600;
  var x0 = 100;
  var dt0 = 25;

  // create sliders
  rSlider = createSlider(0, 800, r0);
  rSlider.position(100, 100);
  xSlider = createSlider(0, 1000, x0);
  xSlider.position(100, 160);
  tSlider = createSlider(0, 100, dt0);
  tSlider.position(100, 220);
}

function make_axes(x1,y1,x2,y2){
	// Axes
	stroke(242, 230, 213)
	line(x1+50,y1+50,x1+50,y2-50);
	line(x1+50,y2-50,x2,y2-50);

	line(x2,y1+50,x2,y2-50);
	line(x1+50,y1+50,x2,y1+50);

	fill(242, 230, 213);
	noStroke();
	push();
	translate(x1+20,0.75*y2+0.25*y1);
	rotate(-PI/2);
	text("população (x)", 0, 0);
	pop();

	push();
	translate(0.45*x2+0.55*x1,y2);
	text("tempo (t)", 0, 0);
	pop();
}

function logistic(r,x_in,dt,x1,y1,x2,y2){

	var bottom = 300
	var scale = 200
	bottom = y2-100
	
	var n = (x2-x1)/dt - 1;
	var t0 = x1+75;
	var T = x1+n*dt;

	var x = x_in;
	stroke(167,250,184)
    strokeWeight(10);
	point( t0, bottom-scale*x );
	for(var t=t0; t<T; t+=dt )
	{
		var x_new = r*x*(1-x);
	    strokeWeight(5);
		line( t, bottom-scale*x, t+dt, bottom-scale*x_new );
	    strokeWeight(10);
		point(t+dt, bottom-scale*x_new);
		x = x_new;
	}

	make_axes(x1,y1,x2,y2)
}

function draw() {
  var r = rSlider.value();
  var x0 = xSlider.value();
  var dt = tSlider.value();
  background(100);

  noStroke();
  textFont("sans",40);
  text("Mapa Logístico: x(t+\u0394t) = r \u00B7 x(t) \u00B7 [ 1 - x(t) ]", 100, 55);
  textFont("sans",30);
  text("taxa de reprodução (r)",    245, 115);
  text("população inicial (x)",     245, 175);
  text("tempo entre gerações (\u0394t)", 245, 235);

  r = r/200.0
  x0 = x0/1000.0
  dt = dt

  logistic(r,x0,dt,50,225,width-100,height-80);

}
