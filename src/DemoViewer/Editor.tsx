import React, {Component,useState,useRef,useEffect} from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/comment/comment';
interface IEditor{
  onChange:(val:string)=>void;
  value:string;
}
let editTimer=null;
export default function Editor(props: IEditor) {
  const ref=useRef(null);
  useEffect(()=>{
    //const {onChange, value} = this.props;

    let cm = CodeMirror(ref.current, {
      mode: 'jsx',
      theme: 'react',
      keyMap: 'sublime',
      viewportMargin: Infinity,
      lineNumbers: false,
      dragDrop: false
    });

    cm.setValue(props.value);

    cm.on('changes', cm => {
      if (props.onChange) {
        clearTimeout(editTimer);

        editTimer = setTimeout(() => {
          props.onChange(cm.getValue());
        }, 300);
      }
    });
  },[]);

  return <div className="m-editor" ref={ref}/>;
}