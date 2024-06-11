import React, { useState, useEffect } from 'react';
import '../styles/homepage.css';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('http://localhost:3000/allProducts');
            const data = await response.json();
            setPosts(data);
        }
        fetchPosts();
    }, []);

    const groupedPosts = posts.reduce((acc, post, index) => {
        const groupIndex = Math.floor(index / 4);
        if (!acc[groupIndex]) {
            acc[groupIndex] = [];
        }
        acc[groupIndex].push(post);
        return acc;
    }, []);

    return (
        <div className='pt-32 flex flex-col items-center justify-center gap-11'>
            <h1>Produtos em Destaque</h1>
            <div className=''>

                {groupedPosts.map((group, index) => (
                    <ul key={index} className="flex flex-row list-none justify-center items-center w-full pr-5 pl-5 pb-5 gap-5">
                        {group.map(post => (
                            <li key={post.id} className="w-1/3">
                                <div className="w-100 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <img className="rounded-t-lg" src="https://www.totalconstrucao.com.br/wp-content/uploads/2018/06/Plantas-de-casas-simples-1.png" alt="" />
                                    </a>
                                    <div className="p-5">
                                        <a href="#">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.titulo}</h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.descricao}</p>
                                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Ver Projeto
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>

        </div>
    );
};

export default Home;
