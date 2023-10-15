import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'



function Home() {

  // fetch all posts
    const [data, setData] = useState([])
    useEffect(()=> {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])

 //delete post
    function handleDelete (id) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
    .then((res) => {
      if (res.status !== 200) {
        return;
      } else {
        setData(
          data.filter((data) => {
            return data.id !== id;
          })
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });

    }


  return (
    <div className='container '>
        <h2 className='mb-3 mt-4 font-bold text-2xl text-center'>CRUD APPLICATION WITH JSONPLACEHOLDER</h2>
        <button className='focus:outline-none ml-4 mb-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
        <Link to="/create">Create +</Link>
            </button>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 '>
                <tr className='border-b bg-gray-50 font-bold'>
                    <th scope="col" className="px-20 font-bold py-3">title</th>
                    <th scope="col" className="px-4 py-3">Body</th>
                    <th  scope="col" className="px-36 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d, i)=> (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={i}>
                        <td className="px-20 py-4 font-medium text-gray-900  dark:text-white" >{d.title}</td>
                        <td className="px-4 py-0 font-medium text-gray-900  dark:text-white">{d.body}</td>
                        <td>


                        <Link to={`/read/${d.id}`}>Read</Link>

                            <button className='focus:outline-none mr-4 ml-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' >
                              <Link to={`/update/${d.id}`}>Update</Link></button>

                            <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' 
                            onClick={e => handleDelete(d.id)}>delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  )

  


                }
  


export default Home