import React, { useState, useRef, useEffect } from "react";
import './Todo.css'
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(0);

    const addTodo = () => {
        if (todo !== "") {
            setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
            console.log(todos);
            setTodo('');
        }
        if (editId) {
            const editTodo = todos.find((todo) => todo.id === editId)
            const updateTodo = todos.map((item) => item.id == editTodo.id
            ? (item ={id: item.id, list: todo})
            : (item ={id: item.id, list: item.list}))
            setTodos(updateTodo)
            setEditId(0);
            setTodo('');
        }
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    const inputRef = useRef('null')

    useEffect(() => {
        inputRef.current.focus();
    })

    const onDelete = (id) => {
        setTodos(todos.filter((item) => item.id !== id))
    }

    const onComplete = (id) => {
        let complete = todos.map((item) => {
            if (item.id == id) {
                return ({ ...item, status: !item.status })
            }
            return item
        })
        setTodos(complete)
    }

    const onEdit = (id) => {
        const editTodo = todos.find((item) => item.id === id)
        console.log('ON EDIT-:', editTodo.list)
        setTodo(editTodo.list)
        setEditId(editTodo.id)
    }

    return (
        <div className='container'>
            <h2>Todo App</h2>
            <form className="form-group" onSubmit={handleSubmit}>
                <input type="text" value={todo} ref={inputRef} placeholder="Enter list here." className="form-control" onChange={(evt) => setTodo(evt.target.value)} />
                <button onClick={addTodo}>{editId ? "Save" : "Add"}</button>
            </form>
            <div className="list">
                <ul>
                    {
                        todos.map((item) => (
                            <li className="list-items">
                                <div className="list-item-list" id={item.status ? "list-item" : ""}>{item.list}</div>
                                <span>
                                    <IoMdDoneAll className="list-item-icons" id="complete" title="Complete" onClick={() => onComplete(item.id)} />
                                    <FiEdit className="list-item-icons" id="edit" title="Edit" onClick={() => onEdit(item.id)} />
                                    <MdDelete className="list-item-icons" id="delete" title="Delete" onClick={() => onDelete(item.id)} />
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Todo; 