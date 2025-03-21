import React from 'react'
import { useParams } from 'react-router-dom'
import { APP_ID, SERVER_SECRET } from './constant';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function VideoCall() {

    const { id } = useParams();
    const roomID = id;
    let myMeeting = async (element) => {

        const appID = APP_ID;
        const serverSecret = SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Math.random().toString(), Date.now().toString());

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        roomID,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
        });
    };


    return (
        <div ref={myMeeting}></div>
    )
}

export default VideoCall;