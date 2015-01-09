define([
    'react',
    'jsx!react-components/classified/listItem',
], function (React, Classified) {
    return React.createClass({
        propTypes: {
            classifieds: React.PropTypes.any.isRequired
        },
        getInitialState: function () {
            return {
                classifieds: this.props.classifieds.toJSON()
            };
        },
        componentWillMount: function () {
            this.props.classifieds.on('change', this.listenToCollectionChange);
        },
        componentWillUnmount: function () {
            this.props.classifieds.off('change', this.listenToCollectionChange);
        },
        render: function () {
            var list = '';
            if (this.state.classifieds.length) {
              list = (
                    <ul className="classified-list small-block-grid-4">
                    {this.state.classifieds.map(function (classified) {
                        var active = classified.deleted_at ? 'is_deleted' : 'is_active';
                        var cl = "classified-list-item " + active;
                        return (
                            <li className={cl}>
                                <Classified classified={classified}/>
                            </li>
                        );
                    })}
                    </ul>
              );
            }
            else {
                list = (
                    <p>Ajoutez une nouvelle annonce pour commencer</p>
                )
            }
            return (
                <div>
                    <h1>Vos annonces <small>{this.state.classifieds.length} annonces</small></h1>
                    {list}
                </div>
            );
        },
        listenToCollectionChange: function () {
            this.setState({ classifieds: this.props.classifieds.toJSON() });
        }
    });
});
