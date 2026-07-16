import React from 'react';
import { createRoot } from 'react-dom/client';
import { MeshGradient } from '@paper-design/shaders-react';

const BgApp = () => (
  <MeshGradient
    width="100%"
    height="100%"
    colors={['#F8FCFB', '#72D6B2', '#E6F3EF', '#4CC59D']}
    distortion={0.8}
    swirl={0.1}
    grainMixer={0}
    grainOverlay={0}
    speed={0.65}
  />
);

const bgContainer = document.getElementById('bg-root');
if (bgContainer) {
  try {
    createRoot(bgContainer).render(<BgApp />);
  } catch (err) {
    console.error('MeshGradient failed to mount:', err);
  }
}
