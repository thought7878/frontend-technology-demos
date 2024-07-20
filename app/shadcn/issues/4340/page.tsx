import { Checkbox } from '@/components/ui/checkbox';

export default function Page() {
  return (
    <div className=''>
      {/* <div className='flex items-center'> */}
      <Checkbox id='terms' className='m-2' />
      <label
        htmlFor='terms'
        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        Accept terms and conditions
      </label>
    </div>
  );
}
