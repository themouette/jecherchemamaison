define([
    'react',
    'react-components/helpers/urls'
], function (React, Urls) {

    return React.createClass({
        propTypes: {
            className:  React.PropTypes.string,
            classified: React.PropTypes.any.isRequired,
            action: React.PropTypes.string,
            children: React.PropTypes.string
        },

        getDefaultProperties: function () {
            return {
                action: 'show'
            };
        },

        render: function () {
            var url;
            switch (this.props.action) {
                case 'edit':
                    url = Urls.classifiedEdit(this.props.classified);
                    break;
                case 'show':
                default:
                    url = Urls.classifiedShow(this.props.classified);
            }

            var content = this.props.children ? this.props.children : this.props.classified.name;

            return (
                <a className={this.props.className} href={url}>{content}</a>
            );
        }
    });
});


