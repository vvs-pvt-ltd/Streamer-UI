import React, { useRef, useEffect, useCallback } from "react";

function Demo() {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  let localStream;
  let remoteStream;
  let ws;

  useEffect(() => {
    const start = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideoRef.current.srcObject = localStream;
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    start();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // const startCall = async () => {
  //   if (!localStream) {
  //     console.error('Local stream not initialized yet.');
  //     return;
  //   }

  //   const peerConnection = new RTCPeerConnection();

  //   localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  //   peerConnection.ontrack = (event) => {
  //     remoteStream = event.streams[0];
  //     remoteVideoRef.current.srcObject = remoteStream;
  //   };

  //   const offer = await peerConnection.createOffer();
  //   await peerConnection.setLocalDescription(offer);

  //   // Send the offer to the backend server via WebSocket
  //   const offerData = JSON.stringify(offer);
  //   ws.send(offerData);
  // };

  useEffect(() => {
    new WebSocket("ws://localhost:9000/", (ws, err) => {
      console.log(ws);
      ws.onopen = () => {
        console.log("WebSocket connected");
      };

    }); // Replace with your backend WebSocket URI

    ws.onmessage = (event) => {
      // Handle messages received from the backend
      console.log('Message received from server:', event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Clean up WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted></video>
      <video ref={remoteVideoRef} autoPlay></video>
      <button>Start Call</button>
    </div>
  );
}

export default Demo;

