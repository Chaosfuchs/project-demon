import {useState, useEffect, useRef} from 'react';
import VideoPlayer from '../components/VideoPlayer.jsx';

const localStorageKey = 'videoPlayerPlaylist';

function FeatureVideoPlayer() {
	const [videos, setVideos] = useState([
		{
			id: '1',
			title: 'ElephantsDream',
			src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		},
		{
			id: '2',
			title: 'Sintel',
			src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
		},
		{
			id: '3',
			title: 'BickBuckBunny',
			src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
		},
	]);
	const [currentVideoId, setCurrentVideoId] = useState('1'); //Wenn dynamisch und von 0 neu erstellt muss die ID auf das erste Element gesetzt werden!;
	const [videoShouldPlay, setVideoShouldPlay] = useState(false);
	const titleRef = useRef();
	const urlRef = useRef();

	const currentVideoObject =
		videos.find((video) => video.id === currentVideoId) ?? videos[0];

	const canSkipForward = !!getNextOrPreviousVideo(1); //Zu boolean konvertiert
	const canSkipBackward = !!getNextOrPreviousVideo(-1); // Zu boolean konvertiert

	function getNextOrPreviousVideo(inc) {
		const currentIndex = videos.findIndex(
			(video) => video.id === currentVideoId,
		);
		const nextVideo = videos[currentIndex + inc];
		return nextVideo;
	}

	function skipVideo(inc) {
		const nextVideo = getNextOrPreviousVideo(inc);
		if (nextVideo) {
			setCurrentVideoId(nextVideo.id);
			setVideoShouldPlay(true);
		}
	}

	function save(videos) {
		localStorage.setItem(localStorageKey, JSON.stringify(videos));
	}

	useEffect(() => {
		const videos = localStorage.getItem(localStorageKey);
		if (videos) {
			setVideos(JSON.parse(videos));
		}
	}, []);

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '20px',
					}}
				>
					<span>Title: </span>
					<input ref={titleRef}></input>
					<span>URL: </span>
					<input ref={urlRef}></input>
					<button
						onClick={() => {
							setVideos((oldVideos) => {
								const newVideo = {
									id: (Date.now() * Math.random()).toString(),
									title: titleRef.current.value,
									src: urlRef.current.value,
								};
								const newVideos = [...oldVideos, newVideo];
								titleRef.current.value = '';
								urlRef.current.value = '';
								setCurrentVideoId(newVideo.id);
								save(newVideos);
								return newVideos;
							});
						}}
					>
						Add
					</button>
					<button
						onClick={() => {
							setVideos((oldVideos) => {
								const newVideos = oldVideos.filter(
									(video) => video.id !== currentVideoObject.id,
								);
								save(newVideos);
								return newVideos;
							});
						}}
					>
						Delete
					</button>
				</div>
				<select
					size='5'
					style={{minWidth: '200px'}}
					value={currentVideoId}
					onChange={(event) => {
						setCurrentVideoId(event.target.value);
					}}
				>
					{videos.map((video) => {
						return (
							<option key={video.id} value={video.id}>
								{video.title}
							</option>
						);
					})}
				</select>
				<div style={{display: 'flex', gap: '30px'}}>
					<button
						style={{fontSize: '22px'}}
						onClick={() => skipVideo(-1)}
						disabled={!canSkipBackward}
					>
						{'<|'}
					</button>
					<button
						style={{fontSize: '22px'}}
						onClick={() => skipVideo(1)}
						disabled={!canSkipForward}
					>
						{'|>'}
					</button>
				</div>
				<VideoPlayer
					src={currentVideoObject?.src}
					shouldPlay={videoShouldPlay}
					onEnded={() => {
						skipVideo(1);
					}}
				/>
			</div>
		</>
	);
}

export default FeatureVideoPlayer;
