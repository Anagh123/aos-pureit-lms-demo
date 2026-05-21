import { useCallback, useEffect, useRef, useState } from 'react';

interface WebcamOptions {
  audio?: boolean;
  video?: boolean | MediaTrackConstraints;
}

export function useWebcam() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [starting, setStarting] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const start = useCallback(async (opts: WebcamOptions = { video: true, audio: false }) => {
    if (streamRef.current) return streamRef.current;
    setStarting(true);
    setError(null);
    try {
      const constraints: MediaStreamConstraints = {
        video: opts.video ?? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: opts.audio ?? false
      };
      const s = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = s;
      setStream(s);
      setCameraOn(true);
      setMicOn(true);
      return s;
    } catch (e: any) {
      const msg =
        e.name === 'NotAllowedError' ? 'Camera/mic permission denied. Please allow access and reload.' :
        e.name === 'NotFoundError' ? 'No camera detected on this device.' :
        e.name === 'NotReadableError' ? 'Camera is in use by another app.' :
        `Could not access camera: ${e.message}`;
      setError(msg);
      return null;
    } finally {
      setStarting(false);
    }
  }, []);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setStream(null);
  }, []);

  const toggleCamera = useCallback(() => {
    const tracks = streamRef.current?.getVideoTracks() || [];
    tracks.forEach(t => { t.enabled = !t.enabled; });
    setCameraOn(c => !c);
  }, []);

  const toggleMic = useCallback(() => {
    const tracks = streamRef.current?.getAudioTracks() || [];
    tracks.forEach(t => { t.enabled = !t.enabled; });
    setMicOn(m => !m);
  }, []);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  return { stream, error, cameraOn, micOn, starting, start, stop, toggleCamera, toggleMic };
}
