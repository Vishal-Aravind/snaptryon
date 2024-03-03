import {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit'

(async function(){
    var cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA5NDgzMTcyLCJzdWIiOiJjMjhlZDBlYy1iYTkzLTQ1NDQtOGQzYi1kMjc4M2QxMDdjZWZ-U1RBR0lOR34yZDJlMmRlMC03ZmZmLTRmN2QtYWQ2Mi0wMjNjYTgzMDBkMmIifQ.Y3SryOrW6ou-vtze8rraT32ZupDBC-3fvk0tEHms0rk'})

    const session = await cameraKit.createSession()
    document.getElementById('canvas').replaceWith( session.output.live)

    const {lenses} = await cameraKit.lensRepository.loadLensGroups(['fd453118-3013-4a3a-965d-acf1c4ef1803'])

    session.applyLens(lenses[0])
    let mediaStream = await navigator.mediaDevices.getUserMedia({ video: {
        facingMode:'environment'
    }});

    const source = createMediaStreamSource(
        mediaStream, {
            transform: Transform2D.MirrorX,
            cameraType: 'front'
        }
    )

    await session.setSource(source)

    session.source.setRenderSize(window.innerWidth, window.innerHeight);

    session.play()
})();