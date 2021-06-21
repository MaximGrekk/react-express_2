import React, { Component } from 'react'

const styles = {
    deleteItem: {
        marginLeft: '25px',
        // padding: '0px 7px 3px',
        width: '35px',
        height: '35px',
        textAlign: 'center',
        border: '1px solid silver',
        borderRadius: '50%',
        cursor: 'pointer',
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        color: 'white',
    },

}

export default class ToDoLi extends Component {
    // constructor(props) {
    //     super(props) // вызывает родительский конструктор
    // }
    render() {
        return (
            <li className="list-group-item list-group-item-dark text-center" >
                {this.props.item} 

                <button style={styles.deleteItem} className="item-delete" onClick={() => this.props.onDelete(this.props.id)}>
                     &times;
                </button>

            </li>
        )
    }
}