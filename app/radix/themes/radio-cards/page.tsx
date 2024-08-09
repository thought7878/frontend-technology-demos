'use client';

import '@radix-ui/themes/styles.css';
import { Box, Flex, RadioCards, Theme, Text } from '@radix-ui/themes';
import { RadioCardsItem, RadioCardsRoot } from '@/components/ui/raion-cards';

export default function Page() {
  return (
    <>
      <h1>My</h1>
      <RadioCardsRoot
        onValueChange={console.log}
        className='text-blue-500 flex gap-8'
      >
        <RadioCardsItem value='1' className='border border-blue-500'>
          <div className=''>
            <div>8-core CPU</div>
            <div>32 GB RAM</div>
          </div>
        </RadioCardsItem>
        <RadioCardsItem value='2'>
          <div className=''>
            <div>6-core CPU</div>
            <div>24 GB RAM</div>
          </div>
        </RadioCardsItem>
        <RadioCardsItem value='3'>
          <div className=''>
            <div>4-core CPU</div>
            <div>16 GB RAM</div>
          </div>
        </RadioCardsItem>
      </RadioCardsRoot>
      <h1>Theme</h1>
      <Theme>
        <Box maxWidth='600px'>
          <RadioCards.Root
            defaultValue='2'
            onValueChange={console.log}
            columns={{ initial: '1', sm: '3' }}
            // m={'9'}
          >
            <RadioCards.Item value='1' disabled>
              <Flex direction='column' width='100%'>
                <Text weight='bold'>8-core CPU</Text>
                <Text>32 GB RAM</Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value='2'>
              <Flex direction='column' width='100%'>
                <Text weight='bold'>6-core CPU</Text>
                <Text>24 GB RAM</Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value='3'>
              <Flex direction='column' width='100%'>
                <Text weight='bold'>4-core CPU</Text>
                <Text>16 GB RAM</Text>
              </Flex>
            </RadioCards.Item>
          </RadioCards.Root>
        </Box>
      </Theme>
    </>
  );
}
