// let toggleVideoButton = document.querySelector('.VideoButton')
// let toggleAudioButton = document.querySelector('.AudioButton')
// let startRecording = document.querySelector('.startRecording')
// let close = document.querySelector('.CloseCircle')


// toggleVideoButton.addEventListener('click', console.log('clicked'))
// toggleAudioButton.addEventListener('click', console.log('clickeddddd'))
// startRecording.addEventListener('click', console.log('clickedddddeeeeeee'))




document.addEventListener("DOMContentLoaded", ()=>{

     let startRecording = document.querySelector('.startRecording')
    let close = document.querySelector('.CloseCircle')


startRecording.addEventListener( "click", ()=>{
    chrome.tabs.query({active: true, currentWindow: true },  function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "record_request"}, function(response){
            if (!chrome.runtime.lastError){
                console.log(response)
            } else{
                console.log(chrome.runtime.lastError, "error line 24")
            }
        })
    })
} )

close.addEventListener( "click", ()=>{
    chrome.tabs.query({active: true, currentWindow: true },  function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "stopVideo"}, function(response){
            if (!chrome.runtime.lastError){
                console.log(response)
            } else{
                console.log(chrome.runtime.lastError, "error line 38")
            }
        })
    })
} )

} )