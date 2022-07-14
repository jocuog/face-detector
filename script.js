const video = document.getElementById('video');
document.getElementById('emoji-express');
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}
// startVideo()

// video.addEventListener('play', () =>{
//     const canvas = faceapi.createCanvasFromMedia(video)
//     document.body.append(canvas)
//     const displaySize = {width: video.width, height: video.height}
//     faceapi.matchDimensions(canvas, displaySize)
//     setInterval(async () => {
//         const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//         const resizedDetections = faceapi.resizeResults(detections, displaySize)
//         canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//         faceapi.draw.drawDetections(canvas, resizedDetections)
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//         console.log(detections)
//     }, 100)
// })

video.addEventListener('play', () =>{
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {width: video.width, height: video.height}
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        const detectionsExpressions = detections[0].expressions
        // console.log(detectionsExpressions)
        const maxExpressions = Object.entries(detectionsExpressions).sort((x,y) => y[1] - x[1]) [0]
        console.log(maxExpressions)
        switch (maxExpressions[0]) {
            case 'neutral': 
                console.log('neutral expression');
                document.getElementById('emoji-express').innerHTML = '😐'
            break;
            case 'angry': 
                console.log('angry expression');
                document.getElementById('emoji-express').innerHTML = '😠'
            break;
            case 'disgusted': 
                console.log('disgusted expression');
                document.getElementById('emoji-express').innerHTML = '🤢'
            break;
            case 'fearful':
                console.log('fearful expression');
                document.getElementById('emoji-express').innerHTML = '😱'
            break;
            case 'happy': 
                console.log('happy expression');
                document.getElementById('emoji-express').innerHTML = '😁'
            break;
            case 'sad': 
                console.log('sad expression');
                document.getElementById('emoji-express').innerHTML = '😢'
            break;
            case 'surprised': 
                console.log('surprised expression');
                document.getElementById('emoji-express').innerHTML = '😲'
            break;
        }
    }, 100)
})