function checkForContent(obj) {
    if(obj.text) {
        return obj.text;
    } 
    else if(obj.text === null) {
        return obj.story_share;
    }
    else if(obj.media) {
        return obj.media;
    }
    else if(obj.animated_media_images) {
        return obj.animated_media_images.fixed_height_still.url;
    }
    return obj.heart;
}
function getConvoNumber(json, part) {
    let x = [];
    for(let i = 0; i < json.length; i++) {
        if(json[i].participants.sort().join("") === part.sort().join("")) {
            x.push(i);
        }
    }
    return x;
}
function getSortedMessages(json, chatParticipants) {
    let result = [];
    let convo = getConvoNumber(json, chatParticipants);
    for(let i = 0; i < convo.length; i++) {
        for(let j = 0; j < json[convo[i]].conversation.length; j++) {
            if(json[convo[i]].conversation[j].text || json[convo[i]].conversation[j].animated_media_images || json[convo[i]].conversation[j].heart || json[convo[i]].conversation[j].media) {
                let content = checkForContent(json[convo[i]].conversation[j]);
                result.push(`<${json[convo[i]].conversation[j].created_at.split("T")[0].split("-").reverse().join("/")} ${json[convo[i]].conversation[j].created_at.split("T")[1].split(".")[0]}> ${json[convo[i]].conversation[j].sender}: ${content}`);    
            }
        }
    }
    return result;
}
function getMessagesObject(json, chatParticipants) {
    let result = [];
    let convo = getConvoNumber(json, chatParticipants);
    for(let i = 0; i < convo.length; i++) {
        for(let j = 0; j < json[convo[i]].conversation.length; j++) {
            if(json[convo[i]].conversation[j].text || json[convo[i]].conversation[j].animated_media_images || json[convo[i]].conversation[j].heart || json[convo[i]].conversation[j].media) {
                let content = checkForContent(json[convo[i]].conversation[j]);
                result.push({author: json[convo[i]].conversation[j].sender, content: content, date: json[convo[i]].conversation[j].created_at})
            }
        }
    }
    return result;
}
function getChats(json) {
    let result = [];
    for(let i = 1; i < json.length; i++) {
        if(json[i].participants.join("") !== json[i-1].participants.join("")) {
            result.push(json[i-1].participants);
        }
    }
    return result;
}
function getNumberOfMessages(json, chatParticipants, authors = chatParticipants) {
    let result = 0;
    let convo = getConvoNumber(json, chatParticipants);
    for(let i = 0; i < convo.length; i++) {
        for(let j = 0; j < json[convo[i]].conversation.length; j++) {
            if((json[convo[i]].conversation[j].text || json[convo[i]].conversation[j].animated_media_images || json[convo[i]].conversation[j].heart || json[convo[i]].conversation[j].media) && authors.includes(json[convo[i]].conversation[j].sender)) {
                result++;
            }
        }
    }
    return result;
}
function getMessagesFrom(json, chatParticipants, authors = chatParticipants) {
    let result = [];
    let convo = getConvoNumber(json, chatParticipants);
    for(let i = 0; i < convo.length; i++) {
        for(let j = 0; j < json[convo[i]].conversation.length; j++) {
            if((json[convo[i]].conversation[j].text || json[convo[i]].conversation[j].animated_media_images || json[convo[i]].conversation[j].heart || json[convo[i]].conversation[j].media) && authors.includes(json[convo[i]].conversation[j].sender)) {
                let content = checkForContent(json[convo[i]].conversation[j]);
                result.push(`<${json[convo[i]].conversation[j].created_at.split("T")[0].split("-").reverse().join("/")} ${json[convo[i]].conversation[j].created_at.split("T")[1].split(".")[0]}> ${json[convo[i]].conversation[j].sender}: ${content}`);
            }
        }
    }
    return result;
}
function getMessagesObjectFrom(json, chatParticipants, authors = chatParticipants) {
    let result = [];
    let convo = getConvoNumber(json, chatParticipants);
    for(let i = 0; i < convo.length; i++) {
        for(let j = 0; j < json[convo[i]].conversation.length; j++) {
            if((json[convo[i]].conversation[j].text || json[convo[i]].conversation[j].animated_media_images || json[convo[i]].conversation[j].heart || json[convo[i]].conversation[j].media) && authors.includes(json[convo[i]].conversation[j].sender)) {
                let content = checkForContent(json[convo[i]].conversation[j]);
                result.push({author: json[convo[i]].conversation[j].sender, content: content, date: json[convo[i]].conversation[j].created_at});
            }
        }
    }
    return result;
}
module.exports = {
    getSortedMessages: getSortedMessages,
    getMessagesObject: getMessagesObject,
    getChats: getChats,
    getNumberOfMessages: getNumberOfMessages,
    getMessagesFrom: getMessagesFrom,
    getMessagesObjectFrom: getMessagesObjectFrom
}