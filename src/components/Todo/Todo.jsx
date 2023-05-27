import React from 'react';
import { HiXMark } from 'react-icons/hi2';
import styles from './Todo.module.css';

export default function Todo({ todo, onUpdate, onDelete }) {
	const { id, text, status } = todo;
	// text와 status라는 변수를 todo로부터 받아오기.
	// todo.text나 todo.status처럼 계속 todo가 반복되기 때문에 깔끔하게 만들기 위함.

	const handleChange = (e) => {
		const status = e.target.checked ? 'completed' : 'active';
		onUpdate({ ...todo, status });
	};
	// onUpdate 불러옴으로써 마지막에 업데이트 내용 전달.
	// (기존의 todo를 다시불러오고(스프레드 연산자), 업데이트된 status만 변경하기)
	// status 정의 (checked가 completed냐 active냐에 따라 토글링 > 삼항 연산자 이용)

	const handleDelete = () => onDelete(todo);
	// 이벤트값 상관안하고 딜리트키가 클릭되면 위에 프롭으로 전달받은 todo를 넣어서
	// onDelete함수 호출

	return (
		<li className={styles.todo}>
			<input
				className={styles.checkbox}
				type='checkbox'
				id={id}
				checked={status === 'completed'}
				onChange={handleChange}
			/>
			{/* // checkbox와 label이 붙어있다고 명시하기 
			디버깅: 원래는 input checkbox iddhk label htmlFor 전부 'checkbox'
			였는데, 위에 todo 정의 부분에 id요소도 추가해주면서, 
			고유한 id로 만들어주며, inpu id와 htmlFor가 서로 연결되어 있는 그룹이라는걸 
			명시해줌으로써 accessibility 이용시 표기도 같이 연결되는 장점이 있다. 
			*/}
			<label htmlFor={id} className={styles.text}>
				{text}
			</label>
			<span className={styles.icon}>
				<button className={styles.iconButton} onClick={handleDelete}>
					<HiXMark />
				</button>
			</span>
		</li>
	);
}
