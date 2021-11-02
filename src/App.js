// eslint-disable-next-line
import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setprogress] = useState(0);
  document.body.style.backgroundColor = "#d7ffff";
  return (
    <div>
      <Router>
        <LoadingBar
          color="rgb(233 244 62)"
          progress={progress}
          height={3}
          // onLoaderFinished={() => setProgress(0)}
        />
        <NavBar />
        <Switch>
          <Route exact path="/">
            <News
              setProgress={setprogress}
              apiKey={apiKey}
              key="home"
              pageSize="20"
              country="in"
              category="general"
            />
          </Route>
          <Route exact path="/business">
            <News
              setProgress={setprogress}
              apiKey={apiKey}
              key="business"
              pageSize="20"
              country="in"
              category="business"
            />
          </Route>
          <Route exact path="/entertainment">
            <News
              setProgress={setprogress}
              apiKey={apiKey}
              key="entertainment"
              pageSize="20"
              country="in"
              category="entertainment"
            />
          </Route>
          <Route exact path="/general">
            <News
              setProgress={setprogress}
              apiKey={apiKey}
              key="general"
              pageSize="20"
              country="in"
              category="general"
            />
          </Route>
          <Route exact path="/health">
            <News
              setProgress={setprogress}
              apiKey={apiKey}
              key="health"
              pageSize="20"
              country="in"
              category="health"
            />
          </Route>
          <Route exact path="/science">
            <News
              setProgress={setprogress}
              apiKey={apiKey}
              key="science"
              pageSize="20"
              country="in"
              category="science"
            />
          </Route>
          <Route exact path="/sports">
            <News
              setProgress={setprogress}
              apiKey={apiKey}
              key="sports"
              pageSize="20"
              country="in"
              category="sports"
            />
          </Route>
          <Route exact path="/technology">
            <News
              setProgress={setprogress}
              apiKey={apiKey}
              key="technology"
              pageSize="20"
              country="in"
              category="technology"
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
