import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import { DarkModeProvider } from './context/DarkModeContext';


const filters = ['all', 'active', 'completed'];
// 투두 어플리케이션에서 사용하는 고정된 3개의 필터를 밖에서 선언하기 

function App() {
	const [filter, setFilter] = useState(filters[0]);
	// filters[0]은 'all', 디폴트 값으로 전체 투두리스트를 보여주기(all)
	// 현재 선택된 필터 -> filter로 표기
	return (
		<DarkModeProvider>
			<Header
				filters={filters}
				currentFilter={filter}
				// 원래는 filter={filter}인데 이름이 달라도 되는지 테스트중
        // -> 헤드버튼 3개 만들었고, 아직까지는 문제없음 

				onFilterChange={setFilter}
        // 필터에 뭔가 변경이 생기면 호출되는 함수 
				// 전달하는 인자값과 호출값이 같으므로 짧은 버전으로 축약가능
				// 짧게쓴 버전: {setFilter}
				// 길게 쓴 버전: {(filter) => setFilter(filter)}
			/>
			<TodoList currentFilter={filter} />
{/* // TodoList에 현재 선택된 필터 보여주기 
          // 원래는 filter={filter}인데 이름이 달라도 되는지 테스트중
*/}
		</ DarkModeProvider>
	);
}

export default App;
