import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

//선택된 필터를 통해서 해당하는 리스트만 보여주기
export default function TodoList({ currentFilter }) {
	const [todos, setTodos] = useState(() => readTodosFromLocalStorage());
	// 앞에서 함수를 정의해주면 길어지니, 맨 뒤로 함수 정의 부분을 보냈음.
	// 화살표 함수로 한번 감싸서 콜백함수로 불러오면 리프레시될때마다 이 함수가 불러오지 않고,
	// 필요시에만 불러오기 때문에 메모리 낭비를 하지 않아도 된다.

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

	/**
	 * useEffect사용하여 리프레시한 다음에도 투두리스트를 저장하기
	 * todos를 정의한 내용 아래에,
	 * useEffect(()=>{}, [todos]) // 내가 뭔가를 실행하고 싶은데, 언제? todo가 변경될 때마다
		// todos라는 객체에 todos가 변경될때마다 로컬스토리지에 저장할거다. 
		// (객체를 배열로 저장하려면 JSON으로 변환 해야한다.)
	 * 배열로 저장한 다음 'todos'라는 객체에 저장할거다. 
	*/
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

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

function readTodosFromLocalStorage() {
	const todos = localStorage.getItem('todos');
	console.log('readTodosFromLocalStorage');
	return todos ? JSON.parse(todos) : [];
	/**
	 * const todos = 로컬스토리지에서 todos를 가져온다.
	 * todos가 있다면 JSON.parse로 todos를 리턴해오고, 없다면 텅텅 빈 배열로 반환.
	 */
}

function getFilteredItems(todos, currentFilter) {
	if (currentFilter === 'all') {
		return todos;
	}
	return todos.filter((todo) => todo.status === currentFilter);
}
