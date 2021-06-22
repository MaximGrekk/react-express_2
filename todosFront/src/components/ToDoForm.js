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
        this.completeTask = this.completeTask.bind(this);
        // console.log(this.props.remove)
        // console.log(this.todos)
    }
    onChange(e) {
        this.setState({input: e.target.value})
    }
    // onSubmit(e) {
    //     e.preventDefault(); // чтобы не обновлялась страница
    //     let newItem = {
    //         // id: parseInt(Math.random().toString(10).substr(0, 7)*1000000000),
    //         id: this.props.todos.length,
    //         body: this.state.input,
    //     }
    //     if(this.state.input) {
    //         this.setState({
    //             input: this.state.input,
    //             items: [...this.state.items, newItem],
    //         });   
    //         this.setState({
    //             input: ''
    //         }); 
    //     }  
    // }
    // C
    onSubmit(e) {
        let todos = this.props.todos;
        let setTodos = this.props.setTodos;
        e.preventDefault(); // чтобы не обновлялась страница
        let newItem = {
            id: this.props.todos.length,
            title: this.state.input,
            isComplete: false
        }
        if(this.state.input) {
            this.setState({
                input: this.state.input,
                items: [...this.state.items],
            });   
            this.setState({
                input: ''
            }); 
        }  
        fetch("http://localhost:8000", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newItem)
            })
            .then(res => res.json())
            .then(prev => setTodos([...todos, prev]))
    }

    completeTask (id) {
        let todos = this.props.todos;
        let setTodos = this.props.setTodos;
        fetch('http://localhost:8000', {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({id})
        })
        .then(res => res.json())
        .then(setTodos((prev) => {
            const index = prev.findIndex((t) => t.id === id);
            const newState = [...prev];
            newState[index] = {...newState[index], isComplete: !newState[index].isComplete}
        }))
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
                            <ToDoLi key={item.id} item={item.body} completeTask={this.completeTask} index={index} id={item.id} onDelete={this.onDelete} todos={this.props.todos}/>
                        )
                    })}
                </ul>
            </div>
        )
    }
}