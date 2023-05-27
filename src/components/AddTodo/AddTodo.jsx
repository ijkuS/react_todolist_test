import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import styles from './AddTodo.module.css'

export default function AddTodo({ onAdd }) {
	// TodoList에 전달하기위한 onAdd를 프롭으로 링크.
   
   // controlled component로 만들어야 함.
   // 사용자의 입력값(set)을 저장하고 업데이트(setText)할 수 있는 useState를 만든다. 
	const [text, setText] = useState('');
	const handleChange = (e) => setText(e.target.value);
	// 이벤트에 있는 타겟의 밸류값으로 사용할거다.
	// 뭐라도 입력되면 이벤트 발생...
	const handleSubmit = (e) => {
		e.preventDefault(); // 리프레시 방지
      if (text.trim().length === 0) {
         return; 
         //텍스트 빈칸이거나 스페이스 바를 친다거나 하면 
         // 아무것도 하지않고 그대로 리턴.
         // 글자 앞에 스페이스 간격이 없도록 trim해주기 때문에 
         // 글자가 맨 앞에 오게 정렬할 수 있다. 
      }

		onAdd({ id: uuidv4(), text, status: 'active' });
      setText(''); // 입력 후에 입력란을 빈칸으로 초기화
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input className={styles.input}
				type='text'
				placeholder='Add Todo'
				value={text}
				onChange={handleChange}
			/>
			<button className={styles.btn}>Add</button>
		</form>
	);
}
