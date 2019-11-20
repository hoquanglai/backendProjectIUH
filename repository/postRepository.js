var mongoose = require('mongoose');
var postSchema = require('../models/post.js');

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
var path = require('path');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'config/token.json';
var folderId = '';
var userRepository = require('../repository/userRepository.js');
postSchema.statics = {
    create: async function (post, file, cb) {
        const userCurrent = await userRepository.findOne({ _id: post.userId })

        fs.readFile('config/credentials.json', (err, content) => {
            if (err) {
                res.json({ error: err })
            }
            // Authorize a client with credentials, then call the Google Drive API.
            const newPost = post;
            const user = userCurrent;
            authorize(JSON.parse(content), uploadFile, file, (err, resultLink) => {
                if (resultLink.data) {
                    // console.log(resultLink.data.id);
                    const file = resultLink;
                    var postjson = {
                        topic: newPost.topic,
                        description: newPost.description,
                        startDate: newPost.startDate,
                        money: newPost.money,
                        numberOfDay: newPost.numberOfDay,
                        imageId: file.data.id,
                        userCreator: user._id,
                    };
                    var post = new this(postjson);
                    userCurrent.posts.push(post._id);
                    userRepository.createUserRelationship(userCurrent);
                    post.save();
                    cb(err, createPostWithUser(post, user))
                }
            });
        });
    },
    get: async function (query, start, end, cb) {
        const condition = {
            skip: parseInt(start, 10), limit: parseInt(end, 10)
        }
        const postList = await this.find(query, '', condition);
        const userList = await userRepository.find();
        const mapUser = {};
        userList.forEach(user => {
            mapUser[user._id] = user
        });

        const postListResult = [];
        postList.forEach(post => {

            const user = mapUser[post.userCreator];
            if (user) {
                const newPost = createPostWithUser(post, user);
                postListResult.push(newPost);
            }
        });
        console.log(postListResult);
        cb(null, postListResult)
    },
    deletePost: function (query, cb) {
        this.remove(query, cb);
    },
}

function createPostWithUser(post, user) {
    const newPost = {
        _id: post._id,
        topic: post.topic,
        description: post.description,
        startDate: post.startDate,
        money: post.money,
        numberOfDay: post.numberOfDay,
        imageId: post.imageId,
        userCreator: post.userCreator,
        createDate: post.createDate,
        userName: user.name,
        title: post.topic
    }
    return newPost
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, uploadFile, req, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            return getAccessToken(oAuth2Client, uploadFile);
        }
        oAuth2Client.setCredentials(JSON.parse(token));
        uploadFile(oAuth2Client, req, callback);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}


function uploadFile(auth, req, cb) {
    folderId = '1l7_lecyH0Aqo6AoIe_66m_IiNggxAMU0';
    const drive = google.drive('v3');
    const filesMetadata = {
        'name': req.file.originalname,
        parents: [folderId]
    }
    var dir = path.join(__dirname, '../', '');
    const image = dir + '\\' + req.file.originalname;
    const media = {
        mimeType: 'image/jpg',
        body: fs.createReadStream(image)
    }

    drive.files.create({
        auth: auth,
        resource: filesMetadata,
        media: media,
        fields: 'id'
    }, (err, file) => {
        if (err) {
            if (404 === err.code) {
                // createFolderGoogleDrive(auth, req, cb);
            }
        } else {
            cb(err, file);
            fs.unlinkSync(image)
        }
    })
}
function createFolderGoogleDrive(auth, req, cb) {
    const drive = google.drive('v3');
    var fileMetadata = {
        'name': 'post',
        'mimeType': 'application/vnd.google-apps.folder'
    };
    drive.files.create({
        auth: auth,
        resource: fileMetadata,
        fields: 'id'
    }, function (err, file) {
        if (err) {
            // Handle error
            console.error(err);
        } else {
            // console.log('Folder Id: ', file.data.id);
            folderId = file.data.id;
            uploadFile(auth, req, cb);
        }
    });
}


var postModel = mongoose.model('Post', postSchema);
module.exports = postModel