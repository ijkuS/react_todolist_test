import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css'

//선택된 필터를 통해서 해당하는 리스트만 보여주기
export default function TodoList({ currentFilter }) {
	const [todos, setTodos] = useState([
		{ id: '123', text: '장보기', status: 'active' },
		{ id: '124', text: '공부하기', status: 'active' },
	]);

	const handleAdd = (todo) => setTodos([...todos, todo]);

	const handleUpdate = (updated) =>
		setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
	/* 
   map: 콜백함수에서 리턴한 값들을 기반으로 새로운 배열을 만드는 함수. 
   t는 기존의 todos를 의미하는 인자.
   map을 사용해서 빙글빙글 돌면서 
   기존의 todos의 id와 updated된 id와 같다면 
   >>> updated된 값으로된 새로운 배열 생성
   같지 않다면 t(기존의 todos) 그대로 놔둔다. 
   
   
*/

	const handleDelete = (deleted) =>
		setTodos(todos.filter((t) => t.id !== deleted.id));
	/*
   filter메소드: 콜백함수에서 리턴하는 값이 
   true인 것들만 모아서 새로운 배열을 만드는 함수.
   filter 사용하여 기존의 t가 t.id와 deleted.id가 아닌 것만 골라서 
   새로운 배열을 만들어 냄. 
*/

	// 필터된 아이템만 보여주는 함수 만들기
	const filtered = getFilteredItems(todos, currentFilter);

	return (
		<section className={styles.container}>
			<ul className={styles.list}>
            {/* //todos.map이 아니라 filtered된 아이템만 빙글빙글 돌려서 출력  */}
				{filtered.map((item) => (
					// <li key={item.id}>{item.text}</li>
					// map을 이용하여 빙글빙글 돌면서 item 인자를 받아와서 Todo.jsx에 프롭을 전달하자

					<Todo
						key={item.id}
						todo={item}
						onUpdate={handleUpdate}
						//아이템이 업데이트될 때 전달되어야하는 콜백함수를 프롭으로 전달
						onDelete={handleDelete}
						//아이템이 삭제될 때 전달되어야하는 콜백함수를 프롭으로 전달
					/>
				))}
			</ul>
			<AddTodo onAdd={handleAdd} />
			{/* 새로운 인풋이 들어올때 여기로 전달! */}
		</section>
	);
}

function getFilteredItems(todos, currentFilter) {
	if (currentFilter === 'all') {
		return todos;
	}
	return todos.filter((todo) => todo.status === currentFilter);
}
