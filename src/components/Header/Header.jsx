import React from 'react';
import styles from './Header.module.css';
import { useDarkMode } from '../../context/DarkModeContext';
import { HiMoon, HiSun } from 'react-icons/hi2';


export default function Header({ filters, currentFilter, onFilterChange }) {
	
	const {darkMode, toggleDarkMode} = useDarkMode();
	return (
		<header className={styles.header}>
			<button onClick={toggleDarkMode} className={styles.toggle}>
				{!darkMode && < HiMoon />}  {/* darkMode가 아니라면 HiMoon 보여주기 */}
				{darkMode && < HiSun />}
			</button>
			<ul className={styles.filters}>
				{filters.map((value, index) => (
					<li key={index}>
						<button
							className={`${styles.filter} ${
								currentFilter === value && styles.selected
							}`}
							/* className이 styles.filter는 쓸건데, 
							currentFilter값이 value와 같다면 styles.selected라는 이름을 붙여줄거야.
							*/
							onClick={() => onFilterChange(value)}>
							{value}
						</button>
					</li>
				))}
			</ul>
		</header>

		/** 
		* filters를 빙글빙글돌면서(map) 우리가 원하는 UI 요소로 변경해줄거다
		* li 요소 이용. 동적으로 변경되는 인자가 아니라 고정된 인자이기 때문에 
        value와 index를 그대로 가져와도 될듯.
      * {value} 버튼이 클릭되면 우리가 원하는 필터로 설정해야하므로 
        onFilterChange를 불러와서 현재의 선택된 value(선택된 필터값)로 설정. 

      * (TBD)활성화된 currentFilter 버튼을 보여주는 기능도 만들어야함 

      */
	);
}
