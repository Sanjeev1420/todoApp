import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../Stylesheets/todo.css"; 

const TodoApp = () => {
    const [newTName, setNewTName] = useState('');
    const [newTDes, setNewTDes] = useState('');
    const [todos, setTodos] = useState([]);
    const [isAddBtn, setIsAddBtn] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [editItemId,seteditItemId] = useState(0);

    const addOrUpdateToDo = () => {
        if (!isAddBtn) {
            const updatedTodos = todos.map(todo =>
                todo.id === editItemId
                    ? { ...todo, name: newTName, description: newTDes }
                    : todo
            );
            setTodos(updatedTodos);
            setIsAddBtn(true);
            seteditItemId(0);
        } else {
            const todo = {
                id: Date.now(),
                name: newTName,
                description: newTDes,
                status: "notCompleted"
            }
            setTodos([...todos, todo]);
        }

        setNewTName('');
        setNewTDes('');
    };

    const editTodo = id => {
        const todoToEdit = todos.find(todo => todo.id === id);
        setNewTName(todoToEdit.name);
        setNewTDes(todoToEdit.description);
        seteditItemId(id);
        setIsAddBtn(false);
    };

    const deleteTodo = id => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const updateStatus = (id, newStatus) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, status: newStatus } : todo
        );
        setTodos(updatedTodos);
    };

    const filterTodos = () => {
        switch (filterStatus) {
            case 'completed':
                return todos.filter(todo => todo.status === 'completed');
            case 'notCompleted':
                return todos.filter(todo => todo.status === 'notCompleted');
            default:
                return todos;
        }
    };

    return (
        <>
            <div className="inputForm">
                <form>
                    <div className="input-group formBody">
                        <input type="text" className="form-control" placeholder="Task Name" value={newTName} onChange={e => setNewTName(e.target.value)}></input>
                        <input type="text" className="form-control" placeholder="Task Description" value={newTDes} onChange={e => setNewTDes(e.target.value)}></input>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={addOrUpdateToDo}>{isAddBtn ? `Add ToDo` : `Update`}</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="mytodos">
                <div className="mytodosHead">
                    <nav className="navbar navbar-light bg-light justify-content-between">
                        <a className="navbar-brand">My ToDo's</a>
                        <form className="form-inlne">
                            <select className="custom-select" onChange={e => setFilterStatus(e.target.value)}>
                                <option value="all">All</option>
                                <option value="completed">Completed</option>
                                <option value="notCompleted">Not Completed</option>
                            </select>
                        </form>
                    </nav>
                </div>
                <hr></hr>
                <div className="todolists">
                    <div className="card-deck" id="todoItems">
                        {filterTodos().map(item => (
                            <div className="card" key={item.id}>
                                <div className="card-body">
                                    <h3 className="card-title">{item.name}</h3>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text">Status :
                                        <select
                                            value={item.status}
                                            onChange={e => updateStatus(item.id, e.target.value)}
                                        >
                                            <option value="notCompleted">Not Completed</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button type="button" className="btn btn-info" onClick={e => editTodo(item.id)}>Edit</button>
                                    <button type="button" className="btn btn-danger" onClick={e => deleteTodo(item.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodoApp;
