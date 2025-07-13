import { createContext, useContext, useState } from "react";
import Case from "../Case";
import Tag from "../Tag";

const ThemeContext = createContext<string | null>(null);
const LoginContext = createContext<VoidFunction | null>(null);

const UseContext = () => {
    const [theme, setTheme] = useState('dark');
    const loginFunction = () => {
        alert('logged in!');
    }
    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <Tag title='UseContext' />
            <Case title="Case 1: toggle button to change theme context, custom button receive the context">
                <ThemeContext.Provider value={theme}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col items-start gap-2">
                            <p className="text-gray-600 text-sm">button</p>
                            <button onClick={() => { if (theme === 'dark') { setTheme('light') } else { setTheme('dark') } }}>toggle theme</button>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <p className=" text-sm text-gray-600">target</p>
                            <form className={"p-4 bg-gray-500 rounded-sm flex flex-col items-center w-full" + `${theme == 'dark' ? ' text-black' : ' text-white'}`}>
                                <h5 className=" font-semibold capitalize mb-6 ">form title</h5>
                                <div className="flex flex-col gap-2 items-start">
                                    <label htmlFor="test">label</label>
                                    <input id="test" type="text" placeholder={theme} className={`p-2 mb-4 ${theme === 'dark' ? ' text-white bg-black' : ' text-black bg-white'}`} />
                                    <CustomButton />
                                </div>
                            </form>
                        </div>
                    </div>
                </ThemeContext.Provider>
            </Case>
            <Case title="Case 2: pass login function via useContext">
                <LoginContext value={loginFunction}>
                    <form className="p-4 bg-gray-500 rounded-sm">
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