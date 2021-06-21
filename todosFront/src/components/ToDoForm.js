import React from 'react'
import ToDoLi from './ToDoLi.js'

const styles = {
    paragraph: {
        fontStyle: 'italic'
    },
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
    input: {
        outline: 'none'
    }
}

export default class toDoForm extends React.Component {
    constructor(props) {
        super(props) // вызывает родительский конструктор
        this.state = {
            input: '',
            items: [],
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        // console.log(this.props.remove)
        // console.log(this.todos)
        console.log(this.props.todos.length, "2") 
    }
    onChange(e) {
        this.setState({input: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault(); // чтобы не обновлялась страница
        let newItem = {
            // id: parseInt(Math.random().toString(10).substr(0, 7)*1000000000),
            id: this.props.todos.length,
            body: this.state.input,
        }
        if(this.state.input) {
            this.setState({
                input: this.state.input,
                items: [...this.state.items, newItem],
            });   
            this.setState({
                input: ''
            }); 
        }  
    }

    onDelete(id) {
        this.setState({items: this.state.items.filter((item) => item.id !== id)});  
    }

    

    render() {
        return (
            <div className="card">
                <form onSubmit={this.onSubmit} className="d-flex justify-content-center mt-4">
                    <input type="text" value={this.state.input} onChange={this.onChange}
                    className="border shadow-sm mx-2 p-2" placeholder="Введите заметку..."
                    style={styles.input}
                    />
                    <button type="submit" className="btn btn-secondary shadow-sm">Сохранить</button>
                </form>
                <p className="text-center pt-4" style={styles.paragraph}>{this.state.input}</p>
                
                <ul className="list-group">
                    {this.props.todos.map(todo => 
                    <li className="list-group-item list-group-item-dark text-center">{todo.title}
                        <button style={styles.deleteItem} className="item-delete" onClick={() => this.props.remove(todo.id)}>
                            &times;
                        </button>
                    </li>
                    )}
                    {this.state.items.map((item, index) => {
                        return (
                            <>
                            {console.log(item.body)}
                            <ToDoLi key={index} item={item.body} addTask={this.props.addTask(item.body)} index={index} id={item.id} onDelete={this.onDelete} todos={this.props.todos}/>
                            </>
                        )
                    })}
                </ul>
            </div>
        )
    }
}