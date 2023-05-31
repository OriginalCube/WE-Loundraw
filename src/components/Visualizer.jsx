import React from "react";
import petalImage from "./assets/petal.png";

const Visualizer = (props) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    // Little Canvas things
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    function ParticleSpace() {
      // Configuration, Play with these
      var config = {
        particleNumber: 50,
        maxParticleSize: 10,
        maxSpeed: 40,
        colorVariation: 50,
      };

      // Colors
      var colorPalette = {
        bg: { r: 12, g: 9, b: 29 },
        matter: [
          { r: 51, g: 155, b: 206 }, // darkPRPL
          { r: 238, g: 218, b: 167 }, // rockDust
          { r: 232, g: 184, b: 142 }, // solorFlare
          { r: 2, g: 27, b: 85 }, // totesASun
        ],
      };

      // Some Variables hanging out
      var particles = [],
        centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        drawBg,
        // Draws the background for the canvas, because space
        drawBg = function (ctx, color) {
          // ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

      // Particle Constructor
      var Particle = function (x, y) {
        // X Coordinate
        this.x = x || Math.round(Math.random() * canvas.width);
        // Y Coordinate
        this.y = y || Math.round(Math.random() * canvas.height);
        // Radius of the space dust
        this.r = Math.ceil(Math.random() * config.maxParticleSize);
        // Color of the rock, given some randomness
        this.c = colorVariation(
          colorPalette.matter[
            Math.floor(Math.random() * colorPalette.matter.length)
          ],
          true
        );
        // Speed of which the rock travels
        this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), 0.7);
        // Direction the Rock flies
        this.d = Math.round(Math.random() * 360);
      };

      // Provides some nice color variation
      // Accepts an rgba object
      // returns a modified rgba object or a rgba string if true is passed in for argument 2
      var colorVariation = function (color, returnString) {
        var r, g, b, a, variation;
        r = Math.round(
          Math.random() * config.colorVariation -
            config.colorVariation / 2 +
            color.r
        );
        g = Math.round(
          Math.random() * config.colorVariation -
            config.colorVariation / 2 +
            color.g
        );
        b = Math.round(
          Math.random() * config.colorVariation -
            config.colorVariation / 2 +
            color.b
        );
        a = Math.random() + 0.5;
        if (returnString) {
          return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        } else {
          return { r, g, b, a };
        }
      };

      // Used to find the rocks next point in space, accounting for speed and direction
      var updateParticleModel = function (p) {
        var a = 180 - (p.d + 90); // find the 3rd angle
        p.d > 0 && p.d < 180
          ? (p.x += (p.s * Math.sin(p.d)) / Math.sin(p.s))
          : (p.x -= (p.s * Math.sin(p.d)) / Math.sin(p.s));
        p.d > 90 && p.d < 270
          ? (p.y += (p.s * Math.sin(a)) / Math.sin(p.s))
          : (p.y -= (p.s * Math.sin(a)) / Math.sin(p.s));
        return p;
      };

      // Just the function that physically draws the particles
      // Physically? sure why not, physically.
      var drawParticle = function (x, y, r, c) {
        ctx.beginPath();
        ctx.fillStyle = c;
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
      };

      // Remove particles that aren't on the canvas
      var cleanUpArray = function () {
        particles = particles.filter((p) => {
          return p.x > -100 && p.y > -100;
        });
      };

      var initParticles = function (numParticles, x, y) {
        for (let i = 0; i < numParticles; i++) {
          particles.push(new Particle(x, y));
        }
        particles.forEach((p) => {
          drawParticle(p.x, p.y, p.r, p.c);
        });
      };

      // That thing
      window.requestAnimFrame = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();

      // Our Frame function
      var frame = function () {
        // Draw background first
        // drawBg(ctx, colorPalette.bg);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Update Particle models to new position
        particles.map((p) => {
          return updateParticleModel(p);
        });
        // Draw em'
        particles.forEach((p) => {
          drawParticle(p.x, p.y, p.r, p.c);
        });
        // Play the same song? Ok!
        window.requestAnimFrame(frame);
      };

      // Click listener
      document.body.addEventListener("click", function (event) {
        var x = event.clientX,
          y = event.clientY;
        cleanUpArray();
        initParticles(config.particleNumber, x, y);
      });

      // First Frame
      frame();

      // First particle explosion
      initParticles(config.particleNumber);
    }

    function PetalAnim() {
      const TOTAL = 50;
      const petalArray = [];
      const petalImg = new Image();
      petalImg.src = petalImage;

      // Petal class
      class Petal {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height * 2 - canvas.height;
          this.w = 25 + Math.random() * 15;
          this.h = 20 + Math.random() * 10;
          this.opacity = 0.7;
          this.flip = Math.random();

          this.xSpeed = 1.5 + Math.random() * 2;
          this.ySpeed = 1 + Math.random() * 1;
          this.flipSpeed = Math.random() * 0.03;
        }

        draw() {
          if (this.y > canvas.height || this.x > canvas.width) {
            this.x = -petalImg.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flip = Math.random();
          }
          ctx.globalAlpha = this.opacity;
          ctx.drawImage(
            petalImg,
            this.x,
            this.y,
            this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
            this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5)
          );
        }

        animate() {
          this.x += this.xSpeed + mouseX * 5;
          this.y += this.ySpeed + mouseX * 2;
          this.flip += this.flipSpeed;
          this.draw();
        }
      }

      const petalLoad = () => {
        for (let i = 0; i < TOTAL; i++) {
          petalArray.push(new Petal());
        }
        render();
      };

      function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petalArray.forEach((petal) => petal.animate());
        window.requestAnimationFrame(render);
      }

      let mouseX = 0.5;
      petalLoad();
    }

    function animateRain() {
      ctx.globalAlpha = 0.75;
      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.8;
      ctx.lineCap = "round";

      let w = window.innerWidth;
      let h = window.innerHeight;
      var init = [];
      var maxParts = 250;
      for (var a = 0; a < maxParts; a++) {
        init.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          l: 1 + Math.random() * 2,
          xs: -4 + Math.random() * 4,
          ys: Math.random() * 10 + 10,
        });
      }

      var particles = [];
      for (var b = 0; b < maxParts; b++) {
        particles[b] = init[b];
      }

      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (var c = 0; c < particles.length; c++) {
          var p = particles[c];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
          ctx.stroke();
        }
        move();
      }

      function move() {
        for (var b = 0; b < particles.length; b++) {
          var p = particles[b];
          p.x += p.xs;
          p.y += p.ys;
          if (p.x > w || p.y > h) {
            p.x = Math.random() * w;
            p.y = -20;
          }
        }
      }
      setInterval(draw, 30);
    }

    if (props.canvasId === 1) {
      animateRain();
    } else if (props.canvasId === 2) {
      PetalAnim();
    } else if (props.canvasId === 3) {
      ParticleSpace();
    }
  }, [props.canvasId]);

  return <canvas className="absolute" ref={canvasRef} />;
};

export default Visualizer;
