import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import shaka from 'shaka-player';
import "./VideoPlayer.css";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!src) {
      console.error('No source provided for the video player');
      return;
    }

    let player;

    if (shaka.Player.isBrowserSupported()) {
      player = new shaka.Player(videoRef.current);
      player.load(src.trim()).then(() => {
        videoRef.current.play();
      }).catch((error) => {
        console.error('Error loading video:', error);
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src.trim();
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play();
      });
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [src]);

  return (
    <div>
      <video ref={videoRef} controls width="100%" />
    </div>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired
};

export default VideoPlayer;