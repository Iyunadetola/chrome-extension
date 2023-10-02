console.log('Hi, i have been injected')

var recorder = null

function onAccessApproved(stream){
recorder = new MediaRecorder(stream)

recorder.start();

recorder.onstop = function (){
    stream.getTracks().forEach(function(track){
        if(track.readystate === "live"){
            track.stop()
        }
    })
}

recorder.ondataavailable = function (event){
    let recordedBlob = event.data
    let url = URL.createObjectURL(recordedBlob)

    let a = document.createElement('a')

    a.style.display = "none"
    a.href = url
    a.download = "screen-recording.webm"

    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)

    URL.revokeObjectURL(url)
}

}

chrome.runtime.onMessage.addListener( (message, sender, sendResponse)=>{
    if ( message.action === "record_request" ){
        console.log("record request")

        sendResponse(`processed: ${message.action}`)

        navigator.mediaDevices.getDisplayMedia({
            audio:true,
            video: {
                width: 999999999,
                height: 999999999
            }
        }).then((stream)=>{
            onAccessApproved(stream)
        })
    }

if (message.action  === "stopVideo" ){
    console.log("stop  video")

    sendResponse(`processed: ${message.action}`)
    if (!recorder) return console.log("no recorder")

    recorder.stop()

}

} )