import { ReactMediaRecorder } from "react-media-recorder";
import { useState, useRef } from "react";


const ScreenRecord = () =>{
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
    return(
        <div>
            <ReactMediaRecorder
                screen
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) =>{
                    startRecordingRef.current = startRecording;
                    return(
                        <div>
                            <p>Status: {resetVideo ? "Video Reset" : status}</p>
                            <button onClick={handleStartRecording} disabled={resetVideo}>
                                Start Recording
                            </button>
                            <button onClick={() => handleStopRecording(stopRecording)} disabled={resetVideo}>
                                Stop Recording
                            </button>
                            <button onClick={handleResetVideo} disabled={!resetVideo}>
                                Review Video
                            </button>
                            <div>
                                {mediaBlobUrl && !resetVideo ? (
                                    <video ref={videoRef} src={mediaBlobUrl} controls autoPlay />
                                ):(
                                    <div className="placeholder">No recording available</div>
                                )}
                                </div>
                        </div>
                    );
                }}
            
            />
        </div>
    );
}

export default ScreenRecord;