import { useState } from 'react';

export default function Call() {
  const [callFrame, setCallFrame] = useState(null);
  const [inCall, setInCall] = useState(false);
  const backendUrl = 'https://daj-pubg-hackathon-nepdev-backend-5xg1.onrender.com/api/v1'; 
  async function startCall() {
    try {
      // 1. Create a room from backend
      const roomRes = await axios.get(`${backendUrl}/call`);
      const room = roomRes.data;
      const token = room.token.token;
      console.log("room response: ",roomRes)
      console.log("toke", token)
      // 3. Create call frame
      const frame = DailyIframe.createFrame({
        showLeaveButton: true,
        iframeStyle: {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%'
        }
      });

      document.body.append(frame.iframe);

      await frame.join({
        url: `${room.url}?t=${token}`,
        audioSource: true,
        videoSource: false // Audio only
      });

      setCallFrame(frame);
      setInCall(true);
    } catch (err) {
      console.error(err);
    }
  }

  function leaveCall() {
    setInCall(false);
  }

  return (
    <div style={{ padding: '2rem', width: '100%', height: '100vh' }}>
      {!inCall ? (
        <button onClick={startCall}>Start Call</button>
      ) : (
        <>
          <button
            onClick={leaveCall}
            style={{ position: 'absolute', zIndex: 10, margin: '1rem' }}
          >
            Leave Call
          </button>
          <iframe
            src="https://meet.jit.si/DemoRoom12345"
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              position: 'fixed',
              top: 0,
              left: 0,
            }}
            allow="microphone; fullscreen"
            title="Mero Sathi"
          />
        </>
      )}
    </div>
  );
}