import React, { useEffect, useState } from 'react';
//import ReactDOM from "react-dom/client";
import * as RDOM from 'react-dom';
import CompRender from "./CompRender";
import { marked } from 'marked';
import "./style/index.less";
export interface IAppProps {
  component: any;//当前用于渲染示例代码的组件
  dependencies?: any;//依赖其他组件列表的MAP集合，{key：value}
  docSrc?: string;//文档内容，约定为markdown文档。
  codeSrc?: string;//源码，优先级最高，使用此属性后，docSrc被忽略
}

function useRender(_marked) {
  if (_marked._hadUseRender) {
    return _marked;
  }
  let renderer: any = {};// new marked.Renderer();
  renderer.table = (header, body) => {
    return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
  };
  renderer.listitem = function (text) {
    return `<li class="md-listitem">${text}</li>`;
  };
  renderer.paragraph = function (text) {
    return `<p class="md-paragraph">${text}</p>`;
  };
  renderer.heading = function (text, level, raw) {
    // if (options.headerIds) {
    //   return '<h' + level + ' id="' + text + '" class="md-heading">' + text + '</h' + level + '>\n';
    // }
    // ignore IDs
    return '<h' + level + ' class="md-heading" >' + text + '</h' + level + '>\n';
  };
  _marked.use({ renderer });
  return _marked;
}
const deme_components = [];
export default function App(props: IAppProps) {
  const [html, setHtml] = useState("");
  useEffect(() => {
    if (props.docSrc) {
      loadDoc();
      window.setTimeout(() => {
        for (const item of deme_components) {
          const div = document.getElementById(item.id);

          if (div instanceof HTMLElement) {
            //let root = ReactDOM.createRoot(div);
            //root.render(item.component);
            RDOM.render(item.component,div);
          }
        }
      }, 10);
    }
  }, [props.docSrc]);



  function loadDoc() {
    if (props.docSrc) {
      useRender(marked);
      const _doc = props.docSrc.replace(/::\s?(demo|display)\s?([^]+?)::/g, (match, p1, p2, offset) => {
        const id = offset.toString(36);
        let codeMc = /(.*)\r?\n?```js\s?([^]+?)```/gi.exec(p2);
        deme_components.push({
          id, component: React.createElement(CompRender, Object.assign({
            //name: this.constructor.name.toLowerCase(),
            showCode: p1 === 'demo',
            containerId: id,
            component: props.component,
            dependencies: props.dependencies,
            codeSrc: codeMc[2]
          }, {}))
        });//把文档里 :::demo :::包含的组件，实例化为对应的react组件。缓存在this.components

        return `<div><h5>${codeMc[1]}</h5><div id=${id} class="demo-container"></div></div>`;
      });
      let html = marked.parse(_doc);
      setHtml(html);
    }
  }
  return (
    <div className="m-demo-viewer">
      {
        props.codeSrc ? <div className="markdown"><CompRender showCode component={props.component} codeSrc={props.codeSrc} /></div> : null
      }
      <div className="markdown" dangerouslySetInnerHTML={{
        __html: html
      }}></div>
    </div>
  );
}
