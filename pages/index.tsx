import { FC, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  NumberInput,
  Radio,
  Tabs,
  Switch,
  CopyButton,
  Text,
  Grid,
  Group,
  Select,
  Button,

} from '@mantine/core';
import { useForm } from '@mantine/form';
import { type } from 'os';
import CopyIcon from '@/images/copy.svg';
import Image from 'next/image';


const Home: FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>('first');
  
  const [halfLife, setHalfLife] = useState(0);
  
  const form = useForm({
    initialValues: {
      initialQuantity: "",
      remainingQuantity: "",
      time:"",
      unit :"second",
    },
  });


  function calculateHalfLife({
    initialQuantity,
    remainingQuantity,
    time,
    unit,
  }: {
    initialQuantity: number | string;
    remainingQuantity: number | string;
    time:number | string;
    unit:string;
  }) {

    if(typeof initialQuantity == "number" && typeof remainingQuantity == "number" && typeof time == "number")
    {

      
      // main logic
      
      console.log(halfLife.toString())
      let ratio = (remainingQuantity / initialQuantity)
      
      ratio = Math.log(ratio);
      
      console.log(ratio);
      
      let ans = time * (Math.log(2));
      ans = ans * -1;
      
      ans = ans / ratio;
      console.log(ans);
      
      console.log(ans);
      
      setHalfLife(ans);
      
    }
  }

  useEffect(() => {
    calculateHalfLife({ initialQuantity: 0, remainingQuantity: 0 , time:0 , unit:"sec" });
  }, []);

 

  return (
    <Grid h={'100%'} mt={0} mb={0}>
      <Grid.Col
        sx={(theme) => ({
          boxShadow: theme.shadows.md,
          backgroundColor: '#f7f7f7',
          borderRight: '1px solid',
          borderColor: '#D9D9D9',
        })}
        sm={6}
      >
        <Box py={24} px={'16px'} w={{ base: '100%' }}>
          <Tabs value={activeTab} onTabChange={setActiveTab}>
           

            <Tabs.Panel value="first">
              <form
              
                onSubmit={form.onSubmit((values) =>
                  calculateHalfLife(values)
                )}
              >
                <Text mt="12px" size="24px" mb="12px">
                  Half Life Calculator
                </Text>
                <Text mb="24px">
                  This version of the generator calculates Half Life of radio active decay
                </Text>
                <NumberInput
                  w="100%"
                  precision={6}
                  mb={'24px'}
                  required
                  label="Initial Quantity"
                  {...form.getInputProps('initialQuantity')}
                />

                <NumberInput
                  w="100%"
                  precision={6}
                  required
                  mb={'24px'}
                  
                  label="Reamining Quantity"
                  {...form.getInputProps('remainingQuantity')}
                />
              

             

              <Grid>
                  <Grid.Col span={4}>
                  <NumberInput
                  precision={6}
                  required
                  w="100%"
                  mb={'24px'}
                  min={0}
                  label="Time"
                  {...form.getInputProps('time')}
                />
                  </Grid.Col>
                  <Grid.Col span={4}>
                  <Select
                   label
                    placeholder="Pick one"
                    dropdownPosition = "bottom"
                    data={[
                      { value: 'Milisecond', label: 'Milisecond' },
                      { value: 'Second', label: 'Second' },
                      { value: 'Minute', label: 'Minute' },
                      { value: 'Hour', label: 'Hour' },
                      { value: 'Day', label: 'Day' },
                      { value: 'Weeks', label: 'Weeks' },
                      { value: 'Month', label: 'Month' },
                      { value: 'Year', label: 'Year' },
                      

                    ]}
                  {...form.getInputProps('unit')}

                  />
                  </Grid.Col>
              
                </Grid>

                <Flex mb="24px" justify="flex-end">
                  <Button size="md" color="violet" type="submit">
                    <Text ml="6px">Calculate Half Life</Text>
                  </Button>
                  <Button
                    onClick={form.reset}
                    ml="12px"
                    variant="outline"
                    size="md"
                    color="gray"
                  >
                    <Text>Clean</Text>
                  </Button>
                </Flex>
              </form>
            </Tabs.Panel>
            
          </Tabs>
        </Box>
      </Grid.Col>
      <Grid.Col sm={6}>
        <Box p="20px">
          <Flex justify="space-between">
            <Text size="24px" mb="12px">
              Half Life Generator
            </Text>
            {halfLife.toString() != "NaN" && (
              <CopyButton value={halfLife.toString()}>
                {({ copied, copy }) => (
                  <Button size="sm" px={8} variant="default" onClick={copy}>
                    <Image src={CopyIcon} width={12} height={12} alt="" />
                    {copied && <Text ml={4}>Copied</Text>}
                  </Button>
                )}
              </CopyButton>
            )}
          </Flex>

          
          <Box

            p={20}
            sx={() => ({
              backgroundColor: '#e9ecef',
              borderRadius: '3px',
              border: '1px solid',
              borderColor: '#dee2e6',
        
            })}
          >
            
          {halfLife.toString() != "NaN" && <Text  align="center" size="24px" color="#202123">{halfLife + "   " + form.values.unit}</Text>}
          </Box>

          
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default Home;
