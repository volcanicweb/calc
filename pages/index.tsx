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
  
  const [ans, setAns] = useState("");
  
  const form = useForm({
    initialValues: {
      initialQuantity: "",
      remainingQuantity: "",
      time:"",
      halfLife:"",
      
    },
  });


  function calculateHalfLife({
    initialQuantity,
    remainingQuantity,
    time,
    halfLife,
  }: {
    initialQuantity: number | string;
    remainingQuantity: number | string;
    time:number | string;
    halfLife:number | string;
  }) {

    if(typeof initialQuantity == "number" && typeof remainingQuantity == "number" && typeof time == "number" && typeof halfLife =="string")
    {

      
      // main logic
      
      // console.log(halfLife.toString())
      let ratio = (remainingQuantity / initialQuantity)
      
      ratio = Math.log(ratio);
      
      console.log(ratio);
      
      let ans = time * (Math.log(2));
      ans = ans * -1;
      
      ans = ans / ratio;
      

      let a = "Half-life, t1/2 = "+ans.toString();
      
      
      form.setValues({
        
        initialQuantity:"",
        remainingQuantity:"",
        time:"",
        halfLife:"",
      })
      
      setAns(a);
    }

   else if(typeof initialQuantity == "number" && typeof remainingQuantity == "string" && typeof time == "number" && typeof halfLife =="number")
   {
    //at t time
      let timeRatio = time / halfLife;

      let ans = Math.pow(0.5 , timeRatio);

      ans = ans * initialQuantity;

      let a = "Quantity remains, Nt =  "+ans.toString();
      
      
      form.setValues({
        
        initialQuantity:"",
        remainingQuantity:"",
        time:"",
        halfLife:"",
      })
      
      setAns(a);
    
   }

   else if(typeof initialQuantity == "string" && typeof remainingQuantity == "number" && typeof time == "number" && typeof halfLife =="number")
   {
    let timeRatio = time / halfLife;

    let ans = Math.pow(0.5 , timeRatio);

    ans =  remainingQuantity / ans;

    let a = "Initial quantity, No = "+ans.toString();
    
    
    form.setValues({
      
      initialQuantity:"",
      remainingQuantity:"",
      time:"",
      halfLife:"",
    })
    
    setAns(a);
   }

   else if(typeof initialQuantity == "number" && typeof remainingQuantity == "number" && typeof time == "string" && typeof halfLife =="number")
   {
      //for current time

      let ratio = (remainingQuantity / initialQuantity)
      
      ratio = Math.log(ratio);
      
      console.log(ratio);
      
      let ans = halfLife / (Math.log(2));
      ans = ans * -1;
      
      ans = ans * ratio;
      

      let a = "Time, t = "+ans.toString();
      
      
      form.setValues({
        
        initialQuantity:"",
        remainingQuantity:"",
        time:"",
        halfLife:"",
      })
      
      setAns(a);

   }

   else{
    console.log("give only 3 input ");
   }

  }

  

 

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
          
              <form
              
                onSubmit={form.onSubmit((values) =>
                  calculateHalfLife(values)
                )}
              >
                <Text mt="12px" size="24px" mb="12px">
                  Half Life Calculator
                </Text>
                <Text mb="24px">
                The following tools can generate any one of the values from the other three in the half-life formula for a substance undergoing decay to decrease by half
                </Text>
              

             
                <Grid>
                  <Grid.Col md={6} lg={3}>
                    <NumberInput
                    w="100%"
                    precision={6}
                    
                    mb={'24px'}
                    hideControls
                    label="Quantity remains"
                    description={<div>
                        N<sub>t</sub>
                    </div>}
                    {...form.getInputProps('remainingQuantity')}
                    />
                  
                  </Grid.Col>

                  <Grid.Col md={6} lg={3}>
                    <NumberInput
                    w="100%"
                    precision={6}
                    mb={'24px'}
                    hideControls
                    label="Initial Quantity"
                    description={<div>
                      N<sub>0</sub>
                  </div>}
                    {...form.getInputProps('initialQuantity')}
                    />
                  </Grid.Col>



                  <Grid.Col md={6} lg={3}>

                      <NumberInput
                        precision={6}
                        hideControls
                        w="100%"
                        mb={'24px'}
                        min={0}
                        label="Time"
                        description={<div>
                          t
                      </div>}
                        {...form.getInputProps('time')}
                      />
                  
                  </Grid.Col>


                  <Grid.Col md={6} lg={3}>
                    <NumberInput
                      precision={6}
                      w="100%"
                      mb={'24px'}
                      min={0}
                      hideControls
                      label="Half Life"
                      description={<div>
                        t<sub>1/2</sub>
                    </div>}
                      {...form.getInputProps('halfLife')}
                    />
                  </Grid.Col>
              </Grid>

            

                
                <Flex mb="24px" justify="flex-end">
                  <Button size="md" color="violet" type="submit">
                    <Text ml="6px">Calculate</Text>
                  </Button>
                  <Button
                    onClick={form.reset}
                    ml="12px"
                    variant="outline"
                    size="md"
                    color="gray"
                  >
                    <Text onClick={()=>{
                      form.setValues({
        
                        initialQuantity:"",
                        remainingQuantity:"",
                        time:"",
                        halfLife:"",
                      })
                    }}>Clean</Text>
                  </Button>
                </Flex>
              </form>
            

        </Box>
      </Grid.Col>
      <Grid.Col sm={6}>
        <Box p="20px">
          <Flex justify="space-between">
            <Text size="24px" mb="12px">
            Half-Life Calculator
            </Text>
            {ans != "" && (
              <CopyButton value={ans}>
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
            
          {ans != "" && <Text  align="center" size="24px" color="#202123">{ans}</Text>}
          </Box>

          
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default Home;
