'use strict';


angular.module('myApp.sharedAssets', [])
.factory('dataModel', function ($http) {
    var editItem, template, resolved = false;


    var promise = $http.get("/getTemplate").
    then(function(temp){
        template = temp.data;
        return $http.get("/getDefaultItem");
    }).
    then(function(item){
        editItem = item.data;
        resolved=true;
    });



    return {
        promise: promise,
        resolved: function(){
            return resolved;
        },
        getAll: function () {
            // return $http.get("/app/shared/testData.json");
            return $http.get("/getAll");
        },
        getPubStruct: function(){
            return $http.get("/getPubStruct");
        },
        getTemplate: function(){
            return template;
        },
        getEditItem: function () {
            return editItem;
        },
        setEditItem: function(newEditItem){
            editItem = newEditItem;
        },
        updateItem: function(id, updates){
            return $http.post('/updateItem', {id:id, updates:updates});
        },
        updatePubStruct: function(newPubStruct){
            return $http.post('/updatePubStruct', newPubStruct);
        },
        addNewItem: function(newItem){
            return $http.post('/addNewItem', newItem);
        },
        getItem: function(id){
            return $http({url: '/getItem', 
                method: "GET",
                params: {id: id}
            });
        },
        deleteItem: function(id){
            return $http({url: '/deleteItem', 
                method: "GET",
                params: {id: id}
            });
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

