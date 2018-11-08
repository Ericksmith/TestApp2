import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.canvas = React.createRef();
    this.strip = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    console.log(caches);
  }

  startVideo = () => {
    console.log("running");
    const video = this.video.current;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(localMediaStream => {
        console.log(localMediaStream);
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
      })
      .catch(err => {
        console.error(`OH NO!!!`, err);
      });
    const canvas = this.canvas.current;
    const ctx = canvas.getContext("2d");

    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    console.log(width, height);
    ctx.font = "100px Georgia";
    ctx.fillText("3rdAve!", 10, 50);

    ctx.font = "30px Verdana";
    
    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.globalCompositeOperation='destination-over';
    // ctx.fillText('test', 0, 7*50)

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
    }, 16);
  };

  takePhoto = () => {
    const strip = this.strip.current;
    const canvas = this.canvas.current;
    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "handsome");
    link.innerHTML = `<img src="${data}" alt="Photo" />`;
    strip.insertBefore(link, strip.firstChild);
  };

  render() {
    return (
      <div className="App">
        <div className="controls">
          <button onClick={this.startVideo}>Start Program</button>
          <button onClick={this.takePhoto}>Take Photo</button>
        </div>
        <header className="App-header">
          <video className="player" ref={this.video} />
          <canvas className="photo" ref={this.canvas} />
          <div className="strip" ref={this.strip} />
        </header>
      </div>
    );
  }
}

export default App;
