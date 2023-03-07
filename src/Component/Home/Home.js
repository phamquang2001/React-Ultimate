import videoHome from '../../assets/video-home-page.mp4'
import './Home.scss'

function Home() {
  return (
    <div className='video-home'>
      <video
        loop
        autoPlay
        muted
      >
        <source src={videoHome} />
      </video>
    </div>
  );
}

export default Home;
