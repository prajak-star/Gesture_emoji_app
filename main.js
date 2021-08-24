var prediction1="";
var prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

Webcam.attach("camera");

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='whats' src='" + data_uri + "'>";
    });
    console.log("ml5 version=",ml5.version);
}

classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/DFfDgeOLK/model.json",indent);

function indent(){
    console.log("model loaded");
}

function identify(){
   var cap=document.getElementById("whats");
   classifier.classify(cap,getresult);
}

function speak(){
    console.log("going into the speak function 2.0");
   var spoke= window.speechSynthesis;
   say1=" first prediction is " + prediction1;
   say2=" second prediction is " + prediction2;
   var comb= new SpeechSynthesisUtterance(say1 + say2);
   spoke.speak(comb);
}

function getresult(error,result){
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        prediction1=result[0].label;
        prediction2=result[1].label;
        speak();
    }
}