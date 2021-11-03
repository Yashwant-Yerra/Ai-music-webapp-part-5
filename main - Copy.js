console.log("JS Loaded");
// song1 = "";
song1 = "";
song2 = "";
status_1 = "";
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
left_wrist_score = 0;
right_wrist_score = 0;
play_song_name = "";
//
function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500, 350);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotposes);

}

function modelloaded() {
    console.log("Model Loaded");
}

function draw() {
    image(video, 0, 0, 500, 350);
    status_of_song_1 = song1.isPlaying();
    status_of_song_2 = song2.isPlaying();
    // song_variable.isPlaying();

    fill("#FAFAD2");
    stroke("#ffffff");
    // 
    console.log("L = " + left_wrist_score);

    if (left_wrist_score > 0.2) {
        circle(left_wrist_x, left_wrist_y, 10);
        song2.stop();
        if (status_of_song_1 == false) {
            song1.play();
            document.getElementById("song_name_holder").innerHTML = "SONG NAME = Song 1";
        }
    }
    console.log("R = " + right_wrist_score);
    if (right_wrist_score > 0.2) {
        song1.stop();
        if (status_of_song_2 == false) {
            song2.play();
            document.getElementById("song_name_holder").innerHTML = "SONG NAME = Song 2";
        }
    }

}

function gotposes(result) {
    console.log(result);
    if (result.length > 0) {
        console.log(result);
        left_wrist_score = result[0].pose.keypoints[9].score;
        left_wrist_x = result[0].pose.leftWrist.x;
        left_wrist_y = result[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + left_wrist_x + " Left Wrist Y = " + left_wrist_y);
        // 
        right_wrist_score = result[0].pose.keypoints[10].score;
        right_wrist_x = result[0].pose.rightWrist.x;
        right_wrist_y = result[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + right_wrist_x + " Right Wrist Y = " + right_wrist_y);
    }
}

// function play() {
//     song.play();
//     song.setVolume(1);
//     song.rate(1);
// }