(function ($) {

    //temp data until json save works
    var articles = [
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
    var Article = Backbone.Model.extend({
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
        model: Article
    });

    //define individual Article view
    var ArticleView = Backbone.View.extend({
        tagName: "article",
        className: "article-container span5 clearfix",
        template: _.template($("#articleTemplate").html()),
        editTemplate: _.template($("#articleEditTemplate").html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        events: {
            "click button.delete": "deleteArticle",
            "click button.edit": "editArticle",
            "click button.save": "saveEdits",
            "click button.cancel": "cancelEdit"
        },

        //delete an article
        deleteArticle: function () {
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

        //switch Article to edit mode
        editArticle: function () {
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

            //update articles array
            _.each(articles, function (article) {
                if (_.isEqual(article, prev)) {
                    articles.splice(_.indexOf(articles, article), 1, formData);
                }
            });
        },

        cancelEdit: function () {
            this.render();
        }
    });

    //define master view
    var DirectoryView = Backbone.View.extend({
        el: $("#articles"),

        initialize: function () {
            this.collection = new Directory(articles);
            
            //this.collection = new Directory({
            //    url: '../..storage/articles_admin.json'});
            console.log(this.collection);

            this.render();
            this.$el.find("#filter").append(this.createSelect());

            this.on("change:filterType", this.filterByType, this);
            this.collection.on("reset", this.render, this);
            this.collection.on("add", this.renderArticle, this);
            this.collection.on("remove", this.removeArticle, this);
        },

        render: function () {
            this.$el.find("article").remove();

            _.each(this.collection.models, function (item) {
                this.renderArticle(item);
            }, this);
        },

        renderArticle: function (item) {
            var articleView = new ArticleView({
                model: item
            });
            this.$el.append(articleView.render().el);
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
            "click #add": "addArticle",
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
                this.collection.reset(articles);
                articlesRouter.navigate("filter/all");
            } else {
                this.collection.reset(articles, { silent: true });

                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item) {
                        return item.get("type").toLowerCase() === filterType;
                    });

                this.collection.reset(filtered);

                articlesRouter.navigate("filter/" + filterType);
            }
        },

        //add a new article
        addArticle: function (e) {
            e.preventDefault();

            var formData = {};
            $("#addArticle").children("input").each(function (i, el) {
                if ($(el).val() !== "") {
                    formData[el.id] = $(el).val();
                }
            });

            //update data store
            articles.push(formData);

            //re-render select if new type is unknown
            if (_.indexOf(this.getTypes(), formData.type) === -1) {
                this.collection.add(new Article(formData));
                this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
            } else {
                this.collection.add(new Article(formData));
            }
        },

        removeArticle: function (removedModel) {
            var removed = removedModel.attributes;

            //if model acquired default photo property, remove it
            if (removed.photo === "/img/placeholder.png") {
                delete removed.photo;
            }

            //remove from articles array
            _.each(articles, function (article) {
                if (_.isEqual(article, removed)) {
                    articles.splice(_.indexOf(articles, article), 1);
                }
            });
        },

        showForm: function () {
            this.$el.find("#addArticle").slideToggle();
        }
    });

    //add routing
    var ArticlesRouter = Backbone.Router.extend({
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
    var articlesRouter = new ArticlesRouter();

    //start history service
    Backbone.history.start();

} (jQuery));