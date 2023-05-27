import { createContext, useContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();
/**
 * darkmode와 toggleDarkMode 정보를 children에게 다 제공해 주기위한 우산 Provider. 리액트에서 제공하는 createContext함수를 이용해서 DarkModeContext라는 우산을 만들고, 리액트에서 제공하는 Provider를 이용하여
children을 감싸면서 --> darkmode와 toggleDarkMode 정보를 children에게 다 제공

*/

export function DarkModeProvider({ children }) {
	const [darkMode, setDarkMode] = useState(false);
	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		updateDarkMode(!darkMode);
	};

	// useEffect(()=>{},[]) // useEffect에 우리가 하고 싶은 행동을 전달하고, 딱 한번 실행
	// 다크모드 인지 아닌지 확인하는 함수 isDark를 만들어둔다.
	// 사용자의 로컬스토리지에 저장되어 있는 테마가 다크모드이거나, 
  // 인지 아닌지 체크해서 true라면 다크모드로 실행.

	useEffect(() => {
		const isDark =
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches);
      setDarkMode(isDark); // 우리 우산안에 담겨있는 내부 스테이트에 업데이트를 먼저 해라!
      updateDarkMode(isDark); 
      // 우리 웹페이지 HTML에 dark class를 넣을건지 말건지 판단하는 함수를 그다음에 넣어줌
	}, []); 

	return (
		<DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

function updateDarkMode(darkMode) {
	if (darkMode) {
		document.documentElement.classList.add('dark');
      localStorage.theme = 'dark'; // 로컬스토리지에 지금은 darkmode 라는걸 저장. 
	} else {
		document.documentElement.classList.remove('dark');
      localStorage.theme = 'light'; // 로컬스토리지에 지금은 lightmode 라는걸 저장. 

	}
}

/* useDarkMode라는 커스텀 훅을 만들어서 외부에서 사용할 때 편리하게 하자!
 
 보통은 사용하는 컴포넌트에 
 const {darkMode, toggleDarkMode} = useContext(DarkModeContext);
 를 입력해줘야한다. 아래처럼 export를 하면 
 사용하는 컴포넌트에는 
 const {darkMode, toggleDarkMode} = useDarkMode(); 를 입력한다. 
*/
export const useDarkMode = () => useContext(DarkModeContext);
