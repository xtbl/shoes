(function ($) {

    //temp data
    var contacts = [
  {
    "id": "hyperfranchise",
    "name": "Nike Zoom Hyper",
    "description": "OMG this shoe is amazing!",
    "image": "images/Nike_Zoom_Hyperfranchise_XD_01.jpg",
    "article_images": [
      {
        "id": "1",
        "image_path": "images/Nike_Zoom_Hyperfranchise_XD_01.jpg"
      },
      {
        "id": "2",
        "image_path": "images/Nike_Zoom_Hyperfranchise_XD_02.jpg"
      },
      {
        "id": "3",
        "image_path": "images/Nike_Zoom_Hyperfranchise_XD_03.jpg"
      }
    ],
    "stores": [
      {
        "id": "1",
        "name": "Cachos",
        "address": "SJO"
      }   
    ],
    "total_in_shelf": 0,
    "total_in_vault": 0,
    "price": 103.99
 },
  {
    "id": "maxhamlow",
    "name": "Nike Max H.A.M. Low",
    "description": "OMG this shoe is amazing!",
    "image": "images/Nike_Max_HAM_Low_01.jpg",
    "article_images": [
      {
        "id": "1",
        "image_path": "images/Nike_Max_HAM_Low_01.jpg"
      },
      {
        "id": "2",
        "image_path": "images/Nike_Max_HAM_Low_02.jpg"
      },
      {
        "id": "3",
        "image_path": "images/Nike_Max_HAM_Low_03.jpg"
      }
    ],
    "stores": [
      {
        "id": "1",
        "name": "Cachos",
        "address": "SJO"
      }   
    ],
    "total_in_shelf": 0,
    "total_in_vault": 0,
    "price": 85.99
  },
  {
    "id": "conversecoreox",
    "name": "Converse Core Ox",
    "description": "OMG this shoe is amazing!",
    "image": "images/Converse_Core_Ox_01.jpg",
    "article_images": [
      {
        "id": "1",
        "image_path": "images/Converse_Core_Ox_01.jpg"
      },
      {
        "id": "2",
        "image_path": "images/Converse_Core_Ox_02.jpg"
      },
      {
        "id": "3",
        "image_path": "images/Converse_Core_Ox_03.jpg"
      }
    ],
    "stores": [
      {
        "id": "1",
        "name": "Cachos",
        "address": "SJO"
      }   
    ],
    "total_in_shelf": 0,
    "total_in_vault": 0,
    "price": 50.00
 },
  {
    "id": "converseseasonal",
    "name": "Converse Seasonal",
    "description": "OMG this shoe is amazing!",
    "image": "images/Converse_Seasonal_01.jpg",
    "article_images": [
      {
        "id": "1",
        "image_path": "images/Converse_Seasonal_01.jpg"
      },
      {
        "id": "2",
        "image_path": "images/Converse_Seasonal_02.jpg"
      },
      {
        "id": "3",
        "image_path": "images/Converse_Seasonal_03.jpg"
      }
    ],
    "stores": [
      {
        "id": "1",
        "name": "Cachos",
        "address": "SJO"
      }   
    ],
    "total_in_shelf": 0,
    "total_in_vault": 0,
    "price": 50.00
  },
  {
    "id": "paciano",
    "name": "BRUNO MAGLI Paciano",
    "description": "OMG this shoe is amazing!",
    "image": "images/BRUNO_MAGLI_Paciano_01.jpg",
    "article_images": [
      {
        "id": "1",
        "image_path": "images/BRUNO_MAGLI_Paciano_01.jpg"
      },
      {
        "id": "2",
        "image_path": "images/BRUNO_MAGLI_Paciano_02.jpg"
      },
      {
        "id": "3",
        "image_path": "images/BRUNO_MAGLI_Paciano_03.jpg"
      }
    ],
    "stores": [
      {
        "id": "1",
        "name": "Cachos",
        "address": "SJO"
      }   
    ],
    "total_in_shelf": 0,
    "total_in_vault": 0,
    "price": 465.00
  },
  {
    "id": "madhandle",
    "name": "adidas Mad Handle",
    "description": "OMG this shoe is amazing!",
    "image": "images/adidas_Mad_Handle_01.jpg",
    "article_images": [
      {
        "id": "1",
        "image_path": "images/adidas_Mad_Handle_01.jpg"
      },
      {
        "id": "2",
        "image_path": "images/adidas_Mad_Handle_02.jpg"
      },
      {
        "id": "3",
        "image_path": "images/adidas_Mad_Handle_03.jpg"
      }
    ],
    "stores": [
      {
        "id": "1",
        "name": "Cachos",
        "address": "SJO"
      }   
    ],
    "total_in_shelf": 0,
    "total_in_vault": 0,
    "price": 80.00
    }
];

    //define product model
    var Contact = Backbone.Model.extend({
        defaults: {
            id: "/img/placeholder.png",
            name: "Default Shoe",
            description: "",
            article_images: [
              {
                "id": "1",
                "image_path": "images/adidas_Mad_Handle_01.jpg"
              }
            ],
            stores: [
              {
                "id": "1",
                "name": "Cachos",
                "address": "SJO"
              }   
            ],
            price: "0",
            total_in_shelf: "0",
            total_in_vault: "0",
            store_id: "0"
        }
    });

    //define directory collection
    var Directory = Backbone.Collection.extend({
        model: Contact
    });

    //define individual contact view
    var ContactView = Backbone.View.extend({
        tagName: "article",
        className: "contact-container span5 clearfix",
        template: _.template($("#contactTemplate").html()),
        editTemplate: _.template($("#contactEditTemplate").html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        events: {
            "click button.delete": "deleteContact",
            "click button.edit": "editContact",
            "click button.save": "saveEdits",
            "click button.cancel": "cancelEdit"
        },

        //delete a contact
        deleteContact: function () {
            var removedType = this.model.get("type").toLowerCase();

            //remove model
            this.model.destroy();

            //remove view from page
            this.remove();

            //re-render select if no more of deleted type
            if (_.indexOf(directory.getTypes(), removedType) === -1) {
                directory.$el.find("#filter select").children("[value='" + removedType + "']").remove();
            }
        },

        //switch contact to edit mode
        editContact: function () {
            this.$el.html(this.editTemplate(this.model.toJSON()));

            this.$el.find("input[type='hidden']").remove();
        },

        saveEdits: function (e) {
            e.preventDefault();

            var formData = {},
                prev = this.model.previousAttributes();

            //get form data
            $(e.target).closest("form").find(":input").not("button").each(function () {
                var el = $(this);
                formData[el.attr("class")] = el.val();
            });

            //use default photo if none supplied
            if (formData.photo === "") {
                delete formData.photo;
            }

            //update model
            this.model.set(formData);

            //render view
            this.render();

            //if model acquired default photo property, remove it
            if (prev.photo === "/img/placeholder.png") {
                delete prev.photo;
            }

            //update contacts array
            _.each(contacts, function (contact) {
                if (_.isEqual(contact, prev)) {
                    contacts.splice(_.indexOf(contacts, contact), 1, formData);
                }
            });
        },

        cancelEdit: function () {
            this.render();
        }
    });

    //define master view
    var DirectoryView = Backbone.View.extend({
        el: $("#contacts"),

        initialize: function () {
            this.collection = new Directory(contacts);
            
            //this.collection = new Directory({
            //    url: '../..storage/articles_admin.json'});
            console.log(this.collection);

            this.render();
            this.$el.find("#filter").append(this.createSelect());

            this.on("change:filterType", this.filterByType, this);
            this.collection.on("reset", this.render, this);
            this.collection.on("add", this.renderContact, this);
            this.collection.on("remove", this.removeContact, this);
        },

        render: function () {
            this.$el.find("article").remove();

            _.each(this.collection.models, function (item) {
                this.renderContact(item);
            }, this);
        },

        renderContact: function (item) {
            var contactView = new ContactView({
                model: item
            });
            this.$el.append(contactView.render().el);
        },

        getTypes: function () {
            return _.uniq(this.collection.pluck("name"), false, function (type) {
                return type.toLowerCase();
            });
        },

        createSelect: function () {
            var filter = this.$el.find("#filter"),
                select = $("<select/>", {
                    html: "<option value='all'>All</option>"
                });

            _.each(this.getTypes(), function (item) {
                var option = $("<option/>", {
                    value: item.toLowerCase(),
                    text: item.toLowerCase()
                }).appendTo(select);
            });

            return select;
        },

        //add ui events
        events: {
            "change #filter select": "setFilter",
            "click #add": "addContact",
            "click #showForm": "showForm"
        },

        //Set filter property and fire change event
        setFilter: function (e) {
            this.filterType = e.currentTarget.value;
            this.trigger("change:filterType");
        },

        //filter the view
        filterByType: function () {
            if (this.filterType === "all") {
                this.collection.reset(contacts);
                contactsRouter.navigate("filter/all");
            } else {
                this.collection.reset(contacts, { silent: true });

                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item) {
                        return item.get("type").toLowerCase() === filterType;
                    });

                this.collection.reset(filtered);

                contactsRouter.navigate("filter/" + filterType);
            }
        },

        //add a new contact
        addContact: function (e) {
            e.preventDefault();

            var formData = {};
            $("#addContact").children("input").each(function (i, el) {
                if ($(el).val() !== "") {
                    formData[el.id] = $(el).val();
                }
            });

            //update data store
            contacts.push(formData);

            //re-render select if new type is unknown
            if (_.indexOf(this.getTypes(), formData.type) === -1) {
                this.collection.add(new Contact(formData));
                this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
            } else {
                this.collection.add(new Contact(formData));
            }
        },

        removeContact: function (removedModel) {
            var removed = removedModel.attributes;

            //if model acquired default photo property, remove it
            if (removed.photo === "/img/placeholder.png") {
                delete removed.photo;
            }

            //remove from contacts array
            _.each(contacts, function (contact) {
                if (_.isEqual(contact, removed)) {
                    contacts.splice(_.indexOf(contacts, contact), 1);
                }
            });
        },

        showForm: function () {
            this.$el.find("#addContact").slideToggle();
        }
    });

    //add routing
    var ContactsRouter = Backbone.Router.extend({
        routes: {
            "filter/:type": "urlFilter"
        },

        urlFilter: function (type) {
            directory.filterType = type;
            directory.trigger("change:filterType");
        }
    });

    //create instance of master view
    var directory = new DirectoryView();

    //create router instance
    var contactsRouter = new ContactsRouter();

    //start history service
    Backbone.history.start();

} (jQuery));