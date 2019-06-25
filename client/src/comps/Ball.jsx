import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { dbUpdate, getAllUsers } from '../actions/actions';

class Ball extends React.Component {
  constructor() {
    super();
    this.state = {
      allCookies: document.cookie,
      cookiesArr: document.cookie.split(/=|; /),
      colors: ['red', 'blue'],
      ballColor: '',
      cookieUpdated: false,
    };
  }

  componentWillMount() {
    if (this.state.cookieUpdated === false) {
      // if no cookie has been stored then randomly pick a ball color and store it
      if (this.state.allCookies.indexOf('ballColor') === -1) {
        // random between 1 and 0
        const color = Math.floor(Math.random() * 2);
        const ballColor = this.state.colors[color];

        // now store ball color in cookies
        const currDate = new Date();
        const expDate = new Date(currDate.getTime() + 1 * 60000).toUTCString();

        const ballColorCookie = 'ballColor=' + ballColor + ';expires=' + expDate;
        document.cookie = ballColorCookie;

        // update state
        this.setState({
          ballColor,
          cookieUpdated: true,
        });

        // otherwise get ballColor from cookies
      } else {
        const colorCookieIndex = this.state.cookiesArr.indexOf('ballColor');
        const ballColor = this.state.cookiesArr[colorCookieIndex + 1];

        this.setState({
          ballColor,
          cookieUpdated: true,
        });
      }
    }
  }

  componentDidMount() {
    if (this.props.user.dbUpdated === false) {
      console.log(this.state.ballColor);
      this.props.dbUpdate(this.state.ballColor);
    }
  }

  db_loader = () => {
    const promise = new Promise((resolve, reject) => {
      this.props.getAllUsers();
    });
    // fetch all db data / all users
    // parse into csv
    // allow file transfer
    // in future would adjust redux to dispatch loading action then move to getAllUsersSuccess action type... for conditionally render download button if data is in props
  };

  csv_download = () => {
    let csv = 'IP Address,Red Count,Blue Count\n';
    this.props.user.allUserData.data.map(user => {
      const nextUser = `${user.ip},${user.redCount},${user.blueCount}\n`;
      csv += nextUser;
    });
    const downloadElement = document.getElementById('doclink');
    downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    downloadElement.target = '_blank';
    downloadElement.download = 'users.csv';
    downloadElement.click();
  };

  render() {
    const imgSrc = 'images/' + this.state.ballColor + 'sphere.png';
    let downloadButton = null;
    let redCount = '';
    let blueCount = '';
    if (this.props.user.userData) {
      redCount = this.props.user.userData.data.redCount;
      blueCount = this.props.user.userData.data.blueCount;
    }
    if (this.props.user.allUserData) {
      downloadButton = <button onClick={this.csv_download}>Download Report as CSV</button>;
    }

    return (
      <div id="maindisplay">
        <h4>Color Count</h4>
        <table>
          <tbody>
            <tr>
              <td>You've viewed the red ball {redCount} times</td>
            </tr>
            <tr>
              <td>You've viewed the blue ball {blueCount} times</td>
            </tr>
          </tbody>
        </table>
        <img src={imgSrc} alt={this.state.ballColor} />
        <button onClick={this.db_loader}>Load Database Report</button>
        {downloadButton}
        <a id="doclink" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dbUpdate,
      getAllUsers,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ball);
