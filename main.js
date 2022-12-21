song="";

rightWristScore=0;
leftWristScore=0;

leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

function preload(){
song=loadSound("music.mp3")
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video , modelLoaded);
    posenet.on('pose' ,gotposes);
}
function modelLoaded(){
    console.log('poseNet is initialised');
}
function gotposes(results){
    if(results.length>0){
        console.log(results);
        rightWristScore=results[0].pose.keypoints[10].score;
        leftWristScore=results[0].pose.keypoints[9].score;
        console.log('Left wrist score ='+leftWristScore+'Right wrist score ='+rightWristScore);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log('Left wrist X='+leftWristX+',Left wrist Y='+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log('Right wrist X='+rightWristX+',Right wrist Y='+rightWristY);
    }
}
function draw(){
    image(video,0,0,600,500);
    Fill("#FF0000");
    stroke("#FF0000");
    if(rightWristScore>0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML="Speed =0.5x";
            song.rate(0.5);
        }
        if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="Speed =1x";
            song.rate(1);
        }
        if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML="Speed =1.5x";
            song.rate(1.5);
        }
        if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML="Speed =2x";
            song.rate(2);
        }
        if( rightWristY >400){
            document.getElementById("speed").innerHTML="Speed =2.5x";
            song.rate(2.5);
        }
    }
    if( leftWristScore > 0.2){
        circle(leftWristX,leftWristY,20);
        InNumberLeftWristY=Number(leftWristY);
        remove_decimals=floor(InNumberLeftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume ="+volume;
        song.setvolume(volume);
    }
}
function play(){
    song.play();
    song.setvolume(1);
    song.rate(1);
}

