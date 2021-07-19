import React from 'react';
import AgoraRTC from "agora-rtc-sdk";
// import Call from './Components/Call'
import {Button,Paper} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom'
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useHistory } from 'react-router';
var rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {}
};

// Options for joining a channel
var option = {
    appID: "c9aff6b0da874e3683a6928b3f2280b0",
    channel: "lottery",
    uid: null,
    token: "006c9aff6b0da874e3683a6928b3f2280b0IAD7XLOw+JG+qExoHJ5ziuV7jQpxASJwvbyJImWfrQfsB4PuG7oAAAAAEAAApPzoitv1YAEAAQCK2/Vg",
    key: '',
    secret: '75b521836df24bfcb2ea45b62cbf18ba'
}

function joinChannel(role) {
    // Create a client
    rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
    // Initialize the client
    rtc.client.init(option.appID, function () {
        console.log("init success");

        // Join a channel
        rtc.client.join(option.token ?
            option.token : null,
            option.channel, option.uid ? +option.uid : null, function (uid) {
                console.log("join channel: " + option.channel + " success, uid: " + uid);
                rtc.params.uid = uid;
                if (role === "host") {
                    rtc.client.setClientRole("host");
                    // Create a local stream
                    rtc.localStream = AgoraRTC.createStream({
                        streamID: rtc.params.uid,
                        audio: true,
                        video: true,
                        screen: false,
                    })

                    // Initialize the local stream
                    rtc.localStream.init(function () {
                        console.log("init local stream success");
                        rtc.localStream.play("local_stream");
                        rtc.client.publish(rtc.localStream, function (err) {
                            console.log("publish failed");
                            console.error(err);
                        })
                    }, function (err) {
                        console.error("init local stream failed ", err);
                    });

                    rtc.client.on("connection-state-change", function (evt) {
                        console.log("audience", evt)
                    })


                }
                if (role === "audience") {
                    rtc.client.on("connection-state-change", function (evt) {
                        console.log("audience", evt)
                    })

                    rtc.client.on("stream-added", function (evt) {
                        var remoteStream = evt.stream;
                        var id = remoteStream.getId();
                        if (id !== rtc.params.uid) {
                            rtc.client.subscribe(remoteStream, function (err) {
                                console.log("stream subscribe failed", err);
                            })
                        }
                        console.log('stream-added remote-uid: ', id);
                    });

                    rtc.client.on("stream-removed", function (evt) {
                        var remoteStream = evt.stream;
                        var id = remoteStream.getId();
                        console.log('stream-removed remote-uid: ', id);
                    });

                    rtc.client.on("stream-subscribed", function (evt) {
                        var remoteStream = evt.stream;
                        var id = remoteStream.getId();
                        remoteStream.play("remote_video_");
                        console.log('stream-subscribed remote-uid: ', id);
                    })

                    rtc.client.on("stream-unsubscribed", function (evt) {
                        var remoteStream = evt.stream;
                        var id = remoteStream.getId();
                        remoteStream.pause("remote_video_");
                        console.log('stream-unsubscribed remote-uid: ', id);
                    })
                }
            }, function (err) {
                console.error("client join failed", err)
            })

    }, (err) => {
        console.error(err);
    });
}


const btn = { margin: 10, fontSize: '15px',fontFamily:'sans-serif', display: 'flex', padding: '20px' }
const paperStyle = { padding: 20, height: '150vh', width: "80%", margin: "40px auto" }
const heading = { textAlign: ' center' }
const link = { textDecoration: 'none', color: 'black' }

function leaveEventHost(params) {
    rtc.client.unpublish(rtc.localStream, function (err) {
        console.log("publish failed");
        console.error(err);
    })
    rtc.client.leave(function (ev) {
        console.log(ev)
    })
}

function leaveEventAudience(params) {
    rtc.client.leave(function () {
        alert("client leaves channel");
        //……
    }, function (err) {
        alert("client leave failed ", err);
        //error handling
    })
}


function LiveVideoStreaming(props) {
    const history=useHistory();
    console.log(props)
    return (
        <div>
            <Paper elevation={10} style={paperStyle}>
       < ArrowBackIcon onClick={()=>history.push('/')}/>
      <div className='liveBtn'>
            <Button style={btn} variant="outlined" color='Primary' onClick={() => joinChannel('host')}>Join Channel as Host <MeetingRoomOutlinedIcon/></Button>
            <Button style={btn} variant="outlined" color='Primary' onClick={() => joinChannel('audience')}>Join Channel as Audience <MeetingRoomOutlinedIcon/> </Button>
            <Button style={btn} variant="outlined" color='Secondary' onClick={() => leaveEventHost('host')}>Leave Event Host <ExitToAppOutlinedIcon/></Button>
            <Button style={btn} variant="outlined" color='Secondary' onClick={() => leaveEventAudience('audience')}>Leave Event Audience <ExitToAppOutlinedIcon/> </Button>
            </div>
            <div id="local_stream" className="local_stream" style={{ width: "500px", height: "400px" , marginLeft:'64px' , padding:'20px'}}></div>
            <div
                id="remote_video_"
                style={{ width: "500px", height: "400px" , marginLeft:'64px' , padding:'20px'  }}
            />
            </Paper>
            
        </div>
    );
}

export default LiveVideoStreaming;