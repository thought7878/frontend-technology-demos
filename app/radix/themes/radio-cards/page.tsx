'use client';

import '@radix-ui/themes/styles.css';
import { Box, Flex, RadioCards, Theme, Text } from '@radix-ui/themes';
import { RadioCardsItem, RadioCardsRoot } from '@/components/ui/radio-cards';

export default function Page() {
  return (
    <div>
      <h1>My</h1>
      <RadioCardsRoot onValueChange={console.log} className='flex gap-8 mb-8'>
        <RadioCardsItem value='1' variant='surface' className=''>
          <div className=''>
            <div>surface: 8-core CPU</div>
            <div>32 GB RAM</div>
          </div>
        </RadioCardsItem>
        <RadioCardsItem value='2' variant='classic'>
          <div className=''>
            <div>classic: 6-core CPU</div>
            <div>24 GB RAM</div>
          </div>
        </RadioCardsItem>
        <RadioCardsItem value='3' variant='classic' disabled>
          <div className=''>
            <div>4-core CPU</div>
            <div>16 GB RAM</div>
          </div>
        </RadioCardsItem>
        <RadioCardsItem value='4'>
          <div className=''>
            <div>4-core CPU</div>
            <div>16 GB RAM</div>
          </div>
        </RadioCardsItem>
        <RadioCardsItem value='5' disabled>
          <div className=''>
            <div>4-core CPU</div>
            <div>16 GB RAM</div>
          </div>
        </RadioCardsItem>
      </RadioCardsRoot>

      <h1>variant=classic</h1>
      <Theme>
        <Box maxWidth='600px'>
          <RadioCards.Root
            name='classic'
            defaultValue='2'
            onValueChange={console.log}
            columns={{ initial: '1', sm: '3' }}
            variant='classic'
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
        <div>variant=surface</div>
        <Box maxWidth='600px'>
          <RadioCards.Root
            name='surface'
            defaultValue='a'
            onValueChange={console.log}
            columns={{ initial: '1', sm: '3' }}
            variant='surface'
            // m={'9'}
          >
            <RadioCards.Item value='a'>
              <Flex direction='column' width='100%'>
                <Text weight='bold'>8-core CPU</Text>
                <Text>32 GB RAM</Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value='b'>
              <Flex direction='column' width='100%'>
                <Text weight='bold'>6-core CPU</Text>
                <Text>24 GB RAM</Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value='c'>
              <Flex direction='column' width='100%'>
                <Text weight='bold'>4-core CPU</Text>
                <Text>16 GB RAM</Text>
              </Flex>
            </RadioCards.Item>
          </RadioCards.Root>
        </Box>
      </Theme>
    </div>
  );
}
