import React, {useState,useEffect,useRef,PureComponent } from 'react';

export interface ITestCompProps {
  title?:string
}


function TestComp (props: ITestCompProps) {

  console.log("TestComp");
  return (
    <div>
      TestCompTestCompTestComp
      <h1>{props.title}</h1>
    </div>
  );
}
TestComp.prototype.cname="TestComp测试组件";
export default  TestComp;
