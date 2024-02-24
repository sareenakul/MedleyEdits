import { useState, useRef } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const Camera = () => {
  const [resetVideo, setResetVideo] = useState(false);
  const videoRef = useRef(null);
  const startRecordingRef = useRef(null);

  const handleStartRecording = () => {
    setResetVideo(false);
    if (startRecordingRef.current) {
      startRecordingRef.current();
    }
  };

  const handleStopRecording = (stopRecording) => {
    stopRecording();
    setResetVideo(true);
  };

  const handleResetVideo = () => {
    setResetVideo(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <div className="camera">
      <ReactMediaRecorder
        video
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
          startRecordingRef.current = startRecording;
          return (
            <div className="web-rec">
              <p>Status: {resetVideo ? "Video Reset" : status}</p>
              <button onClick={handleStartRecording} disabled={resetVideo}>
                Start
              </button>
              <button onClick={() => handleStopRecording(stopRecording)} disabled={resetVideo}>
                Stop
              </button>
              <button onClick={handleResetVideo} disabled={!resetVideo}>
                Review
              </button>
              <div className="video-container">
                {mediaBlobUrl && !resetVideo ? (
                  <video className="web-video" ref={videoRef} src={mediaBlobUrl} controls autoPlay />
                ) : (
                  <div className="placeholder">No recording available</div>
                )}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Camera;
