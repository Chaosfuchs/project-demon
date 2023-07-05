import {useState, useEffect, useRef} from 'react';

function VideoPlayer({src, onEnded, shouldPlay}) {
	const videoRef = useRef();

	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(100);
	const [position, setPosition] = useState(0);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		setIsPlaying(false);
		setDuration(0);
		setVolume(100);
		setPosition(0);
		videoRef.current.volume = 1;
		if (shouldPlay) {
			videoRef.current.play();
		}
	}, [src, shouldPlay]);
	return (
		<>
			<video
				style={{width: '650px', height: '300px'}}
				ref={videoRef}
				onPause={() => {
					setIsPlaying(false);
				}}
				onPlay={() => {
					setIsPlaying(true);
				}}
				onVolumeChange={(event) => {
					const volume = event.target.volume;
					setVolume(volume * 100);
				}}
				onTimeUpdate={() => {
					setPosition(
						duration > 0 ? videoRef.current.currentTime / duration : 0,
					);
				}}
				onLoadedData={() => {
					setDuration(videoRef.current.duration);
				}}
				onEnded={() => {
					onEnded && onEnded();
				}}
				src={src}
				controls
			></video>
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<button
					onClick={() => {
						if (isPlaying) {
							videoRef.current.pause();
						} else {
							videoRef.current.play();
						}
						setIsPlaying((oldValue) => !oldValue);
					}}
				>
					{isPlaying ? 'II' : '>'}
				</button>
				<button
					onClick={() => {
						videoRef.current.pause();
						videoRef.current.currentTime = 0;
						setIsPlaying(false);
					}}
				>
					Stop
				</button>
				<input
					type='range'
					min='0'
					max='100'
					step='1'
					value={volume}
					onChange={(event) => {
						const volume = parseInt(event.target.value);
						setVolume(volume);
						videoRef.current.volume = volume / 100;
					}}
				></input>
				<div style={{width: '30px'}}>{Math.round(volume)}</div>
				<input
					type='range'
					min='0'
					max='1'
					step='0.01'
					value={position}
					onChange={(event) => {
						const position = parseFloat(event.target.value);
						setPosition(position);
						videoRef.current.currentTime = position * videoRef.current.duration;
					}}
				></input>
				<div style={{width: '100px'}}>
					{videoRef.current
						? Math.round(position * videoRef.current.duration)
						: 0}{' '}
					/ {Math.round(duration)}
				</div>
			</div>
		</>
	);
}

export default VideoPlayer;
