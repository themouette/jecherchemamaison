define([
    'templates/classified/list',
    'templates/classified/listItem',
    'fossil/views/model',
    'fossil/views/collection'
], function (tpl, itemTpl, ModelView, CollectionView) {

    var ItemView = ModelView.extend({
        tagName: 'li',
        template: itemTpl,
        className: function () {
            var active = this.model.has('deleted_at') ? 'is_deleted' : 'is_active';
            return ['classified-list-item', active].join(' ');
        }
    });

    var List = CollectionView.extend({
        selector: 'ul.classified-list',
        template: tpl,
        ItemView: ItemView
    });


    return List;
});
