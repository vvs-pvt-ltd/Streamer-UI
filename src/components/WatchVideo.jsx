import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
const socket = io.connect(process.env.REACT_APP_SERVER_URI);

const WatchVideo = () => {
  const videoRef = useRef();

  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [
        { 'urls': 'stun:stun.l.google.com:19302' }
      ]
    });
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
    return peer;
  }

  const handleNegotiationNeededEvent = async (peer) => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription
    }
    const disc = axios.post(`${process.env.REACT_APP_SERVER_URI}\api\server`,
      payload
    );
    const desc = new RTCSessionDescription(disc);
    peer.setRemoteDescription(desc).catch(e => console.log(e));
  };
  const handleTrackEvent = (e) => {
    videoRef.current.srcObject = e.streams[0];
  }

  const watch = () => {
    const peer = createPeer();
    peer.addTransceiver("video", { direction: "recvonly" })
  }

  return (
    <div>
      <p>Video will appear below when it's available</p>
      <video ref={videoRef} autoPlay></video>
      <button onClick={watch}>view</button>
    </div>
  );
};

export default WatchVideo;
