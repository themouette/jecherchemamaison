define([
    'templates/classified/list',
    'templates/classified/listItem',
    'fossil/views/model',
    'fossil/views/collection'
], function (tpl, itemTpl, ModelView, CollectionView) {

    var ItemView = ModelView.extend({
        tagName: 'li',
        template: itemTpl
    });

    var List = CollectionView.extend({
        selector: 'ul.classified-list',
        template: tpl,
        ItemView: ItemView
    });


    return List;
});
