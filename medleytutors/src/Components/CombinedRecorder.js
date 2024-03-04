import React, { useState, useRef, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";

const CombinedRecorder = () => {
  const [resetVideo, setResetVideo] = useState(false);
  const cameraVideoRef = useRef(null);
  const screenVideoRef = useRef(null);
  const cameraStartRecordingRef = useRef(null);
  const screenStartRecordingRef = useRef(null);

  const [facingMode, setFacingMode] = useState("user");
  const webcamRef = useRef(null);

  const handleDevices = React.useCallback(
    (mediaDevices) => {
      const videoDevices = mediaDevices.filter(({ kind }) => kind === "videoinput");
      if (videoDevices.length > 0) {
        setFacingMode("user");
      }
    },
    [setFacingMode]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const handleStartRecording = async () => {
    setResetVideo(false);

    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (error) {
      console.error("Error accessing camera:", error);
      return;
    }

    try {
      await navigator.mediaDevices.getDisplayMedia({ video: true });
    } catch (error) {
      console.error("Error accessing screen:", error);
      return;
    }

    if (cameraStartRecordingRef.current) {
      cameraStartRecordingRef.current();
    }
    if (screenStartRecordingRef.current) {
      screenStartRecordingRef.current();
    }
  };

  const handleStopRecording = (cameraStopRecording, screenStopRecording) => {
    cameraStopRecording();
    screenStopRecording();
    setResetVideo(true);
  };

  const handleResetVideo = () => {
    setResetVideo(false);
    if (cameraVideoRef.current) {
      cameraVideoRef.current.load();
    }
    if (screenVideoRef.current) {
      screenVideoRef.current.load();
    }
  };

  return (
    <div>
      <div>
        <ReactMediaRecorder
          video
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
            cameraStartRecordingRef.current = startRecording;
            return (
              <div>
                <p>Status: {resetVideo ? "Video Reset" : status}</p>
                <button onClick={handleStartRecording}>Start</button>
                <button onClick={() => handleStopRecording(stopRecording, () => {})}>
                  Stop
                </button>
                <button onClick={handleResetVideo}>Review</button>
                <div className="video-container">
                  {mediaBlobUrl && !resetVideo ? (
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      videoConstraints={{ facingMode }}
                      className="web-video"
                    />
                  ) : (
                    <div className="placeholder">.</div>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>
      <div>
        <ReactMediaRecorder
          screen
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
            screenStartRecordingRef.current = startRecording;
            return (
              <div>
                <p>Status: {resetVideo ? "Video Reset" : status}</p>
                <button onClick={() => handleStartRecording()}>Start</button>
                <button onClick={() => handleStopRecording(() => {}, stopRecording)}>
                  Stop
                </button>
                <button onClick={handleResetVideo}>Review</button>
                <div>
                  {mediaBlobUrl && !resetVideo ? (
                    <video ref={screenVideoRef} src={mediaBlobUrl} controls autoPlay muted />
                  ) : (
                    <div className="placeholder">Preview</div>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default CombinedRecorder;
