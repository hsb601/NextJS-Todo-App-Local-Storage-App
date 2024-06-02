import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import Navbar from '../navbar/navbar';
// import withAuth from '../../hoc/withAuth';
const Edit = () => {
  
    const email = useSelector((state) => state.user.email);
    // console.log("todo after",email)
    // console.log("todo before",email)
    const router = useRouter();
    const params = useParams();
    const [originalTitle, setOriginalTitle] = useState("");
    const [todo, setTodo] = useState({ title: "", desc: "" });

    useEffect(() => {
        if (params?.id && email) {
            const usersData = localStorage.getItem('users');
            if (usersData) {
                const users = JSON.parse(usersData);
                const user = users.find(user => user.email === email);
                if (user) {
                    const todoItem = user.todos[params.id];
                    if (todoItem) {
                        setTodo(todoItem);
                        setOriginalTitle(todoItem.title);
                    }
                }
            }
        }
    }, [params, email]);

    const onChange = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        });
    };

    const updateTodo = () => {
        const usersData = localStorage.getItem('users');
        if (usersData) {
            let users = JSON.parse(usersData);
            const userIndex = users.findIndex(user => user.email === email);
            if (userIndex !== -1) {
                let user = users[userIndex];
                let todoIndex = user.todos.findIndex(t => t.title === originalTitle);
                if (todoIndex !== -1) {
                    user.todos[todoIndex] = { title: todo.title, desc: todo.desc };
                    users[userIndex] = user;
                    localStorage.setItem('users', JSON.stringify(users));
                    alert('Todo has been updated');
                    router.push(`/todo`);
                } else {
                    alert('Todo does not exist');
                }
            }
        }
    };

    return (

        <div className="text-3xl h-screen">
            <Navbar></Navbar>
            <section className="text-gray-600  ">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <h2 className="text-blue-700 text-2lg font-medium title-font mb-5">Update a Todo</h2>
                        <div className="relative mb-4">
                            <label htmlFor="title" className="leading-7 text-sm text-gray-600">Todo Title</label>
                            <input onChange={onChange} value={todo.title} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-blue-700 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="desc" className="leading-7 text-sm text-gray-600">Todo Text</label>
                            <input onChange={onChange} value={todo.desc} type="text" id="desc" name="desc" className="w-full bg-white rounded border border-gray-300 focus:border-blue-700 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <button onClick={updateTodo} className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none w-fit hover:bg-blue-600 rounded text-lg">Update Todo</button>
                        <p className="text-xs text-gray-500 mt-3">The best todo list app out there!</p>
                    </div>
                </div>
            </section>
        </div>

    );
};

// Edit.authRequired = true;
// export default withAuth(Edit, true);
export default Edit

 // const updateTodo = () => {
    //     const usersData = localStorage.getItem('users');
    //     if (usersData) {
    //         let users = JSON.parse(usersData);
    //         const userIndex = users.findIndex(user => user.email === email);
    //         if (userIndex !== -1) {
    //             let user = users[userIndex];
    //             let todoIndex = user.todos.findIndex(t => t.title === todo.title);
    //             if (todoIndex !== -1) {
    //                 user.todos[todoIndex] = { title: todo.title, desc: todo.desc };
    //                 users[userIndex] = user;
    //                 localStorage.setItem('users', JSON.stringify(users));
    //                 alert('Todo has been updated');
    //                 router.push(`/todo`);
    //             } else {
    //                 alert('Todo does not exist');
    //             }
    //         }
    //     }
    // };
