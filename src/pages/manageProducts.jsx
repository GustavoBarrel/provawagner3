import React, { useState, useEffect } from 'react';

const ManageProducts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('http://localhost:3000/allProducts');
            const data = await response.json();
            setPosts(data);
        }
        fetchPosts();
    }, []);

    const handleDelete = (post) => {

        const deletePost = async (id) => {
            const response = await fetch(`http://localhost:3000/productDel/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setPosts(posts.filter(post => post.id !== id));
                console.log(`Post with id ${id} deleted`);
            } else {
                console.error(`Failed to delete post with id ${id}`);
            }
        };
        deletePost(post.id);
    };

    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3">Titulo</th>
                            <th scope="col" className="px-6 py-3">Descricao</th>
                            <th scope="col" className="px-6 py-3">Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDelete(post)} className="text-red-500 hover:text-red-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {post.titulo}
                                </th>
                                <td className="px-6 py-4">{post.descricao}</td>
                                <td className="px-6 py-4">R$:{post.preco}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ManageProducts;
