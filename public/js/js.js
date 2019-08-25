var meVectorJpg = require('../img/me_vector.jpg')
var meJpg = require('../img/me.jpg')
var floraSvg = require('../img/flora.svg')

writeHtml()
hideChat(0);

$('#prime').click(function () {
    console.log("prime cok")
    toggleFab()
});

$('#chatSend').keyup(function (event) {
    if (event.keyCode == 13 && !event.shiftKey) {
        sendOnClick()
    } else if (event.keyCode == 13 && event.shiftKey) {

    }
});

var message = $("#chatSend")
var chatConverse = $("#chat_converse")
var userFrom
var senderID = uuidv4()
var socket
initSocket()

//Toggle chat and links
function toggleFab() {
    $('.prime').toggleClass('zmdi-comment-outline');
    $('.prime').toggleClass('zmdi-close');
    $('.prime').toggleClass('is-active');
    $('.prime').toggleClass('is-visible');
    $('#prime').toggleClass('is-float');
    $('.chat').toggleClass('is-visible');
    $('.fab_chat').toggleClass('is-visible');
}

$('.fullscren').click(function (e) {
    console.log("fullscren di cilikno cok")
    $('#prime').toggleClass('hidden');
});

$('#chat_first_screen').click(function (e) {
    hideChat(1);
});

$('#fab_chat_send').click(function (e) {
    sendOnClick()
});

function sendOnClick() {
    msg = {
        from: userFrom,
        senderID: senderID,
        message: message.val()
    }

    if (message.val() != "") {
        if ($('.chat_login').css('display') == 'block') {
            // Chat First Screen
            hideChat(1);
            console.log("Chat First Screen")

            userFrom = message.val()
            msg.from = userFrom
            msg.message = userFrom

            appendChat(msg)

            msg.from = "bot-isdzulqor"
            msg.message = "Hey there! Thanks for hitting me Up. Just share something to me, please &#128513;"

            appendChat(msg)
            message.val('');
            return
        }

        socket.emit('new_message', msg)
        appendChat(msg)
        return
    }

    // inform to user need to fill the message
    console.log("isien cok from.e")
    message.val('');
}

function initSocket() {
    socket = io.connect('https://sambungan.herokuapp.com', {
        query: {
            token: 'token-iskandar'
        }
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        console.log("NEW_MESSAGE COK", data)
        appendChat(data)
    })
}

function appendChat(data) {
    console.log("data.From cok :", data.from)

    if (data.from == "isdzulqor" || data.from == "bot-isdzulqor") {
        if (data.from == "isdzulqor") {
            setOnline()
        }
        if (!isValidSender(data.senderID)) {
            return
        }

        var userMsgTemplate = `
            <span class="chat_msg_item chat_msg_item_admin">
                <div class="chat_avatar">
                    <img src="`+ meVectorJpg + `" />
                </div>
                `+ data.message + `
            </span>
            `
    } else {
        var userMsgTemplate = `
            <span class="chat_msg_item chat_msg_item_user">
            ` + message.val() + `
            </span>
            `
        message.val('');
    }

    chatConverse.append(userMsgTemplate)

    userChatElements = document.getElementsByClassName("chat_msg_item")
    lastUserChatElem = userChatElements[userChatElements.length - 1]
    elementHeight = parseInt(lastUserChatElem.offsetHeight)
    elementWidth = parseInt(lastUserChatElem.offsetWidth)
    marginTop = (elementHeight + 10) + "px"
    marginRight = "-" + elementWidth + "px"
    console.log("elementWidth cok: ", elementWidth)
    timestamp = new Date()
    if (data.from == "isdzulqor") {
        statusElem = '<span class="status_admin timeago" data-livestamp="' + timestamp + '" style="margin-top: ' + marginTop + ';margin-left: ' + marginRight + '"></span>'
    } else if (data.from == "bot-isdzulqor") {
        return
    } else {
        statusElem = '<span class="status timeago" data-livestamp="' + timestamp + '" style="margin-top: ' + marginTop + '; margin-right: ' + marginRight + '"></span>'
    }
    chatConverse.append(statusElem)
    updateScroll()
}

function isValidSender(sender) {
    if (sender == senderID) {
        return true
    }
    return false
}

function setOnline() {
    dot = document.getElementsByClassName("online")[0]
    dot.style["color"] = "#00ff0a";
}


$('#chat_fullscreen_loader').click(function (e) {
    $('.fullscreen').toggleClass('zmdi-window-maximize');
    $('.fullscreen').toggleClass('zmdi-window-restore');
    $('.chat').toggleClass('chat_fullscreen');
    $('.fab_chat').toggleClass('is-hide');
    $('.header_img').toggleClass('change_img');
    $('.img_container').toggleClass('change_img');
    $('.chat_header').toggleClass('chat_header2');
    $('.fab_chat_field').toggleClass('fab_chat_field2');
    $('.chat_converse').toggleClass('chat_converse2');

    if ($('.fullscreen').is('.zmdi-window-maximize')) {
        $('#prime').css('visibility', 'visible');
    } else {
        $('#prime').css('visibility', 'hidden');
    }
});

function hideChat(hide) {
    switch (hide) {
        case 0:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'block');
            $('.chat_fullscreen_loader').css('display', 'none');
            $('#chat_fullscreen').css('display', 'none');
            break;
        case 1:
            $('#chat_converse').css('display', 'block');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            break;
        case 2:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'block');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            break;
        case 3:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'block');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            break;
        case 4:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            $('#chat_fullscreen').css('display', 'block');
            break;
    }
}

function updateScroll() {
    var element = document.getElementsByClassName("chat_converse")[0];
    element.scrollTop = element.scrollHeight;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function writeHtml() {
    body = document.getElementsByTagName('body')[0]
    body.innerHTML = `
    <link rel="icon" href="`+ meVectorJpg + `">
    <div class="container only_container_zoom">
        <div class="row">
            <div class="col-lg-offset-4 col-lg-4 col-md-4 col-md-offset-4 col-lg-12 col-xs-12 custom_zoom">
                <div class="col-centered">
                    <section class="cards">
                        <article class="card card--1">
                            <div class="container_font ct-ic">

                            </div>
                            <div class="container_font ct-ic">
                                <div>
                                    <a target="_blank" href="https://github.com/isdzulqor"
                                        class="fab_ct fab fa-github"></a>&nbsp;&nbsp;
                                    <a target="_blank" href="https://www.linkedin.com/in/isdzulqor/"
                                        class="fab_ct fab fa-linkedin"></a>&nbsp;&nbsp;
                                    <a href="mailto:midzulqornain@gmail.com"
                                        class="fas_ct fas fa-envelope"></a>&nbsp;&nbsp;
                                    <a target="_blank" href="https://keriwilan.com/" class="fas_ct fas fa-rss"></a>
                                </div>
                            </div>
                            <div class="card__img" style="margin-top:-10%">
                            </div>
                            <a href="#" class="card_link">
                                <div class="card__img--hover"></div>
                            </a>
                            <div class="card__info" style="text-align: center">
                                <h3 class="card__title">Muhammad Iskandar Dzulqornain</h3>
                                <div class="card__by">Software Engineer</div>
                                <!-- <a href="#" class="card__author" title="author">Celeste Mills</a> -->
                            </div>
                            <div class="ornament_left">
                                <img src="`+ floraSvg + `">
                            </div>
                        </article>
                    </section>

                </div>
            </div>
            <!-- CHAT -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 only_chat_zoom">
                <div class="fab_chats custom_chat_zoom">
                    <div class="chat">
                        <div class="chat_header">
                            <div class="chat_option">
                                <div class="header_img">
                                    <img src="`+ meVectorJpg + `" />
                                </div>
                                <span id="chat_head">Muhammad Iskandar Dzulqornain &nbsp;<i
                                        class="fas fa-circle online"></i></span>
                                <!-- <span class="online">(Online)</span> -->
                                <span id="chat_fullscreen_loader" class="chat_fullscreen_loader"><i
                                        class="fullscreen zmdi zmdi-window-maximize"></i></span>

                            </div>

                        </div>
                        <div class="chat_body chat_login">
                            <!-- <a id="chat_first_screen" class="fab_chat"><i class="zmdi zmdi-arrow-right"></i></a> -->
                            <p>Please tell me who you are, your message will always be delivered to Me. It could be
                                containing your email or phone &#128522;</p>
                        </div>
                        <div id="chat_converse" class="chat_conversion chat_converse">
                            <span class="chat_msg_item chat_msg_item_admin">
                                <div class="chat_avatar">
                                    <img src="`+ meVectorJpg + `" />
                                </div>
                                Please tell me who you are, your message will always be delivered to Me. It could be
                                containing your email or phone &#128522;
                            </span>
                        </div>

                        <div class="fab_chat_field">
                            <!-- <a id="fab_chat_camera" class="fab_chat"><i class="zmdi zmdi-camera"></i></a> -->
                            <a id="fab_chat_send" class="fab_chat"><i class="zmdi zmdi-mail-send"></i></a>
                            <textarea id="chatSend" name="chat_message" placeholder="Send a message"
                                class="chat_field chat_message"></textarea>
                        </div>
                    </div>
                    <a id="prime" class="fab_chat"><i class="prime zmdi zmdi-comment-outline"></i></a>
                </div>
            </div>
        </div>
    </div>
    `
}