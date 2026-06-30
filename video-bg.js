// video-bg.js – injects background video and trailing cursor effect
document.addEventListener('DOMContentLoaded', () => {
  // Create background video container
  const bgContainer = document.createElement('div');
  bgContainer.className = 'bg-video';
  const video = document.createElement('video');
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.src = getComputedStyle(document.documentElement).getPropertyValue('--bg-video-url').trim();
  bgContainer.appendChild(video);
  document.body.appendChild(bgContainer);

  // Create trailing circle element
  const circle = document.createElement('div');
  circle.className = 'trailing-circle';
  document.body.appendChild(circle);

  // Update circle position on mouse move
  document.addEventListener('mousemove', (e) => {
    circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
});
