import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function Header(props) {
    return (
        <header>
            <h1>
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        props.onChangeMode();
                    }}
                >
                    {props.title}
                </a>
            </h1>
        </header>
    );
}
function Nav(props) {
    const lis = props.topic.map((li) => {
        return (
            <li key={li.id}>
                <a
                    href={"/read/" + li.id}
                    id={li.id}
                    onClick={(e) => {
                        e.preventDefault();
                        props.onChangeMode(e.target.id);
                    }}
                >
                    {li.title}
                </a>
            </li>
        );
    });
    return (
        <nav>
            <ol>{lis}</ol>
        </nav>
    );
}
function Article(props) {
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    );
}
function App() {
    const [mode, setMode] = useState("WELCOME");
    const [id, setId] = useState(null);
    const topics = [
        { id: "html", title: "html", body: "html is ..." },
        { id: "css", title: "css", body: "css is ..." },
        { id: "js", title: "js", body: "js is ..." },
    ];
    let contents = null;
    if (mode === "WELCOME") {
        contents = <Article title="Welcome" body="Hello, WEB" />;
    } else if (mode === "READ") {
        const item = topics.find((item) => {
            return item.id === id;
        });
        contents = <Article title={item.title} body={item.body} />;
    }
    return (
        <div>
            <Header
                title="WEB"
                onChangeMode={() => {
                    setMode("WELCOME");
                }}
            />
            <Nav
                topic={topics}
                onChangeMode={(id) => {
                    setMode("READ");
                    setId(id);
                }}
            />
            {contents}
        </div>
    );
}

export default App;
