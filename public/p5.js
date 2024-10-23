let mic;
let noiseLev;
let degrad;
let peopleNum;

let video;
let poseNet;
let poses = [];
let myBodyPose;

function preload() {
  myBodyPose = ml5.bodyPose("MoveNet", { flipped: true });
}

function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  myBodyPose.detectStart(video, gotPoses);

  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  //   myBodyPose.on("pose", function (results) {
  //     poses = results;
  //   });

  mic = new p5.AudioIn();
  mic.start();
  console.log(mic);
}

function draw() {
  if (client == "pari") {
    background(125);
    pari();
  } else if (client == "dispari") {
    dispari();
    background(0);
  }
}

function pari() {
  image(video, 0, 0, 640, 480);
  drawKeypoints();
  peopleNum = poses.length;

  let micLevel = mic.getLevel(); // between 0 and 1
  console.log(micLevel);
  //   noiseLev = micLevel * 100;

  //   console.log("volume: " + noiseLev + "num people: " + peopleNum);
  //   degrad = noiseLev * peopleNum;
  //   console.log("degradation: " + degrad);
  //   drawSkeleton();
}

function dispari() {
  createCanvas(100, 100);
}

function drawKeypoints() {
  if (poses.length > 0) {
    let pose = poses[0];

    let x = pose.nose.x;
    let y = pose.nose.y;

    fill(255, 0, 0);
    circle(x, y, 20);

    for (let i = 1; i < pose.keypoints.length; i++) {
      let keypoint = pose.keypoints[i];
      if (keypoint.confidence > 0.2) {
        fill(0, 0, 255);
        circle(keypoint.x, keypoint.y, 12);
      }
    }
  }
}
