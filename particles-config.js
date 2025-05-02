particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 60,
        "density": { 
          "enable": true, 
          "value_area": 800,
          "adjust": true
        }
      },
      "color": { 
        "value": "#00ff88",
        "opacity": 0.8
      },
      "shape": {
        "type": "circle",
        "stroke": { 
          "width": 0, 
          "color": "#000000" 
        }
      },
      "opacity": {
        "value": 0.5,
        "random": true,
        "animation": {
          "enable": true,
          "speed": 1,
          "minimumValue": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "animation": {
          "enable": true,
          "speed": 2,
          "minimumValue": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#00ff88",
        "opacity": 0.4,
        "width": 1,
        "shadow": {
          "enable": true,
          "color": "#00ff88",
          "blur": 5
        }
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { 
          "enable": true, 
          "mode": "grab" 
        },
        "onclick": { 
          "enable": true, 
          "mode": "push" 
        },
        "resize": true
      },
      "modes": {
        "grab": { 
          "distance": 140, 
          "line_linked": { 
            "opacity": 1 
          } 
        },
        "push": { 
          "particles_nb": 4 
        },
        "bubble": {
          "distance": 200,
          "size": 6,
          "duration": 2,
          "opacity": 0.8,
          "speed": 3
        }
      }
    },
    "retina_detect": true,
    "fps_limit": 60,
    "pause_on_blur": true
});
  
