'use strict';


angular.module('myApp.sharedAssets', [])
.factory('dataModel', function ($http) {
    var editItem = null, template, resolved = false;

    var domstorage=window.localStorage || (window.globalStorage? globalStorage[location.hostname] : null);
    if(domstorage && domstorage.editItem && domstorage.editItem != "undefined"){
        editItem = JSON.parse(domstorage.editItem);    
    }
    var promise = $http.get("/admin/shared/templates.json").
    then(function(temp){
        template = temp.data;
        resolved=true;
    })


    


    return {
    promise: promise,
    resolved: resolved,
    getItems: function () {
        var array = [];
        var req = {
           method: 'GET',
           url: '../api_v2.0/cds/',
           headers: {
             'x-adl-admin-auth': 271828
            }
         }
        return $http(req)
            .then( function(payload) { 
                var cdarray = payload.data.Content;
                for(var i =0; i<cdarray.length; i++){
                    cdarray[i].type="cd";
                }

                array.push.apply(array, cdarray);

                req.url = '../api_v2.0/dvds/';
                return $http(req);
            })
            .then( function(payload) { 
                var dvdarray = payload.data.Content;
                for(var i =0; i<dvdarray.length; i++){
                    dvdarray[i].type="dvd";
                }

                array.push.apply(array, dvdarray);

                // console.log(array);
                return array;
            });
    },
    getPubStruct: function(){
        return $http.get("/admin/shared/testPublicationStructure.json");
    },
    getTemplate: function(){
        return template;
    },
    getEditItem: function () {
        return editItem;
    },
    setEditItem: function(newEditItem){
        editItem = newEditItem;
        if(domstorage){
            domstorage.editItem= JSON.stringify(editItem);
        } 
    },
    updateItem: function(item, updates){
         if(domstorage){
            domstorage.editItem=JSON.stringify(item);
        } 
        var type = item.type;
            // delete item.type;
            updates.uuid = item.uuid;
            var req = {
               method: 'PUT',
               url: '../api_v2.0/'+type + 's/' + item.uuid,
               headers: {
                 'x-adl-admin-auth': 271828
                },
                data: updates
            }
            return $http(req).then(function(payload){
                var item = payload.data.Content;
                item.type = type;
                if(domstorage){
                    domstorage.editItem=JSON.stringify(item);
                } 
                return item;
            }); 

        // return $http.post('/updateItem', {id:item.id, updates:updates});
    },
    updatePubStruct: function(newPubStruct){
        return $http.post('/updatePubStruct', newPubStruct);
    },
    addNewItem: function(newItem){
        var type = newItem.type;
            delete newItem.type;
            var req = {
               method: 'POST',
               url: '../api_v2.0/' + type + 's/',
               headers: {
                 'x-adl-admin-auth': 271828
                },
                data: newItem
            }
            return $http(req).then(function(payload){
                var item = payload.data.Content
                item.type=type;
                if(domstorage){
                    domstorage.editItem=JSON.stringify(item);
                } 
                return item;
            });
    },
    getItem: function(item){
            var type = item.type;
            // delete item.type;
            var req = {
               method: 'GET',
               url: '../api_v2.0/' + type +'s/' + item.uuid,
               headers: {
                 'x-adl-admin-auth': 271828
                }
            }
            return $http(req); 
        
        // return $http({url: '/getItem', 
        //     method: "GET",
        //     params: {id: id}
        // });
    },
    deleteItem: function(item){

        if(domstorage && domstorage.editItem.uuid == item.uuid){
            domstorage.removeItem("editItem");
        } 
        var type = item.type;
            // delete item.type;
            var req = {
               method: 'DELETE',
               url: '../api_v2.0/' + type + 's/' + item.uuid,
               headers: {
                 'x-adl-admin-auth': 271828
                }
            }
            return $http(req); 
        // return $http({url: '/deleteItem', 
        //     method: "GET",
        //     params: {id: id}
        // });
    },
    getEditItemOrder: function(type){
        return template[type].itemOrder;
    }
  

}
})
.factory('recursionHelper', ['$compile', function($compile){
    return {
        /**
         * Manually compiles the element, fixing the recursion loop.
         * @param element
         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
         * @returns An object containing the linking functions.
         */
         compile: function(element, link){
            // Normalize the link parameter
            if(angular.isFunction(link)){
                link = { post: link };
            }

            // Break the recursion loop by removing the contents
            var contents = element.contents().remove();
            var compiledContents;
            return {
                pre: (link && link.pre) ? link.pre : null,
                /**
                 * Compiles and re-adds the contents
                 */
                 post: function(scope, element){
                    // Compile the contents
                    if(!compiledContents){
                        compiledContents = $compile(contents);
                    }
                    // Re-add the compiled contents to the element
                    compiledContents(scope, function(clone){
                        element.append(clone);
                    });

                    // Call the post-linking function, if any
                    if(link && link.post){
                        link.post.apply(null, arguments);
                    }
                }
            };
        }
    };
}])
;

