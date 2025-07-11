import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useActionState, memo, useState, useCallback, createContext, useContext, useDebugValue, useDeferredValue, Suspense, use, StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { Routes, Route, Link, StaticRouter } from "react-router-dom";
const Grid = ({ children, className }) => {
  return /* @__PURE__ */ jsx("div", { className: className + " grid grid-cols-1 md:grid-cols-3", children });
};
const Section = ({ children, title }) => {
  return /* @__PURE__ */ jsxs("section", { className: " flex flex-col items-start gap-9", children: [
    /* @__PURE__ */ jsx("h2", { className: " text-3xl", children: title }),
    children,
    /* @__PURE__ */ jsx("hr", { className: "w-full my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" })
  ] });
};
const Case = ({ children, className, title, code }) => {
  return /* @__PURE__ */ jsxs("div", { className: className + " w-full flex flex-col gap-2 border-2 border-white p-6 rounded-sm", children: [
    /* @__PURE__ */ jsx("h5", { className: " font-semibold", children: title }),
    !!code && /* @__PURE__ */ jsx("code", { className: "bg-gray-700 p-6 rounded-sm", children: code }),
    children
  ] });
};
const UseActionState = () => {
  const [state, formActionOne] = useActionState(increment, 0);
  async function increment(prev) {
    return prev + 1;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 items-center sm:items-start", children: [
    /* @__PURE__ */ jsx("h3", { className: " px-4 py-2 rounded-2xl bg-blue-400", children: "UseActionState" }),
    /* @__PURE__ */ jsx(Case, { title: "Case 1: form button increase state by 1", children: /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-2", children: [
      "state: ",
      state,
      /* @__PURE__ */ jsx("button", { formAction: formActionOne, children: "Increment" })
    ] }) }),
    /* @__PURE__ */ jsx(Case, { title: "Case 2: add to cart with pending", children: /* @__PURE__ */ jsx(AddToCartForm, { itemID: "1" }) })
  ] });
};
const AddToCartForm = ({ itemID }) => {
  const [message, AddToCartFormAction, isPending] = useActionState(addToCart, "default message");
  async function addToCart(prevState, queryData) {
    const itemID2 = queryData.get("itemID");
    if (itemID2 === "1") {
      console.log("the prevState is: ", prevState);
      await new Promise((resolve) => {
        setTimeout(resolve, 2e3);
      });
      return "Added to cart";
    }
    return "no item id";
  }
  return /* @__PURE__ */ jsxs("form", { action: AddToCartFormAction, itemID: "1", className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx("input", { type: "hidden", name: "itemID", value: itemID }),
    /* @__PURE__ */ jsx("button", { type: "submit", children: "Add to Cart" }),
    isPending ? "Loading..." : message
  ] });
};
const UseCallback = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 items-center sm:items-start", children: [
    /* @__PURE__ */ jsx("h3", { className: " px-4 py-2 rounded-2xl bg-blue-400", children: "UseCallback" }),
    /* @__PURE__ */ jsx("p", { children: "To see the result, please open browser console" }),
    /* @__PURE__ */ jsx(Case, { title: "Case 1: test re-render performance with useCallback", children: /* @__PURE__ */ jsx(ParentComponentWithUseCallback, {}) }),
    /* @__PURE__ */ jsx(Case, { title: "Case 2: test re-render performance WITHOUT useCallback", children: /* @__PURE__ */ jsx(ParentComponentWithOutUseCallback, {}) })
  ] });
};
const ParentComponentWithUseCallback = () => {
  const [count, setCount] = useState(0);
  console.log("render parent with usecallback");
  const cachedFn = useCallback(() => {
    setCount(0);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("button", { className: " capitalize", onClick: () => setCount(count + 1), children: [
      "[ Parent ]",
      " count: ",
      count
    ] }),
    /* @__PURE__ */ jsx(ChildComponent, { fn: cachedFn })
  ] });
};
const ParentComponentWithOutUseCallback = () => {
  const [count, setCount] = useState(0);
  console.log("render parent without usecallback");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("button", { className: " capitalize", onClick: () => setCount(count + 1), children: [
      "[ Parent ]",
      " count: ",
      count
    ] }),
    /* @__PURE__ */ jsx(ChildComponent, { fn: () => {
      setCount(0);
    } })
  ] });
};
const ChildComponent = memo(({ fn }) => {
  console.log("render child component with memo");
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("button", { className: " capitalize", onClick: fn, children: [
    `[ Child ]`,
    " reset button"
  ] }) });
});
const ThemeContext = createContext(null);
const LoginContext = createContext(null);
const UseContext = () => {
  const [theme, setTheme] = useState("dark");
  const loginFunction = () => {
    alert("logged in!");
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 items-center sm:items-start", children: [
    /* @__PURE__ */ jsx("h3", { className: " px-4 py-2 rounded-2xl bg-blue-400", children: "UseContext" }),
    /* @__PURE__ */ jsx(Case, { title: "Case 1: toggle button to change theme context, custom button receive the context", children: /* @__PURE__ */ jsxs(ThemeContext.Provider, { value: theme, children: [
      /* @__PURE__ */ jsx("button", { onClick: () => {
        if (theme === "dark") {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }, children: "toggle theme" }),
      /* @__PURE__ */ jsxs("form", { className: "p-4 border-white border-2 rounded-sm", children: [
        /* @__PURE__ */ jsx("h5", { className: " font-semibold capitalize mb-6", children: "form title" }),
        /* @__PURE__ */ jsx(CustomButton, {})
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Case, { title: "Case 2: pass login function via useContext", children: /* @__PURE__ */ jsx(LoginContext, { value: loginFunction, children: /* @__PURE__ */ jsxs("form", { className: "p-4 border-white border-2 rounded-sm", children: [
      /* @__PURE__ */ jsx("h5", { className: " font-semibold capitalize mb-6", children: "form title" }),
      /* @__PURE__ */ jsx(LoginButton, {})
    ] }) }) })
  ] });
};
const CustomButton = () => {
  const theme = useContext(ThemeContext);
  return /* @__PURE__ */ jsx("button", { onClick: (e) => {
    e.preventDefault();
  }, className: theme === "dark" ? "!bg-black !text-white" : " !bg-white !text-black", children: theme });
};
const LoginButton = () => {
  const login = useContext(LoginContext);
  return /* @__PURE__ */ jsx("button", { onClick: (e) => {
    e.preventDefault();
    !!login ? login() : null;
  }, children: "login" });
};
const UseDebugValue = () => {
  const [count, setCount] = useState(0);
  useDebugValue(count);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 items-center sm:items-start", children: [
    /* @__PURE__ */ jsx("h3", { className: " px-4 py-2 rounded-2xl bg-blue-400", children: "UseDebugValue" }),
    /* @__PURE__ */ jsxs(Case, { title: "Case 1: label count value to react dev tool", children: [
      /* @__PURE__ */ jsx("p", { children: "To see the result, check in React Dev Tool" }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setCount(count + 1), children: [
        "count ",
        count
      ] })
    ] })
  ] });
};
let locationsCache = /* @__PURE__ */ new Map();
function fetchLocations(query) {
  if (!locationsCache.has(query)) {
    locationsCache.set(query, getLocations(query));
  }
  return locationsCache.get(query);
}
async function getLocations(query) {
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 1e3);
    });
    const response = await fetch(`https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.slice(0, 5);
  } catch (err) {
    return null;
  }
}
function debounce(func, delay) {
  let timeoutId = null;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}
const UseDeferredValue = () => {
  const [query, setQuery] = useState("");
  const [queryTwo, setQueryTwo] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [debouncedQueryTwo, setDebouncedQueryTwo] = useState("");
  const deferredQuery = useDeferredValue(debouncedQuery);
  const handleSearch = useCallback(
    debounce((value) => {
      setDebouncedQuery(value);
    }, 500),
    []
  );
  const handleSearchTwo = useCallback(
    debounce((value) => {
      setDebouncedQueryTwo(value);
    }, 500),
    []
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 items-center sm:items-start", children: [
    /* @__PURE__ */ jsx("h3", { className: " px-4 py-2 rounded-2xl bg-blue-400", children: "UseDeferredValue" }),
    /* @__PURE__ */ jsxs(Case, { title: "Case 1: search WITH useDeferredValue (debounce)", children: [
      /* @__PURE__ */ jsx("input", { className: "border ", value: query, type: "text", onChange: (e) => {
        handleSearch(e.target.value);
        setQuery(e.target.value);
      } }),
      /* @__PURE__ */ jsxs("div", { children: [
        "search query: ",
        deferredQuery
      ] }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("h3", { children: "searching..." }), children: /* @__PURE__ */ jsx(LocationList, { query: deferredQuery }) })
    ] }),
    /* @__PURE__ */ jsxs(Case, { title: "Case 2: search WITHOUT useDeferredValue (debounce)", children: [
      /* @__PURE__ */ jsx("input", { className: "border ", value: queryTwo, type: "text", onChange: (e) => {
        handleSearchTwo(e.target.value);
        setQueryTwo(e.target.value);
      } }),
      /* @__PURE__ */ jsxs("div", { children: [
        "search query: ",
        queryTwo
      ] }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("h3", { children: "searching..." }), children: /* @__PURE__ */ jsx(LocationList, { query: debouncedQueryTwo }) })
    ] })
  ] });
};
const LocationList = ({ query }) => {
  if (query === "") {
    return null;
  }
  const locations = use(fetchLocations(query));
  if ((locations == null ? void 0 : locations.length) === 0) {
    return /* @__PURE__ */ jsxs("p", { children: [
      "No matches for ",
      /* @__PURE__ */ jsxs("i", { children: [
        '"',
        query,
        '"'
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { children: locations == null ? void 0 : locations.map((location, index) => {
    return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { children: [
      index + 1,
      ": ",
      location.nameEN
    ] }) }, index);
  }) });
};
function App() {
  return /* @__PURE__ */ jsxs("main", { className: "relative w-full flex flex-col gap-9 mb-9 pt-24", children: [
    /* @__PURE__ */ jsx("h1", { children: "React 2025 (v19.1.0) WIP" }),
    /* @__PURE__ */ jsx("p", { children: "last updated: Fri Jun 27 2025 01:15:50 GMT+0800" }),
    /* @__PURE__ */ jsx(Section, { title: "HOOKS", children: /* @__PURE__ */ jsxs(Grid, { className: "gap-6 w-full", children: [
      /* @__PURE__ */ jsx(UseActionState, {}),
      /* @__PURE__ */ jsx(UseCallback, {}),
      /* @__PURE__ */ jsx(UseContext, {}),
      /* @__PURE__ */ jsx(UseDebugValue, {}),
      /* @__PURE__ */ jsx(UseDeferredValue, {})
    ] }) })
  ] });
}
const AboutPage = () => {
  return /* @__PURE__ */ jsxs("main", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx("h1", { className: " capitalize", children: "About page" }),
    /* @__PURE__ */ jsx("a", { target: "_blank", href: "https://github.com/r7chardgh/react2025", children: "GitHub Repo" })
  ] });
};
const NotFound = () => {
  return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("h1", { className: " font-semibold text-xl uppercase", children: "404 not found" }) });
};
const Router = () => {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(App, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(AboutPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] });
};
const Nav = () => {
  return /* @__PURE__ */ jsxs("nav", { className: " absolute top-0 left-0 flex gap-4 m-auto w-full justify-center z-30 my-4", children: [
    /* @__PURE__ */ jsx(Link, { className: "border py-2 px-4 capitalize font-semibold", to: "/", children: "home" }),
    /* @__PURE__ */ jsx(Link, { className: "border py-2 px-4 capitalize font-semibold", to: "/about", children: "about" })
  ] });
};
function render(url) {
  const html = renderToString(
    /* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsxs(StaticRouter, { location: url, children: [
      /* @__PURE__ */ jsx(Nav, {}),
      /* @__PURE__ */ jsx(Router, {})
    ] }) })
  );
  return { html };
}
export {
  render
};
