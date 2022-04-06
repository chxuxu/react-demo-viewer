import React, { useEffect, useState } from 'react';
//import ReactDOM from "react-dom/client";
import * as RDOM from 'react-dom';
import { transform } from "babel-standalone";
import Editor from "./Editor";
export interface ICompRenderProps {
  component: any;
  dependencies?:any;
  codeSrc?: string;
  showCode?:boolean;
  containerId?:string;

}
if (!window["_react_demo_viwer"]) {
  window["_react_demo_viwer"] = 0;
}

export default function CompRender(props: ICompRenderProps) {
  window["_react_demo_viwer"]++;
  const [domId,] = useState("_react_demo_viwer_" + window["_react_demo_viwer"]);
  useEffect(() => {
    if (props.codeSrc) {
      renderCode(props.codeSrc);
    }
  }, [props.codeSrc]);

  function renderCode(_codeSrc){
    let args=["props", "React", "ReactDOM","RDOM",props.component.name];
    let argvs=[props,React,{},RDOM,props.component];
    if(props.dependencies){
      for(let key in props.dependencies){
        args.push(key);
        argvs.push(props.dependencies[key]);
      }
    }
    if (_codeSrc.indexOf("render()") > 0) {
      //////
      let code = transform(`
      class Demo extends React.Component {
        ${_codeSrc}
      }
      //const root=ReactDOM.createRoot(document.getElementById('${domId}'));
      RDOM.render(<Demo {...props} />,document.getElementById('${domId}'));
      `,
        {
          presets: ['react', 'stage-1']
        }).code;

        args.push(code);
      new Function(...args).apply(null, argvs);
      ///////////
    } else {
      //////////
      let code = transform(`
      function Demo(props: any) {
        ${_codeSrc}
      }
      //const root=ReactDOM.createRoot(document.getElementById('${domId}'));
      RDOM.render(<Demo {...props} />,document.getElementById('${domId}'));
      `,
        {
          presets: ['react', 'stage-1']
        }).code;
        args.push(code);
        new Function(...args).apply(null, argvs);
      ////////////
    }
  }
  function handleCodeChange(code:string){
    renderCode(code);
  }
  return (
    <div className="m-app">
      <div id={domId}></div>
      {props.showCode?<Editor value={props.codeSrc} onChange={handleCodeChange}/>:null}
    </div>
  );
}
