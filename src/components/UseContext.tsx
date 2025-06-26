import { createContext, useContext, useState } from "react";
import Case from "./Case";

const ThemeContext = createContext<string | null>(null);
const LoginContext = createContext<VoidFunction | null>(null);

const UseContext = () => {
    const [theme, setTheme] = useState('dark');
    const loginFunction = () => {
        alert('logged in!');
    }
    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <h3 className=' px-4 py-2 rounded-2xl bg-blue-400'>UseContext</h3>
            <Case title="Case 1: toggle button to change theme context, custom button receive the context">
                <ThemeContext.Provider value={theme}>
                    <button onClick={() => { if (theme === 'dark') { setTheme('light') } else { setTheme('dark') } }}>toggle theme</button>
                    <form className="p-4 border-white border-2 rounded-sm">
                        <h5 className=" font-semibold capitalize mb-6">form title</h5>
                        <CustomButton />
                    </form>
                </ThemeContext.Provider>
            </Case>
            <Case title="Case 2: pass login function via useContext">
                <LoginContext value={loginFunction}>
                    <form className="p-4 border-white border-2 rounded-sm">
                        <h5 className=" font-semibold capitalize mb-6">form title</h5>
                        <LoginButton />
                    </form>
                </LoginContext>
            </Case>
        </div>
    )
}

const CustomButton = () => {
    const theme = useContext(ThemeContext);
    return <button onClick={(e) => { e.preventDefault(); }} className={theme === 'dark' ? "!bg-black !text-white" : " !bg-white !text-black"}>{theme}</button>
}
const LoginButton = () => {
    const login = useContext(LoginContext);
    return <button onClick={(e) => { e.preventDefault(); !!login ? login() : null }} >login</button>
}

export default UseContext