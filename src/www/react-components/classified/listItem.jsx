define([
    'react',
    'react-components/helpers/helpers',
    'jsx!react-components/classified/link'
], function (React, Helpers, ClassifiedLink) {

    var currency = Helpers.currency;

    return React.createClass({
        propTypes: {
            classified: React.PropTypes.any.isRequired
        },

        render: function () {
            var c = this.props.classified;
            var style = {
                whiteSpace: "nowrap",
                overflow: "hidden"
            };
            var price = currency(c.price);

            return (
                <div title={c.name}>
                    <h5 className="classified-title" style={style}>{c.name}</h5>

                    <h6 className="text-center">{price}</h6>

                    <p className="classified-list-item-preview">
                        <ClassifiedLink classified={c} className="th">
                            <img src={c.images.length ? c.images[0] : ''} />
                        </ClassifiedLink>
                    </p>

                    <ul className="inline-list">
                        <li>
                            <ClassifiedLink classified={c}>Aller à l'annonce</ClassifiedLink>
                        </li>
                        <li>
                            <ClassifiedLink classified={c} action="edit">Modifier</ClassifiedLink>
                        </li>
                    </ul>
                </div>
            );
        }
    });
});

