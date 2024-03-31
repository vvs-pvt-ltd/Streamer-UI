import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import RecordRTC from "recordrtc";
import MediaStreamRecorder from "msr";
const VideoDemo = () => {
    const socket = io.connect("http://localhost:9000/");
    const videoRef = useRef();
    const canvasRef = useRef();
    let record
    const startstream = () => {
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream) => {
            videoRef.current.srcObject = stream;
        });
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        }).then((stream) => {
            socket.emit('message', "ready");
            // socket.emit('', "ready");
            // videoRef.current.srcObject = stream;
            record = RecordRTC(stream, {
                type: 'video',
                mimeType: 'video/webm',
            });
            record.startRecording();
            setInterval(async () => {
                await record.stopRecording(
                    () => {
                        let blob = record.getBlob();
                        if (blob.size) {
                            socket.emit("Stream", blob);
                        }
                    }
                );
                record.startRecording();
                // console.log(recorded);
            }, 2500);
        });
    };
    return (
        <div>
            <button onClick={startstream}>start stream</button>
            <br />
            <video ref={videoRef} className='w-[100vw] h-[100vh]' autoPlay></video>
            <br />
            <canvas ref={canvasRef} className='hidden' width={1920} height={1080}></canvas>
        </div>
    );
};

export default VideoDemo;
