'use client';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';

export default function SonnerDemo() {
  return (
    <>
      <Button
        variant='outline'
        onClick={() => {
          console.log('on click');

          toast('第一个参数', {
            description: '这是描述',
            action: {
              label: '撤销',
              onClick: () => console.log('撤销'),
            },
          });
        }}
      >
        Show Toast
      </Button>
      <Toaster richColors position='top-right' />
    </>
  );
}
