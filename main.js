leftWristx="";
leftWristy="";
rightWristx="";
rightWristy="";
scoreLeftWrist=0;
scoreRightWrist=0;
song1="";
song2="";
song1_status="";
song2_status="";
function setup()
{
    canvas= createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw()
{
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist>0.2)
    {
        circle(rightWristx,rightWristy,20);
        song2.stop();
        if(song1_status==false)
        {
            song1.play();
            document.getElementById("song").innerHTML="playing Harry Potter theme song ";
        }
    }

    if(scoreLeftWrist>0.2)
    {
        circle(leftWristx,leftWristy,20);
        song1.stop();
        if(song2_status==false)
        {
            song2.play();
            document.getElementById("song").innerHTML="playing Peter Parker song ";
        }
    }
}

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function play()
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}
function modelLoaded()
{
    console.log("PoseNet Is Initialised");
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = "+scoreRightWrist+"scoreLeftWrist = "+scoreLeftWrist);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("leftWristx = "+leftWristx+" leftWristy = "+leftWristy);
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("rightWristx = "+rightWristx+" rightWristy = "+rightWristy);

    }
}
