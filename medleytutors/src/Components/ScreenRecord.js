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
                    
                }}
            
            />
        </div>
    );
}

export default ScreenRecord;