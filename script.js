// Add simple tilt/parallax effect
document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const { offsetX, offsetY, target } = e;
      const width = target.clientWidth;
      const height = target.clientHeight;
      const moveX = (offsetX - width / 2) / 10;
      const moveY = (offsetY - height / 2) / 10;
  
      card.style.transform = `rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    });
  
    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  });
  
  // Toggle mouse cursor between 0 and 1 with parrot green color
  let cursorState = 0; // initial state is 0
  document.body.addEventListener('click', () => {
    cursorState = cursorState === 0 ? 1 : 0;
  
    // Set cursor color to parrot green (#00FF00)
    document.body.style.cursor = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><text x="0" y="15" font-size="15" fill="#00FF00">${cursorState}</text></svg>') 10 10, auto`;
  });
  