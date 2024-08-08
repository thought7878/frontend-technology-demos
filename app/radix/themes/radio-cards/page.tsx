'use client';

import '@radix-ui/themes/styles.css';
import { Box, Flex, RadioCards, Theme, Text } from '@radix-ui/themes';

export default function Page() {
  return (
    <Theme>
      <Box maxWidth='600px'>
        <RadioCards.Root
          defaultValue='2'
          onValueChange={console.log}
          columns={{ initial: '1', sm: '3' }}
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
  );
}
