'use strict';


angular.module('myApp.services', [])
.service('getData', function ($http) {
        return {
            getAll: function () {
                return $http.get("/app/json/testData.json");
            }
        }
    })
.service('sharedProperties', function () {
    var template = {
    "dvd":
    { 
        "mainEntry":
        {
            "id": "number",
            "type": "string",
            "title": "string",
            "subtitle": "string",
            "author": "string",
            "summary": "string",
            "runtime": "string",
            "discourseDate": "string",
            "s3URL": "string",
            "tracks": "array",
            "active": "bool"
        },
        "trackEntry":
        {
            "trackID": "number",
            "trackNumber": "number",
            "trackName": "string",
            "trackTime": "string",
            "filename": "string"  
        },
        "newEntry":
        {
            "id": 1000,
            "type": "dvd",
            "title": "No title provided",
            "subtitle": "No subtitle provided",
            "author": "No author provided",
            "summary": "No summary provided",
            "runtime": "00:00:00",
            "discourseDate": "0000-00-00",
            "s3URL": "No s3url provided",
            "tracks": [],
            "active": false
        },
        "newTrack":
        {
            "trackID": 1000,
            "trackNumber": 100,
            "trackName": "No track name provided",
            "trackTime": "00:00:00",
            "filename": "No file name provided"  
        }
    },
    "cd":
    { 
        "mainEntry":
        {
            "id": "number",
            "type": "string",
            "title": "string",
            "subtitle": "string",
            "author": "string",
            "summary": "string",
            "runtime": "string",
            "discourseDate": "string",
            "s3URL": "string",
            "tracks": "array",
            "active": "bool"
        },
        "trackEntry":
        {
            "trackID": "number",
            "trackNumber": "number",
            "trackName": "string",
            "trackTime": "string",
            "filename": "string"  
        },
        "newEntry":
        {
            "id": 1000,
            "type": "cd",
            "title": "No title provided",
            "subtitle": "No subtitle provided",
            "author": "No author provided",
            "summary": "No summary provided",
            "runtime": "00:00:00",
            "discourseDate": "0000-00-00",
            "s3URL": "No s3url provided",
            "tracks": [],
            "active": false
        },
        "newTrack":
        {
            "trackID": 1000,
            "trackNumber": 100,
            "trackName": "No track name provided",
            "trackTime": "00:00:00",
            "filename": "No file name provided"  
        }
    },
    "ebook":
    { 
        "mainEntry":
        {
            "id": "number",
            "type": "string",
            "title": "string",
            "subtitle": "string",
            "author": "string",
            "summary": "string",
            "runtime": "string",
            "discourseDate": "string",
            "s3URL": "string",
            "tracks": "array",
            "active": "bool"
        },
        "trackEntry":
        {
            "trackID": "number",
            "trackNumber": "number",
            "trackName": "string",
            "trackTime": "string",
            "filename": "string"  
        },
        "newEntry":
        {
            "id": 1000,
            "type": "ebook",
            "title": "No title provided",
            "subtitle": "No subtitle provided",
            "author": "No author provided",
            "summary": "No summary provided",
            "runtime": "00:00:00",
            "discourseDate": "0000-00-00",
            "s3URL": "No s3url provided",
            "tracks": [],
            "active": false
        },
        "newTrack":
        {
            "trackID": 1000,
            "trackNumber": 100,
            "trackName": "No track name provided",
            "trackTime": "00:00:00",
            "filename": "No file name provided"  
        }
    }


};
		var defaultItem = {
        "id": 1,
        "type": "dvd",
        "title": "Transcend the Self-Knot of Fear",
        "subtitle": "",
        "author": "A Discourse Given by His Divine Presence, Adi Da Samraj",
        "summary": "When a questioner asks about the fearfulness he feels \"locked\" in his body, Avatar Adi Da Samraj responds that the root of fear is the same as the root of all suffering: the \"self-contraction\", or the activity of identification with a separate and mortal body.Rather than avoiding the fear inherent in the body, Adi Da Samraj Calls us to understand and transcend the self-knot in the Divine Condition that is Always Already the Case.",
        "runtime": "01:00:00",
        "discourseDate": "2004-08-13",
        "s3URL": "TSKFear",
        "tracks": [
            {
                "trackID": 367,
                "trackNumber": 1,
                "trackName": "The Significance of Fear",
                "trackTime": "00:10:23",
                "filename": "TSKFear.mp4"
            },
            {
                "trackID": 368,
                "trackNumber": 2,
                "trackName": "Meditation Techniques Don't Touch Fear",
                "trackTime": "00:11:37",
                "filename": "TSKFear.mp4"
            },
            {
                "trackID": 369,
                "trackNumber": 3,
                "trackName": "There Is No Fear in the Divine Condition",
                "trackTime": "00:10:18",
                "filename": "TSKFear.mp4"
            },
            {
                "trackID": 390,
                "trackNumber": 4,
                "trackName": "Fear and the Two-Armed Form of the Master",
                "trackTime": "00:11:09",
                "filename": "TSKFear.mp4"
            },
            {
                "trackID": 391,
                "trackNumber": 5,
                "trackName": "The Real \"Now\" Is Beyond \"Point of View\"",
                "trackTime": "00:11:51",
                "filename": "TSKFear.mp4"
            },
            {
                "trackID": 392,
                "trackNumber": 6,
                "trackName": "Sacred Sightings of Avatar Adi Da Samraj",
                "trackTime": "00:03:34",
                "filename": "TSKFear.mp4"
            }
        ],
        "active": "1"
    };
    var item = defaultItem;

        return {
            getTemplate: function(){
                return template;
            },
            getEditItem: function () {
                return item;
            },
            setEditItem: function(newEditItem){
            	item = newEditItem;
            }

        }
    });

