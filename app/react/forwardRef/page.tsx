'use client';

import { Button } from '@/components/ui/button';
import React, { forwardRef, ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
  // type?: 'submit' | 'button';
}

const MyComponent = forwardRef<HTMLDivElement, Props>(function MyComponent(
  props,
  ref
) {
  return (
    <div ref={ref} className='bg-blue-500'>
      {props.children}
    </div>
  );
});

// 使用 forwardRef 创建的 MyComponent 组件
export default function Page() {
  const myRef = React.useRef(null);
  const myButtonRef = React.useRef(null);

  // console.log('before render custom ref', myRef.current);
  // console.log('before render button ref', myButtonRef.current);
  useEffect(() => {
    // console.log('after render custom ref', myRef.current);
    // console.log('after render button ref', myButtonRef.current);
  }, []);

  return (
    <div>
      <MyComponent ref={myRef}>This is some content.</MyComponent>
      <Button ref={myButtonRef} variant={'default'} size={'default'}>
        press me
      </Button>
    </div>
  );
}

// 现在你可以使用 myRef.current 来访问包裹在 MyComponent 内部的 <div> 元素
