'use client';

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
} from '@/components/ui/command';

export default function CommandDemo() {
  return (
    <>
      <Command className='rounded-lg border shadow-md'>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>
            {/* <CommandEmpty className='text-blue-500'> */}
            No results found.
          </CommandEmpty>
          {/* <CommandGroup heading='Suggestions'> */}
          <CommandItem onSelect={(value) => console.log('Selected', value)}>
            <Calendar className='mr-2 h-4 w-4' />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className='mr-2 h-4 w-4' />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className='mr-2 h-4 w-4' />
            <span>Calculator</span>
          </CommandItem>
          {/* </CommandGroup> */}
          {/* <CommandSeparator />
          <CommandGroup heading='Settings'>
            <CommandItem>
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className='mr-2 h-4 w-4' />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className='mr-2 h-4 w-4' />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </Command>
    </>
  );
}
