import React, { Component } from 'react';
import './pwa.dialog.less';

export default class Dialog extends Component {
    state = {
        dialog: 'ss'
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    toggleAddDialog = visible => {
        if (visible) {
          this.dialog.classList.add('dialog-container--visible');
        } else {
          this.dialog.classList.remove('dialog-container--visible');
        }
    }

    show = () => {
        this.toggleAddDialog(true);
    }

    hide = () => {
        this.toggleAddDialog(false);
    }

    add = () => {
        if (this.props.onAdd) {
            this.props.onAdd();
        }
        this.hide();
    }

    cancel = () => {
        this.hide();
    }

    renderDialog = () => {
        return  <div className="dialog-container" ref={el => this.dialog = el}>
                    <div className="dialog">
                    <div className="dialog-title">Add new city</div>
                    <div className="dialog-body">
                        <select id="selectCityToAdd">
                        <option value="2357536">Austin, TX</option>
                        <option value="2367105">Boston, MA</option>
                        <option value="2379574">Chicago, IL</option>
                        <option value="2459115">New York, NY</option>
                        <option value="2475687">Portland, OR</option>
                        <option value="2487956">San Francisco, CA</option>
                        <option value="2490383">Seattle, WA</option>
                        </select>
                    </div>
                    <div className="dialog-buttons">
                        <button id="butAddCity" className="button" onClick={this.add}>Add</button>
                        <button id="butAddCancel" className="button" onClick={this.cancel}>Cancel</button>
                    </div>
                    </div>
                </div>;
    }

    render() {
        return this.renderDialog()
    }
}