import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// actions
import { setActiveTab } from '../../../../actions/dashboardActions';

/**
 * A button (Navigation tab) for the Dashboard's Sidebar component.
 * A slug of the property 'title' is used for the corresponding path it routes to.
 * Display text is hidden if the Dashboard parent is collpased.
 *
 * @property {String} title                 - Display text for the button. (and path).
 * @property {String} icon                  - Name of icon (material icons courtesy google).
 * @property {String/Boolean} isCollapsed   - state of the Dashboard parent Component.
 * @property {Object} match                 - Router (react-router-dom) property containing current url and router path
 */
class SideBarButton extends Component {
  /**
   * Render the React Componeent
   * @returns {JSX}  - Code to be rendered
   */
  render() {
    // get values from propeties passed
    const { title, icon, match } = this.props; //use withRouter instead of passing match.. // import { withRouter } from 'react-router-dom';

    // convert name to route path
    const path = title.replace(' ', '-').toLowerCase();

    // get activeTab from dashboard in state
    const { activeTab } = this.props.dashboard;

    // collapse state of the sidebar from state
    const { collapseStringValue } = this.props.dashboard;
    const collapse = collapseStringValue === 'true'; // convert string to boolean

    // link classnames
    const linkClassNames = 'd-flex flex-row align-items-center nav-link';

    return (
      <Link
        className={linkClassNames + (activeTab === path ? ' active' : '')}
        to={`${match.url}/${path}`}
        aria-label={'Go to ' + title}
        onClick={() => {
          // set this link to active
          this.props.setActiveTab(path);
        }}
      >
        <i className='material-icons white mr-2'>{icon}</i>
        <span
          className={
            // hide content using bootstrap on md size or lower
            // add expanded class if not in collapsed state, this will run expand animation once (css)
            'd-none d-md-inline-block' + (collapse ? '' : ' expanded')
          }
        >
          {collapse ? '' : title}
        </span>
      </Link>
    );
  }
}

// Map Proptypes for typechecking
SideBarButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired
};

// Map state to props
const mapStateToProps = state => ({
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  { setActiveTab }
)(SideBarButton);
