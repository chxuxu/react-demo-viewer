import React, { useEffect, useState } from 'react';
import TestComp from '../components/TestComp';
import TestComp1 from '../components/TestComp1';
import DemoViewer from "../DemoViewer";
import "./index.css";

let codeSrc = `     render(){
         let title="222222222";
         return (<TestComp title={title}/>);
       };`;

let _markdown = require("../components/TestComp/readme.md").default;

export interface IAppProps {

}

export default function App(props: IAppProps) {

  return (
    <div className="m-app">
      <DemoViewer docSrc={_markdown} component={TestComp} dependencies={{
        TestComp1: TestComp1
      }} />
    </div>
  );
}
