import React, {useState,useEffect,useRef,PureComponent } from 'react';

export interface ITestCompProps {
  title?:string
}


function TestComp1 (props: ITestCompProps) {
  return (
    <div>
      TestComp11111111111111111
      <h1>{props.title}</h1>
    </div>
  );
}
TestComp1.prototype.cname="TestComp1TestComp1TestComp1";
export default  TestComp1;
