/**
 * Super Shoes
 *  
 * Shoe store. JavaScript, Backbone.js, Bootstrap.
 * Author: Cristobal Avila Dueñas
 * 2013
 * 
 * References:
 * add all references here.
 * backbone store
 * etc etc etc
 * 
 */
(function() {

    var Article = Backbone.Model.extend({})

    var ArticleCollection = Backbone.Collection.extend({
        model: Article,

        initialize: function(models, options) {
            this.url = options.url;
        },

        comparator: function(item) {
            return item.get('name');
        }
    });

    var Item = Backbone.Model.extend({
        update: function(amount) {
            this.set({'quantity': amount}, {silent: true});
            this.collection.trigger('change', this);
        },
        price: function() {
            console.log(this.get('article').get('name'), this.get('quantity'));
            return this.get('article').get('price') * this.get('quantity');
        }
    });

    var ItemCollection = Backbone.Collection.extend({
        model: Item,

        getOrCreateItemForArticle: function(article) {
            var i, 
            pid = article.get('id'),
            o = this.detect(function(obj) { 
                return (obj.get('article').get('id') == pid); 
            });
            if (o) { 
                return o;
            }
            i = new Item({'article': article, 'quantity': 0})
            this.add(i, {silent: true})
            return i;
        },

        getTotalCount: function() {
            // underscore reduce converts the list of values into a single value, memo is the initial state of the reduction
            return this.reduce(function(memo, obj) { 
                return obj.get('quantity') + memo; }, 0);
        },

        getTotalCost: function() {
            return this.reduce(function(memo, obj) { 
                return obj.price() + memo; }, 0);
        }
    });


    var _BaseView = Backbone.View.extend({
        parent: $('#main'),
        className: 'viewport',

        initialize: function() {
            this.el = $(this.el);
            this.el.hide();
            this.parent.append(this.el);
            return this;
        },

        hide: function() {
            if (this.el.is(":visible") === false) {
                return null;
            }
            // deferred to enhance callback
            promise = $.Deferred(_.bind(function(dfd) { 
                this.el.fadeOut('fast', dfd.resolve)}, this));
            return promise.promise();
        },

        show: function() {
            if (this.el.is(':visible')) {
                return;
            }       
            promise = $.Deferred(_.bind(function(dfd) { 
                this.el.fadeIn('fast', dfd.resolve) }, this))
            return promise.promise();
        }
    });


    var ArticleListView = _BaseView.extend({
        id: 'articlelistview',
        template: $("#store_index_template").html(),

        initialize: function(options) {
            this.constructor.__super__.initialize.apply(this, [options])
            this.collection.bind('reset', _.bind(this.render, this));
        },

        render: function() {
            this.el.html(_.template(this.template, 
                                    {'articles': this.collection.toJSON()}))
            return this;
        }
    });


    var ArticleView = _BaseView.extend({
        id: 'articleitemview',
        template: $("#store_item_template").html(),
        initialize: function(options) {
            this.constructor.__super__.initialize.apply(this, [options])
            this.itemcollection = options.itemcollection;
            this.item = this.itemcollection.getOrCreateItemForArticle(this.model);
            return this;
        },

        events: {
            "keypress .uqf" : "updateOnEnter",
            "click .uq"     : "update",
        },

        update: function(e) {
            e.preventDefault();
            this.item.update(parseInt(this.$('.uqf').val()));
        },
        
        updateOnEnter: function(e) {
            if (e.keyCode == 13) {
                return this.update(e);
            }
        },

        render: function() {
            this.el.html(_.template(this.template, this.model.toJSON()));
            return this;
        }
    });


    var CartWidget = Backbone.View.extend({
        el: $('.cart-info'),
        template: $('#store_cart_template').html(),
        
        initialize: function() {
            this.collection.bind('change', _.bind(this.render, this));
        },
        
        render: function() {
            this.$el.html(
                _.template(this.template, {
                    'count': this.collection.getTotalCount(),
                    'cost': this.collection.getTotalCost()
                })).animate({paddingTop: '30px'})
                .animate({paddingTop: '10px'});
        }
    });


    var SuperShoes = Backbone.Router.extend({
        views: {},
        articles: null,
        cart: null,

        routes: {
            "": "index",
            "item/:id": "article",
        },

        initialize: function(data) {
            this.cart = new ItemCollection();
            new CartWidget({collection: this.cart});

            this.articles = new ArticleCollection([], {
                url: 'storage/articles.json'});
            this.views = {
                '_index': new ArticleListView({
                    collection: this.articles
                })
            };
            $.when(this.articles.fetch({reset: true}))
                .then(function() { window.location.hash = ''; });
            return this;
        },

        hideAllViews: function () {
            return _.filter(
                _.map(this.views, function(v) { return v.hide(); }), 
                function (t) { return t != null });
        },

        index: function() {
            var view = this.views['_index'];
            $.when(this.hideAllViews()).then(
                function() { return view.show(); });
        },

        article: function(id) {
            var article, v, view;
            article = this.articles.detect(function(p) { return p.get('id') == (id); })
            view = ((v = this.views)['item.' + id]) || (v['item.' + id] = (
                new ArticleView({model: article, 
                                 itemcollection: this.cart}).render()));
            $.when(this.hideAllViews()).then(
                function() { view.show(); });
        }
    });

    $(document).ready(function() {
        new SuperShoes();
        Backbone.history.start();
    });

}).call(this);
